package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.sun.org.apache.xpath.internal.operations.Or;
import oracle.jdbc.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class YdjService {
    private static final Logger logger = Logger.getLogger(YdjService.class.getName());

    private List<Map<String, Object>> resultHash(ResultSet rs)throws SQLException{
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        ResultSetMetaData rsm = rs.getMetaData();//??????????
        int colNum = 0;
        colNum = rsm.getColumnCount();
        while (rs.next()){//??????????????????????????????????????????????????
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
            list.add(model);
        }
        rs.close();
        return list;
    }
    @Autowired
    private ComboPooledDataSource dataSources;

    //全查询
    public HashMap selectBaseDept() throws SQLException {
        logger.info("begin BASE_DEPT_YDJ_SELECT");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement casm = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            casm = conn.prepareCall("{call BASE_DEPT_YDJ_SELECT(:V_CURSOR)}");
            casm.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            casm.execute();
            result.put("list",resultHash((ResultSet) casm.getObject("V_CURSOR")));
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            casm.close();
            conn.close();
        }

        logger.info("end BASE_DEPT_YDJ_SELECT");
        return result;
    }

    //根据id加载一条数据
    public Map<String, Object> loadBaseDept(Double I_DEPTID) throws SQLException {
        logger.info("begin BASE_DEPT_YDJ_LOAD");
        List<Map<String, Object>> result = new ArrayList<>();
        Connection conn = null;
        CallableStatement casm = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            casm = conn.prepareCall("{call BASE_DEPT_YDJ_LOAD(:I_DEPTID,:V_CURSOR)}");
            casm.setDouble("V_I_DEPTID",I_DEPTID);
            casm.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            casm.execute();
            result = resultHash((ResultSet)casm.getObject("V_CURSOR"));
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            casm.close();
            conn.close();
        }
        logger.info("end BASE_DEPT_YDJ_LOAD");
        if (result.size() == 1) {
            return result.get(0);
        }
        else {
            return null;
        }
    }
    //根据code加载一条数据
    public Map<String, Object> loadByCodeBaseDept(String V_DEPTCODE) throws SQLException {
        logger.info("begin BASE_DEPT_YDJ_LOAD_BY_CODE");
        List<Map<String, Object>> result = new ArrayList<>();
        Connection conn = null;
        CallableStatement casm = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            casm = conn.prepareCall("{call BASE_DEPT_YDJ_LOAD_BY_CODE(:V_DEPTCODE,:V_CURSOR)}");
            casm.setString("V_V_DEPTCODE",V_DEPTCODE);
            casm.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            casm.execute();
            result = resultHash((ResultSet)casm.getObject("V_CURSOR"));
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            casm.close();
            conn.close();
        }
        logger.info("end BASE_DEPT_YDJ_LOAD_BY_CODE");
        if (result.size() == 1) {
            return result.get(0);
        }
        else {
            return null;
        }
    }
    //增加
    public Map<String, Object> insertBaseDept(String V_DEPTCODE, String V_DEPTNAME, String V_DEPTSMALLNAME, String V_DEPTFULLNAME,
                                    String V_DEPTTYPE, String V_DEPTCODE_UP, Double I_ORDERID, Double I_FLAG, String V_SAP_DEPT,
                                    String V_SAP_WORK, String V_SAP_JHGC, String V_SAP_YWFW, String V_DEPT_WBS,
                                    String V_WBS_NUM, String V_WXJH_REPAIRGUID) throws SQLException {
        logger.info("begin BASE_DEPT_YDJ_INSERT");
        Map<String, Object> result =new HashMap<>();
        Connection conn = null;
        CallableStatement casm = null;
        String V_V_DEPTTYPE = V_DEPTTYPE.replaceAll(",","");

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            casm = conn.prepareCall("{call BASE_DEPT_YDJ_INSERT(:V_DEPTCODE,:V_DEPTNAME,:V_DEPTSMALLNAME,:V_DEPTFULLNAME," +
                    ":V_DEPTTYPE,:V_DEPTCODE_UP,:I_ORDERID,:I_FLAG,:V_SAP_DEPT,:V_SAP_WORK,:V_SAP_JHGC,:V_SAP_YWFW," +
                    ":V_DEPT_WBS,:V_WBS_NUM,:V_WXJH_REPAIRGUID,:V_INFO)}");
            casm.setString("V_V_DEPTCODE",V_DEPTCODE);
            casm.setString("V_V_DEPTNAME",V_DEPTNAME);
            casm.setString("V_V_DEPTSMALLNAME",V_DEPTSMALLNAME);
            casm.setString("V_V_DEPTFULLNAME",V_DEPTFULLNAME);
            casm.setString("V_V_DEPTTYPE",V_V_DEPTTYPE);
            casm.setString("V_V_DEPTCODE_UP",V_DEPTCODE_UP);
            casm.setDouble("V_I_ORDERID",I_ORDERID == null ? 0 : I_ORDERID);
            casm.setDouble("V_I_FLAG",I_FLAG);
            casm.setString("V_V_SAP_DEPT",V_SAP_DEPT);
            casm.setString("V_V_SAP_WORK",V_SAP_WORK);
            casm.setString("V_V_SAP_JHGC",V_SAP_JHGC);
            casm.setString("V_V_SAP_YWFW",V_SAP_YWFW);
            casm.setString("V_V_DEPT_WBS",V_DEPT_WBS);
            casm.setString("V_V_WBS_NUM",V_WBS_NUM);
            casm.setString("V_V_WXJH_REPAIRGUID",V_WXJH_REPAIRGUID);
            casm.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            casm.execute();
            String V_INFO = (String) casm.getObject("V_INFO");
            result.put("V_INFO",V_INFO);
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            casm.close();
            conn.close();
        }

        logger.info("end BASE_DEPT_YDJ_INSERT");
        return result;
    }

    //修改
    public Map<String, Object> updateBaseDept(Double I_DEPTID, String V_DEPTCODE, String V_DEPTNAME, String V_DEPTSMALLNAME, String V_DEPTFULLNAME,
                                    String V_DEPTTYPE, String V_DEPTCODE_UP, Double I_ORDERID, Double I_FLAG, String V_SAP_DEPT,
                                    String V_SAP_WORK, String V_SAP_JHGC, String V_SAP_YWFW, String V_DEPT_WBS,
                                    String V_WBS_NUM, String V_WXJH_REPAIRGUID) throws SQLException {
        String V_V_DEPTTYPE =V_DEPTTYPE.replaceAll(",","");
        logger.info("begin BASE_DEPT_YDJ_UPDATE");
        Map<String, Object> result = new HashMap();
        Connection conn = null;
        CallableStatement casm = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            casm = conn.prepareCall("{call BASE_DEPT_YDJ_UPDATE(:I_DEPTID,:V_DEPTCODE,:V_DEPTNAME,:V_DEPTSMALLNAME,:V_DEPTFULLNAME," +
                                         ":V_DEPTTYPE,:V_DEPTCODE_UP,:I_ORDERID,:I_FLAG,:V_SAP_DEPT,:V_SAP_WORK,:V_SAP_JHGC,:V_SAP_YWFW," +
                                         ":V_DEPT_WBS,:V_WBS_NUM,:V_WXJH_REPAIRGUID,:V_INFO)}");
            casm.setDouble("V_I_DEPTID",I_DEPTID);
            casm.setString("V_V_DEPTCODE",V_DEPTCODE);
            casm.setString("V_V_DEPTNAME",V_DEPTNAME);
            casm.setString("V_V_DEPTSMALLNAME",V_DEPTSMALLNAME);
            casm.setString("V_V_DEPTFULLNAME",V_DEPTFULLNAME);
            casm.setString("V_V_DEPTTYPE",V_V_DEPTTYPE);
            casm.setString("V_V_DEPTCODE_UP",V_DEPTCODE_UP);
            casm.setDouble("V_I_ORDERID",I_ORDERID);
            casm.setDouble("V_I_FLAG",I_FLAG);
            casm.setString("V_V_SAP_DEPT",V_SAP_DEPT);
            casm.setString("V_V_SAP_WORK",V_SAP_WORK);
            casm.setString("V_V_SAP_JHGC",V_SAP_JHGC);
            casm.setString("V_V_SAP_YWFW",V_SAP_YWFW);
            casm.setString("V_V_DEPT_WBS",V_DEPT_WBS);
            casm.setString("V_V_WBS_NUM",V_WBS_NUM);
            casm.setString("V_V_WXJH_REPAIRGUID",V_WXJH_REPAIRGUID);
            casm.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            casm.execute();
            String V_INFO = (String) casm.getObject("V_INFO");
            result.put("V_INFO",V_INFO);
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            casm.close();
            conn.close();
        }

        logger.info("end BASE_DEPT_YDJ_UPDATE");
        return result;
    }

    //删除
    public Map<String, Object> deleteBaseDept(Integer I_DEPTID) throws SQLException {
        logger.info("begin BASE_DEPT_YDJ_DELETE");
        Map<String, Object> result = new HashMap();
        Connection conn = null;
        CallableStatement casm = null;

        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            casm = conn.prepareCall("{call BASE_DEPT_YDJ_DELETE(:I_DEPTID,:V_INFO)}");
            casm.setInt("V_I_DEPTID",I_DEPTID);
            casm.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            casm.execute();
            String V_INFO = (String)casm.getObject("V_INFO");
            result.put("V_INFO",V_INFO);
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            casm.close();
            conn.close();
        }

        logger.info("begin BASE_DEPT_YDJ_DELETE");
        return result;
    }

    //移动
    public HashMap moveBaseDept(Double I_DEPTID,String V_DEPTCODE_UP) throws SQLException {
        logger.info("begin BASE_DEPT_YDJ_MOVE");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement casm = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            casm = conn.prepareCall("{call BASE_DEPT_YDJ_MOVE(:I_DEPTID,:V_DEPTCODE_UP,:V_INFO)}");
            casm.setDouble("V_I_DEPTID",I_DEPTID);
            casm.setString("V_V_DEPTCODE_UP",V_DEPTCODE_UP);
            casm.registerOutParameter("V_INFO",OracleTypes.VARCHAR);
            casm.execute();
            String V_INFO = (String) casm.getObject("V_INFO");
            result.put("V_INFO",V_INFO);
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            casm.close();
            conn.close();
        }
        logger.info("end BASE_DEPT_YDJ_MOVE");
        return result;
    }
}
