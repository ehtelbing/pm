package org.building.pm.service;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class Dx_fileService {
    private static final Logger logger = Logger.getLogger(BasicService.class.getName());

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

    public HashMap PM_EDUNOTOWORKORDER(String V_EDUCODE) throws SQLException {
        logger.info("begin PM_EDUNOTOWORKORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_EDUNOTOWORKORDER(:V_EDUCODE,:RET)}");
            cstmt.setString("V_EDUCODE", V_EDUCODE);
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
        logger.info("end PM_EDUNOTOWORKORDER");
        return result;
    }

    //--附件类型
    public HashMap FILETYPE_GETLIST(String SIGN) throws SQLException {
        logger.info("begin FILETYPE_GETLIST");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call FILETYPE_GETLIST(:SIGN,:RET)}");
            cstmt.setString("SIGN", SIGN);
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
        logger.info("end FILETYPE_GETLIST");
        return result;
    }

    public Map PM_03_PLAN_PROJECT_FILE_SEL2(String V_V_GUID, String V_V_FILEGUID, String V_V_FILENAME, String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_PROJECT_FILE_SEL2");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_PROJECT_FILE_SEL2" + "(:V_V_GUID,:V_V_FILEGUID,:V_V_FILENAME,:V_V_TYPE,:V_COUNT,:V_CURSOR)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.registerOutParameter("V_COUNT", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_COUNT", (String) cstmt.getObject("V_COUNT"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_PROJECT_FILE_SEL2");
        return result;
    }

    /*检修模型添加附件*/
    public Map PM_MODEL_FILE_ADD(String V_V_FILENAME, InputStream V_V_BLOB, String V_V_FILETYPE, String V_V_MODE_GUID, String V_V_INPERCODE, String V_V_INPERNAME, String V_V_TYPE)
            throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_ADD");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_ADD" + "(:V_V_FILENAME,:V_V_BLOB,:V_V_FILETYPE,:V_V_MODE_GUID,:V_V_INPERCODE,:V_V_INPERNAME,:V_V_TYPE,:RET)}");
            cstmt.setString("V_V_FILENAME", V_V_FILENAME);
            cstmt.setBlob("V_V_BLOB", V_V_BLOB);
            cstmt.setString("V_V_FILETYPE", V_V_FILETYPE);
            cstmt.setString("V_V_MODE_GUID", V_V_MODE_GUID);
            cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);
            cstmt.setString("V_V_INPERNAME", V_V_INPERNAME);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list", (String) cstmt.getObject("RET"));

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MODEL_FILE_ADD");
        return result;
    }

    /*检修模型附件下载*/
    public Map PM_MODEL_FILE_DOWN(String V_V_FILEGUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_DOWN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_DOWN" + "(:V_V_FILEGUID,:V_V_BLOB,:RET)}");
            cstmt.setString("V_V_FILEGUID", V_V_FILEGUID);
            cstmt.registerOutParameter("V_V_BLOB", OracleTypes.BLOB);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);

            cstmt.execute();
            result.put("V_V_BLOB",(Blob) cstmt.getObject("V_V_BLOB"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MODEL_FILE_DOWN");
        return result;
    }

    /*检修模型附件查询*/
    public HashMap PM_MODEL_FILE_SEL(String V_V_MODE_GUID,String V_V_TYPE) throws SQLException {
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MODEL_FILE_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_MODEL_FILE_SEL" + "(:V_V_MODE_GUID,:V_V_TYPE,:RET)}");
            cstmt.setString("V_V_MODE_GUID", V_V_MODE_GUID);
            cstmt.setString("V_V_TYPE",V_V_TYPE);
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
        logger.info("end PM_MODEL_FILE_SEL");
        return result;
    }

    /*检修模型附件删除*/
    public HashMap PM_MODEL_FILE_DEL(String V_V_FILEGUID)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_MODEL_FILE_DEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_MODEL_FILE_DEL"+"(:V_V_FILEGUID,:RET)}");
            cstmt.setString("V_V_FILEGUID",V_V_FILEGUID);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list",(String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end PM_MODEL_FILE_DEL");
        return result;
    }

    /*检修模型附件写入大修附件*/
    public HashMap PM_MODEL_FILE_INSERT_DXF(String V_V_GUID,String V_V_FILEGUID,String V_V_FILENAME,String V_V_INPERCODE,String V_V_INPERNAME,String V_V_TYPE,String V_V_FILETYPE,String V_V_MODE_GUID)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_MODEL_FILE_INSERT_DXF");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_MODEL_FILE_INSERT_DXF"+"(:V_V_GUID,:V_V_FILEGUID,: V_V_FILENAME,:V_V_INPERCODE,:V_V_INPERNAME,:V_V_TYPE,:V_V_FILETYPE,:V_V_MODE_GUID,:RET)}");
            cstmt.setString("V_V_GUID",V_V_GUID);
            cstmt.setString("V_V_FILEGUID",V_V_FILEGUID);
            cstmt.setString("V_V_FILENAME",V_V_FILENAME);
            cstmt.setString("V_V_INPERCODE",V_V_INPERCODE);
            cstmt.setString("V_V_INPERNAME",V_V_INPERNAME);
            cstmt.setString("V_V_TYPE",V_V_TYPE);
            cstmt.setString("V_V_FILETYPE",V_V_FILETYPE);
            cstmt.setString("V_V_MODE_GUID",V_V_MODE_GUID);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list",(String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end PM_MODEL_FILE_INSERT_DXF");
        return result;
    }
    public HashMap PM_MODEL_FILE_DEL_DXF(String V_V_GUID,String V_V_MODE_GUID)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_MODEL_FILE_DEL_DXF");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_MODEL_FILE_DEL_DXF"+"(:V_V_GUID,:V_V_MODE_GUID,:RET)}");
            cstmt.setString("V_V_GUID",V_V_GUID);
            cstmt.setString("V_V_MODE_GUID",V_V_MODE_GUID);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list",(String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end PM_MODEL_FILE_DEL_DXF");
        return result;
    }
    //   大修查询模型附件
    public HashMap PM_MODEL_FILE_SEL_DXF(String V_V_GUID,String V_V_MODE_GUID)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_MODEL_FILE_SEL_DXF");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_MODEL_FILE_SEL_DXF"+"(:V_V_GUID,:V_V_MODE_GUID,:RET)}");
            cstmt.setString("V_V_GUID",V_V_GUID);
            cstmt.setString("V_V_MODE_GUID",V_V_MODE_GUID);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end PM_MODEL_FILE_SEL_DXF");
        return result;
    }
}
