package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


/**
 * Created by yjn on 2017/12/12.
 * 电网试验基础信息管理service
 */
@Service
public class YjnService {
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

    //试验项目类型查询
    public HashMap PRO_SY101_ITEMTYPELIST() throws SQLException {
        logger.info("begin PRO_SY101_ITEMTYPELIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SY101_ITEMTYPELIST" + "(:RET)}");
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
        logger.info("end PRO_SY101_ITEMTYPELIST");

        return result;
    }

    //增加试验项目类型
    public HashMap PRO_SY101_ADDITEMTYPE(String ITEMTYPE, String ITEMTYPE_DESC) throws SQLException {

        logger.info("begin PRO_SY101_ADDITEMTYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY101_ADDITEMTYPE" + "(:ITEMTYPECODE_IN,:ITEMTYPEDESC_IN,:RET,:RET_MSG)}");
            cstmt.setString("ITEMTYPECODE_IN", ITEMTYPE);
            cstmt.setString("ITEMTYPEDESC_IN", ITEMTYPE_DESC);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY101_ADDITEMTYPE");
        return result;
    }

    //修改试验项目类型
    public HashMap PRO_SY101_UPDATEITEMTYPE(String ITEMTYPE, String ITEMTYPE_DESC) throws SQLException {

        logger.info("begin PRO_SY101_UPDATEITEMTYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY101_UPDATEITEMTYPE" + "(:ITEMTYPECODE_IN,:ITEMTYPEDESC_IN,:RET,:RET_MSG)}");
            cstmt.setString("ITEMTYPECODE_IN", ITEMTYPE);
            cstmt.setString("ITEMTYPEDESC_IN", ITEMTYPE_DESC);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY101_UPDATEITEMTYPE");
        return result;
    }

    //删除试验项目类型
    public HashMap PRO_SY101_DELETEITEMTYPE(String ITEMTYPE) throws SQLException {

        logger.info("begin PRO_SY101_DELETEITEMTYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY101_DELETEITEMTYPE" + "(:ITEMTYPECODE_IN,:RET,:RET_MSG)}");
            cstmt.setString("ITEMTYPECODE_IN", ITEMTYPE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY101_DELETEITEMTYPE");
        return result;
    }

    //启用试验项目类型
    public HashMap PRO_SY101_STARTITEMTYPE(String ITEMTYPE) throws SQLException {

        logger.info("begin PRO_SY101_STARTITEMTYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY101_STARTITEMTYPE" + "(:ITEMTYPECODE_IN,:RET)}");
            cstmt.setString("ITEMTYPECODE_IN", ITEMTYPE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY101_STARTITEMTYPE");
        return result;
    }

    //停用试验项目类型
    public HashMap PRO_SY101_STOPITEMTYPE(String ITEMTYPE) throws SQLException {

        logger.info("begin PRO_SY101_STOPITEMTYPE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY101_STOPITEMTYPE" + "(:ITEMTYPECODE_IN,:RET)}");
            cstmt.setString("ITEMTYPECODE_IN", ITEMTYPE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY101_STOPITEMTYPE");
        return result;
    }

    //查询厂矿列表
    public HashMap PRO_MM_PLANT() throws SQLException {

        logger.info("begin PRO_MM_PLANT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call NAMM.PRO_MM_PLANT" + "(:RET)}");
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
        logger.info("end PRO_MM_PLANT");
        return result;
    }

    //查询厂矿部门列表
    public HashMap PRO_MM_DEPART(String DEPARTCODE) throws SQLException {

        logger.info("begin PRO_MM_DEPART");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call NAMM.PRO_MM_DEPART" + "(:A_PLANTCODE,:RET)}");
            cstmt.setString("A_PLANTCODE", DEPARTCODE);
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
        logger.info("end PRO_MM_DEPART");
        return result;
    }

    //查询试验地点
    public HashMap PRO_SY103_LOCLIST(String PLANTCODE_IN, String DEPARTCODE_IN) throws SQLException {

        logger.info("begin PRO_SY103_LOCLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY103_LOCLIST" + "(:PLANTCODE_IN,:DEPARTCODE_IN,:RET)}");
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
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
        logger.info("end PRO_SY103_LOCLIST");
        return result;
    }

    //新增试验地点
    public HashMap PRO_SY103_ADDLOC(String LOCCODE_IN, String LOCDESC_IN, String PLANTCODE_IN, String PLANTNAME_IN,
                                    String DEPARTCODE_IN, String DEPARTNAME_IN, String USERCODE_IN, String USERNAME_IN) throws SQLException {

        logger.info("begin PRO_SY103_ADDLOC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY103_ADDLOC" + "(:LOCCODE_IN,:LOCDESC_IN,:PLANTCODE_IN,:PLANTNAME_IN,\n" +
                    ":DEPARTCODE_IN,:DEPARTNAME_IN,:USERCODE_IN,:USERNAME_IN,:RET,:RET_MSG)}");
            cstmt.setString("LOCCODE_IN", LOCCODE_IN);
            cstmt.setString("LOCDESC_IN", LOCDESC_IN);
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("PLANTNAME_IN", PLANTNAME_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
            cstmt.setString("DEPARTNAME_IN", DEPARTNAME_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY103_ADDLOC");
        return result;
    }

    //修改试验地点
    public HashMap PRO_SY103_UPDATELOC(String LOCCODE_IN, String LOCDESC_IN, String PLANTCODE_IN, String PLANTNAME_IN,
                                       String DEPARTCODE_IN, String DEPARTNAME_IN, String USERCODE_IN, String USERNAME_IN) throws SQLException {

        logger.info("begin PRO_SY103_UPDATELOC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY103_UPDATELOC" + "(:LOCCODE_IN,:LOCDESC_IN,:PLANTCODE_IN,:PLANTNAME_IN,\n" +
                    ":DEPARTCODE_IN,:DEPARTNAME_IN,:USERCODE_IN,:USERNAME_IN,:RET,:RET_MSG)}");
            cstmt.setString("LOCCODE_IN", LOCCODE_IN);
            cstmt.setString("LOCDESC_IN", LOCDESC_IN);
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
            cstmt.setString("PLANTNAME_IN", PLANTNAME_IN);
            cstmt.setString("DEPARTCODE_IN", DEPARTCODE_IN);
            cstmt.setString("DEPARTNAME_IN", DEPARTNAME_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY103_UPDATELOC");
        return result;
    }

    //删除试验地点
    public HashMap PRO_SY103_DELETELOC(String LOCCODE_IN) throws SQLException {

        logger.info("begin PRO_SY103_DELETELOC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY103_DELETELOC" + "(:LOCCODE_IN,:RET,:RET_MSG)}");
            cstmt.setString("LOCCODE_IN", LOCCODE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY103_DELETELOC");
        return result;
    }

    //停用试验地点
    public HashMap PRO_SY103_STOPLOC(String LOCCODE_IN) throws SQLException {

        logger.info("begin PRO_SY103_STOPLOC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY103_STOPLOC" + "(:LOCCODE_IN,:RET)}");
            cstmt.setString("LOCCODE_IN", LOCCODE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY103_STOPLOC");
        return result;
    }

    //启用试验地点
    public HashMap PRO_SY103_STARTLOC(String LOCCODE_IN) throws SQLException {

        logger.info("begin PRO_SY103_STARTLOC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY103_STARTLOC" + "(:LOCCODE_IN,:RET)}");
            cstmt.setString("LOCCODE_IN", LOCCODE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY103_STARTLOC");
        return result;
    }

    //查询试验数据项目
    public HashMap PRO_SY102_ITEMLIST() throws SQLException {

        logger.info("begin PRO_SY102_ITEMLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY102_ITEMLIST" + "(:RET)}");
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
        logger.info("end PRO_SY102_ITEMLIST");
        return result;
    }

    //查询试验数据项目类型
    public HashMap PRO_SY102_ITEMTYPELIST() throws SQLException {

        logger.info("begin PRO_SY102_ITEMTYPELIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY102_ITEMTYPELIST" + "(:RET)}");
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
        logger.info("end PRO_SY102_ITEMTYPELIST");
        return result;
    }

    //新增试验数据项目
    public HashMap PRO_SY102_ADDITEM(String ITEMCODE_IN, String ITEMNAME_IN, String TABLENAME_IN, String URL_IN,
                                     String OPURL_IN, String ITEMTYPECODE_IN, String USERCODE_IN, String USERNAME_IN) throws SQLException {

        logger.info("begin PRO_SY102_ADDITEM");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY102_ADDITEM" + "(:ITEMCODE_IN,:ITEMNAME_IN,:TABLENAME_IN,:URL_IN,\n" +
                    ":OPURL_IN,:ITEMTYPECODE_IN,:USERCODE_IN,:USERNAME_IN,:RET,:RET_MSG)}");
            cstmt.setString("ITEMCODE_IN", ITEMCODE_IN);
            cstmt.setString("ITEMNAME_IN", ITEMNAME_IN);
            cstmt.setString("TABLENAME_IN", TABLENAME_IN);
            cstmt.setString("URL_IN", URL_IN);
            cstmt.setString("OPURL_IN", OPURL_IN);
            cstmt.setString("ITEMTYPECODE_IN", ITEMTYPECODE_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY102_ADDITEM");
        return result;
    }

    //修改试验数据项目
    public HashMap PRO_SY102_UPDATEITEM(String ITEMCODE_IN, String ITEMNAME_IN, String TABLENAME_IN, String URL_IN,
                                        String OPURL_IN, String ITEMTYPECODE_IN, String USERCODE_IN, String USERNAME_IN) throws SQLException {

        logger.info("begin PRO_SY102_UPDATEITEM");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY102_UPDATEITEM" + "(:ITEMCODE_IN,:ITEMNAME_IN,:TABLENAME_IN,:URL_IN,\n" +
                    ":OPURL_IN,:ITEMTYPECODE_IN,:USERCODE_IN,:USERNAME_IN,:RET,:RET_MSG)}");
            cstmt.setString("ITEMCODE_IN", ITEMCODE_IN);
            cstmt.setString("ITEMNAME_IN", ITEMNAME_IN);
            cstmt.setString("TABLENAME_IN", TABLENAME_IN);
            cstmt.setString("URL_IN", URL_IN);
            cstmt.setString("OPURL_IN", OPURL_IN);
            cstmt.setString("ITEMTYPECODE_IN", ITEMTYPECODE_IN);
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("USERNAME_IN", USERNAME_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY102_UPDATEITEM");
        return result;
    }

    //删除试验数据项目
    public HashMap PRO_SY102_DELETEITEM(String ITEMCODE_IN) throws SQLException {
        logger.info("begin PRO_SY102_DELETEITEM");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY102_DELETEITEM" + "(:ITEMCODE_IN,:RET,:RET_MSG)}");
            cstmt.setString("ITEMCODE_IN", ITEMCODE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET_MSG", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
            result.put("RET_MSG", (String) cstmt.getObject("RET_MSG"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY102_DELETEITEM");
        return result;
    }

    //停用试验数据项目
    public HashMap PRO_SY102_STOPITEM(String ITEMCODE_IN) throws SQLException {

        logger.info("begin PRO_SY102_STOPITEM");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY102_STOPITEM" + "(:ITEMCODE_IN,:RET)}");
            cstmt.setString("ITEMCODE_IN", ITEMCODE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY102_STOPITEM");
        return result;
    }

    //启用试验数据项目
    public HashMap PRO_SY102_STARTITEM(String ITEMCODE_IN) throws SQLException {

        logger.info("begin PRO_SY102_STARTITEM");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SY102_STARTITEM" + "(:ITEMCODE_IN,:RET)}");
            cstmt.setString("ITEMCODE_IN", ITEMCODE_IN);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SY102_STARTITEM");
        return result;
    }

    //查询10603检修单位
    public HashMap PRO_DJ603_MENDDEPT(String USERCODE_IN, String PLANTCODE_IN) throws SQLException {

        logger.info("begin PRO_DJ603_MENDDEPT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ603_MENDDEPT" + "(:USERCODE_IN,:PLANTCODE_IN,:RET)}");
            cstmt.setString("USERCODE_IN", USERCODE_IN);
            cstmt.setString("PLANTCODE_IN", PLANTCODE_IN);
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
        logger.info("end PRO_DJ603_MENDDEPT");
        return result;
    }

    //查询10603工单状态
    public HashMap PRO_DJ_ORDERSTATUS() throws SQLException {

        logger.info("begin PRO_DJ_ORDERSTATUS");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ_ORDERSTATUS" + "(:RET)}");
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
        logger.info("end PRO_DJ_ORDERSTATUS");
        return result;
    }

    //查询10603工单
    public HashMap PRO_DJ603_SELECTORDERLIST(String MENDDEPT_CODE_in, String DJ_UQ_CODE_in, String DJ_NAME_in, Date startDate,
                                             java.util.Date endDate, String ORDERID_in, String ORDER_STATUS_in, String person_in, String dj_vol_in) throws SQLException {

        logger.info("begin PRO_DJ603_SELECTORDERLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        Date endDate_sql = new Date(endDate.getTime());
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ603_SELECTORDERLIST" + "(:MENDDEPT_CODE_in,:DJ_UQ_CODE_in,:DJ_NAME_in,:startDate," +
                    ":endDate,:ORDERID_in,:ORDER_STATUS_in,:person_in,:dj_vol_in,:RET)}");
            cstmt.setString("MENDDEPT_CODE_in", MENDDEPT_CODE_in);
            cstmt.setString("DJ_UQ_CODE_in", DJ_UQ_CODE_in);
            cstmt.setString("DJ_NAME_in", DJ_NAME_in);
            cstmt.setDate("startDate", startDate);
            cstmt.setDate("endDate", endDate_sql);
            cstmt.setString("ORDERID_in", ORDERID_in);
            cstmt.setString("ORDER_STATUS_in", ORDER_STATUS_in);
            cstmt.setString("person_in", person_in);
            cstmt.setString("dj_vol_in", dj_vol_in);
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
        logger.info("end PRO_DJ603_SELECTORDERLIST");
        return result;
    }

    //查询10603当前工序
    public HashMap PRO_DJ601_ORDERET(String ORDERID_in) throws SQLException {

        logger.info("begin PRO_DJ601_ORDERET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_ORDERET" + "(:ORDERID_in,:RET)}");
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
        logger.info("end PRO_DJ601_ORDERET");
        return result;
    }

    //查询10603所需物料表
    public HashMap PRO_DJ601_ORDERMAT(String ORDERID_in) throws SQLException {

        logger.info("begin PRO_DJ601_ORDERMAT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_DJ601_ORDERMAT" + "(:ORDERID_in,:RET)}");
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
        logger.info("end PRO_DJ601_ORDERMAT");
        return result;
    }

    //查询10603获取当前工单信息
    public HashMap PRO_DJ601_ORDERMESSAGE(String ORDERID_in) throws SQLException {

        logger.info("begin PRO_DJ601_ORDERMESSAGE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
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

    //查询10603单据数据获取
    public HashMap GETMENDBILLDETAIL(String A_ORDERID) throws SQLException {

        logger.info("begin GETMENDBILLDETAIL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PG_DJ603.GETMENDBILLDETAIL" + "(:ORDERID_in,:RET)}");
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
        logger.info("end GETMENDBILLDETAIL");
        return result;
    }


}
