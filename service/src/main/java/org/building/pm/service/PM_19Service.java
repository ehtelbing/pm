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
 * Created by zjh on 2017/1/22.
 */

@Service
public class PM_19Service {
    private static final Logger logger = Logger.getLogger(PM_19Service.class.getName());

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

    public Map PRO_PM_19_WORKTYPE_SEL(String V_V_WORKNAME) throws SQLException {

        logger.info("begin PRO_PM_19_WORKTYPE_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKTYPE_SEL(:V_V_WORKNAME,:V_CURSOR)}");
            cstmt.setString("V_V_WORKNAME", V_V_WORKNAME);
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
        logger.info("end PRO_PM_19_WORKTYPE_SEL");
        return result;
    }

    public List<Map> PRO_PM_19_WORKTYPE_EDIT(String V_V_WORKCODE,String V_V_WORKNAME,String V_V_WORKTYPE) throws SQLException {
//        logger.info("begin PRO_PM_19_WORKTYPE_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKTYPE_EDIT" + "(:V_V_WORKCODE,:V_V_WORKNAME,:V_V_WORKTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_WORKCODE", V_V_WORKCODE);
            cstmt.setString("V_V_WORKNAME", V_V_WORKNAME);
            cstmt.setString("V_V_WORKTYPE", V_V_WORKTYPE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_WORKTYPE_EDIT");
        return result;
    }

    public List<Map> PRO_PM_19_WORKTYPE_DEL(String V_V_WORKCODE) throws SQLException {
//        logger.info("begin PRO_PM_19_WORKTYPE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKTYPE_DEL" + "(:V_V_WORKCODE,:V_CURSOR)}");
            cstmt.setString("V_V_WORKCODE", V_V_WORKCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_WORKTYPE_DEL");
        return result;
    }

    public Map PRO_PM_19_TOOLTYPE_SEL(String V_V_TOOLNAME,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_PM_19_TOOLTYPE_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_TOOLTYPE_SEL(:V_V_TOOLNAME,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_TOOLNAME", V_V_TOOLNAME);
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
        logger.info("end PRO_PM_19_TOOLTYPE_SEL");
        return result;
    }

    public List<Map> PRO_PM_19_TOOLTYPE_EDIT(String V_V_TOOLCODE,String V_V_TOOLNAME,String V_V_TOOLTYPE,String V_V_EQUCODE,String V_V_EQUNAME,String V_V_EQUSITE) throws SQLException {
//        logger.info("begin PRO_PM_19_TOOLTYPE_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_TOOLTYPE_EDIT" + "(:V_V_TOOLCODE,:V_V_TOOLNAME,:V_V_TOOLTYPE,:V_V_EQUCODE,:V_V_EQUNAME,:V_V_EQUSITE,:V_CURSOR)}");
            cstmt.setString("V_V_TOOLCODE", V_V_TOOLCODE);
            cstmt.setString("V_V_TOOLNAME", V_V_TOOLNAME);
            cstmt.setString("V_V_TOOLTYPE", V_V_TOOLTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUSITE", V_V_EQUSITE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_TOOLTYPE_EDIT");
        return result;
    }

    public List<Map> PRO_PM_19_TOOLTYPE_DEL(String V_V_TOOLCODE) throws SQLException {
//        logger.info("begin PRO_PM_19_TOOLTYPE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_TOOLTYPE_DEL" + "(:V_V_TOOLCODE,:V_CURSOR)}");
            cstmt.setString("V_V_TOOLCODE", V_V_TOOLCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_TOOLTYPE_DEL");
        return result;
    }

    public Map PRO_PM_19_CARTYPE_SEL(String V_V_CARNAME,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_PM_19_CARTYPE_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_CARTYPE_SEL(:V_V_CARNAME,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_CARNAME", V_V_CARNAME);
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
        logger.info("end PRO_PM_19_CARTYPE_SEL");
        return result;
    }

    public List<Map> PRO_PM_19_CARTYPE_EDIT(String V_V_CARCODE,String V_V_CARNAME,String V_V_CARTYPE,String V_V_CARGUISUO,String V_V_FLAG,String V_V_CARINFO,String V_V_DE,String V_V_EQUCODE,String V_V_EQUNAME,String V_V_EQUSITE) throws SQLException {
//        logger.info("begin PRO_PM_19_CARTYPE_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_CARTYPE_EDIT" + "(:V_V_CARCODE,:V_V_CARNAME,:V_V_CARTYPE,:V_V_CARGUISUO,:V_V_FLAG,:V_V_CARINFO,:V_V_DE,:V_V_EQUCODE,:V_V_EQUNAME,:V_V_EQUSITE,:V_CURSOR)}");
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.setString("V_V_CARNAME", V_V_CARNAME);
            cstmt.setString("V_V_CARTYPE", V_V_CARTYPE);
            cstmt.setString("V_V_CARGUISUO", V_V_CARGUISUO);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_CARINFO", V_V_CARINFO);
            cstmt.setString("V_V_DE", V_V_DE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUSITE", V_V_EQUSITE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            String sss = (String) cstmt.getObject("V_CURSOR");
            sledata.put("V_INFO", sss);
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_CARTYPE_EDIT");
        return result;
    }

    public List<Map> PRO_PM_19_CARTYPE_DEL(String V_V_CARCODE) throws SQLException {
//        logger.info("begin PRO_PM_19_CARTYPE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_CARTYPE_DEL" + "(:V_V_CARCODE,:V_CURSOR)}");
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_CARTYPE_DEL");
        return result;
    }

    public Map PRO_PM_19_WORKDE_SEL(String V_V_WORKNAME) throws SQLException {

        logger.info("begin PRO_PM_19_WORKDE_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKDE_SEL(:V_V_WORKNAME,:V_CURSOR)}");
            cstmt.setString("V_V_WORKNAME", V_V_WORKNAME);
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
        logger.info("end PRO_PM_19_WORKDE_SEL");
        return result;
    }

    public List<Map> PRO_PM_19_WORKDE_EDIT(String I_I_ID, String V_V_WORKCODE,String V_V_WORKNAME,String V_V_WORKTYPE,
                                           String V_V_TIME,String V_V_DE) throws SQLException {
//        logger.info("begin PRO_PM_19_WORKDE_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKDE_EDIT" + "(:I_I_ID,:V_V_WORKCODE,:V_V_WORKNAME," +
                    ":V_V_WORKTYPE,:V_V_TIME,:V_V_DE,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_WORKCODE", V_V_WORKCODE);
            cstmt.setString("V_V_WORKNAME", V_V_WORKNAME);
            cstmt.setString("V_V_WORKTYPE", V_V_WORKTYPE);
            cstmt.setString("V_V_TIME", V_V_TIME);
            cstmt.setString("V_V_DE", V_V_DE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_WORKDE_EDIT");
        return result;
    }

    public List<Map> PRO_PM_19_WORKDE_DEL(String I_I_ID) throws SQLException {
//        logger.info("begin PRO_PM_19_WORKDE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKDE_DEL" + "(:I_I_ID,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_WORKDE_DEL");
        return result;
    }

    public List<Map> PRO_PM_19_CARDE_EDIT(String I_I_ID, String V_V_CARCODE,String V_V_CARNAME,String V_V_CARTYPE,
                                          String V_V_CARGUISUO,String V_V_FLAG,String V_V_CARINFO) throws SQLException {
//        logger.info("begin PRO_PM_19_CARDE_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_CARDE_EDIT" + "(:I_I_ID,:V_V_CARCODE,:V_V_CARNAME," +
                    ":V_V_CARTYPE,:V_V_CARGUISUO,:V_V_FLAG,:V_V_CARINFO,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.setString("V_V_CARCODE", V_V_CARCODE);
            cstmt.setString("V_V_CARNAME", V_V_CARNAME);
            cstmt.setString("V_V_CARTYPE", V_V_CARTYPE);
            cstmt.setString("V_V_CARGUISUO", V_V_CARGUISUO);
            cstmt.setString("V_V_FLAG", V_V_FLAG);
            cstmt.setString("V_V_CARINFO", V_V_CARINFO);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_CARDE_EDIT");
        return result;
    }

    public List<Map> PRO_PM_19_CARDE_DEL(String I_I_ID) throws SQLException {
//        logger.info("begin PRO_PM_19_CARDE_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_CARDE_DEL" + "(:I_I_ID,:V_CURSOR)}");
            cstmt.setString("I_I_ID", I_I_ID);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_CARDE_DEL");
        return result;
    }

    public List<Map> PM_1917_JXGX_DATA_SET(String V_V_JXGX_CODE,String V_V_JXGX_NAME,String V_V_JXGX_NR,
                                           String V_V_GZZX_CODE,String V_V_JXMX_CODE,String V_V_ORDER,String V_V_PERNUM,String V_V_PERTIME) throws SQLException {
//        logger.info("begin PM_1917_JXGX_DATA_SET");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_DATA_SET" + "(:V_V_JXGX_CODE,:V_V_JXGX_NAME,:V_V_JXGX_NR," +
                    ":V_V_GZZX_CODE,:V_V_JXMX_CODE,:V_V_ORDER,:V_V_PERNUM,:V_V_PERTIME,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JXGX_NAME", V_V_JXGX_NAME);
            cstmt.setString("V_V_JXGX_NR", V_V_JXGX_NR);
            cstmt.setString("V_V_GZZX_CODE", V_V_GZZX_CODE);
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
            cstmt.setString("V_V_ORDER", V_V_ORDER);
            cstmt.setString("V_V_PERNUM", V_V_PERNUM);
            cstmt.setString("V_V_PERTIME", V_V_PERTIME);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_DATA_SET");
        return result;
    }


    public List<Map> PM_1917_JXGX_DATA_SETNEW(String V_V_JXGX_CODE,String V_V_JXGX_NAME,String V_V_JXGX_NR,String V_V_GZZX_CODE,String V_V_JXMX_CODE,
                                              String V_V_ORDER, String V_V_PERNUM,String V_V_PERTIME,String V_V_JXBZ,String V_V_JXBZ_VALUE_DOWN,String V_V_JXBZ_VALUE_UP) throws SQLException {
//        logger.info("begin PM_1917_JXGX_DATA_SETNEW");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_DATA_SETNEW" + "(:V_V_JXGX_CODE,:V_V_JXGX_NAME,:V_V_JXGX_NR," +
                    ":V_V_GZZX_CODE,:V_V_JXMX_CODE,:V_V_ORDER,:V_V_PERNUM,:V_V_PERTIME,:V_V_JXBZ,:V_V_JXBZ_VALUE_DOWN,:V_V_JXBZ_VALUE_UP,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_JXGX_NAME", V_V_JXGX_NAME);
            cstmt.setString("V_V_JXGX_NR", V_V_JXGX_NR);
            cstmt.setString("V_V_GZZX_CODE", V_V_GZZX_CODE);
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
            cstmt.setString("V_V_ORDER", V_V_ORDER);
            cstmt.setString("V_V_PERNUM", V_V_PERNUM);
            cstmt.setString("V_V_PERTIME", V_V_PERTIME);
            cstmt.setString("V_V_JXBZ", V_V_JXBZ);
            cstmt.setString("V_V_JXBZ_VALUE_DOWN", V_V_JXBZ_VALUE_DOWN);
            cstmt.setString("V_V_JXBZ_VALUE_UP", V_V_JXBZ_VALUE_UP);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();

            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_DATA_SETNEW");
        return result;
    }


    public HashMap PM_1917_JXGX_DATA_SEL(String V_V_JXMX_CODE) throws SQLException {

        logger.info("begin PM_1917_JXGX_DATA_SEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_DATA_SEL" + "(:V_V_JXMX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXMX_CODE", V_V_JXMX_CODE);
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
        logger.info("end PRO_BASE_DEPTTOSAPWORKCSAT");
        return result;
    }

    public HashMap PRO_PM_19_CARDE_GXSEL(String V_V_JXGX_CODE) throws SQLException {

        logger.info("begin PRO_PM_19_CARDE_GXSEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_CARDE_GXSEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PRO_PM_19_CARDE_GXSEL");
        return result;
    }

    public HashMap PRO_PM_19_WORKDE_GXSEL(String V_V_JXGX_CODE) throws SQLException {

        logger.info("begin PRO_PM_19_WORKDE_GXSEL");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_WORKDE_GXSEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PRO_PM_19_CARDE_GXSEL");
        return result;
    }

    public List<Map> PM_1917_JXGX_DATA_DEL(String V_V_JXGX_CODE) throws SQLException {
//        logger.info("begin PM_1917_JXGX_DATA_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_DATA_DEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_DATA_DEL");
        return result;
    }

    public List<Map> PM_1917_JXGX_CHILD_DEL(String V_V_JXGX_CODE) throws SQLException {
//        logger.info("begin PM_1917_JXGX_CHILD_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_CHILD_DEL" + "(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1917_JXGX_CHILD_DEL");
        return result;
    }

    public Map PRO_PM_19_AQCS_SEL(String V_V_AQCS_NAME,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_PM_19_AQCS_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_AQCS_SEL(:V_V_AQCS_NAME,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCS_NAME", V_V_AQCS_NAME);
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
        logger.info("end PRO_PM_19_AQCS_SEL");
        return result;
    }

    public Map PRO_PM_19_JSYQ_SEL(String V_V_JSYQ_NAME,String V_V_EQUCODE) throws SQLException {

        logger.info("begin PRO_PM_19_JSYQ_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_19_JSYQ_SEL(:V_V_JSYQ_NAME,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_JSYQ_NAME", V_V_JSYQ_NAME);
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
        logger.info("end PRO_PM_19_JSYQ_SEL");
        return result;
    }

    public Map PM_1917_JXGX_BYCODE_SEL(String V_V_JXGX_CODE) throws SQLException {

        logger.info("begin PM_1917_JXGX_BYCODE_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_1917_JXGX_BYCODE_SEL(:V_V_JXGX_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
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
        logger.info("end PM_1917_JXGX_BYCODE_SEL");
        return result;
    }

    public Map BASE_PER_POST_SEL(String V_V_DEPTCODE,String V_V_POSTCODE) throws SQLException {

        logger.info("begin BASE_PER_POST_SEL");
//        logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        Map<String, Object> result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call BASE_PER_POST_SEL(:V_V_DEPTCODE,:V_V_POSTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_POSTCODE", V_V_POSTCODE);
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
        logger.info("end BASE_PER_POST_SEL");
        return result;
    }

    public List<Map> PRO_PM_MODEL_SELECT(String V_V_JXGX_CODE,String V_V_MXCODE) throws SQLException {
//        logger.info("begin PRO_PM_MODEL_SELECT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_MODEL_SELECT" + "(:V_V_JXGX_CODE,:V_V_MXCODE,:V_INFO)}");
            cstmt.setString("V_V_JXGX_CODE", V_V_JXGX_CODE);
            cstmt.setString("V_V_MXCODE", V_V_MXCODE);
            cstmt.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_INFO"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_MODEL_SELECT");
        return result;
    }
    public Map PM_REPAIRDEPT_SEL(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PM_REPAIRDEPT_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_REPAIRDEPT_SEL" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_REPAIRDEPT_SEL");
        return result;
    }
    public Map PM_FLOW_TYPE_SEL() throws SQLException {
        logger.info("begin PM_FLOW_TYPE_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_FLOW_TYPE_SEL" + "(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_FLOW_TYPE_SEL");
        return result;
    }
    public Map PM_WORKORDER_FLOW_STEP_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRCODE,String V_V_FLOWTYPE) throws SQLException {
        logger.info("begin PM_WORKORDER_FLOW_STEP_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_FLOW_STEP_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_V_FLOWTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
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
        logger.info("end PM_WORKORDER_FLOW_STEP_SEL");
        return result;
    }
    public Map PM_WORKORDER_FLOW_STEP_DEL(String V_V_ID) throws SQLException {
        logger.info("begin PM_WORKORDER_FLOW_STEP_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_FLOW_STEP_DEL" + "(:V_V_ID,:V_INFO)}");
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORKORDER_FLOW_STEP_DEL");
        return result;
    }
    public Map PM_FLOW_PAGE_SEL(String V_V_FLOWTYPE) throws SQLException {
        logger.info("begin PM_FLOW_PAGE_SEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_FLOW_PAGE_SEL" + "(:V_V_FLOWTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_FLOW_PAGE_SEL");
        return result;
    }
    public Map PM_WORKORDER_FLOW_STEP_SET(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRCODE,String V_V_FLOWCODE,String V_V_FLOWNAME,String V_V_FLOWSTEP,String V_V_ORDER,String V_V_BZ,String V_V_ROLECODE,String V_V_NEXTSTEP,String V_V_URL,String V_V_FLOWTYPE,String V_V_PERCODE) throws SQLException {
        logger.info("begin PM_WORKORDER_FLOW_STEP_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_FLOW_STEP_SET" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_V_FLOWCODE,:V_V_FLOWNAME,:V_V_FLOWSTEP,:V_V_ORDER,:V_V_BZ,:V_V_ROLECODE,:V_V_NEXTSTEP,:V_V_URL,:V_V_FLOWTYPE,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_FLOWNAME", V_V_FLOWNAME);
            cstmt.setString("V_V_FLOWSTEP", V_V_FLOWSTEP);
            cstmt.setString("V_V_ORDER", V_V_ORDER);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_NEXTSTEP", V_V_NEXTSTEP);
            cstmt.setString("V_V_URL", V_V_URL);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            cstmt.execute();

            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORKORDER_FLOW_STEP_SET");
        return result;
    }
    public Map PM_WORKORDER_FLOW_STEP_GET(String V_V_ID) throws SQLException {
        logger.info("begin PM_WORKORDER_FLOW_STEP_GET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_WORKORDER_FLOW_STEP_GET" + "(:V_V_ID,:V_CURSOR)}");
            cstmt.setString("V_V_ID", V_V_ID);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_WORKORDER_FLOW_STEP_GET");
        return result;
    }
    public List<Map> PRO_SAP_EQU_VIEW(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_VIEW");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_VIEW" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            Map temp = new HashMap();
            temp.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            menu.add(temp);
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_SAP_EQU_VIEW");
        return menu;
    }
    private List<HashMap> GetEquChildren(List<HashMap> list,String V_EQUCODE){
        List<HashMap> menu = new ArrayList<HashMap>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_EQUCODEUP").equals(V_EQUCODE)) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_EQUCODE"));
                temp.put("text", list.get(i).get("V_EQUNAME"));
                temp.put("V_EQUSITE", list.get(i).get("V_EQUSITE"));
                if(GetEquChildren(list,list.get(i).get("V_EQUCODE").toString()).size()>0){
                    temp.put("expanded", false);
                    temp.put("children", GetEquChildren(list, list.get(i).get("V_EQUCODE").toString()));
                }else{
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public Map PRO_MM_FLOW_DIC(String A_PLANTCODE) throws SQLException {
        logger.info("begin PRO_MM_FLOW_DIC");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_DIC" + "(:A_PLANTCODE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_DIC");
        return result;
    }
    public Map PRO_MM_FLOW_DIC_REMARK() throws SQLException {
        logger.info("begin PRO_MM_FLOW_DIC_REMARK");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_DIC_REMARK" + "(:RET)}");
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_DIC_REMARK");
        return result;
    }
    public Map PRO_MM_FLOW_DIC_UPDATE(String A_DICID,String A_PLANTCODE,String A_FLOWNAME,String A_REMARK,String A_TYPE,String A_ORDERID,String A_STATUSFLAG,String A_STARTSTEP,String OP) throws SQLException {
        logger.info("begin PRO_MM_FLOW_DIC_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_DIC_UPDATE" + "(:A_DICID,:A_PLANTCODE,:A_FLOWNAME,:A_REMARK,:A_TYPE,:A_ORDERID,:A_STATUSFLAG,:A_STARTSTEP,:OP,:RET)}");
            cstmt.setString("A_DICID", A_DICID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_FLOWNAME", A_FLOWNAME);
            cstmt.setString("A_REMARK", A_REMARK);
            cstmt.setString("A_TYPE", A_TYPE);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("A_STATUSFLAG", A_STATUSFLAG);
            cstmt.setString("A_STARTSTEP", A_STARTSTEP);
            cstmt.setString("OP", OP);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_DIC_UPDATE");
        return result;
    }
    public Map PRO_MM_FLOW_STEP(String A_DICID) throws SQLException {
        logger.info("begin PRO_MM_FLOW_STEP");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_STEP" + "(:A_DICID,:RET)}");
            cstmt.setString("A_DICID", A_DICID);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_STEP");
        return result;
    }
    public Map PRO_MM_FLOW_STEP_UPDATE(String A_DICID,String A_STEPID,String A_STEPNAME,String A_PRE_STEPID,String A_AFTER_STEPID,String A_URL,String A_REMARK,String A_FINGER,String A_ORDERID,String OP) throws SQLException {
        logger.info("begin PRO_MM_FLOW_STEP_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_STEP_UPDATE" + "(:A_DICID,:A_STEPID,:A_STEPNAME,:A_PRE_STEPID,:A_AFTER_STEPID,:A_URL,:A_REMARK,:A_FINGER,:A_ORDERID,:OP,:RET)}");
            cstmt.setString("A_DICID", A_DICID);
            cstmt.setString("A_STEPID", A_STEPID);
            cstmt.setString("A_STEPNAME", A_STEPNAME);
            cstmt.setString("A_PRE_STEPID", A_PRE_STEPID);
            cstmt.setString("A_AFTER_STEPID", A_AFTER_STEPID);
            cstmt.setString("A_URL", A_URL);
            cstmt.setString("A_REMARK", A_REMARK);
            cstmt.setString("A_FINGER", A_FINGER);
            cstmt.setString("A_ORDERID", A_ORDERID);
            cstmt.setString("OP", OP);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_STEP_UPDATE");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE(String A_STEPID) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE" + "(:A_STEPID,:RET)}");
            cstmt.setString("A_STEPID", A_STEPID);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE_POWER_USER(String A_ROLEID) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE_POWER_USER");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE_POWER_USER" + "(:A_ROLEID,:RET_USERLIST)}");
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.registerOutParameter("RET_USERLIST",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET_USERLIST")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE_POWER_USER");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE_UPDATE(String A_STEPID,String A_ROLEID,String A_ROLENAME,String A_PLANTCODE,String A_PLANTNAME,String OP) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE_UPDATE" + "(:A_STEPID,:A_ROLEID,:A_ROLENAME,:A_PLANTCODE,:A_PLANTNAME,:OP,:RET)}");
            cstmt.setString("A_STEPID", A_STEPID);
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.setString("A_ROLENAME", A_ROLENAME);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_PLANTNAME", A_PLANTNAME);
            cstmt.setString("OP", OP);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE_UPDATE");
        return result;
    }
    public Map PRO_MM_FLOW_PERSON_UPDATE(String A_ROLEID,String A_USERID,String OP) throws SQLException {
        logger.info("begin PRO_MM_FLOW_PERSON_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_PERSON_UPDATE" + "(:A_ROLEID,:A_USERID,:OP,:RET)}");
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.setString("A_USERID", A_USERID);
            cstmt.setString("OP", OP);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_PERSON_UPDATE");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE_POWER_PLANT(String A_ROLEID) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE_POWER_PLANT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE_POWER_PLANT" + "(:A_ROLEID,:RET_USERLIST)}");
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.registerOutParameter("RET_USERLIST",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET_USERLIST")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE_POWER_PLANT");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE_PLANT_UPDATE(String A_ROLEID,String A_PLANTCODE,String OP) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE_PLANT_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE_PLANT_UPDATE" + "(:A_ROLEID,:A_PLANTCODE,:OP,:RET)}");
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("OP", OP);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE_PLANT_UPDATE");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE_POWER_DEPART(String A_ROLEID) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE_POWER_DEPART");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE_POWER_DEPART" + "(:A_ROLEID,:RET_USERLIST)}");
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.registerOutParameter("RET_USERLIST",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET_USERLIST")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE_POWER_DEPART");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE_DEPART_UPDATE(String A_ROLEID,String A_DEPARTCODE,String OP) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE_DEPART_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE_DEPART_UPDATE" + "(:A_ROLEID,:A_DEPARTCODE,:OP,:RET)}");
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("OP", OP);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE_DEPART_UPDATE");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE_POWER_DICT(String A_ROLEID) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE_POWER_DICT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE_POWER_DICT" + "(:A_ROLEID,:RET_USERLIST)}");
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.registerOutParameter("RET_USERLIST",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET_USERLIST")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE_POWER_DICT");
        return result;
    }
    public Map PRO_WP_DICT_ALL() throws SQLException {
        logger.info("begin PRO_WP_DICT_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_ALL" + "(:RET)}");
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_DICT_ALL");
        return result;
    }
    public Map PRO_MM_FLOW_ROLE_DICT_UPDATE(String A_ROLEID,String A_DICTID,String OP) throws SQLException {
        logger.info("begin PRO_MM_FLOW_ROLE_DICT_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_ROLE_DICT_UPDATE" + "(:A_ROLEID,:A_DICTID,:OP,:RET)}");
            cstmt.setString("A_ROLEID", A_ROLEID);
            cstmt.setString("A_DICTID", A_DICTID);
            cstmt.setString("OP", OP);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_ROLE_DICT_UPDATE");
        return result;
    }
    public Map PRO_WP_MENDTYPE_ALL1() throws SQLException {
        logger.info("begin PRO_WP_MENDTYPE_ALL1");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MENDTYPE_ALL1" + "(:RET)}");
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MENDTYPE_ALL1");
        return result;
    }
    public Map PRO_WP_MENDTYPE_ADD(String A_MENDTYPE,String A_MENDTYPE_DESC,String A_USEFLAG) throws SQLException {
        logger.info("begin PRO_WP_MENDTYPE_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MENDTYPE_ADD" + "(:A_MENDTYPE,:A_MENDTYPE_DESC,:A_USEFLAG,:RET)}");
            cstmt.setString("A_MENDTYPE", A_MENDTYPE);
            cstmt.setString("A_MENDTYPE_DESC", A_MENDTYPE_DESC);
            cstmt.setString("A_USEFLAG", A_USEFLAG);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MENDTYPE_ADD");
        return result;
    }
    public Map PRO_WP_MENDTYPE_UPDATE(String A_MENDTYPE,String A_MENDTYPE_DESC,String A_USEFLAG) throws SQLException {
        logger.info("begin PRO_WP_MENDTYPE_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MENDTYPE_UPDATE" + "(:A_MENDTYPE,:A_MENDTYPE_DESC,:A_USEFLAG,:RET)}");
            cstmt.setString("A_MENDTYPE", A_MENDTYPE);
            cstmt.setString("A_MENDTYPE_DESC", A_MENDTYPE_DESC);
            cstmt.setString("A_USEFLAG", A_USEFLAG);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MENDTYPE_UPDATE");
        return result;
    }
    public Map PRO_WP_MEND_DEPART_PLANT(String A_PLANTCODE,String A_MENDTYPE) throws SQLException {
        logger.info("begin PRO_WP_MEND_DEPART_PLANT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MEND_DEPART_PLANT" + "(:A_PLANTCODE,:A_MENDTYPE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_MENDTYPE", A_MENDTYPE);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MEND_DEPART_PLANT");
        return result;
    }
    public Map PRO_WP_MEND_DEPART_ABLE() throws SQLException {
        logger.info("begin PRO_WP_MEND_DEPART_ABLE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MEND_DEPART_ABLE" + "(:RET)}");
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MEND_DEPART_ABLE");
        return result;
    }
    public Map PRO_WP_MEND_DEPART_PLANT_ADD(String A_MEND_DEPARTCODE,String A_PLANTCODE) throws SQLException {
        logger.info("begin PRO_WP_MEND_DEPART_PLANT_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MEND_DEPART_PLANT_ADD" + "(:A_MEND_DEPARTCODE,:A_PLANTCODE,:RET)}");
            cstmt.setString("A_MEND_DEPARTCODE", A_MEND_DEPARTCODE);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MEND_DEPART_PLANT_ADD");
        return result;
    }
    public Map PRO_WP_MEND_DEPART_PLANT_DEL(String A_MEND_DEPARTCODE,String A_PLANTCODE) throws SQLException {
        logger.info("begin PRO_WP_MEND_DEPART_PLANT_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MEND_DEPART_PLANT_DEL" + "(:A_MEND_DEPARTCODE,:A_PLANTCODE,:RET)}");
            cstmt.setString("A_MEND_DEPARTCODE", A_MEND_DEPARTCODE);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MEND_DEPART_PLANT_DEL");
        return result;
    }
    public Map PRO_WP_MENDTYPE_ALL() throws SQLException {
        logger.info("begin PRO_WP_MENDTYPE_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MENDTYPE_ALL" + "(:RET)}");
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MENDTYPE_ALL");
        return result;
    }
    public Map PRO_WP_MEND_DEPART_ALL() throws SQLException {
        logger.info("begin PRO_WP_MEND_DEPART_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MEND_DEPART_ALL" + "(:RET)}");
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MEND_DEPART_ALL");
        return result;
    }
    public Map PRO_WP_MEND_DEPART_ADD(String A_MEND_DEPARTCODE,String A_MEND_DEPARTNAME,String A_MENDTYPE,String A_USEFLAG) throws SQLException {
        logger.info("begin PRO_WP_MEND_DEPART_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MEND_DEPART_ADD" + "(:A_MEND_DEPARTCODE,:A_MEND_DEPARTNAME,:A_MENDTYPE,:A_USEFLAG,:RET)}");
            cstmt.setString("A_MEND_DEPARTCODE", A_MEND_DEPARTCODE);
            cstmt.setString("A_MEND_DEPARTNAME", A_MEND_DEPARTNAME);
            cstmt.setString("A_MENDTYPE", A_MENDTYPE);
            cstmt.setString("A_USEFLAG", A_USEFLAG);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MEND_DEPART_ADD");
        return result;
    }
    public Map PRO_WP_MEND_DEPART_UPDATE(String A_MEND_DEPARTCODE,String A_MEND_DEPARTNAME,String A_MENDTYPE,String A_USEFLAG) throws SQLException {
        logger.info("begin PRO_WP_MEND_DEPART_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MEND_DEPART_UPDATE" + "(:A_MEND_DEPARTCODE,:A_MEND_DEPARTNAME,:A_MENDTYPE,:A_USEFLAG,:RET)}");
            cstmt.setString("A_MEND_DEPARTCODE", A_MEND_DEPARTCODE);
            cstmt.setString("A_MEND_DEPARTNAME", A_MEND_DEPARTNAME);
            cstmt.setString("A_MENDTYPE", A_MENDTYPE);
            cstmt.setString("A_USEFLAG", A_USEFLAG);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MEND_DEPART_UPDATE");
        return result;
    }
    public Map PRO_WP_MEND_DEPART_DELETE(String A_MEND_DEPARTCODE) throws SQLException {
        logger.info("begin PRO_WP_MEND_DEPART_DELETE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_MEND_DEPART_DELETE" + "(:A_MEND_DEPARTCODE,:RET)}");
            cstmt.setString("A_MEND_DEPARTCODE", A_MEND_DEPARTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_MEND_DEPART_DELETE");
        return result;
    }
    public Map PRO_WP_PLAN_PROJCODE_ALL(String A_PLANTCODE,String A_DEPARTCODE) throws SQLException {
        logger.info("begin PRO_WP_PLAN_PROJCODE_ALL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_PLAN_PROJCODE_ALL" + "(:A_PLANTCODE,:A_DEPARTCODE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_PLAN_PROJCODE_ALL");
        return result;
    }
    public Map PRO_WP_PLAN_PROJCODE_ADD(String A_PLANTCODE,String A_DEPARTCODE,String A_PROJCODE) throws SQLException {
        logger.info("begin PRO_WP_PLAN_PROJCODE_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_PLAN_PROJCODE_ADD" + "(:A_PLANTCODE,:A_DEPARTCODE,:A_PROJCODE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.setString("A_PROJCODE", A_PROJCODE);
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
        logger.info("end PRO_WP_PLAN_PROJCODE_ADD");
        return result;
    }
    public Map PRO_WP_PLAN_PROJCODE_DEL(String A_PLANTCODE,String A_DEPARTCODE) throws SQLException {
        logger.info("begin PRO_WP_PLAN_PROJCODE_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_PLAN_PROJCODE_DEL" + "(:A_PLANTCODE,:A_DEPARTCODE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_DEPARTCODE", A_DEPARTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_PLAN_PROJCODE_DEL");
        return result;
    }
    public Map PRO_WP_DICT_ALL1() throws SQLException {
        logger.info("begin PRO_WP_DICT_ALL1");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_ALL1" + "(:RET)}");
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_DICT_ALL1");
        return result;
    }
    public Map PRO_WP_DICT_ADD(String A_DICTID,String A_DICT_DESC,String A_USEFLAG) throws SQLException {
        logger.info("begin PRO_WP_DICT_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_ADD" + "(:A_DICTID,:A_DICT_DESC,:A_USEFLAG,:RET)}");
            cstmt.setString("A_DICTID", A_DICTID);
            cstmt.setString("A_DICT_DESC", A_DICT_DESC);
            cstmt.setString("A_USEFLAG", A_USEFLAG);
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
        logger.info("end PRO_WP_DICT_ADD");
        return result;
    }
    public Map PRO_WP_DICT_UPDATE(String A_DICTID,String A_DICT_DESC,String A_USEFLAG) throws SQLException {
        logger.info("begin PRO_WP_DICT_UPDATE");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_UPDATE" + "(:A_DICTID,:A_DICT_DESC,:A_USEFLAG,:RET)}");
            cstmt.setString("A_DICTID", A_DICTID);
            cstmt.setString("A_DICT_DESC", A_DICT_DESC);
            cstmt.setString("A_USEFLAG", A_USEFLAG);
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
        logger.info("end PRO_WP_DICT_UPDATE");
        return result;
    }
    public Map PRO_WP_DICT_PLANT(String A_PLANTCODE) throws SQLException {
        logger.info("begin PRO_WP_DICT_PLANT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_PLANT" + "(:A_PLANTCODE,:RET)}");
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_WP_DICT_PLANT");
        return result;
    }
    public Map PRO_WP_DICT_PLANT_ADD(String A_DICTID,String A_PLANTCODE) throws SQLException {
        logger.info("begin PRO_WP_DICT_PLANT_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_PLANT_ADD" + "(:A_DICTID,:A_PLANTCODE,:RET)}");
            cstmt.setString("A_DICTID", A_DICTID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
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
        logger.info("end PRO_WP_DICT_PLANT_ADD");
        return result;
    }
    public Map PRO_WP_DICT_PLANT_MANAGER_ADD(String A_DICTID,String A_PLANTCODE,String A_USERID) throws SQLException {
        logger.info("begin PRO_WP_DICT_PLANT_MANAGER_ADD");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_PLANT_MANAGER_ADD" + "(:A_DICTID,:A_PLANTCODE,:A_USERID,:RET)}");
            cstmt.setString("A_DICTID", A_DICTID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
            cstmt.setString("A_USERID", A_USERID);
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
        logger.info("end PRO_WP_DICT_PLANT_MANAGER_ADD");
        return result;
    }
    public Map PRO_WP_DICT_PLANT_MANAGER(String A_DICTID,String A_PLANTCODE) throws SQLException {
        logger.info("begin PRO_WP_DICT_PLANT_MANAGER");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_PLANT_MANAGER" + "(:A_DICTID,:A_PLANTCODE,:RET)}");
            cstmt.setString("A_DICTID", A_DICTID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
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
        logger.info("end PRO_WP_DICT_PLANT_ADD");
        return result;
    }
    public Map PRO_WP_DICT_PLANT_DEL(String A_DICTID,String A_PLANTCODE) throws SQLException {
        logger.info("begin PRO_WP_DICT_PLANT_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_PLANT_DEL" + "(:A_DICTID,:A_PLANTCODE,:RET)}");
            cstmt.setString("A_DICTID", A_DICTID);
            cstmt.setString("A_PLANTCODE", A_PLANTCODE);
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
        logger.info("end PRO_WP_DICT_PLANT_DEL");
        return result;
    }
    public Map PRO_WP_DICT_PLANT_MANAGER_DEL(String A_ID) throws SQLException {
        logger.info("begin PRO_WP_DICT_PLANT_MANAGER_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_WP_DICT_PLANT_MANAGER_DEL" + "(:A_ID,:RET)}");
            cstmt.setString("A_ID", A_ID);
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
        logger.info("end PRO_WP_DICT_PLANT_MANAGER_DEL");
        return result;
    }
    public List<Map> OrgAndPersonTree(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin OrgAndPersonTree");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for (int i=0;i<list.size();i++) {
                if (list.get(i).get("V_DEPTCODE").equals(V_V_DEPTCODE)) {
                    Map temp = new HashMap();
                    temp.put("id", list.get(i).get("V_DEPTCODE"));
                    temp.put("text", list.get(i).get("V_DEPTNAME"));
                    temp.put("expanded", false);
                    temp.put("children", GetDEPTChildren(list, V_V_DEPTCODE));
                    result.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end OrgAndPersonTree");
        return result;
    }

    public List<Map> GetDEPTChildren(List<HashMap> list, String V_V_DEPTCODE)throws SQLException{
        List<Map> menu = new ArrayList<Map>();
        for(int i = 0; i < list.size(); i++){
            if (list.get(i).get("V_DEPTCODE_UP").equals(V_V_DEPTCODE)) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_DEPTCODE"));
                temp.put("text", list.get(i).get("V_DEPTNAME"));

                if(GetDEPTChildren(list, list.get(i).get("V_DEPTCODE").toString()).size()>0){
                    temp.put("children", GetDEPTChildren(list, list.get(i).get("V_DEPTCODE").toString()));
                    temp.put("leaf", false);
                    temp.put("expanded", false);
                }else{
                    temp.put("children",GetPersonChildren(list.get(i).get("V_DEPTCODE").toString()));

                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public List<Map> GetPersonChildren(String V_V_DEPTCODE) throws SQLException{
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for(int i = 0; i < list.size(); i++) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_PERSONCODE"));
                temp.put("text", list.get(i).get("V_PERSONNAME"));
                temp.put("leaf", true);
                result.add(temp);
            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        return result;
    }
    public List<Map> DepartAndEquTypeTree(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException {
        logger.info("begin DepartAndEquTypeTree");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for (int i=0;i<list.size();i++) {
                if (list.get(i).get("V_DEPTCODE").equals(V_V_DEPTCODENEXT)) {
                    Map temp = new HashMap();
                    temp.put("id", list.get(i).get("V_DEPTCODE"));
                    temp.put("text", list.get(i).get("V_DEPTNAME"));
                    temp.put("leaf", false);
                    temp.put("expanded", false);
                    temp.put("children", GetDeptEquTypeChildren(V_V_PERSONCODE,V_V_DEPTCODENEXT));
                    result.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DepartAndEquTypeTree");
        return result;
    }
    public List<Map> GetDeptEquTypeChildren(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException{
        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
        List<Map> result = new ArrayList<Map>();
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
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for(int i = 0; i < list.size(); i++) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_EQUTYPECODE"));
                temp.put("text", list.get(i).get("V_EQUTYPENAME"));
                temp.put("leaf", true);
                result.add(temp);
            }
            conn.commit();
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
    public Map PRO_GET_DEPTEQU_PER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {
        logger.info("begin PRO_GET_DEPTEQU_PER");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_PER" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
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
        logger.info("end PRO_GET_DEPTEQU_PER");
        return result;
    }
    public Map PRO_PM_PERSONTOEQU_VIEW(String V_V_PERSONCODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_PM_PERSONTOEQU_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PERSONTOEQU_VIEW" + "(:V_V_PERSONCODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
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
        logger.info("end PRO_PM_PERSONTOEQU_VIEW");
        return result;
    }
    public Map PRO_PM_PERSONTOEQU_SET(String V_V_PERSONCODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_PM_PERSONTOEQU_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PERSONTOEQU_SET" + "(:V_V_PERSONCODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PERSONTOEQU_SET");
        return result;
    }
    public Map PRO_PM_PERSONTOEQU_DEL(String V_V_PERSONCODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_PM_PERSONTOEQU_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PERSONTOEQU_DEL" + "(:V_V_PERSONCODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_PERSONTOEQU_DEL");
        return result;
    }
    public List<Map>  PRO_BASE_DEPT_VIEW_ROLE(String V_V_PERSONCODE, String V_V_DEPTCODE, String V_V_DEPTCODENEXT, String V_V_DEPTTYPE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_VIEW_ROLE");
        List<Map> result = new ArrayList<Map>();
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
            Map temp = new HashMap();
            temp.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            result.add(temp);
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
    public Map PRO_SAP_PM_YWFW_VIEW(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_SAP_PM_YWFW_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_YWFW_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PRO_SAP_PM_YWFW_VIEW");
        return result;
    }
    public List<Map>  PRO_SAP_PM_CSAT_VIEW(String V_V_DEPTCODE,String V_V_YWFW) throws SQLException {
        logger.info("begin PRO_SAP_PM_CSAT_VIEW");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_CSAT_VIEW" + "(:V_V_YWFW,:V_CURSOR)}");
            cstmt.setString("V_V_YWFW", V_V_YWFW);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs=(ResultSet)cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map temp = new HashMap();
                temp.put("id",rs.getString("V_CASTCODE").toString());
                temp.put("text",rs.getString("V_CASTNAME").toString());
                temp.put("parentid","0");
                temp.put("leaf",true);
                if(PRO_BASE_DEPTTOSAPCSAT_VIEW(V_V_DEPTCODE,rs.getString("V_CASTCODE").toString()).get("V_CURSOR").equals("1")){
                    temp.put("checked",true);
                }else{
                    temp.put("checked",false);
                }
                result.add(temp);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_PM_CSAT_VIEW");
        return result;
    }
    public Map PRO_BASE_DEPTTOSAPCSAT_VIEW(String V_V_DEPTCODE,String V_V_CBZX) throws SQLException {
        logger.info("begin PRO_BASE_DEPTTOSAPCSAT_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPTTOSAPCSAT_VIEW" + "(:V_V_DEPTCODE,:V_V_CBZX,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CBZX", V_V_CBZX);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_PM_CSAT_VIEW");
        return result;
    }
    public Map PRO_BASE_DEPTTOSAPCSAT_SET(String V_V_DEPTCODE,String V_V_CBZX) throws SQLException {
        logger.info("begin PRO_BASE_DEPTTOSAPCSAT_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPTTOSAPCSAT_SET" + "(:V_V_DEPTCODE,:V_V_CBZX,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CBZX", V_V_CBZX);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String)cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPTTOSAPCSAT_SET");
        return result;
    }
    public Map PRO_BASE_DEPTTOSAPCSAT_DEL(String V_V_DEPTCODE,String V_V_CBZX) throws SQLException {
        logger.info("begin PRO_BASE_DEPTTOSAPCSAT_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPTTOSAPCSAT_DEL" + "(:V_V_DEPTCODE,:V_V_CBZX,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_CBZX", V_V_CBZX);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPTTOSAPCSAT_DEL");
        return result;
    }
    public List<Map> PRO_BASE_SPECIALTY_TREE(String V_V_PERSONCODE,String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_SPECIALTY_TREE");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_SPECIALTY_TREE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for (int i=0;i<list.size();i++) {
                if (list.get(i).get("V_3").equals("99")) {
                    Map temp = new HashMap();
                    temp.put("sid", list.get(i).get("V_1"));
                    temp.put("text", list.get(i).get("V_2"));
                    temp.put("uid", list.get(i).get("V_3"));
                    temp.put("leaf", false);
                    temp.put("expanded", true);
                    temp.put("children", GetSpecialtyChildren(list, list.get(i).get("V_1").toString()));
                    if (list.get(i).get("V_4").equals("true")) {
                        temp.put("checked", true);
                    } else {
                        temp.put("checked", false);
                    }
                    result.add(temp);
                }
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_SPECIALTY_TREE");
        return result;
    }
    public List<Map> GetSpecialtyChildren(List<HashMap> list, String V_V_DEPTCODE)throws SQLException{
        List<Map> menu = new ArrayList<Map>();
        for(int i = 0; i < list.size(); i++){
            if (list.get(i).get("V_3").equals(V_V_DEPTCODE)) {
                Map temp = new HashMap();
                temp.put("sid", list.get(i).get("V_1"));
                temp.put("text", list.get(i).get("V_2"));
                temp.put("expanded", true);
                temp.put("parentid", V_V_DEPTCODE);
                if (list.get(i).get("V_4").equals("true")) {
                    temp.put("checked", true);
                } else {
                    temp.put("checked", false);
                }
                if (IsSpecialtyChildren(list, list.get(i).get("V_1").toString())) {
                    temp.put("leaf", false);
                    temp.put("children", GetSpecialtyChildren(list, list.get(i).get("V_1").toString()));
                } else {
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public boolean IsSpecialtyChildren(List<HashMap> list, String V_V_DEPTCODE)throws SQLException{
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_3").equals(V_V_DEPTCODE)) {
                return true;
            }
        }
        return false;
    }
    public Map PRO_BASE_SPECIALTYTOPERSON_DEL(String V_V_SPECIALTYCODE,String V_V_DEPTCODE,String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_BASE_SPECIALTYTOPERSON_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_SPECIALTYTOPERSON_DEL" + "(:V_V_SPECIALTYCODE,:V_V_DEPTCODE,:V_V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_V_SPECIALTYCODE", V_V_SPECIALTYCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_SPECIALTYTOPERSON_DEL");
        return result;
    }
    public Map PRO_BASE_SPECIALTYTOPERSON_SET(String V_V_SPECIALTYCODE,String V_V_DEPTCODE,String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_BASE_SPECIALTYTOPERSON_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_SPECIALTYTOPERSON_SET" + "(:V_V_SPECIALTYCODE,:V_V_DEPTCODE,:V_V_PERSONCODE,:V_CURSOR)}");
            cstmt.setString("V_V_SPECIALTYCODE", V_V_SPECIALTYCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_SPECIALTYTOPERSON_SET");
        return result;
    }
    public Map PRO_SAP_EQU_TREE_BY_EQUNAME(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUCODE,String V_V_EQUNAME) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TREE_BY_EQUNAME");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TREE_BY_EQUNAME" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUCODE,:V_V_EQUNAME,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
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
        logger.info("end PRO_SAP_EQU_TREE_BY_EQUNAME");
        return result;
    }
    public List<Map> PRO_SAP_EQU_TREE(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TREE");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TREE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            Map temp = new HashMap();
            temp.put("parentid","");
            temp.put("sid", "");
            temp.put("text", "设备树");
            temp.put("expanded", true);
            temp.put("children", GetEquChildren(list,""));
            menu.add(temp);
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_SAP_EQU_TREE");
        return menu;
    }
    public Map PRO_SAP_CAST_DROP(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_SAP_CAST_DROP");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_CAST_DROP" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
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
        logger.info("end PRO_SAP_CAST_DROP");
        return result;
    }
    public Map PRO_SAP_EQU_LEV_DROP() throws SQLException {
        logger.info("begin PRO_SAP_EQU_LEV_DROP");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_LEV_DROP" + "(:V_CURSOR)}");
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
        logger.info("end PRO_SAP_EQU_LEV_DROP");
        return result;
    }
    public Map PRO_SAP_PM_EQU_P_SET(String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUCODE,String V_V_EQULEV,String V_V_EQUNAME,String V_V_EQUSITE,String V_V_ZZCH,String V_V_EQUTYPECODE,String V_F_MONEY,String V_V_MONEYTYPE,String V_F_WEIGHT,String V_V_WEIGHTTYPE,String V_V_DATE_B,String V_V_DATE_E,String V_V_ZZS,String V_V_GGXH,String V_V_ABC,String V_V_SIZE,String V_V_CBZX,String V_V_EQUCODEUP) throws SQLException {
        logger.info("begin PRO_SAP_PM_EQU_P_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_P_SET" + "(:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUCODE,:V_V_EQULEV,:V_V_EQUNAME,:V_V_EQUSITE,:V_V_ZZCH,:V_V_EQUTYPECODE,:V_F_MONEY,:V_V_MONEYTYPE,:V_F_WEIGHT,:V_V_WEIGHTTYPE,:V_V_DATE_B,:V_V_DATE_E,:V_V_ZZS,:V_V_GGXH,:V_V_ABC,:V_V_SIZE,:V_V_CBZX,:V_V_EQUCODEUP,:V_CURSOR,:V_V_EQUCODENEW)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQULEV", V_V_EQULEV);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUSITE", V_V_EQUSITE);
            cstmt.setString("V_V_ZZCH", V_V_ZZCH);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_F_MONEY", V_F_MONEY);
            cstmt.setString("V_V_MONEYTYPE", V_V_MONEYTYPE);
            cstmt.setString("V_F_WEIGHT", V_F_WEIGHT);
            cstmt.setString("V_V_WEIGHTTYPE", V_V_WEIGHTTYPE);
            cstmt.setString("V_V_DATE_B", V_V_DATE_B);
            cstmt.setString("V_V_DATE_E", V_V_DATE_E);
            cstmt.setString("V_V_ZZS", V_V_ZZS);
            cstmt.setString("V_V_GGXH", V_V_GGXH);
            cstmt.setString("V_V_ABC", V_V_ABC);
            cstmt.setString("V_V_SIZE", V_V_SIZE);
            cstmt.setString("V_V_CBZX", V_V_CBZX);
            cstmt.setString("V_V_EQUCODEUP", V_V_EQUCODEUP);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_EQUCODENEW", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
            result.put("V_V_EQUCODENEW",(String) cstmt.getObject("V_V_EQUCODENEW"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_PM_EQU_P_SET");
        return result;
    }
    public Map PRO_SAP_EQU_TYPE_TXVAL_VIEW(String V_V_EQUCODE,String V_V_EQUTYPECODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_TXVAL_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_TXVAL_VIEW" + "(:V_V_EQUCODE,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_TXVAL_VIEW");
        return result;
    }
    public Map PRO_SAP_EQU_TYPE_VIEW(String V_V_EQUTYPENAME) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_VIEW" + "(:V_V_EQUTYPENAME,:V_CURSOR)}");
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_VIEW");
        return result;
    }
    public Map PRO_SAP_EQU_TYPE_SET(String V_V_EQUTYPECODE,String V_V_EQUTYPENAME) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_SET" + "(:V_V_EQUTYPECODE,:V_V_EQUTYPENAME,:V_CURSOR)}");
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPENAME", V_V_EQUTYPENAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_SET");
        return result;
    }
    public Map PRO_SAP_EQU_TYPE_TX_VIEW(String V_V_EQUTYPECODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_TX_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_TX_VIEW" + "(:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_TX_VIEW");
        return result;
    }
    public Map PRO_SAP_EQU_TYPE_TX_SET(String V_V_EQUTYPECODE,String V_V_EQUTYPETXCODE,String V_V_EQUTYPETXNAME,String V_V_EQUTYPETXCHAR,String V_V_EQUTYPETXLEN) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_TX_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_TX_SET" + "(:V_V_EQUTYPECODE,:V_V_EQUTYPETXCODE,:V_V_EQUTYPETXNAME,:V_V_EQUTYPETXCHAR,:V_V_EQUTYPETXLEN,:V_CURSOR)}");
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPETXCODE", V_V_EQUTYPETXCODE);
            cstmt.setString("V_V_EQUTYPETXNAME", V_V_EQUTYPETXNAME);
            cstmt.setString("V_V_EQUTYPETXCHAR", V_V_EQUTYPETXCHAR);
            cstmt.setString("V_V_EQUTYPETXLEN", V_V_EQUTYPETXLEN);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_TX_SET");
        return result;
    }
    public Map PRO_SAP_EQU_TYPE_TX_DEL(String V_V_EQUTYPECODE,String V_V_EQUTYPETXCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_TX_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_TX_DEL" + "(:V_V_EQUTYPECODE,:V_V_EQUTYPETXCODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPETXCODE", V_V_EQUTYPETXCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_TX_DEL");
        return result;
    }
    public Map PRO_SAP_EQU_TYPE_TXVAL_SET(String V_V_EQUCODE,String V_V_EQUTYPECODE,String V_V_EQUTYPETXCODE,String V_V_EQUTYPETXVALUE,String V_UPDATEALL) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_TXVAL_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_TXVAL_SET" + "(:V_V_EQUCODE,:V_V_EQUTYPECODE,:V_V_EQUTYPETXCODE,:V_V_EQUTYPETXVALUE,:V_UPDATEALL,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUTYPETXCODE", V_V_EQUTYPETXCODE);
            cstmt.setString("V_V_EQUTYPETXVALUE", V_V_EQUTYPETXVALUE);
            cstmt.setString("V_UPDATEALL", V_UPDATEALL);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_TXVAL_SET");
        return result;
    }
    public Map PRO_SAP_EQU_SITE_VIEW(String V_V_DEPTCODE,String V_V_EQUSITENAME) throws SQLException {
        logger.info("begin PRO_SAP_EQU_SITE_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_SITE_VIEW" + "(:V_V_DEPTCODE,:V_V_EQUSITENAME,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUSITENAME", V_V_EQUSITENAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_SITE_VIEW");
        return result;
    }
    public Map PRO_SAP_EQU_SITE_SET(String V_V_DEPTCODE,String V_V_EQUSITE,String V_V_EQUSITENAME) throws SQLException {
        logger.info("begin PRO_SAP_EQU_SITE_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_SITE_SET" + "(:V_V_DEPTCODE,:V_V_EQUSITE,:V_V_EQUSITENAME,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUSITE", V_V_EQUSITE);
            cstmt.setString("V_V_EQUSITENAME", V_V_EQUSITENAME);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_SITE_SET");
        return result;
    }
    public Map PRO_SAP_EQU_SITE_TOP_VIEW(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_SITE_TOP_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_SITE_TOP_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_SITE_TOP_VIEW");
        return result;
    }
    public Map PRO_SAP_PM_EQU_P_COPY(String V_V_DEPTCODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_PM_EQU_P_COPY");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_P_COPY" + "(:V_V_DEPTCODE,:V_V_EQUCODE,:V_CURSOR,:V_V_EQUCODENEW)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_V_EQUCODENEW", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
            result.put("V_V_EQUCODENEW", (String) cstmt.getObject("V_V_EQUCODENEW"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_PM_EQU_P_COPY");
        return result;
    }
    public Map PRO_SAP_PM_EQU_P_GET(String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_PM_EQU_P_GET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_P_GET" + "(:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
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
    public Map PRO_SAP_EQU_BOM_VIEW(String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_BOM_VIEW");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_BOM_VIEW" + "(:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_BOM_VIEW");
        return result;
    }
    public Map PRO_SAP_EQU_BOM_SET(String V_V_EQUCODE,String V_V_SPCODE,String V_V_SPNAME,String V_V_SPTYPE,String V_V_SPCODE_OLD,String V_V_NUMBER,String V_V_MEMO) throws SQLException {
        logger.info("begin PRO_SAP_EQU_BOM_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_BOM_SET" + "(:V_V_EQUCODE,:V_V_SPCODE,:V_V_SPNAME,:V_V_SPTYPE,:V_V_SPCODE_OLD,:V_V_NUMBER,:V_V_MEMO,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_SPCODE", V_V_SPCODE);
            cstmt.setString("V_V_SPNAME", V_V_SPNAME);
            cstmt.setString("V_V_SPTYPE", V_V_SPTYPE);
            cstmt.setString("V_V_SPCODE_OLD", V_V_SPCODE_OLD);
            cstmt.setString("V_V_NUMBER", V_V_NUMBER);
            cstmt.setString("V_V_MEMO", V_V_MEMO);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_BOM_SET");
        return result;
    }
    public Map PRO_SAP_EQU_BOM_DEL(String V_V_EQUCODE,String V_V_SPCODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_BOM_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_BOM_DEL" + "(:V_V_EQUCODE,:V_V_SPCODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_SPCODE", V_V_SPCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_BOM_DEL");
        return result;
    }
    public Map PRO_GET_DEPTEQUTYPE_ADMIN(String V_V_DEPTCODENEXT) throws SQLException {
        logger.info("begin PRO_GET_DEPTEQUTYPE_ADMIN");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_ADMIN" + "(:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
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
        logger.info("end PRO_GET_DEPTEQUTYPE_ADMIN");
        return result;
    }
    public Map PRO_GET_DEPTEQU_ADMIN(String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {
        logger.info("begin PRO_GET_DEPTEQUTYPE_ADMIN");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_ADMIN" + "(:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
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
        logger.info("end PRO_GET_DEPTEQU_ADMIN");
        return result;
    }
    public Map PRO_SAP_EQU_TYPE_TXVAL_SELECT(String V_V_EQUCODE,String V_V_EQUTYPECODE) throws SQLException {
        logger.info("begin PRO_SAP_EQU_TYPE_TXVAL_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_TYPE_TXVAL_SELECT" + "(:V_V_EQUCODE,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SAP_EQU_TYPE_TXVAL_SELECT");
        return result;
    }
    public Map PRO_PM_DEFECT_VIEW(String V_D_DEFECTDATE_B,String V_D_DEFECTDATE_E,String V_V_DEPTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE,String V_V_STATECODE,String V_V_SOURCECODE,String V_V_DEFECTLIST) throws SQLException {
        logger.info("begin PRO_PM_DEFECT_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_DEFECT_VIEW" + "(:V_D_DEFECTDATE_B,:V_D_DEFECTDATE_E,:V_V_DEPTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_STATECODE,:V_V_SOURCECODE,:V_V_DEFECTLIST,:V_CURSOR)}");
            cstmt.setString("V_D_DEFECTDATE_B", V_D_DEFECTDATE_B);
            cstmt.setString("V_D_DEFECTDATE_E", V_D_DEFECTDATE_E);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_SOURCECODE", V_V_SOURCECODE);
            cstmt.setString("V_V_DEFECTLIST", V_V_DEFECTLIST);
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
        logger.info("end PRO_PM_DEFECT_VIEW");
        return result;
    }
    public Map PRO_SAP_WORKORDER_SELECT(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_DEPTCODEREPARIR,String V_V_STATECODE,String V_EQUTYPE_CODE,String V_EQU_CODE,String V_DJ_PERCODE,String V_V_SHORT_TXT,String V_V_BJ_TXT,String V_V_ORDER_TYP) throws SQLException {
        logger.info("begin PRO_SAP_WORKORDER_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_WORKORDER_SELECT" + "(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_DEPTCODEREPARIR,:V_V_STATECODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_DJ_PERCODE,:V_V_SHORT_TXT,:V_V_BJ_TXT,:V_V_ORDER_TYP,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTCODEREPARIR", V_V_DEPTCODEREPARIR);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_DJ_PERCODE", V_DJ_PERCODE);
            cstmt.setString("V_V_SHORT_TXT", V_V_SHORT_TXT);
            cstmt.setString("V_V_BJ_TXT", V_V_BJ_TXT);
            cstmt.setString("V_V_ORDER_TYP", V_V_ORDER_TYP);
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
        logger.info("end PRO_SAP_WORKORDER_SELECT");
        return result;
    }
    public Map PRO_RUN_EQU_BJ_ALERT_ALL(String A_EQUID,String A_CYCLE_ID) throws SQLException {
        logger.info("begin PRO_RUN_EQU_BJ_ALERT_ALL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_RUN_EQU_BJ_ALERT_ALL" + "(:A_EQUID,:A_CYCLE_ID,:V_CURSOR)}");
            cstmt.setString("A_EQUID", A_EQUID);
            cstmt.setString("A_CYCLE_ID", A_CYCLE_ID);
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
        logger.info("end PRO_RUN_EQU_BJ_ALERT_ALL");
        return result;
    }
    public List<Map> OrgAndWorkspaceTree(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_DEPT_TREE");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for(int i = 0; i < list.size(); i++) {
                if (list.get(i).get("V_DEPTCODE_UP").equals("99")) {
                    Map temp = new HashMap();
                    temp.put("parentid","");
                    temp.put("sid", "");
                    temp.put("text",list.get(i).get("V_DEPTNAME"));
                    temp.put("expanded", false);
                    temp.put("children", GetDeptChildren1(list, V_V_DEPTCODE));
                    menu.add(temp);
                }
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_DEPT_TREE");
        return menu;
    }
    public List<Map> GetDeptChildren1(List<HashMap> list, String V_V_DEPTCODE)throws SQLException{
        List<Map> menu = new ArrayList<Map>();
        for(int i = 0; i < list.size(); i++){
            if (list.get(i).get("V_DEPTCODE_UP").equals(V_V_DEPTCODE)) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_DEPTCODE"));
                temp.put("text", list.get(i).get("V_DEPTNAME"));
                temp.put("leaf", false);
                temp.put("expanded", false);
                if(GetDeptChildren1(list, list.get(i).get("V_DEPTCODE").toString()).size()>0){
                    temp.put("children", GetDeptChildren1(list, list.get(i).get("V_DEPTCODE").toString()));
                }else{
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public List<Map> OrgAndWorkspaceTreeCheck(String V_V_DEPTCODE_UP,String V_V_DEPTTYPE) throws SQLException {
        logger.info("begin OrgAndWorkspaceTreeCheck");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_REPAIRT_DEPT_SEL" + "(:V_V_DEPTCODE_UP,:V_V_DEPTTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE_UP", V_V_DEPTCODE_UP);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for(int i = 0; i < list.size(); i++) {
                if (list.get(i).get("V_DEPTCODE_UP").equals("99")) {
                    Map temp = new HashMap();
                    temp.put("parentid","");
                    temp.put("sid", "");
                    temp.put("text",list.get(i).get("V_DEPTNAME"));
                    temp.put("expanded", true);
                    temp.put("children", GetDeptChildren2(list, list.get(i).get("V_DEPTCODE").toString(),V_V_DEPTCODE_UP));
                    menu.add(temp);
                }
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end OrgAndWorkspaceTreeCheck");
        return menu;
    }
    public List<Map> GetDeptChildren2(List<HashMap> list, String V_V_DEPTCODE,String V_V_DEPTCODE_UP)throws SQLException{
        List<Map> menu = new ArrayList<Map>();
        for(int i = 0; i < list.size(); i++){
            if (list.get(i).get("V_DEPTCODE_UP").equals(V_V_DEPTCODE)) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_DEPTCODE"));
                temp.put("text", list.get(i).get("V_DEPTNAME"));
                if(GetDeptChildren2(list, list.get(i).get("V_DEPTCODE").toString(),V_V_DEPTCODE_UP).size()>0){
                    temp.put("leaf", false);
                    temp.put("expanded", true);
                    temp.put("children", GetDeptChildren2(list, list.get(i).get("V_DEPTCODE").toString(),V_V_DEPTCODE_UP));
                }else{
                    temp.put("leaf", true);

                    if (IsChecked(V_V_DEPTCODE_UP,list.get(i).get("V_DEPTCODE").toString())) {
                        temp.put("checked", true);

                    }else{
                        temp.put("checked", false);
                    }
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    private boolean IsChecked(String V_V_DEPTCODE_NEW,String DEPTCODE) throws SQLException{
        logger.info("begin PRO_PM_REPAIRDEPT_VIEW");
        List<HashMap> list = new ArrayList<HashMap>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE_NEW);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_PM_REPAIRDEPT_VIEW");
        int num=0;
        for(int i=0;i<list.size();i++){
            if(list.get(i).get("V_DEPTREPAIRCODE").toString().equals(DEPTCODE)){
                num++;
            }
        }
        if(num>0){
            return true;
        }else{
            return false;
        }

    }
    public Map PRO_PM_REPAIRDEPT_SET(String V_V_DEPTCODE,String V_V_DEPTREPAIRCODE) throws SQLException {
        logger.info("begin PRO_PM_REPAIRDEPT_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_SET" + "(:V_V_DEPTCODE,:V_V_DEPTREPAIRCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTREPAIRCODE", V_V_DEPTREPAIRCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_REPAIRDEPT_SET");
        return result;
    }
    public Map PRO_PM_REPAIRDEPT_DEL(String V_V_DEPTCODE,String V_V_DEPTREPAIRCODE) throws SQLException {
        logger.info("begin PRO_PM_REPAIRDEPT_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_DEL" + "(:V_V_DEPTCODE,:V_V_DEPTREPAIRCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTREPAIRCODE", V_V_DEPTREPAIRCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_REPAIRDEPT_DEL");
        return result;
    }
    public Map PRO_BASE_PERSONROLE_VIEW() throws SQLException {
        logger.info("begin PRO_BASE_PERSONROLE_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_VIEW" + "(:V_CURSOR)}");
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
        logger.info("end PRO_BASE_PERSONROLE_VIEW");
        return result;
    }
    public Map PRO_BASE_PERSONROLE_SET(String V_V_ROLECODE,String V_V_ROLENAME,String V_V_ROLEMEMO,String V_V_ROLETYPE,String V_I_ORDERID,String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_PERSONROLE_SET");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_SET" + "(:V_V_ROLECODE,:V_V_ROLENAME,:V_V_ROLEMEMO,:V_V_ROLETYPE,:V_I_ORDERID,:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_ROLENAME", V_V_ROLENAME);
            cstmt.setString("V_V_ROLEMEMO", V_V_ROLEMEMO);
            cstmt.setString("V_V_ROLETYPE", V_V_ROLETYPE);
            cstmt.setString("V_I_ORDERID", V_I_ORDERID);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSONROLE_SET");
        return result;
    }
    public Map PRO_BASE_PERSONROLE_DEL(String V_V_ROLECODE,String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_PERSONROLE_DEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_DEL" + "(:V_V_ROLECODE,:V_V_DEPTCODE,:V_RET)}");
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_RET",(String) cstmt.getObject("V_RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSONROLE_DEL");
        return result;
    }
    private List<HashMap> PRO_BASE_ROLETOMENU_VIEW(String IS_V_ROLECODE,String V_V_DEPTCODE) throws SQLException{
        logger.info("begin PRO_BASE_ROLETOMENU_VIEW");
        List<HashMap> list = null;
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_VIEW" + "(:IS_V_ROLECODE,:V_V_DEPTCODE,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("IS_V_SYSTYPE", "1");
            cstmt.setString("IS_V_MENUCODE_UP", "%");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_ROLETOMENU_VIEW");
        return list;
    }
    private List<HashMap> PRO_BASE_MENU_VIEW(String V_V_MENUCODE) throws SQLException{
        logger.info("begin PRO_BASE_MENU_VIEW");
        List<HashMap> list =null;
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_MENU_VIEW" + "(:V_V_MENUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_MENUCODE", V_V_MENUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_MENU_VIEW");
        return list;
    }
    public List<HashMap> NewMenuTree(String role,String V_V_DEPTCODE) throws SQLException{
        logger.info("begin NewMenuTree");
        //获取list1基础菜单，list2角色菜单
        List<HashMap> list1=PRO_BASE_MENU_VIEW("%");
        List<HashMap> list2=PRO_BASE_ROLETOMENU_VIEW(role,V_V_DEPTCODE);
        List<HashMap> menu=GetMenuChildren(list1,list2,"-1");
        logger.info("end NewMenuTree");
        return menu;
    }
    public  List<HashMap> GetMenuChildren(List<HashMap> list1,List<HashMap> list2,String V_V_MENUCODE){
        List<HashMap> menu=new ArrayList<HashMap>();
        for(int i=0;i<list1.size();i++){
            if(list1.get(i).get("V_MENUCODE_UP").equals(V_V_MENUCODE)){
                HashMap temp = new HashMap();
                temp.put("id", list1.get(i).get("V_MENUCODE").toString());
                temp.put("text",list1.get(i).get("V_MENUNAME").toString());
                temp.put("parentid",V_V_MENUCODE);
                temp.put("checked", false);
                for (int j = 0; j < list2.size(); j++) {
                    if (list1.get(i).get("V_MENUCODE").toString().equals(list2.get(j).get("V_MENUCODE").toString())) {
                        temp.put("checked", true);
                    }
                }
                if(GetMenuChildren(list1,list2,list1.get(i).get("V_MENUCODE").toString()).size()>0){
                    temp.put("expanded", true);
                    temp.put("children", GetMenuChildren(list1, list2, list1.get(i).get("V_MENUCODE").toString()));
                }else{
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public List<HashMap> NewRoleTree(String role,String V_V_DEPTCODE) throws SQLException{
        logger.info("begin NewRoleTree");
        List<HashMap> list = PRO_BASE_ROLETOMENU_VIEW(role,V_V_DEPTCODE);
        List<HashMap> menu=GetRoleChildren(list,"-1");
        logger.debug("result:" + menu);
        logger.info("end NewRoleTree");
        return menu;
    }
    private List<HashMap> GetRoleChildren(List<HashMap> list,String V_V_MENUCODE){
        List<HashMap> menu=new ArrayList<HashMap>();
        for(int i=0;i<list.size();i++){
            if(list.get(i).get("V_MENUCODE_UP").equals(V_V_MENUCODE)){
                HashMap temp = new HashMap();
                temp.put("id", list.get(i).get("V_MENUCODE").toString());
                temp.put("text", list.get(i).get("V_MENUNAME").toString());
                temp.put("parentid", V_V_MENUCODE);
                if(GetRoleChildren(list,list.get(i).get("V_MENUCODE").toString()).size()>0){
                    temp.put("expanded", true);
                    temp.put("children",GetRoleChildren(list,list.get(i).get("V_MENUCODE").toString()));
                }else{
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public Map PRO_BASE_PERSON_PASS_EDIT(String V_V_PERSONCODE,String V_V_PASSWORD,String V_V_PASSWORD_NEW) throws SQLException {
        logger.info("begin PRO_BASE_PERSON_PASS_EDIT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSON_PASS_EDIT" + "(:V_V_PERSONCODE,:V_V_PASSWORD,:V_V_PASSWORD_NEW,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_PASSWORD", V_V_PASSWORD);
            cstmt.setString("V_V_PASSWORD_NEW", V_V_PASSWORD_NEW);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR",(String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_PERSON_PASS_EDIT");
        return result;
    }
    public List<Map> PRO_SAP_PM_EQU_TREE(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_PM_EQU_TREE");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_EQU_TREE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            Map temp = new HashMap();
            temp.put("parentid","");
            temp.put("sid", "-1");
            temp.put("text", "设备树");
            temp.put("expanded", true);
            temp.put("children", GetSapEquChildren(list,""));
            menu.add(temp);
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_SAP_PM_EQU_TREE");
        return menu;
    }
    private List<HashMap> GetSapEquChildren(List<HashMap> list,String V_EQUCODE){
        List<HashMap> menu = new ArrayList<HashMap>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_EQUCODEUP").equals(V_EQUCODE)) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_EQUCODE"));
                temp.put("text", list.get(i).get("V_EQUNAME"));
                temp.put("V_EQUSITE", list.get(i).get("V_EQUSITE"));
                temp.put("parentid","-1");
                temp.put("leaf", false);
                temp.put("expanded", false);
                menu.add(temp);
            }
        }
        return menu;
    }
    public List<HashMap> PRO_SAP_PM_CHILDEQU_TREE(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_V_EQUTYPECODE,String V_V_EQUCODE) throws SQLException {
        logger.info("begin PRO_SAP_PM_CHILDEQU_TREE");
        List<HashMap> menu = new ArrayList<HashMap>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SAP_PM_CHILDEQU_TREE" + "(:V_V_PERSONCODE,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_V_EQUTYPECODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            menu=GetSapChildEquChildren(list,V_V_EQUCODE);
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_SAP_PM_CHILDEQU_TREE");
        return menu;
    }
    private List<HashMap> GetSapChildEquChildren(List<HashMap> list,String V_EQUCODE){
        List<HashMap> menu = new ArrayList<HashMap>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_EQUCODEUP").equals(V_EQUCODE)) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_EQUCODE"));
                temp.put("text", list.get(i).get("V_EQUNAME"));
                temp.put("V_EQUSITE", list.get(i).get("V_EQUSITE"));
                if(GetSapChildEquChildren(list, list.get(i).get("V_EQUCODE").toString()).size()>0){
                    temp.put("expanded", false);
                    temp.put("children", GetSapChildEquChildren(list, list.get(i).get("V_EQUCODE").toString()));
                }else{
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public List<Map> PRO_PM_19_AQCS_EDIT(String V_V_AQCSCODE,String V_V_AQCSNAME,String V_V_EQUCODE,String V_V_EQUNAME,String V_V_EQUSITE) throws SQLException {
        logger.info("begin PRO_PM_19_AQCS_EDIT");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_AQCS_EDIT" + "(:V_V_AQCSCODE,:V_V_AQCSNAME,:V_V_EQUCODE,:V_V_EQUNAME,:V_V_EQUSITE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCSCODE", V_V_AQCSCODE);
            cstmt.setString("V_V_AQCSNAME", V_V_AQCSNAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUSITE", V_V_EQUSITE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_AQCS_EDIT");
        return result;
    }
    public List<Map> PRO_PM_19_AQCS_DEL(String V_V_AQCSCODE) throws SQLException {
        logger.info("begin PRO_PM_19_AQCS_DEL");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_AQCS_DEL" + "(:V_V_AQCSCODE,:V_CURSOR)}");
            cstmt.setString("V_V_AQCSCODE", V_V_AQCSCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("V_INFO", (String) cstmt.getObject("V_CURSOR"));
            result.add(sledata);
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_AQCS_DEL");
        return result;
    }
    public Map PRO_PM_19_JSYQ_EDIT(String V_V_JSYQ_CODE,String V_V_JSYQ_NAME,String V_V_EQUCODE,String V_V_EQUNAME,String V_V_EQUSITE) throws SQLException {
        logger.info("begin PRO_PM_19_JSYQ_EDIT");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_JSYQ_EDIT" + "(:V_V_JSYQ_CODE,:V_V_JSYQ_NAME,:V_V_EQUCODE,:V_V_EQUNAME,:V_V_EQUSITE,:V_CURSOR)}");
            cstmt.setString("V_V_JSYQ_CODE", V_V_JSYQ_CODE);
            cstmt.setString("V_V_JSYQ_NAME", V_V_JSYQ_NAME);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_EQUNAME", V_V_EQUNAME);
            cstmt.setString("V_V_EQUSITE", V_V_EQUSITE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_JSYQ_EDIT");
        return result;
    }
    public Map PRO_PM_19_JSYQ_DEL(String V_V_JSYQ_CODE) throws SQLException {
        logger.info("begin PRO_PM_19_JSYQ_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_19_JSYQ_DEL" + "(:V_V_JSYQ_CODE,:V_CURSOR)}");
            cstmt.setString("V_V_JSYQ_CODE", V_V_JSYQ_CODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CURSOR", (String) cstmt.getObject("V_CURSOR"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_19_JSYQ_DEL");
        return result;
    }

    public Map PRO_MM_FLOW_DIC_DEL(String V_V_DICID) throws SQLException {
        logger.info("begin PRO_MM_FLOW_DIC_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MM_FLOW_DIC_DEL" + "(:V_V_DICID,:RET)}");
            cstmt.setString("V_V_DICID", V_V_DICID);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MM_FLOW_DIC_DEL");
        return result;
    }

    public Map PM_03_FLOW_STATE_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_PLANTYPE) throws SQLException{
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_FLOW_STATE_SEL" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PLANTYPE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
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
        logger.info("end PM_03_FLOW_STATE_SEL");
        return result;

    }

    public Map PM_03_FLOW_STATE_SET(String V_V_GUID, String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_PLANTYPE, String V_V_FLOWNAME,
                                    String V_V_FLOWNAME_NEXT, String V_V_ORDER, String V_V_ROLECODE,String V_V_ROLENAME, String V_V_PERCODE) throws SQLException {
        logger.info("begin PM_03_FLOW_STATE_SET");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_FLOW_STATE_SET" + "(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PLANTYPE,:V_V_FLOWNAME," +
                    ":V_V_FLOWNAME_NEXT,:V_V_ORDER,:V_V_ROLECODE,:V_V_ROLENAME,:V_V_PERCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_FLOWNAME", V_V_FLOWNAME);

            cstmt.setString("V_V_FLOWNAME_NEXT", V_V_FLOWNAME_NEXT);
            cstmt.setString("V_V_ORDER", V_V_ORDER);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.setString("V_V_ROLENAME", V_V_ROLENAME);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);

            cstmt.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_FLOW_STATE_SET");
        return result;
    }

    public Map PM_03_FLOW_STATE_DEL(String V_V_GUID, String V_V_ID) throws SQLException {
        logger.info("begin PM_03_FLOW_STATE_DEL");
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_FLOW_STATE_DEL" + "(:V_V_GUID,:V_V_ID,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ID", V_V_ID);

            cstmt.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", (String) cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_FLOW_STATE_DEL");
        return result;
    }

    public Map PM_03_FLOW_STATE_GET(String V_V_GUID) throws SQLException{
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_FLOW_STATE_GET" + "(:V_V_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
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
        logger.info("end PM_03_FLOW_STATE_GET");
        return result;

    }

    public List<Map> deptTree(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin deptTree");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for (int i=0;i<list.size();i++) {
                if (list.get(i).get("V_DEPTCODE").equals(V_V_DEPTCODE)) {
                    Map temp = new HashMap();
                    temp.put("id", list.get(i).get("V_DEPTCODE"));
                    temp.put("text", list.get(i).get("V_DEPTNAME"));
                    temp.put("expanded", false);
                    temp.put("children", GetDeptTreeChildren(list, V_V_DEPTCODE));
                    result.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end deptTree");
        return result;
    }

    public List<Map> GetDeptTreeChildren(List<HashMap> list, String V_V_DEPTCODE)throws SQLException{
        List<Map> menu = new ArrayList<Map>();
        for(int i = 0; i < list.size(); i++){
            if (list.get(i).get("V_DEPTCODE_UP").equals(V_V_DEPTCODE)) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_DEPTCODE"));
                temp.put("text", list.get(i).get("V_DEPTNAME"));

                if(GetDeptTreeChildren(list, list.get(i).get("V_DEPTCODE").toString()).size()>0){
                    temp.put("children", GetDeptTreeChildren(list, list.get(i).get("V_DEPTCODE").toString()));
                    temp.put("leaf", false);
                    temp.put("expanded", false);
                }else{
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    public List<Map> DepartAndEquTree(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException {
        logger.info("begin DepartAndEquTree");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for (int i=0;i<list.size();i++) {
                if (list.get(i).get("V_DEPTCODE").equals(V_V_DEPTCODENEXT)) {
                    Map temp = new HashMap();
                    temp.put("id", list.get(i).get("V_DEPTCODE"));
                    temp.put("text", list.get(i).get("V_DEPTNAME"));
                    temp.put("leaf", false);
                    temp.put("expanded", false);
                    temp.put("children", GetDeptEquChildren(V_V_PERSONCODE, V_V_DEPTCODENEXT));
                    result.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end DepartAndEquTree");
        return result;
    }
    public List<Map> GetDeptEquChildren(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException{
        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
        List<Map> result = new ArrayList<Map>();
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
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for(int i = 0; i < list.size(); i++) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_EQUTYPECODE"));
                temp.put("text", list.get(i).get("V_EQUTYPENAME"));
                temp.put("leaf", true);
                result.add(temp);
//                if(GetDeptTreeChildren(list, list.get(i).get("V_DEPTCODE").toString()).size()>0){
//                    temp.put("children", GetDeptTreeChildren(list, list.get(i).get("V_DEPTCODE").toString()));
//                    temp.put("leaf", false);
//                    temp.put("expanded", false);
//                }else{
//                    temp.put("children", GetEquChildren(list, list.get(i).get("V_DEPTCODE").toString()));
//                    temp.put("leaf", false);
//                    temp.put("expanded", false);
//
//                }
            }
            conn.commit();
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

    public List<Map> GetEquChildren(String V_V_PERSONCODE,String V_V_EQUCODE) throws SQLException{
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_PERSONTOEQU_VIEW" + "(:V_V_PERSONCODE,:V_V_EQUCODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for(int i = 0; i < list.size(); i++) {
                Map temp = new HashMap();
                temp.put("id", list.get(i).get("V_PERSONCODE"));
                temp.put("text", list.get(i).get("V_PERSONNAME"));
                temp.put("leaf", true);
                result.add(temp);
            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        return result;
    }

    // 设备位置数据查找：PRO_SAP_EQU_SITE_SEL
    public Map PRO_SAP_EQU_SITE_SEL(String V_V_DEPTCODE,String V_V_EQUSITE,String V_V_EQUSITENAME)throws SQLException{
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_SAP_EQU_SITE_SEL" + "(:V_V_DEPTCODE,:V_V_EQUSITE,:V_V_EQUSITENAME,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUSITE", V_V_EQUSITE);
            cstmt.setString("V_V_EQUSITENAME", V_V_EQUSITENAME);
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
        logger.info("end PRO_SAP_EQU_SITE_SEL");
        return result;
    }
}
