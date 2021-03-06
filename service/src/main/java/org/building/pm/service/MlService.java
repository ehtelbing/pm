package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.sql.Date;
import java.util.*;

/**
 * Created by Administrator on 2017/11/8.
 */
@Service
public class MlService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());
    @Autowired
    private ComboPooledDataSource dataSources;

    private List<HashMap> ResultHash(ResultSet rs) throws SQLException {

        List<HashMap> result = new ArrayList<HashMap>();

        ResultSetMetaData rsm = rs.getMetaData();

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

    //获取工程大类列表
    public HashMap GET_PROJECT_CLASS_LIST() throws SQLException {
        logger.info("begin GET_PROJECT_CLASS_LIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJECTCLASSLIST" + "(:RET)}");
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GET_PROJECT_CLASS_LIST");

        return result;
    }

    //获取检修工程
    public HashMap GET_PROJECT_LIST(String V_CLASS_CODE) throws SQLException {
        logger.info("begin GET_PROJECT_LIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_PM_PROJ_BUD.GETPROJECTLIST" + "(:V_CLASS_CODE,:RET)}");
            cstmt.setString("V_CLASS_CODE", V_CLASS_CODE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GET_PROJECT_LIST");

        return result;
    }

    //按供应商统计情况（选择供应商）
    public HashMap GETOILSUPPLYLIST(String A_COUNTRY_CODE, String A_PROVINCE_CODE, String A_CITY_CODE, String A_SUPPLY_CODE,
                                    String A_SUPPLY_NAME) throws SQLException {
        logger.info("begin GETOILSUPPLYLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL41.GETOILSUPPLYLIST" + "(:A_COUNTRY_CODE,:A_PROVINCE_CODE,:A_CITY_CODE,:A_SUPPLY_CODE,:A_SUPPLY_NAME,:RET)}");
            cstmt.setString("A_COUNTRY_CODE", A_COUNTRY_CODE);
            cstmt.setString("A_PROVINCE_CODE", A_PROVINCE_CODE);
            cstmt.setString("A_CITY_CODE", A_CITY_CODE);
            cstmt.setString("A_SUPPLY_CODE", A_SUPPLY_CODE);
            cstmt.setString("A_SUPPLY_NAME", A_SUPPLY_NAME);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETOILSUPPLYLIST");

        return result;
    }

    //按供应商统计情况（查找）
    public HashMap GET_SUPPLYOILUSE_TABLE(String A_PLANTCODE, String A_DEPARTCODE, String A_BEGINDATE, String A_ENDDATE,
                                          String A_MAT_DESC, String A_SUPPLY_CODE) throws SQLException {
        logger.info("begin GET_SUPPLYOILUSE_TABLE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL6.GET_SUPPLYOILUSE_TABLE" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_BEGINDATE,:A_ENDDATE,:A_MAT_DESC,:A_SUPPLY_CODE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            //后台传参数的时候要看类型！！
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
            cstmt.setString("A_SUPPLY_CODE", A_SUPPLY_CODE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GET_SUPPLYOILUSE_TABLE");

        return result;
    }

    //按主机设备统计油品使用情况（设备类型）
    public HashMap GETEQUTYPELIST_ABLE()
            throws SQLException {
        logger.info("begin GETEQUTYPELIST_ABLE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETEQUTYPELIST_ABLE" + "(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETEQUTYPELIST_ABLE");

        return result;
    }

    //按主机设备统计油品使用情况（设备名称）
    public HashMap GETINSTEQULIST(String A_EQUTYPE, String A_PLANTCODE, String A_DEPARTCODE, String A_EQUIP_ID, String A_EQUIP_NAME)
            throws SQLException {
        logger.info("begin GETINSTEQULIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL12.GETINSTEQULIST" + "(:A_EQUTYPE,:A_PLANTCODE,:A_DEPARTCODE,:A_EQUIP_ID,:A_EQUIP_NAME,:RET)}");
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_EQUIP_NAME", A_EQUIP_NAME);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETINSTEQULIST");

        return result;
    }

    //按油品统计使用情况
    public HashMap GET_OILMAT_TABLE(String A_PLANTCODE, String A_DEPARTCODE, String A_BEGINDATE, String A_ENDDATE, String A_MAT_NO, String A_MAT_DESC)
            throws SQLException {
        logger.info("begin GET_OILMAT_TABLE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL6.GET_OILMAT_TABLE" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_BEGINDATE,:A_ENDDATE,:A_MAT_NO,:A_MAT_DESC,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));//后台传参数的时候要看类型！！
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
            cstmt.setString("A_MAT_NO", A_MAT_NO);
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GET_OILMAT_TABLE");

        return result;
    }

    //主设备润滑油脂使用情况
    public HashMap GET_EQUOILCONSUME_TABLE(String A_PLANTCODE, String A_DEPARTCODE, String A_EQUTYPE, String A_EQUIP_ID, String A_BEGINDATE, String A_ENDDATE, String A_MAT_NO, String A_MAT_DESC)
            throws SQLException {
        logger.info("begin GET_EQUOILCONSUME_TABLE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL6.GET_EQUOILCONSUME_TABLE" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_EQUTYPE,:A_EQUIP_ID,:A_BEGINDATE,:A_ENDDATE,:A_MAT_NO,:A_MAT_DESC,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));//后台传参数的时候要看类型！！
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
            cstmt.setString("A_MAT_NO", A_MAT_NO);
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GET_EQUOILCONSUME_TABLE");

        return result;
    }

    //润滑油脂物料设置
    public HashMap GETMATLIST(String A_MAT_NO, String A_MAT_DESC)
            throws SQLException {
        logger.info("begin GETMATLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL13.GETMATLIST" + "(:A_MAT_NO,:A_MAT_DESC,:RET)}");
            cstmt.setString("A_MAT_NO", A_MAT_NO);
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETMATLIST");

        return result;
    }

    //删除润滑物料油脂
    public HashMap DELETEMAT(String MAT_NO) throws SQLException {

        logger.info("begin DELETEMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_OIL13.DELETEMAT" + "(:MAT_NO,:RET_MSG,:RET)}");
            cstmt.setString("MAT_NO", MAT_NO);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DELETEMAT");
        return result;
    }

    //导入润滑油脂物料（查找）
    public HashMap SELECTMAT(String A_MAT_DESC) throws SQLException {
        logger.info("begin SELECTMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL13.SELECTMAT" + "(:A_MAT_DESC,:RET)}");
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SELECTMAT");

        return result;
    }

    //导入润滑油脂物料（导入）
    public HashMap IMPORTMAT(String A_MAT_NO, String A_MAT_DESC) throws SQLException {
        logger.info("begin IMPORTMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL13.IMPORTMAT" + "(:A_MAT_NO,:A_MAT_DESC,:RET_MSG,:RET)}");
            cstmt.setString("A_MAT_NO", A_MAT_NO);
            cstmt.setString("A_MAT_DESC", A_MAT_DESC);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end IMPORTMAT");

        return result;
    }

    //设备类型设置模块
    //查询设备类型
    public HashMap GETEQUTYPELIST() throws SQLException {
        logger.info("begin GETEQUTYPELIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL15.GETEQUTYPELIST" + "(:RET)}");
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETEQUTYPELIST");

        return result;
    }

    //新增设备类型设备类型
    public HashMap ADDEQUTYPE(String A_EQUTYPE, String A_EQUTYPE_NAME, String A_EQUTYPE_REMARK) throws SQLException {
        logger.info("begin ADDEQUTYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL15.ADDEQUTYPE" + "(:A_EQUTYPE,:A_EQUTYPE_NAME,:A_EQUTYPE_REMARK,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_EQUTYPE_NAME", A_EQUTYPE_NAME);
            cstmt.setString("A_EQUTYPE_REMARK", A_EQUTYPE_REMARK);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end ADDEQUTYPE");

        return result;
    }

    //设备类型状态修改
    public HashMap SETEQUTYPESTATUS(String A_EQUTYPE) throws SQLException {
        logger.info("begin SETEQUTYPESTATUS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL15.SETEQUTYPESTATUS" + "(:A_EQUTYPE,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SETEQUTYPESTATUS");

        return result;
    }

    //修改设备类型
    public HashMap UPDATEEQUTYPE(String A_EQUTYPE, String A_EQUTYPE_NAME, String A_EQUTYPE_REMARK) throws SQLException {
        logger.info("begin UPDATEEQUTYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL15.UPDATEEQUTYPE" + "(:A_EQUTYPE,:A_EQUTYPE_NAME,:A_EQUTYPE_REMARK,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.setString("A_EQUTYPE_NAME", A_EQUTYPE_NAME);
            cstmt.setString("A_EQUTYPE_REMARK", A_EQUTYPE_REMARK);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end UPDATEEQUTYPE");

        return result;
    }

    //获取主机规范设置
    public HashMap GET_EQULIST(String A_EQUTYPE) throws SQLException {
        logger.info("begin GET_EQULIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GET_EQULIST" + "(:A_EQUTYPE,:RET)}");
            cstmt.setString("A_EQUTYPE", A_EQUTYPE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GET_EQULIST");

        return result;
    }

    //设置设备润滑规范
    public HashMap SETEQU_NO(String A_EQUIP_ID, String A_EQUIP_NO) throws SQLException {
        logger.info("begin SETEQU_NO");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL12.SETEQU_NO" + "(:A_EQUIP_ID,:A_EQUIP_NO,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SETEQU_NO");

        return result;
    }


    //查找点检员
    public HashMap BASE_PERSON_SEL() throws SQLException {
        logger.info("begin BASE_PERSON_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_PERSON_SEL" + "(:V_CURSOR)}");
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
        logger.info("end BASE_PERSON_SEL");

        return result;
    }

    //下方点检员表格显示
    public HashMap GETEQUPERSON(String A_EQUIP_ID) throws SQLException {
        logger.info("begin GETEQUPERSON");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL12.GETEQUPERSON" + "(:A_EQUIP_ID,:RET)}");
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETEQUPERSON");

        return result;
    }

    //保存点检员
    public HashMap ADDEQUPERSON(String A_EQUIP_ID, String A_USERID) throws SQLException {
        logger.info("begin ADDEQUPERSON");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL12.ADDEQUPERSON" + "(:A_EQUIP_ID,:A_USERID,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end ADDEQUPERSON");

        return result;
    }

    //删除点检员
    public HashMap DELETEEQUPERSON(String A_EQUIP_ID, String A_USERID) throws SQLException {
        logger.info("begin DELETEEQUPERSON");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL12.DELETEEQUPERSON" + "(:A_EQUIP_ID,:A_USERID,:RET_MSG,:RET)}");
            cstmt.setString("A_EQUIP_ID", A_EQUIP_ID);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DELETEEQUPERSON");

        return result;
    }

    //查找部位信息
    public HashMap GETPARTLIST(String A_EQUIP_NO, String A_MAT_NO) throws SQLException {
        logger.info("begin GETPARTLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_OIL11.GETPARTLIST" + "(:A_EQUIP_NO,:A_MAT_NO,:RET)}");
            cstmt.setString("A_EQUIP_NO", A_EQUIP_NO);
            cstmt.setString("A_MAT_NO", A_MAT_NO);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETPARTLIST");

        return result;
    }

    //获得周期类型
    public HashMap PRO_RUN_CYCLE_ABLE() throws SQLException {
        logger.info("begin PRO_RUN_CYCLE_ABLE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_CYCLE_ABLE" + "(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_CYCLE_ABLE");

        return result;
    }

    //获取作业量列表
    public HashMap PRO_RUN_YEILD_SELECT(String A_EQUID, String A_BEGINDATE, String A_ENDDATE, String A_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN_YEILD_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_YEILD_SELECT" + "(:A_EQUID,:A_BEGINDATE,:A_ENDDATE,:A_CYCLE_ID,:RET_SUM,:RET)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.registerOutParameter("RET_SUM", OracleTypes.DOUBLE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
            result.put("RET_SUM", cstmt.getDouble("RET_SUM"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_YEILD_SELECT");

        return result;
    }

    //查询设备运行台账
    public HashMap PRO_RUN_EQU_BJ_ALERT_ALL(String A_EQUID, String A_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN_EQU_BJ_ALERT_ALL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_EQU_BJ_ALERT_ALL" + "(:A_EQUID,:A_CYCLE_ID,:RET)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_EQU_BJ_ALERT_ALL");

        return result;
    }

    //查询设备备件历史台账
    public HashMap PRO_RUN_BJ_USE_ALL(String A_PLANTCODE, String A_DEPARTCODE, String A_EQUID, String A_BJ_UNIQUE_CODE, String A_BEGINDATE, String A_ENDDATE) throws SQLException {
        logger.info("begin PRO_RUN_BJ_USE_ALL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_USE_ALL" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_EQUID,:A_BJ_UNIQUE_CODE,:A_BEGINDATE,:A_ENDDATE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_BJ_UNIQUE_CODE", A_BJ_UNIQUE_CODE);
            cstmt.setDate("A_BEGINDATE", Date.valueOf(A_BEGINDATE));
            cstmt.setDate("A_ENDDATE", Date.valueOf(A_ENDDATE));
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_USE_ALL");

        return result;
    }

    //查看设备更换历史
    public HashMap PRO_RUN_BJ_CHANGE_LOG_ALL(String A_BJ_UNIQUE_CODE) throws SQLException {
        logger.info("begin PRO_RUN_BJ_CHANGE_LOG_ALL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_BJ_CHANGE_LOG_ALL" + "(:A_BJ_UNIQUE_CODE,:RET)}");
            cstmt.setString("A_BJ_UNIQUE_CODE", A_BJ_UNIQUE_CODE);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_BJ_CHANGE_LOG_ALL");

        return result;
    }

    //查看详细更换历史
    public HashMap PRO_RUN_SITE_BJ_CHANGE_LOG_ALL(String V_SITE_ID, String V_BEGINDATE, String V_ENDDATE) throws SQLException {

        logger.info("begin PRO_RUN_SITE_BJ_CHANGE_LOG_ALL");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_BJ_CHANGE_LOG_ALL" + "(:V_SITE_ID,:V_BEGINDATE,:V_ENDDATE,:RET)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);
            cstmt.setString("V_BEGINDATE", V_BEGINDATE);
            cstmt.setString("V_ENDDATE", V_ENDDATE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_SITE_BJ_CHANGE_LOG_ALL");
        return result;
    }

    //查询报警信息
    public HashMap PRO_RUN7116_SELECT(String V_V_DEPARTCODE, String V_V_PLANTCODE, String V_V_BJ_ID, String V_V_BEGIN_DATE,
                                      String V_V_END_DATE) throws SQLException {
        logger.info("begin PRO_RUN7116_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7116_SELECT" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID,:V_V_BEGIN_DATE,:V_V_END_DATE,:RET)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);
            cstmt.setDate("V_V_BEGIN_DATE", Date.valueOf(V_V_BEGIN_DATE));
            cstmt.setDate("V_V_END_DATE", Date.valueOf(V_V_END_DATE));

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7116_SELECT");

        return result;
    }

    //查找备件
    public HashMap PRO_RUN7117_BJLIST(String V_V_PLANTCODE, String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_RUN7117_BJLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7117_BJLIST" + "(:V_V_DEPTCODE,:V_V_PLANTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);

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
        logger.info("end PRO_RUN7117_BJLIST");

        return result;
    }

    //查找备件运行统计信息
    public HashMap PRO_RUN7117_BJWORKLIST(String V_V_DEPARTCODE, String V_V_PLANTCODE, String V_V_BJ_ID) throws SQLException {
        logger.info("begin PRO_RUN7117_BJWORKLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7117_BJWORKLIST" + "(:V_V_DEPARTCODE,:V_V_PLANTCODE,:V_V_BJ_ID,:V_CURSOR)}");
            cstmt.setString("V_V_DEPARTCODE", V_V_DEPARTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_BJ_ID", V_V_BJ_ID);

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
        logger.info("end PRO_RUN7117_BJWORKLIST");

        return result;
    }

    //------NO7119设备位置台账
    //查找设备位置信息
    public HashMap PRO_RUN_SITE_BJ_ALL(String IN_EQUID, String IN_PLANT, String IN_DEPART, String IN_STATUS, String IN_BJCODE,
                                       String IN_BJDESC) throws SQLException {
        logger.info("begin PRO_RUN_SITE_BJ_ALL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN_SITE_BJ_ALL" + "(:IN_EQUID,:IN_PLANT,:IN_DEPART,:IN_STATUS,:IN_BJCODE,:IN_BJDESC,:RET)}");
            cstmt.setString("IN_EQUID", IN_EQUID);
            cstmt.setString("IN_PLANT", IN_PLANT);
            cstmt.setString("IN_DEPART", IN_DEPART);
            cstmt.setString("IN_STATUS", IN_STATUS);
            cstmt.setString("IN_BJCODE", IN_BJCODE);
            cstmt.setString("IN_BJDESC", IN_BJDESC);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN_SITE_BJ_ALL");

        return result;
    }

    //查找VG图
    public HashMap PRO_RUN7119_SITEVGURL(String V_SITE_ID) throws SQLException {
        logger.info("begin PRO_RUN7119_SITEVGURL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7119_SITEVGURL" + "(:V_SITE_ID,:RET)}");
            cstmt.setString("V_SITE_ID", V_SITE_ID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7119_SITEVGURL");

        return result;
    }

    //----No7130备件寿命统计
    //查询供应商
    public HashMap PRO_RUN7110_SITESUPPLYLIST(String A_ID, String A_MATERIALCODE, String A_ORDERID) throws SQLException {
        logger.info("begin PRO_RUN7110_SITESUPPLYLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7110_SITESUPPLYLIST" + "(:A_ID,:A_MATERIALCODE,:A_ORDERID,:RET)}");
            cstmt.setString("A_ID", A_ID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_ORDERID", A_ORDERID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7110_SITESUPPLYLIST");

        return result;
    }

    //查询备件寿命信息
    public HashMap PRO_RUN7130_SELECTBJTIME(String V_PLANTCODE, String V_DEPARTCODE, String V_SUPPLY_CODE, String V_MATERIALNAME,
                                            String D_BEGIN_DATE, String D_END_DATE, String V_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN7130_SELECTBJTIME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7130_SELECTBJTIME" + "(:V_PLANTCODE,:V_DEPARTCODE,:V_SUPPLY_CODE,:V_MATERIALNAME,:D_BEGIN_DATE,:D_END_DATE,:V_CYCLE_ID,:OUT_RESULT)}");
            cstmt.setString("V_PLANTCODE", V_PLANTCODE);
            cstmt.setString("V_DEPARTCODE", V_DEPARTCODE);
            cstmt.setString("V_SUPPLY_CODE", V_SUPPLY_CODE);
            cstmt.setString("V_MATERIALNAME", V_MATERIALNAME);
            cstmt.setDate("D_BEGIN_DATE", Date.valueOf(D_BEGIN_DATE));
            cstmt.setDate("D_END_DATE", Date.valueOf(D_END_DATE));
            cstmt.setString("V_CYCLE_ID", V_CYCLE_ID);

            cstmt.registerOutParameter("OUT_RESULT", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("OUT_RESULT")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_RUN7130_SELECTBJTIME");

        return result;
    }

    //----No7132重点备件跟踪使用情况分析表
    //备件跟踪部门情况统计
    public HashMap PRO_NO7132_DEPARTMATLIST(String V_D_FACT_START_DATE, String V_D_FACT_FINISH_DATE, String V_V_PLANT, String V_V_DEPTCODE,
                                            String V_V_EQUIP_NO, String V_V_ORDERGUID, String V_V_MATERIALCODE, String V_V_MATERIALNAME) throws SQLException {
        logger.info("begin PRO_NO7132_DEPARTMATLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_NO7132_DEPARTMATLIST" + "(:V_D_FACT_START_DATE,:V_D_FACT_FINISH_DATE,:V_V_PLANT,:V_V_DEPTCODE,:V_V_EQUIP_NO,:V_V_ORDERGUID,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_CURSOR)}");
            cstmt.setString("V_D_FACT_START_DATE", V_D_FACT_START_DATE);
            cstmt.setString("V_D_FACT_FINISH_DATE", V_D_FACT_FINISH_DATE);
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);

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
        logger.info("end PRO_NO7132_DEPARTMATLIST");

        return result;
    }

    //备件跟踪使用明细表
    public HashMap PRO_RUN7132_ORDERMATLIST(String V_D_FACT_START_DATE, String V_D_FACT_FINISH_DATE, String V_V_PLANT, String V_V_DEPTCODE,
                                            String V_V_EQUIP_NO, String V_V_ORDERGUID, String V_V_MATERIALCODE, String V_V_MATERIALNAME) throws SQLException {
        logger.info("begin PRO_RUN7132_ORDERMATLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7132_ORDERMATLIST" + "(:V_D_FACT_START_DATE,:V_D_FACT_FINISH_DATE,:V_V_PLANT,:V_V_DEPTCODE,:V_V_EQUIP_NO,:V_V_ORDERGUID,:V_V_MATERIALCODE,:V_V_MATERIALNAME,:V_CURSOR)}");
            cstmt.setDate("V_D_FACT_START_DATE", Date.valueOf(V_D_FACT_START_DATE));
            cstmt.setDate("V_D_FACT_FINISH_DATE", Date.valueOf(V_D_FACT_FINISH_DATE));
            cstmt.setString("V_V_PLANT", V_V_PLANT);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUIP_NO", V_V_EQUIP_NO);
            cstmt.setString("V_V_ORDERGUID", V_V_ORDERGUID);
            cstmt.setString("V_V_MATERIALCODE", V_V_MATERIALCODE);
            cstmt.setString("V_V_MATERIALNAME", V_V_MATERIALNAME);

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
        logger.info("end PRO_RUN7132_ORDERMATLIST");

        return result;
    }

    //No7112备件检查记录查询
    //查找备件记录
    public HashMap PRO_RUN7112_CHECKLOGLIST(String V_V_EQUCODE, String V_V_DEPTCODE, String V_V_PLANTCODE,
                                            String V_V_ID, String V_V_BTIME, String V_V_ETIME) throws SQLException {
        logger.info("begin PRO_RUN7112_CHECKLOGLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_RUN7112_CHECKLOGLIST" + "(:V_V_EQUCODE,:V_V_DEPTCODE,:V_V_PLANTCODE,:V_V_ID,:V_V_BTIME,:V_V_ETIME,:V_CURSOR)}");
            cstmt.setDate("V_V_BTIME", Date.valueOf(V_V_BTIME));
            cstmt.setDate("V_V_ETIME", Date.valueOf(V_V_ETIME));
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PLANTCODE", V_V_PLANTCODE);
            cstmt.setString("V_V_ID", V_V_ID);

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
        logger.info("end PRO_RUN7112_CHECKLOGLIST");

        return result;
    }

    //PM_15010401 工单申请页面
    //查询申请工单
    public HashMap PRO_DJ401_APPLYLIST(String PLANTCODE_IN, String DEPARTCODE_IN, String USERCODE_IN) throws SQLException {
        logger.info("begin PRO_DJ401_APPLYLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_APPLYLIST" + "(:PLANTCODE_IN,:DEPARTCODE_IN,:USERCODE_IN,:RET)}");
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_APPLYLIST");

        return result;
    }

    //提交申请工单
    public HashMap PRO_DJ401_SUBMITAPPLY(String APPLYID_IN) throws SQLException {
        logger.info("begin PRO_DJ401_SUBMITAPPLY");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_SUBMITAPPLY" + "(:APPLYID_IN,:RET)}");
            cstmt.setString("APPLYID_IN", APPLYID_IN);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();


            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_SUBMITAPPLY");

        return result;
    }

    //删除工单
    public HashMap PRO_DJ401_DELETEAPPLY(String APPLYID_IN) throws SQLException {
        logger.info("begin PRO_DJ401_DELETEAPPLY");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_DELETEAPPLY" + "(:APPLYID_IN,:RET)}");
            cstmt.setString("APPLYID_IN", APPLYID_IN);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();


            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_DELETEAPPLY");

        return result;
    }

    //PM_1501040101
    //查询接收厂矿
    public HashMap PRO_DJ401_MENDPLANT() throws SQLException {
        logger.info("begin PRO_DJ401_MENDPLANT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_MENDPLANT" + "(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_MENDPLANT");

        return result;
    }

    //电机查询
    public HashMap PRO_DJ201_DJMAINLIST(String PLANTCODE_IN, String LOC_PLANTCODE_IN, String DJ_SERIES_CLASS_IN, String DJ_LOC_IN, String WORK_STATUS_IN,
                                        String DJ_NAME_IN, String DJ_UNIQUE_CODE_IN, String DJ_TYPE_IN, String DJ_VOL_IN) throws SQLException {
        logger.info("begin PRO_DJ201_DJMAINLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ201_DJMAINLIST" + "(:PLANTCODE_IN,:LOC_PLANTCODE_IN,:DJ_SERIES_CLASS_IN,:DJ_LOC_IN,:WORK_STATUS_IN," +
                    ":DJ_NAME_IN,:DJ_UNIQUE_CODE_IN,:DJ_TYPE_IN,:DJ_VOL_IN,:RET)}");
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("LOC_PLANTCODE_IN", LOC_PLANTCODE_IN);
            cstmt.setString("DJ_SERIES_CLASS_IN", DJ_SERIES_CLASS_IN);
            cstmt.setString("DJ_LOC_IN", DJ_LOC_IN);
            cstmt.setString("WORK_STATUS_IN", WORK_STATUS_IN);
            cstmt.setString("DJ_NAME_IN", DJ_NAME_IN);
            cstmt.setString("DJ_UNIQUE_CODE_IN", DJ_UNIQUE_CODE_IN);
            cstmt.setString("DJ_TYPE_IN", DJ_TYPE_IN);
            cstmt.setString("DJ_VOL_IN", DJ_VOL_IN);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ201_DJMAINLIST");

        return result;
    }

    //维修类别
    public HashMap PRO_DJ102_MENDTYPE_ABLE() throws SQLException {
        logger.info("begin PRO_DJ102_MENDTYPE_ABLE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ102_MENDTYPE_ABLE" + "(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ102_MENDTYPE_ABLE");

        return result;
    }

    //查询附带物料列表
    public HashMap PRO_DJ401_APPLYMATLIST(String APPLYID_IN) throws SQLException {
        logger.info("begin PRO_DJ401_APPLYMATLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_APPLYMATLIST" + "(:APPLYID_IN,:RET)}");
            cstmt.setString("APPLYID_IN", APPLYID_IN);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_APPLYMATLIST");

        return result;
    }

    //删除附带物料列表
    public HashMap PRO_DJ401_DELETEAPPLYMAT(String ID_IN) throws SQLException {
        logger.info("begin PRO_DJ401_DELETEAPPLYMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_DELETEAPPLYMAT" + "(:ID_IN,:RET)}");
            cstmt.setString("ID_IN", ID_IN);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_DELETEAPPLYMAT");

        return result;
    }

    //生成工单号
    public HashMap GETAPPLYORDERID(String A_PLANTCODE) throws SQLException {
        logger.info("begin GETAPPLYORDERID");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ401.GETAPPLYORDERID" + "(:A_PLANTCODE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();


            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETAPPLYORDERID");

        return result;
    }

    //查询物资分类
    public HashMap PRO_MM_ITYPE() throws SQLException {
        logger.info("begin PRO_MM_ITYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_MM_ITYPE" + "(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_ITYPE");

        return result;
    }

    //保存工单
    public HashMap PRO_DJ401_APPLYSAVE(String APPLYID_IN, String PLANTCODE_IN, String PLANTNAME_IN, String DEPARTCODE_IN, String DEPARTNAME_IN, String USERCODE_IN, String USERNAME_IN,
                                       String BILLCODE_IN, String DJ_UQ_CODE_IN, String DJNAME_IN, String CONTEXT_IN, java.util.Date BEGINDATE_IN, java.util.Date ENDDATE_IN,
                                       String V_PLANTCODEJS, String REMARK_IN, String DJCODE_IN, String CONFIRM_FLAG_IN, String MEND_TYPE_IN) throws SQLException {
        logger.info("begin PRO_DJ401_APPLYSAVE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        Date sqlDate1 = new Date(BEGINDATE_IN.getTime());
        Date sqlDate2 = new Date(ENDDATE_IN.getTime());

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_APPLYSAVE" + "(:APPLYID_IN,:PLANTCODE_IN,:PLANTNAME_IN,:DEPARTCODE_IN,:DEPARTNAME_IN,:USERCODE_IN,:USERNAME_IN,:BILLCODE_IN,:DJ_UQ_CODE_IN," +
                    ":DJNAME_IN,:CONTEXT_IN,:BEGINDATE_IN,:ENDDATE_IN,:V_PLANTCODEJS,:REMARK_IN,:DJCODE_IN,:CONFIRM_FLAG_IN,:MEND_TYPE_IN,:RET)}");


            cstmt.setString("APPLYID_IN", APPLYID_IN);
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("PLANTNAME_IN", PLANTNAME_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
            cstmt.setString("DEPARTNAME_IN", DEPARTNAME_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.setString("BILLCODE_IN", BILLCODE_IN);
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJNAME_IN", DJNAME_IN);
            cstmt.setString("CONTEXT_IN", CONTEXT_IN);
            cstmt.setDate("BEGINDATE_IN", sqlDate1);
            cstmt.setDate("ENDDATE_IN", sqlDate2);
            cstmt.setString("V_PLANTCODEJS", V_PLANTCODEJS);
            cstmt.setString("REMARK_IN", REMARK_IN);
            cstmt.setString("DJCODE_IN", DJCODE_IN);
            cstmt.setString("CONFIRM_FLAG_IN", CONFIRM_FLAG_IN);
            cstmt.setString("MEND_TYPE_IN", MEND_TYPE_IN);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();


            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_APPLYSAVE");

        return result;
    }

    //PM_1501040102
    //工单申请修改
    public HashMap PRO_DJ401_APPLYMES(String APPLYID_IN) throws SQLException {
        logger.info("begin PRO_DJ401_APPLYMES");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_APPLYMES" + "(:APPLYID_IN,:RET)}");

            cstmt.setString("APPLYID_IN", APPLYID_IN);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_APPLYMES");

        return result;
    }

    //工单修改保存
    public HashMap PRO_DJ401_APPLYUPDATE(String APPLYID_IN, String PLANTCODE_IN, String PLANTNAME_IN, String DEPARTCODE_IN, String DEPARTNAME_IN, String USERCODE_IN, String USERNAME_IN,
                                         String BILLCODE_IN, String DJ_UQ_CODE_IN, String DJNAME_IN, String CONTEXT_IN, java.util.Date BEGINDATE_IN, java.util.Date ENDDATE_IN,
                                         String REMARK_IN, String DJCODE_IN, String MEND_TYPE_IN) throws SQLException {
        logger.info("begin PRO_DJ401_APPLYUPDATE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date sqlDate1 = new Date(BEGINDATE_IN.getTime());
        Date sqlDate2 = new Date(ENDDATE_IN.getTime());

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ401_APPLYUPDATE" + "(:APPLYID_IN,:PLANTCODE_IN,:PLANTNAME_IN,:DEPARTCODE_IN,:DEPARTNAME_IN,:USERCODE_IN,:USERNAME_IN,:BILLCODE_IN,:DJ_UQ_CODE_IN," +
                    ":DJNAME_IN,:CONTEXT_IN,:BEGINDATE_IN,:ENDDATE_IN,:REMARK_IN,:DJCODE_IN,:MEND_TYPE_IN,:RET)}");
            cstmt.setString("APPLYID_IN", APPLYID_IN);
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("PLANTNAME_IN", PLANTNAME_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
            cstmt.setString("DEPARTNAME_IN", DEPARTNAME_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.setString("BILLCODE_IN", BILLCODE_IN);
            cstmt.setString("DJ_UQ_CODE_IN", DJ_UQ_CODE_IN);
            cstmt.setString("DJNAME_IN", DJNAME_IN);
            cstmt.setString("CONTEXT_IN", CONTEXT_IN);
            cstmt.setDate("BEGINDATE_IN", sqlDate1);
            cstmt.setDate("ENDDATE_IN", sqlDate2);
            cstmt.setString("REMARK_IN", REMARK_IN);
            cstmt.setString("DJCODE_IN", DJCODE_IN);
            cstmt.setString("MEND_TYPE_IN", MEND_TYPE_IN);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();


            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ401_APPLYUPDATE");

        return result;
    }

    //PM_15010402
    //厂矿工单申请查询
    public HashMap PRO_DJ402_APPLYLIST(String PLANTCODE_IN, String DEPARTCODE_IN, String DJCODE_IN, String DJNAME_IN,
                                       String CONTEXT_IN, String BEGINDATE_IN, String ENDDATE_IN, String TOPLANTCODE_IN, String CONFIRM_FLAG_IN)
            throws SQLException {
        logger.info("begin PRO_DJ402_APPLYLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ402_APPLYLIST" + "(:PLANTCODE_IN,:DEPARTCODE_IN,:DJCODE_IN,:DJNAME_IN," +
                    ":CONTEXT_IN,:BEGINDATE_IN,:ENDDATE_IN,:TOPLANTCODE_IN,:CONFIRM_FLAG_IN,:RET)}");

            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
            cstmt.setString("DJCODE_IN", DJCODE_IN);
            cstmt.setString("DJNAME_IN", DJNAME_IN);
            cstmt.setString("CONTEXT_IN", CONTEXT_IN);
            cstmt.setDate("BEGINDATE_IN", Date.valueOf(BEGINDATE_IN));
            cstmt.setDate("ENDDATE_IN", Date.valueOf(ENDDATE_IN));
            cstmt.setString("TOPLANTCODE_IN", TOPLANTCODE_IN);
            cstmt.setString("CONFIRM_FLAG_IN", CONFIRM_FLAG_IN);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ402_APPLYLIST");

        return result;
    }

    //检修工单申请查询
    public HashMap GET_WAITAPPLYLIST(String PLANTCODE_IN, String DEPARTCODE_IN, String USERCODE_IN)
            throws SQLException {
        logger.info("begin GET_WAITAPPLYLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ405.GET_WAITAPPLYLIST" + "(:PLANTCODE_IN,:DEPARTCODE_IN,:USERCODE_IN,:RET)}");

            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GET_WAITAPPLYLIST");

        return result;
    }

    //确认并送达检修单位
    public HashMap CONFIRM_APPLY(String APPLYID_IN, String A_USERID)
            throws SQLException {
        logger.info("begin CONFIRM_APPLY");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ405.CONFIRM_APPLY" + "(:APPLYID_IN,:A_USERID,:RET,:RET_MSG)}");

            cstmt.setString("APPLYID_IN", APPLYID_IN);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end CONFIRM_APPLY");

        return result;
    }

    //退回到申请部门
    public HashMap BACK_APPLY(String APPLYID_IN, String A_USERID)
            throws SQLException {
        logger.info("begin BACK_APPLY");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ405.BACK_APPLY" + "(:APPLYID_IN,:A_USERID,:RET,:RET_MSG)}");

            cstmt.setString("APPLYID_IN", APPLYID_IN);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BACK_APPLY");

        return result;
    }

    //查询检修单位
    public HashMap PRO_DJ701_SELECT(String MENDDEPT_NAME_IN, String USERNAME_IN) throws SQLException {
        logger.info("begin PRO_DJ701_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ701_SELECT" + "(:MENDDEPT_NAME_IN,:USERNAME_IN,:V_CURSOR)}");

            cstmt.setString("MENDDEPT_NAME_IN", MENDDEPT_NAME_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
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
        logger.info("end PRO_DJ701_SELECT");

        return result;
    }

    //修改检修单位
    public HashMap PRO_DJ701_UPDATE1(String V_MENDDEPTCODE, String V_MENDDEPTNAME, String V_USERID, String V_USERNAME)
            throws SQLException {
        logger.info("begin PRO_DJ701_UPDATE1");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ701_UPDATE1" + "(:V_MENDDEPTCODE,:V_MENDDEPTNAME,:V_USERID,:V_USERNAME,:RET)}");

            cstmt.setString("V_MENDDEPTCODE", V_MENDDEPTCODE);
            cstmt.setString("V_MENDDEPTNAME", V_MENDDEPTNAME);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ701_UPDATE1");

        return result;
    }

    //润滑油脂查询
    public HashMap PM_OIL_STANDARD_SEL(String V_V_EQUCODE) throws SQLException {
        logger.info("begin PM_OIL_STANDARD_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_OIL_STANDARD_SEL" + "(:V_V_EQUCODE,:V_CURSOR)}");

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
        logger.info("end PM_OIL_STANDARD_SEL");

        return result;
    }

    //检修单位配置
    //删除检修单位
    public HashMap PRO_DJ701_DELETE(String V_MENDDEPTCODE)
            throws SQLException {
        logger.info("begin PRO_DJ701_DELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ701_DELETE" + "(:V_MENDDEPTCODE,:RET)}");

            cstmt.setString("V_MENDDEPTCODE", V_MENDDEPTCODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ701_DELETE");

        return result;
    }

    //新增检修单位
    public HashMap PRO_DJ701_INSERT(String V_MENDDEPTNAME, String V_MENDDEPTCODE, String V_MENDDEPTTYPE,
                                    String V_SUPERCODE, String V_USERID, String V_USERNAME)
            throws SQLException {
        logger.info("begin PRO_DJ701_INSERT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ701_INSERT" + "(:V_MENDDEPTNAME,:V_MENDDEPTCODE,:V_MENDDEPTTYPE,:V_SUPERCODE,:V_USERID,:V_USERNAME,:RET)}");

            cstmt.setString("V_MENDDEPTNAME", V_MENDDEPTNAME);
            cstmt.setString("V_MENDDEPTCODE", V_MENDDEPTCODE);
            cstmt.setString("V_MENDDEPTTYPE", V_MENDDEPTTYPE);
            cstmt.setString("V_SUPERCODE", V_SUPERCODE);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ701_INSERT");

        return result;
    }

    //查询检修单位人员
    public HashMap PRO_DJ701_VIEW(String V_MENDDEPTCODE) throws SQLException {
        logger.info("begin PRO_DJ701_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ701_VIEW" + "(:V_MENDDEPTCODE,:V_CURSOR)}");

            cstmt.setString("V_MENDDEPTCODE", V_MENDDEPTCODE);
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
        logger.info("end PRO_DJ701_VIEW");

        return result;
    }

    //删除检修人员
    public HashMap PRO_DJ701_PERSONDEL(String V_USERID)
            throws SQLException {
        logger.info("begin PRO_DJ701_PERSONDEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ701_PERSONDEL" + "(:V_USERID,:RET)}");

            cstmt.setString("V_USERID", V_USERID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ701_PERSONDEL");

        return result;
    }

    //新增检修人员
    public HashMap PRO_DJ701_PERINSERT(String MENDDEPT_CODE, String V_USERID, String V_USERNAME)
            throws SQLException {
        logger.info("begin PRO_DJ701_PERINSERT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ701_PERINSERT" + "(:MENDDEPT_CODE,:V_USERID,:V_USERNAME,:RET)}");

            cstmt.setString("MENDDEPT_CODE", MENDDEPT_CODE);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ701_PERINSERT");

        return result;
    }

    //检修状态
    public HashMap PRO_DJ702_DROPLIST() throws SQLException {
        logger.info("begin PRO_DJ702_DROPLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ702_DROPLIST" + "(:V_CURSOR)}");

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
        logger.info("end PRO_DJ702_DROPLIST");

        return result;
    }

    //检修单位查询
    public HashMap PRO_DJ702_JXDWDROPLIST(String V_USERID) throws SQLException {
        logger.info("begin PRO_DJ702_JXDWDROPLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ702_JXDWDROPLIST" + "(:V_USERID,:V_CURSOR)}");

            cstmt.setString("V_USERID", V_USERID);
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
        logger.info("end PRO_DJ702_JXDWDROPLIST");

        return result;
    }

    //查询工单状态
    public HashMap PRO_DJ702_SELECT(String V_ORDERSTS) throws SQLException {
        logger.info("begin PRO_DJ702_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ702_SELECT" + "(:V_ORDERSTS,:V_CURSOR)}");

            cstmt.setString("V_USERID", V_ORDERSTS);
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
        logger.info("end PRO_DJ702_SELECT");

        return result;
    }

    //删除工单状态
    public HashMap PRO_DJ702_DELETE(String V_POWERID, String V_ID)
            throws SQLException {
        logger.info("begin PRO_DJ702_DELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ702_DELETE" + "(:V_POWERID,:V_ID,:RET)}");

            cstmt.setString("V_POWERID", V_POWERID);
            cstmt.setString("V_ID", V_ID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ702_DELETE");

        return result;
    }

    //新增检修状态人员
    public HashMap PRO_DJ702_INSERT(String V_ORDERSTS, String V_USERID, String V_USERNAME, String V_STS, String V_MENDDEPTCODE)
            throws SQLException {
        logger.info("begin PRO_DJ702_INSERT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ702_INSERT" + "(:V_ORDERSTS,:V_USERID,:V_USERNAME,:V_STS,:V_MENDDEPTCODE,:RET)}");

            cstmt.setString("V_ORDERSTS", V_ORDERSTS);
            cstmt.setString("V_USERID", V_USERID);
            cstmt.setString("V_USERNAME", V_USERNAME);
            cstmt.setString("V_STS", V_STS);
            cstmt.setString("V_MENDDEPTCODE", V_MENDDEPTCODE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ702_INSERT");

        return result;
    }

    //查询检修状态
    public HashMap PRO_DJ703_SELECT(String V_ORDERDESC) throws SQLException {
        logger.info("begin PRO_DJ702_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ703_SELECT" + "(:V_ORDERDESC,:V_CURSOR)}");

            cstmt.setString("V_ORDERDESC", V_ORDERDESC);
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
        logger.info("end PRO_DJ703_SELECT");

        return result;
    }

    //删除检修状态
    public HashMap PRO_DJ703_DELETE(String V_ORDERSTS)
            throws SQLException {
        logger.info("begin PRO_DJ703_DELETE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ703_DELETE" + "(:V_ORDERSTS,:RET)}");

            cstmt.setString("V_ORDERSTS", V_ORDERSTS);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ703_DELETE");

        return result;
    }

    //选择状态
    public HashMap PRO_DJ703_UPDATEFLAG(String V_ORDERSTS, Integer V_FLAG)
            throws SQLException {
        logger.info("begin PRO_DJ703_UPDATEFLAG");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ703_UPDATEFLAG" + "(:V_ORDERSTS,:V_FLAG,:RET)}");

            cstmt.setString("V_ORDERSTS", V_ORDERSTS);
            cstmt.setInt("V_FLAG", V_FLAG);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ703_UPDATEFLAG");

        return result;
    }

    //新增状态
    public HashMap PRO_DJ703_INSERT(String V_ORDERSTS, String V_ORDERDESC, String V_USERFLAG, String V_NEXTSTS)
            throws SQLException {
        logger.info("begin PRO_DJ703_INSERT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ703_INSERT" + "(:V_ORDERSTS,:V_ORDERDESC,:V_USERFLAG,:V_NEXTSTS,:RET)}");

            cstmt.setString("V_ORDERSTS", V_ORDERSTS);
            cstmt.setString("V_ORDERDESC", V_ORDERDESC);
            cstmt.setString("V_USERFLAG", V_USERFLAG);
            cstmt.setString("V_NEXTSTS", V_NEXTSTS);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ703_INSERT");

        return result;
    }

    //查询物资分类
    public HashMap GETITYPELIST() throws SQLException {
        logger.info("begin GETITYPELIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ704.GETITYPELIST" + "(:RET)}");
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
        logger.info("end GETITYPELIST");

        return result;
    }

    //删除物资分类
    public HashMap DELETEITYPE(String A_TYPECODE, String A_USERID, String A_USERNAME)
            throws SQLException {
        logger.info("begin DELETEITYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ704.DELETEITYPE" + "(:A_TYPECODE,:A_USERID,:A_USERNAME,:RET,:RET_MSG)}");

            cstmt.setString("A_TYPECODE", A_TYPECODE);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));
            result.put("RET_MSG", cstmt.getString("RET_MSG"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DELETEITYPE");

        return result;
    }

    //新增物资分类
    public HashMap ADDITYPE(String A_TYPECODE, String A_TYPENAME, String A_STATUS, String A_TYPE_PREFIX, String A_TYPE_UNIT, String A_REC_STATUS,
                            String A_USERID, String A_USERNAME, Integer A_INDEX)
            throws SQLException {
        logger.info("begin ADDITYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ704.ADDITYPE" + "(:A_TYPECODE,:A_TYPENAME,:A_STATUS,:A_TYPE_PREFIX,:A_TYPE_UNIT" +
                    ",:A_REC_STATUS,:A_USERID,:A_USERNAME,:A_INDEX,:RET,:RET_MSG)}");

            cstmt.setString("A_TYPECODE", A_TYPECODE);
            cstmt.setString("A_TYPENAME", A_TYPENAME);
            cstmt.setString("A_STATUS", A_STATUS);
            cstmt.setString("A_TYPE_PREFIX", A_TYPE_PREFIX);
            cstmt.setString("A_TYPE_UNIT", A_TYPE_UNIT);
            cstmt.setString("A_REC_STATUS", A_REC_STATUS);

            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.setInt("A_INDEX", A_INDEX);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));
            result.put("RET_MSG", cstmt.getString("RET_MSG"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end ADDITYPE");

        return result;
    }

    //修改物资分类
    public HashMap UPDTEITYPE(String A_TYPECODE, String A_TYPENAME, String A_STATUS, String A_TYPE_PREFIX, String A_TYPE_UNIT, String A_REC_STATUS,
                              String A_USERID, String A_USERNAME, Integer A_INDEX)
            throws SQLException {
        logger.info("begin UPDTEITYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ704.UPDTEITYPE" + "(:A_TYPECODE,:A_TYPENAME,:A_STATUS,:A_TYPE_PREFIX,:A_TYPE_UNIT" +
                    ",:A_REC_STATUS,:A_USERID,:A_USERNAME,:A_INDEX,:RET,:RET_MSG)}");

            cstmt.setString("A_TYPECODE", A_TYPECODE);
            cstmt.setString("A_TYPENAME", A_TYPENAME);
            cstmt.setString("A_STATUS", A_STATUS);
            cstmt.setString("A_TYPE_PREFIX", A_TYPE_PREFIX);
            cstmt.setString("A_TYPE_UNIT", A_TYPE_UNIT);
            cstmt.setString("A_REC_STATUS", A_REC_STATUS);

            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.setInt("A_INDEX", A_INDEX);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));
            result.put("RET_MSG", cstmt.getString("RET_MSG"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end UPDTEITYPE");

        return result;
    }

    //查询入库
    public HashMap GETINPUT(String A_PLANTCODE, String A_DEPARTCODE, String A_ITYPE, String A_STORE_DESC, String A_MATERIALCODE, String A_MATERIALNAME,
                            String A_ETALON, String A_LOC_DESC, String A_USERID) throws SQLException {
        logger.info("begin GETINPUT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1001.GETINPUT" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_ITYPE,:A_STORE_DESC,:A_MATERIALCODE,:A_MATERIALNAME,:A_ETALON,:A_LOC_DESC,:A_USERID,:RET)}");

            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_STORE_DESC", A_STORE_DESC);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);

            cstmt.setString("A_ETALON", A_ETALON);
            cstmt.setString("A_LOC_DESC", A_LOC_DESC);
            cstmt.setString("A_USERID", A_USERID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETINPUT");

        return result;
    }

    //新增入库
    public HashMap SAVEINPUT(String A_KCID, String A_MATERIALCODE, String A_MATERIALNAME, String A_ETALON, String A_UNIT, String A_PRICE,
                             String A_AMOUNT, String A_STOREDESC, String A_LOCDESC, String A_ITYPE, String A_PLANTCODE, String A_DEPARTCODE, String A_DEPARTNAME,
                             String A_USERID, String A_USERNAME, String A_MPID)
            throws SQLException {
        logger.info("begin SAVEINPUT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1001.SAVEINPUT" + "(:A_KCID,:A_MATERIALCODE,:A_MATERIALNAME,:A_ETALON,:A_UNIT" +
                    ",:A_PRICE,:A_AMOUNT,:A_STOREDESC,:A_LOCDESC,:A_ITYPE,:A_PLANTCODE,:A_DEPARTCODE,:A_DEPARTNAME,:A_USERID,:A_USERNAME,:A_MPID,:RET,:RET_MSG)}");

            cstmt.setString("A_KCID", A_KCID);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_ETALON", A_ETALON);
            cstmt.setString("A_UNIT", A_UNIT);
            cstmt.setString("A_PRICE", A_PRICE);
            cstmt.setString("A_AMOUNT", A_AMOUNT);
            cstmt.setString("A_STOREDESC", A_STOREDESC);
            cstmt.setString("A_LOCDESC", A_LOCDESC);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_DEPARTNAME", A_DEPARTNAME);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);
            cstmt.setString("A_MPID", A_MPID);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);

            cstmt.execute();

            result.put("RET", cstmt.getString("RET"));
            result.put("RET_MSG", cstmt.getString("RET_MSG"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAVEINPUT");

        return result;
    }

    //删除储备物资
    public HashMap DELETEINPUT(String KCID) throws SQLException {

        logger.info("begin DELETEINPUT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_DJ1001.DELETEINPUT" + "(:KCID,:RET_MSG,:RET)}");
            cstmt.setString("KCID", KCID);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DELETEINPUT");
        return result;
    }

    //查询计划
    public HashMap GETMP(Integer A_YEAR, Integer A_MONTH, String A_PLANTCODE, String A_DEPARTCODE, String A_CODE, String A_NAME) throws SQLException {
        logger.info("begin GETMP");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1001.GETMP" + "(:A_YEAR,:A_MONTH,:A_PLANTCODE,:A_DEPARTCODE,:A_CODE,:A_NAME,:RET)}");

            cstmt.setInt("A_YEAR", A_YEAR);
            cstmt.setInt("A_MONTH", A_MONTH);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_CODE", A_CODE);
            cstmt.setString("A_NAME", A_NAME);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETMP");

        return result;
    }

    //关联查询
    public HashMap GETINPUTLIST(Date A_BEGINDATE, Date A_ENDDATE, String A_PLANTCODE, String A_DEPARTCODE, String A_ITYPE, String A_STORE_DESC,
                                String A_MATERIALCODE, String A_MATERIALNAME, String A_ETALON, String A_LOC_DESC, String A_USERID) throws SQLException {
        logger.info("begin GETINPUTLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1004.GETINPUTLIST" + "(:A_BEGINDATE,:A_ENDDATE,:A_PLANTCODE,:A_DEPARTCODE,:A_ITYPE,:A_STORE_DESC," +
                    ":A_MATERIALCODE,:A_MATERIALNAME,:A_ETALON,:A_LOC_DESC,:A_USERID,:RET)}");

            cstmt.setDate("A_BEGINDATE", A_BEGINDATE);
            cstmt.setDate("A_ENDDATE", A_ENDDATE);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_STORE_DESC", A_STORE_DESC);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_ETALON", A_ETALON);
            cstmt.setString("A_LOC_DESC", A_LOC_DESC);
            cstmt.setString("A_USERID", A_USERID);


            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETINPUTLIST");

        return result;
    }

    //物资关联
    public HashMap MPTOKC(String A_MPID, String A_KCID, String A_REMARK) throws SQLException {
        logger.info("begin MPTOKC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1001.MPTOKC" + "(:A_MPID,:A_KCID,:A_REMARK,:RET,:RET_MSG)}");

            cstmt.setString("A_MPID", A_MPID);
            cstmt.setString("A_KCID", A_KCID);
            cstmt.setString("A_REMARK", A_REMARK);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end MPTOKC");

        return result;
    }

    //确认入库
    public HashMap CONFIRMINPUT(String A_KCID) throws SQLException {
        logger.info("begin CONFIRMINPUT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1001.CONFIRMINPUT" + "(:A_KCID,:RET,:RET_MSG)}");

            cstmt.setString("A_KCID", A_KCID);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end CONFIRMINPUT");

        return result;
    }

    //根据物资分类查询信息
    public HashMap MATTYPE_UNITANDPREFIX(String A_ITYPE) throws SQLException {
        logger.info("begin MATTYPE_UNITANDPREFIX");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1001.MATTYPE_UNITANDPREFIX" + "(:A_ITYPE,:RET_PREFIX,:RET_UNIT)}");

            cstmt.setString("A_ITYPE", A_ITYPE);

            cstmt.registerOutParameter("RET_PREFIX", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_UNIT", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_PREFIX", cstmt.getString("RET_PREFIX"));
            result.put("RET_UNIT", cstmt.getString("RET_UNIT"));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end MATTYPE_UNITANDPREFIX");

        return result;
    }

    //查询库存列表
    public HashMap GETKC(String A_PLANTCODE, String A_DEPARTCODE, String A_ITYPE, String A_STORE_DESC,
                         String A_MATERIALCODE, String A_MATERIALNAME, String A_ETALON, String A_LOC_DESC, String A_USERID) throws SQLException {
        logger.info("begin GETKC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1002.GETKC" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_ITYPE,:A_STORE_DESC," +
                    ":A_MATERIALCODE,:A_MATERIALNAME,:A_ETALON,:A_LOC_DESC,:A_USERID,:RET)}");

            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_STORE_DESC", A_STORE_DESC);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_ETALON", A_ETALON);
            cstmt.setString("A_LOC_DESC", A_LOC_DESC);
            cstmt.setString("A_USERID", A_USERID);


            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETKC");

        return result;
    }

    //查看消耗明细
    public HashMap GETCONSUMEDETAIL(String A_KCID) throws SQLException {
        logger.info("begin GETCONSUMEDETAIL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1002.GETCONSUMEDETAIL" + "(:A_KCID,:RET)}");

            cstmt.setString("A_KCID", A_KCID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETCONSUMEDETAIL");

        return result;
    }

    //查询消耗物资
    public HashMap DJ03_GETCONSUME(Date A_BEGINDATE, Date A_ENDDATE, String A_ORDERID, String A_PLANTCODE, String A_DEPARTCODE, String A_ITYPE,
                                   String A_STOREDESC, String A_MATERIALCODE, String A_MATERIALNAME, String A_ETALON, String A_LCODESC) throws SQLException {
        logger.info("begin DJ03_GETCONSUME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1003.GETCONSUME" + "(:A_BEGINDATE,:A_ENDDATE,:A_ORDERID,:A_PLANTCODE,:A_DEPARTCODE,:A_ITYPE,:A_STOREDESC," +
                    ":A_MATERIALCODE,:A_MATERIALNAME,:A_ETALON,:A_LCODESC,:RET)}");

            cstmt.setDate("A_BEGINDATE", A_BEGINDATE);
            cstmt.setDate("A_ENDDATE", A_ENDDATE);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_STOREDESC", A_STOREDESC);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_ETALON", A_ETALON);
            cstmt.setString("A_LCODESC", A_LCODESC);


            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DJ03_GETCONSUME");

        return result;
    }

    //查询检修单消耗物料
    public HashMap GETORDERCONSUME(String A_ORDERID) throws SQLException {
        logger.info("begin GETORDERCONSUME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1003.GETORDERCONSUME" + "(:A_ORDERID,:RET)}");

            cstmt.setString("A_ORDERID", A_ORDERID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETORDERCONSUME");

        return result;
    }

    //获取单据信息
    public HashMap PRO_DJ601_ORDERMESSAGE(String ORDERID_in) throws SQLException {
        logger.info("begin PRO_DJ601_ORDERMESSAGE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_DJ601_ORDERMESSAGE" + "(:ORDERID_in,:RET)}");

            cstmt.setString("ORDERID_in", ORDERID_in);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_DJ601_ORDERMESSAGE");

        return result;
    }

    //获取收发存
    public HashMap GETSFC(Date A_BEGINDATE, Date A_ENDDATE, String A_PLANTCODE, String A_DEPARTCODE,
                          String A_ITYPE, String A_CODE, String A_NAME) throws SQLException {
        logger.info("begin GETSFC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1005.GETSFC" + "(:A_BEGINDATE,:A_ENDDATE,:A_PLANTCODE,:A_DEPARTCODE,:A_ITYPE,:A_CODE,:A_NAME,:RET)}");

            cstmt.setDate("A_BEGINDATE", A_BEGINDATE);
            cstmt.setDate("A_ENDDATE", A_ENDDATE);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_CODE", A_CODE);
            cstmt.setString("A_NAME", A_NAME);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETSFC");

        return result;
    }

    //查看消耗待回收
    public HashMap DJ06_GETCONSUME(Date A_BEGINDATE, Date A_ENDDATE, String A_ORDERID, String A_PLANTCODE, String A_DEPARTCODE,
                                   String A_ITYPE, String A_STOREDESC, String A_MATERIALCODE, String A_MATERIALNAME, String A_ETALON, String A_LCODESC) throws SQLException {
        logger.info("begin DJ06_GETCONSUME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1006.GETCONSUME" + "(:A_BEGINDATE,:A_ENDDATE,:A_ORDERID,:A_PLANTCODE,:A_DEPARTCODE," +
                    ":A_ITYPE,:A_STOREDESC,:A_MATERIALCODE,:A_MATERIALNAME,:A_ETALON,:A_LCODESC,:RET)}");

            cstmt.setDate("A_BEGINDATE", A_BEGINDATE);
            cstmt.setDate("A_ENDDATE", A_ENDDATE);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_STOREDESC", A_STOREDESC);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_ETALON", A_ETALON);
            cstmt.setString("A_LCODESC", A_LCODESC);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DJ06_GETCONSUME");

        return result;
    }

    //修改回收数量
    public HashMap SAVE_RECAMOUNT(String A_ID, String A_REC_AMOUNT, String A_USERID, String A_USERNAME) throws SQLException {
        logger.info("begin SAVE_RECAMOUNT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1006.SAVE_RECAMOUNT" + "(:A_ID,:A_REC_AMOUNT,:A_USERID,:A_USERNAME,:RET_MSG,:RET)}");

            cstmt.setString("A_ID", A_ID);
            cstmt.setString("A_REC_AMOUNT", A_REC_AMOUNT);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("A_USERNAME", A_USERNAME);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SAVE_RECAMOUNT");

        return result;
    }

    //确认回收
    public HashMap CONFIRM_REC(String A_ID, String A_USERID) throws SQLException {
        logger.info("begin CONFIRM_REC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1006.CONFIRM_REC" + "(:A_ID,:A_USERID,:RET_MSG,:RET)}");

            cstmt.setString("A_ID", A_ID);
            cstmt.setString("A_USERID", A_USERID);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end CONFIRM_REC");

        return result;
    }

    //获取消耗待回收工单
    public HashMap GETCONSUMEBYORDER(Date A_BEGINDATE, Date A_ENDDATE, String A_ORDERID, String A_PLANTCODE, String A_DEPARTCODE) throws SQLException {
        logger.info("begin GETCONSUMEBYORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1006.GETCONSUMEBYORDER" + "(:A_BEGINDATE,:A_ENDDATE,:A_ORDERID,:A_PLANTCODE,:A_DEPARTCODE,:RET)}");

            cstmt.setDate("A_BEGINDATE", A_BEGINDATE);
            cstmt.setDate("A_ENDDATE", A_ENDDATE);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETCONSUMEBYORDER");

        return result;
    }

    //根据单号查询消耗待回收
    public HashMap GETORDERMATCONSUME(String A_ORDERID) throws SQLException {
        logger.info("begin GETORDERMATCONSUME");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1006.GETORDERMATCONSUME" + "(:A_ORDERID,:RET)}");

            cstmt.setString("A_ORDERID", A_ORDERID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETORDERMATCONSUME");

        return result;
    }

    //修改库房描述
    public HashMap SETSTOREDESC(String A_ID, String A_NEW_STOREDESC) throws SQLException {
        logger.info("begin SETSTOREDESC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1002.SETSTOREDESC" + "(:A_ID,:A_NEW_STOREDESC,:RET_MSG,:RET)}");

            cstmt.setString("A_ID", A_ID);
            cstmt.setString("A_NEW_STOREDESC", A_NEW_STOREDESC);

            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET_MSG", cstmt.getString("RET_MSG"));
            result.put("RET", cstmt.getString("RET"));


        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end SETSTOREDESC");

        return result;
    }

    //获取消耗待回收工单
    public HashMap GETCONSUMESELECT(Date A_BEGINDATE, Date A_ENDDATE, String A_ORDERID, String A_PLANTCODE, String A_DEPARTCODE,
                                    String A_ITYPE, String A_STOREDESC, String A_MATERIALCODE, String A_MATERIALNAME, String A_ETALON, String A_LCODESC) throws SQLException {
        logger.info("begin GETCONSUMESELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PG_DJ1006.GETCONSUMESELECT" + "(:A_BEGINDATE,:A_ENDDATE,:A_ORDERID,:A_PLANTCODE,:A_DEPARTCODE," +
                    ":A_ITYPE,:A_STOREDESC,:A_MATERIALCODE,:A_MATERIALNAME,:A_ETALON,:A_LCODESC,:RET)}");

            cstmt.setDate("A_BEGINDATE", A_BEGINDATE);
            cstmt.setDate("A_ENDDATE", A_ENDDATE);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_ITYPE", A_ITYPE);
            cstmt.setString("A_STOREDESC", A_STOREDESC);
            cstmt.setString("A_MATERIALCODE", A_MATERIALCODE);
            cstmt.setString("A_MATERIALNAME", A_MATERIALNAME);
            cstmt.setString("A_ETALON", A_ETALON);
            cstmt.setString("A_LCODESC", A_LCODESC);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end GETCONSUMESELECT");

        return result;
    }

}
