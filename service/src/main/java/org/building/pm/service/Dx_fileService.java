package org.building.pm.service;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.apache.ibatis.session.SqlSessionException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.*;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


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
    /*--2018-11-07 岗位点检 */
    public HashMap BASE_INSPECT_DAY_SELECT(String V_EQUCODE,String V_PERCODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_DAY_SELECT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_DAY_SELECT"+"(:V_EQUCODE,:V_PERCODE,:RET)}");
            cstmt.setString(V_EQUCODE,V_EQUCODE);
            cstmt.setString("V_PERCODE",V_PERCODE);
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
        logger.info("end BASE_INSPECT_DAY_SELECT");
        return result;
    }
    public HashMap BASE_INSPECT_DAY_INSERT(String V_MAINGUID,String V_EQUCODE,String V_EQUNAME,String V_INSPECT_UNIT_CODE,String V_INSPECT_UNIT,String V_INSPECT_CONTENT,
                                             String V_INSPECT_STANDARD,String V_UUID,String V_PERCODE,String V_PERNAME)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_DAY_INSERT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_DAY_INSERT"+"(:V_MAINGUID,:V_EQUCODE,:V_EQUNAME,:V_INSPECT_UNIT_CODE,:V_INSPECT_UNIT,:V_INSPECT_CONTENT,:V_INSPECT_STANDARD,:V_UUID,:V_PERCODE,:V_PERNAME,:RET)}");
            cstmt.setString(V_MAINGUID,V_MAINGUID);
            cstmt.setString(V_EQUCODE,V_EQUCODE);
            cstmt.setString("V_EQUNAME",V_EQUNAME);
            cstmt.setString(V_INSPECT_UNIT_CODE,V_INSPECT_UNIT_CODE);
            cstmt.setString("V_INSPECT_UNIT",V_INSPECT_UNIT);
            cstmt.setString(V_INSPECT_CONTENT,V_INSPECT_CONTENT);
            cstmt.setString("V_INSPECT_STANDARD",V_INSPECT_STANDARD);
            cstmt.setString(V_UUID,V_UUID);
            cstmt.setString("V_PERCODE",V_PERCODE);
            cstmt.setString(V_PERNAME,V_PERNAME);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_DAY_INSERT");
        return result;
    }

    public HashMap BASE_INSPECT_DAY_UPDATE(String V_MAINGUID,String V_PERCODE,String V_UUID,String V_STATE_SIGN)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_DAY_UPDATE");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_DAY_UPDATE"+"(:V_MAINGUID,:V_PERCODE,:V_UUID,:V_STATE_SIGN,:RET)}");
            cstmt.setString("V_MAINGUID",V_MAINGUID);
            cstmt.setString("V_PERCODE",V_PERCODE);
            cstmt.setString("V_UUID",V_UUID);
            cstmt.setString("V_STATE_SIGN",V_STATE_SIGN);

            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_DAY_UPDATE");
        return result;
    }
    public HashMap BASE_INSPECT_GETCLASS(String V_PERCODE,String DEPTCODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_GETCLASS");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_GETCLASS"+"(:V_PERCODE,:DEPTCODE,:LOGINCLASS,:RET)}");
            cstmt.setString("V_PERCODE",V_PERCODE);
            cstmt.setString("DEPTCODE",DEPTCODE);

            cstmt.registerOutParameter("LOGINCLASS",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();

            result.put("LOGINCLASS",(String) cstmt.getObject("LOGINCLASS"));
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_GETCLASS");
        return result;
    }
    public HashMap BASE_INSPECT_GETNEXTPERSON(String SAP_WORK)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_GETNEXTPERSON");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_GETNEXTPERSON"+"(:SAP_WORK,:RET)}");
            cstmt.setString("SAP_WORK",SAP_WORK);
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
        logger.info("end BASE_INSPECT_GETNEXTPERSON");
        return result;
    }
    public HashMap BASE_INSPECT_WRITE_INSERT(String V_MAINGUID,String V_INPERCODE,String V_NEXTPRECODE,String V_INCLASS,
      String V_NEXTCLASS,String V_NCLASSNAME,String V_INSPECT_RESULTE,String V_REQUESTION,String V_EQUESTION,
      String V_OTHER_QIUEST)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_WRITE_INSERT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_WRITE_INSERT"+"(:V_MAINGUID,:V_INPERCODE,:V_NEXTPRECODE,:V_INCLASS,:V_NEXTCLASS,:V_NCLASSNAME,:V_INSPECT_RESULTE,:V_REQUESTION,:V_EQUESTION,:V_OTHER_QIUEST,:V_CHGUID,:RET)}");
            cstmt.setString("V_MAINGUID",V_MAINGUID);
            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_NEXTPRECODE",V_NEXTPRECODE);
            cstmt.setString("V_INCLASS",V_INCLASS);
            cstmt.setString("V_NEXTCLASS",V_NEXTCLASS);
            cstmt.setString("V_NCLASSNAME",V_NCLASSNAME);
            cstmt.setString("V_INSPECT_RESULTE",V_INSPECT_RESULTE);
            cstmt.setString("V_REQUESTION",V_REQUESTION);
            cstmt.setString("V_EQUESTION",V_EQUESTION);
            cstmt.setString("V_OTHER_QIUEST",V_OTHER_QIUEST);

            cstmt.registerOutParameter("V_CHGUID",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CHGUID",(String) cstmt.getObject("V_CHGUID"));
            result.put("RET",(String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_WRITE_INSERT");
        return result;
    }
    public HashMap BASE_INSPECT_WRITE_UPDATE(String V_MAINGUID,String V_CHILDGUID,String V_PERCODE,String V_NEXT_CLASS,
                                             String V_NEXTPERCODE,String V_INSPECT_RESULTE,String V_REQUESTION,String V_EQUESTION,String V_OTHER_QIUEST)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_WRITE_UPDATE");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_WRITE_UPDATE"+"(:V_MAINGUID,:V_CHILDGUID,:V_PERCODE,:V_NEXT_CLASS,:V_NEXTPERCODE,:V_INSPECT_RESULTE,:V_REQUESTION,:V_EQUESTION,:V_OTHER_QIUEST,:RET)}");
            cstmt.setString("V_MAINGUID",V_MAINGUID);
            cstmt.setString("V_CHILDGUID",V_CHILDGUID);
            cstmt.setString("V_PERCODE",V_PERCODE);
            cstmt.setString("V_NEXT_CLASS",V_NEXT_CLASS);
            cstmt.setString("V_NEXTPERCODE",V_NEXTPERCODE);
            cstmt.setString("V_INSPECT_RESULTE",V_INSPECT_RESULTE);
            cstmt.setString("V_REQUESTION",V_REQUESTION);
            cstmt.setString("V_EQUESTION",V_EQUESTION);
            cstmt.setString("V_OTHER_QIUEST",V_OTHER_QIUEST);

            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",(String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_WRITE_UPDATE");
        return result;
    }
    public HashMap BASE_INSPECT_WRITE_SELECT(String V_MAINGUID,String V_CHILDGUID,String V_PERCODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_WRITE_SELECT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_WRITE_SELECT"+"(:V_MAINGUID,:V_CHILDGUID,:V_PERCODE,:RET)}");
            cstmt.setString("V_MAINGUID",V_MAINGUID);
            cstmt.setString("V_CHILDGUID",V_CHILDGUID);
            cstmt.setString("V_PERCODE",V_PERCODE);

            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_WRITE_SELECT");
        return result;
    }
    //-------首页日检数量
    public HashMap BASE_INSPECT_WRITE_SELNUM(String V_PERCODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_WRITE_SELNUM");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_WRITE_SELNUM"+"(:V_PERCODE,:NUM,:RET)}");
            cstmt.setString("V_PERCODE",V_PERCODE);

            cstmt.registerOutParameter("NUM",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("NUM",(String) cstmt.getObject("NUM"));
            result.put("RET",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_WRITE_SELNUM");
        return result;
    }
    //---待办日检明细
    public HashMap BASE_INSPECT_SELTODOS(String V_CHILDGUID,String V_PERSON)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_SELTODOS");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_SELTODOS"+"(:V_CHILDGUID,:V_PERSON,:RET)}");
            cstmt.setString("V_CHILDGUID",V_CHILDGUID);
            cstmt.setString(V_PERSON,V_PERSON);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_SELTODOS");
        return result;
    }

    public HashMap BASE_INSPECT_WRITE_INSERT2(String V_MAINGUID,String V_CHILDGUID,String V_INPERCODE,String V_NEXTPRECODE,String V_INCLASS,
                                             String V_NEXTCLASS,String V_NCLASSNAME,String V_INSPECT_RESULTE,String V_REQUESTION,String V_EQUESTION,
                                             String V_OTHER_QIUEST)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin BASE_INSPECT_WRITE_INSERT2");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call BASE_INSPECT_WRITE_INSERT2"+"(:V_MAINGUID,:V_CHILDGUID,:V_INPERCODE,:V_NEXTPRECODE,:V_INCLASS,:V_NEXTCLASS,:V_NCLASSNAME,:V_INSPECT_RESULTE,:V_REQUESTION,:V_EQUESTION,:V_OTHER_QIUEST,:V_CHGUID,:RET)}");
            cstmt.setString("V_MAINGUID",V_MAINGUID);
            cstmt.setString("V_CHILDGUID",V_CHILDGUID);
            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_NEXTPRECODE",V_NEXTPRECODE);
            cstmt.setString("V_INCLASS",V_INCLASS);
            cstmt.setString("V_NEXTCLASS",V_NEXTCLASS);
            cstmt.setString("V_NCLASSNAME",V_NCLASSNAME);
            cstmt.setString("V_INSPECT_RESULTE",V_INSPECT_RESULTE);
            cstmt.setString("V_REQUESTION",V_REQUESTION);
            cstmt.setString("V_EQUESTION",V_EQUESTION);
            cstmt.setString("V_OTHER_QIUEST",V_OTHER_QIUEST);

            cstmt.registerOutParameter("V_CHGUID",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_CHGUID",(String) cstmt.getObject("V_CHGUID"));
            result.put("RET",(String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end BASE_INSPECT_WRITE_INSERT2");
        return result;
    }
    //----周计划上报设备部
    public List<Map> PRO_PM_03_PLAN_WEEK_SEND2(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,
                                              String V_V_FLOWCODE, String  V_V_PLANTYPE,
                                              String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_SEND2");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SEND2(:V_V_WEEKPLAN_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_SEND2");
        return result;
    }
    // plan report to find next person  week/month
    public HashMap PM_ACTIVITI_PROCESS_PER_SELSBB(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRCODE,String V_V_FLOWTYPE,String V_V_FLOW_STEP,String V_V_PERCODE,String V_V_SPECIALTY,String V_V_WHERE) throws SQLException {

        logger.info("begin PM_ACTIVITI_PROCESS_PER_SELSBB");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_PROCESS_PER_SELSBB" + "(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRCODE,:V_V_FLOWTYPE,:V_V_FLOW_STEP,:V_V_PERCODE,:V_V_SPECIALTY,:V_V_PROCESS_CODE,:V_V_WHERE,:V_CURSOR)}");
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRCODE", V_V_REPAIRCODE);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setString("V_V_FLOW_STEP", V_V_FLOW_STEP);
            cstmt.setString("V_V_PERCODE", V_V_PERCODE);
            cstmt.setString("V_V_SPECIALTY", V_V_SPECIALTY);
            cstmt.setString("V_V_WHERE", V_V_WHERE);
            cstmt.registerOutParameter("V_V_PROCESS_CODE", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            result.put("RET", cstmt.getString("V_V_PROCESS_CODE"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_ACTIVITI_PROCESS_PER_SELSBB");
        return result;
    }
    //  plan report to sbb select date
    public HashMap PRO_PM_03_PLAN_WEEK_VIEWSBB(String V_V_YEAR,String V_V_MONTH,String V_V_WEEK,String V_V_ORGCODE,String V_V_DEPTCODE,
                                            String V_V_ZY,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_CONTENT,String V_V_STATE,
                                            String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_VIEWSBB");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_VIEWSBB(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_ZY,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_STATE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total",cstmt.getString("V_SUMNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_VIEWSBB");
        return result;
    }
    // 上报设备部周计划数据添加
    public List<Map> PRO_PM_03_PLAN_WEEK_SENDSBB(String V_V_GUID,String V_UPSBBPER) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_SENDSBB");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SENDSBB(:V_V_GUID,:V_UPSBBPER,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_UPSBBPER", V_UPSBBPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_SENDSBB");
        return result;
    }
    // SBB办理绑定周计划数据
    public HashMap PRO_PM_03_PLAN_WEEK_GET2(String V_V_WEEKPLAN_GUID) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_GET2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_GET2" + "(:V_V_WEEKPLAN_GUID,:V_CURSOR)}");
            cstmt.setString("V_V_WEEKPLAN_GUID", V_V_WEEKPLAN_GUID);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_GET2");
        return result;
    }
    // 设备部管理业查询待办和已办数据
    public HashMap PM_03_PLAN_WEEK_SEL2(String V_V_YEAR,String V_V_MONTH,String V_V_WEEK,
                                       String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_ZY,
                                       String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_CONTENT,String V_V_FLOWTYPE,String V_V_STATE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PM_03_PLAN_WEEK_SEL2");
//      logger.debug("params:V_V_DEPTREPAIRCODE:" + V_V_DEPTREPAIRCODE);

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_PLAN_WEEK_SEL2" + "(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK," +
                    ":V_V_ORGCODE,:V_V_DEPTCODE,:V_V_ZY,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_FLOWTYPE,:V_V_STATE,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_FLOWTYPE", V_V_FLOWTYPE);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total", cstmt.getString("V_SUMNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_WEEK_SEL2");
        return result;
    }
    // month report to sbb data
    public HashMap PM_03_MONTH_PLAN_BYPER_SEL2(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_ZY,String V_V_CONTENT,String V_V_STATECODE,String V_V_PEROCDE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_BYPER_SEL2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_BYPER_SEL2" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_STATECODE,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_PEROCDE", V_V_PEROCDE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total",cstmt.getString("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_BYPER_SEL2");
        return result;
    }

    // month report to sbb data view   PM_03_MONTH_PLAN_SEL2
    public HashMap PM_03_MONTH_PLAN_SEL2(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_ZY,String V_V_CONTENT,String V_V_STATECODE,String V_V_PEROCDE,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {
        logger.info("begin PM_03_MONTH_PLAN_SEL2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_03_MONTH_PLAN_SEL2" + "(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_ZY,:V_V_CONTENT,:V_V_STATECODE,:V_V_PEROCDE,:V_V_PAGE,:V_V_PAGESIZE,:V_V_SNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);
            cstmt.setString("V_V_PEROCDE", V_V_PEROCDE);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_V_SNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total",cstmt.getString("V_V_SNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_SEL2");
        return result;
    }
  //  SBB 月计划办理获取数据
  public HashMap PRO_PM_03_PLAN_MONTH_GET2(String V_V_MONTHPLAN_GUID) throws SQLException {
      logger.info("begin PRO_PM_03_PLAN_MONTH_GET2");
      HashMap result = new HashMap();
      Connection conn = null;
      CallableStatement cstmt = null;
      try {
          conn = dataSources.getConnection();
          conn.setAutoCommit(false);
          cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_GET2" + "(:V_V_MONTHPLAN_GUID,:V_CURSOR)}");
          cstmt.setString("V_V_MONTHPLAN_GUID", V_V_MONTHPLAN_GUID);
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
      logger.info("end PRO_PM_03_PLAN_MONTH_GET2");
      return result;
  }
  // 从新发起工单数据填报按钮
    public HashMap INSERT_RESTARTPROC() throws SQLException{
        logger.info("begin INSERT_RESTARTPROC");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call INSERT_RESTARTPROC" + "(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET",cstmt.getString("RET"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end INSERT_RESTARTPROC");
        return result;
    }

    // 备件使用情况查询
    public HashMap PRO_SPARE_SELECT2(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_EQUTYPE_CODE,String V_EQU_CODE,String V_V_SPARE) throws SQLException {
        logger.info("begin PRO_SPARE_SELECT2");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SPARE_SELECT2(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_V_SPARE,:V_TOPNAME,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_V_SPARE", V_V_SPARE);
            cstmt.registerOutParameter("V_TOPNAME",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET",cstmt.getString("V_TOPNAME"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SPARE_SELECT2");
        return result;
    }

    // 备件使用情况工单明细查询
    public HashMap PRO_SPARE_SELECT_WORKORDER(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,String V_EQUTYPE_CODE,String V_EQU_CODE,String V_V_SPARE,String V_V_SAPRECODE) throws SQLException {
        logger.info("begin PRO_SPARE_SELECT_WORKORDER");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_SPARE_SELECT_WORKORDER(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_DEPTCODE,:V_V_DEPTNEXTCODE,:V_EQUTYPE_CODE,:V_EQU_CODE,:V_V_SPARE,:V_V_SAPRECODE,:V_TOPNAME,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B", V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E", V_D_ENTER_DATE_E);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_DEPTNEXTCODE", V_V_DEPTNEXTCODE);
            cstmt.setString("V_EQUTYPE_CODE", V_EQUTYPE_CODE);
            cstmt.setString("V_EQU_CODE", V_EQU_CODE);
            cstmt.setString("V_V_SPARE", V_V_SPARE);
            cstmt.setString("V_V_SAPRECODE", V_V_SAPRECODE);
            cstmt.registerOutParameter("V_TOPNAME",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET",cstmt.getString("V_TOPNAME"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_SPARE_SELECT_WORKORDER");
        return result;
    }
    public Map PRO_YEAR_PROJECT_MXUSE_SEL2(String V_V_PROJECTGUID,String V_V_TYPE,String V_SDATE,String V_EDATE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PROJECT_MXUSE_SEL2");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PROJECT_MXUSE_SEL2" + "(:V_V_PROJECTGUID,:V_V_TYPE,:V_SDATE,:V_EDATE,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTGUID", V_V_PROJECTGUID);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
            cstmt.setString("V_SDATE", V_SDATE);
            cstmt.setString("V_EDATE", V_EDATE);
            cstmt.registerOutParameter("V_NUM",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM",cstmt.getString("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_YEAR_PROJECT_MXUSE_SEL2");
        return result;
    }
    // 大修缺陷明细
    public Map PRO_YEAR_PROJECT_DEFECT_SEL(String V_V_PROJECTGUID,String V_SDATE,String V_EDATE)throws SQLException{
        Map result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PRO_YEAR_PROJECT_DEFECT_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PRO_YEAR_PROJECT_DEFECT_SEL(:V_V_PROJECTGUID,:V_SDATE,:V_EDATE,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTGUID",V_V_PROJECTGUID);
            cstmt.setString("V_SDATE",V_SDATE);
            cstmt.setString("V_EDATE",V_EDATE);
            cstmt.registerOutParameter("V_NUM",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM",cstmt.getString("V_NUM"));
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end PRO_YEAR_PROJECT_DEFECT_SEL");
        return result;
    }
    // 大修关联工单明细
    public Map PRO_YEAR_PROJECT_WORKORDER_SEL(String V_V_PROJECTGUID)throws SQLException{
        Map result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PRO_YEAR_PROJECT_WORKORDER_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PRO_YEAR_PROJECT_WORKORDER_SEL(:V_V_PROJECTGUID,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_PROJECTGUID",V_V_PROJECTGUID);
            cstmt.registerOutParameter("V_NUM",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM",cstmt.getString("V_NUM"));
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:"+result);
        logger.info("end PRO_YEAR_PROJECT_WORKORDER_SEL");
        return result;
    }
    // 周计划按人员查询作业区全部
    public HashMap PRO_PM_03_PLAN_WEEK_VIEW2(String V_V_YEAR,String V_V_MONTH,String V_V_WEEK,String V_V_ORGCODE,String V_V_DEPTCODE,
                                            String V_V_ZY,String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_CONTENT,String V_V_STATE,
                                            String V_V_PERSONCODE,String V_V_DEPTTYPE,String V_V_INPER,String V_V_PAGE,String V_V_PAGESIZE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_VIEW");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_VIEW2(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_ZY,:V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTENT,:V_V_STATE,:V_V_PERSONCODE,:V_V_DEPTTYPE,:V_V_INPER,:V_V_PAGE,:V_V_PAGESIZE,:V_SUMNUM,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ZY", V_V_ZY);
            cstmt.setString("V_V_EQUTYPE", V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STATE", V_V_STATE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTTYPE", V_V_DEPTTYPE);
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_PAGE", V_V_PAGE);
            cstmt.setString("V_V_PAGESIZE", V_V_PAGESIZE);
            cstmt.registerOutParameter("V_SUMNUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("total",cstmt.getString("V_SUMNUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_VIEW2");
        return result;
    }

    // 设备部驳回修改
    public Map PRO_PM_03_PLAN_WEEK_NSETSBB(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_WEEK,
                                        String V_V_ORGCODE, String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE,
                                        String V_V_CONTENT, String V_V_STARTTIME, String V_V_ENDTIME, String V_V_OTHERPLAN_GUID, String V_V_OTHERPLAN_TYPE,
                                        String V_V_JHMX_GUID, String V_V_HOUR, String V_V_BZ, String V_V_DEFECTGUID, String V_V_MAIN_DEFECT, String V_V_EXPECT_AGE, String V_V_REPAIR_PER
            ,String V_V_PDC/*,String V_V_SGDATE*/,String V_V_GYYQ,String V_V_CHANGPDC,/*String V_V_JXRESON,*/String V_V_JXHOUR,String V_V_JJHOUR,
            /*String V_V_JHHOUR,*/String V_V_TELNAME,String V_V_TELNUMB,String V_V_PDGG,String V_V_THICKNESS,String V_V_REASON,String V_V_EVERTIME
            ,String V_V_FLAG,String V_V_RDEPATCODE,String V_V_RDEPATNAME,String V_V_SGWAY,String V_V_SGWAYNAME,String V_V_OPERANAME
    ) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_WEEK_NSETSBB");
        Map result = new HashMap<String, Object>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_NSETSBB" + "(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                    ":V_V_OTHERPLAN_GUID,:V_V_OTHERPLAN_TYPE,:V_V_JHMX_GUID,:V_V_HOUR,:V_V_BZ,:V_V_DEFECTGUID,:V_V_MAIN_DEFECT,:V_V_EXPECT_AGE,:V_V_REPAIR_PER,"+
                    ":V_V_PDC,/*:V_V_SGDATE,*/:V_V_GYYQ,:V_V_CHANGPDC,/*:V_V_JXRESON,*/:V_V_JXHOUR,:V_V_JJHOUR,/*:V_V_JHHOUR,*/:V_V_TELNAME,:V_V_TELNUMB,:V_V_PDGG,"+
                    ":V_V_THICKNESS,:V_V_REASON,:V_V_EVERTIME,:V_V_FLAG,:V_V_RDEPATCODE,:V_V_RDEPATNAME,:V_V_SGWAY,:V_V_SGWAYNAME,:V_V_OPERANAME,:V_INFO)}");
            cstmt.setString("V_V_INPER", V_V_INPER);
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_YEAR", V_V_YEAR);
            cstmt.setString("V_V_MONTH", V_V_MONTH);
            cstmt.setString("V_V_WEEK", V_V_WEEK);

            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
            cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);

            cstmt.setString("V_V_CONTENT", V_V_CONTENT);
            cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
            cstmt.setString("V_V_OTHERPLAN_GUID", V_V_OTHERPLAN_GUID);
            cstmt.setString("V_V_OTHERPLAN_TYPE", V_V_OTHERPLAN_TYPE);

            cstmt.setString("V_V_JHMX_GUID", V_V_JHMX_GUID);
            cstmt.setString("V_V_HOUR", V_V_HOUR);
            cstmt.setString("V_V_BZ", V_V_BZ);
            cstmt.setString("V_V_DEFECTGUID", V_V_DEFECTGUID);
            cstmt.setString("V_V_MAIN_DEFECT", V_V_MAIN_DEFECT);
            cstmt.setString("V_V_EXPECT_AGE", V_V_EXPECT_AGE);
            cstmt.setString("V_V_REPAIR_PER", V_V_REPAIR_PER);

            cstmt.setString("V_V_PDC", V_V_PDC);
            cstmt.setString("V_V_GYYQ", V_V_GYYQ);
            cstmt.setString("V_V_CHANGPDC", V_V_CHANGPDC);
            cstmt.setString("V_V_JXHOUR", V_V_JXHOUR);
            cstmt.setString("V_V_JJHOUR", V_V_JJHOUR);
            cstmt.setString("V_V_TELNAME", V_V_TELNAME);
            cstmt.setString("V_V_TELNUMB", V_V_TELNUMB);
            cstmt.setString("V_V_PDGG", V_V_PDGG);

            cstmt.setString("V_V_THICKNESS",V_V_THICKNESS);
            cstmt.setString("V_V_REASON",V_V_REASON);
            cstmt.setString("V_V_EVERTIME",V_V_EVERTIME);
            cstmt.setString("V_V_FLAG",V_V_FLAG);
            cstmt.setString("V_V_RDEPATCODE",V_V_RDEPATCODE);
            cstmt.setString("V_V_RDEPATNAME",V_V_RDEPATNAME);
            cstmt.setString("V_V_SGWAY",V_V_SGWAY);
            cstmt.setString("V_V_SGWAYNAME",V_V_SGWAYNAME);
            cstmt.setString("V_V_OPERANAME",V_V_OPERANAME);
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
        logger.info("end PRO_PM_03_PLAN_WEEK_NSETSBB");
        return result;
    }
    // 修改上报设备部审批状态
    public HashMap PRO_PM_03_PLAN_WEEK_SET_STATESBB(String V_V_GUID, String V_V_STATECODE) throws SQLException {

        logger.info("begin PRO_PM_03_PLAN_WEEK_SET_STATESBB");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_SET_STATESBB" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");

            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_STATECODE", V_V_STATECODE);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("V_INFO", cstmt.getObject("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_03_PLAN_WEEK_SET_STATESBB");
        return result;
    }
  //设备部月计划驳回修改
  public Map PRO_PM_03_PLAN_MONTH_SETSBB(String V_V_INPER, String V_V_GUID, String V_V_YEAR, String V_V_MONTH, String V_V_ORGCODE,
                                      String V_V_DEPTCODE, String V_V_EQUTYPECODE, String V_V_EQUCODE, String V_V_REPAIRMAJOR_CODE, String V_V_CONTENT,
                                      String V_V_STARTTIME, String V_V_ENDTIME, String V_V_OTHERPLAN_GUID, String V_V_OTHERPLAN_TYPE, String V_V_JHMX_GUID,
                                      String V_V_HOUR, String V_V_BZ, String V_V_MAIN_DEFECT, String V_V_EXPECT_AGE, String V_V_REPAIR_PER,
                                      String V_V_SGWAY,String V_V_SGWAYNAME,String V_V_FLAG,String V_V_OPERANAME) throws SQLException {
      logger.info("begin PRO_PM_03_PLAN_MONTH_SETSBB");
      Map result = new HashMap();
      Connection conn = null;
      CallableStatement cstmt = null;
      try {
          conn = dataSources.getConnection();
          conn.setAutoCommit(true);
          cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_SETSBB" + "(:V_V_INPER,:V_V_GUID,:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_V_DEPTCODE," +
                  ":V_V_EQUTYPECODE,:V_V_EQUCODE,:V_V_REPAIRMAJOR_CODE,:V_V_CONTENT,:V_V_STARTTIME,:V_V_ENDTIME," +
                  ":V_V_FLV_V_OTHERPLAN_GUIDOWCODE,:V_V_OTHERPLAN_TYPE,:V_V_JHMX_GUID,:V_V_HOUR,:V_V_BZ,:V_V_MAIN_DEFECT,:V_V_EXPECT_AGE,:V_V_REPAIR_PER,"+
                  ":V_V_SGWAY,:V_V_SGWAYNAME,:V_V_FLAG,:V_V_OPERANAME,:V_INFO)}");
          cstmt.setString("V_V_INPER", V_V_INPER);
          cstmt.setString("V_V_GUID", V_V_GUID);
          cstmt.setString("V_V_YEAR", V_V_YEAR);
          cstmt.setString("V_V_MONTH", V_V_MONTH);
          cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);

          cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
          cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
          cstmt.setString("V_V_EQUCODE", V_V_EQUCODE);
          cstmt.setString("V_V_REPAIRMAJOR_CODE", V_V_REPAIRMAJOR_CODE);
          cstmt.setString("V_V_CONTENT", V_V_CONTENT);

          cstmt.setString("V_V_STARTTIME", V_V_STARTTIME);
          cstmt.setString("V_V_ENDTIME", V_V_ENDTIME);
          cstmt.setString("V_V_OTHERPLAN_GUID", V_V_OTHERPLAN_GUID);
          cstmt.setString("V_V_OTHERPLAN_TYPE", V_V_OTHERPLAN_TYPE);
          cstmt.setString("V_V_JHMX_GUID", V_V_JHMX_GUID);
          cstmt.setString("V_V_HOUR", V_V_HOUR);
          cstmt.setString("V_V_BZ", V_V_BZ);
          cstmt.setString("V_V_MAIN_DEFECT", V_V_MAIN_DEFECT);
          cstmt.setString("V_V_EXPECT_AGE", V_V_EXPECT_AGE);
          cstmt.setString("V_V_REPAIR_PER", V_V_REPAIR_PER);

          cstmt.setString("V_V_SGWAY", V_V_SGWAY);
          cstmt.setString("V_V_SGWAYNAME", V_V_SGWAYNAME);
          cstmt.setString("V_V_FLAG", V_V_FLAG);
          cstmt.setString("V_V_OPERANAME",V_V_OPERANAME);

          cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
          cstmt.execute();
          result.put("V_INFO", cstmt.getObject("V_INFO"));
      } catch (SQLException e) {
          logger.error(e);
      } finally {
          cstmt.close();
          conn.close();
      }
      logger.debug("result:" + result);
      logger.info("end PRO_PM_03_PLAN_MONTH_SETSBB");
      return result;
  }
  // 月计划上报设备部修改状态
  public HashMap PRO_PM_03_PLAN_MONTH_SET_STATESBB(String V_V_GUID, String V_V_STATECODE) throws SQLException {

      logger.info("begin PRO_PM_03_PLAN_WEEK_SET_STATESBB");
      HashMap result = new HashMap();
      Connection conn = null;
      CallableStatement cstmt = null;
      try {
          conn = dataSources.getConnection();
          conn.setAutoCommit(false);
          cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_MONTH_SET_STATESBB" + "(:V_V_GUID,:V_V_STATECODE,:V_INFO)}");

          cstmt.setString("V_V_GUID", V_V_GUID);
          cstmt.setString("V_V_STATECODE", V_V_STATECODE);

          cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
          cstmt.execute();
          result.put("V_INFO", cstmt.getObject("V_INFO"));
      } catch (SQLException e) {
          logger.error(e);
      } finally {
          cstmt.close();
          conn.close();
      }
      logger.debug("result:" + result);
      logger.info("end PRO_PM_03_PLAN_MONTH_SET_STATESBB");
      return result;
  }
  // 大修生成工单查询
  public HashMap PM_PROJECT_WORKORDER_CREATE(String V_V_PROJECT_GUID, String V_V_INPERCODE) throws SQLException {

      logger.info("begin PM_PROJECT_WORKORDER_CREATE");
      HashMap result = new HashMap();
      Connection conn = null;
      CallableStatement cstmt = null;
      try {
          conn = dataSources.getConnection();
          conn.setAutoCommit(false);
          cstmt = conn.prepareCall("{call PM_PROJECT_WORKORDER_CREATE" + "(:V_V_PROJECT_GUID,:V_V_INPERCODE,:V_CURSOR)}");

          cstmt.setString("V_V_PROJECT_GUID", V_V_PROJECT_GUID);
          cstmt.setString("V_V_INPERCODE", V_V_INPERCODE);

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
      logger.info("end PM_PROJECT_WORKORDER_CREATE");
      return result;
  }
  public HashMap PM_1917_JXMX_DATA_SEL_WORKDESC(String V_V_MX_CODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_1917_JXMX_DATA_SEL_WORKDESC");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_1917_JXMX_DATA_SEL_WORKDESC(:V_V_MX_CODE,:RET)}");
            cstmt.setString("V_V_MX_CODE",V_V_MX_CODE);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
      logger.debug("result:" + result);
      logger.info("end PM_1917_JXMX_DATA_SEL_WORKDESC");
      return result;
  }
  public HashMap PRO_YEAR_PROJECT_SEL_WORK(String DX_GUID,String STARTTIME,String ENDTIME)throws SQLException{
        HashMap result=new HashMap();
      Connection conn=null;
      CallableStatement cstmt=null;
      try{
          logger.info("begin PRO_YEAR_PROJECT_SEL_WORK");
          conn=dataSources.getConnection();
          conn.setAutoCommit(false);
          cstmt=conn.prepareCall("{call PRO_YEAR_PROJECT_SEL_WORK(:DX_GUID,:STARTTIME,:ENDTIME,:V_NUM,:RET)}");
          cstmt.setString("DX_GUID",DX_GUID);
          cstmt.setString("STARTTIME",STARTTIME);
          cstmt.setString("ENDTIME",ENDTIME);
          cstmt.registerOutParameter("V_NUM",OracleTypes.VARCHAR);
          cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
          cstmt.execute();
          result.put("V_NUM",cstmt.getString("V_NUM"));
          result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
      }catch(SQLException e){
          logger.error(e);
      }finally{
          cstmt.close();
          conn.close();
      }
      logger.debug("result:" + result);
      logger.info("end PRO_YEAR_PROJECT_SEL_WORK");
      return result;
  }
  //大修工单施工方-所有工单相关检修单位
  public HashMap PRO_YEAR_PROJECT_REDEPT_SEL(String V_V_PROJECTGUID)throws SQLException{
      HashMap result=new HashMap();
      Connection conn=null;
      CallableStatement cstmt=null;
      try{
          logger.info("begin PRO_YEAR_PROJECT_REDEPT_SEL");
          conn=dataSources.getConnection();
          conn.setAutoCommit(false);
          cstmt=conn.prepareCall("{call PRO_YEAR_PROJECT_REDEPT_SEL(:V_V_PROJECTGUID,:V_NUM,:V_CURSOR)}");
          cstmt.setString("V_V_PROJECTGUID",V_V_PROJECTGUID);

          cstmt.registerOutParameter("V_NUM",OracleTypes.VARCHAR);
          cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
          cstmt.execute();
          result.put("V_NUM",cstmt.getString("V_NUM"));
          result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
      }catch(SQLException e){
          logger.error(e);
      }finally{
          cstmt.close();
          conn.close();
      }
      logger.debug("result:" + result);
      logger.info("end PRO_YEAR_PROJECT_REDEPT_SEL");
      return result;
  }

  // 大修检修单位
    public HashMap PM_03_PLAN_REPAIR_DEPT_SEL2(String V_V_GUID)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_03_PLAN_REPAIR_DEPT_SEL2");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_03_PLAN_REPAIR_DEPT_SEL2(:V_V_GUID,:V_NUM,:V_CURSOR)}");
            cstmt.setString("V_V_GUID",V_V_GUID);
            cstmt.registerOutParameter("V_NUM",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM",cstmt.getString("V_NUM"));
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_PLAN_REPAIR_DEPT_SEL2");
        return result;
    }
    // 大修检修查询工单
    public HashMap PRO_YEAR_PROJECT_SEL_WORKGUID(String DX_GUID,String STARTTIME,String ENDTIME)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PRO_YEAR_PROJECT_SEL_WORKGUID");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PRO_YEAR_PROJECT_SEL_WORKGUID(:DX_GUID,:STARTTIME,:ENDTIME,:RET)}");
            cstmt.setString("DX_GUID",DX_GUID);
            cstmt.setString("STARTTIME",STARTTIME);
            cstmt.setString("ENDTIME",ENDTIME);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_YEAR_PROJECT_SEL_WORKGUID");
        return result;
    }
    // 月计划厂矿执行率统计
    public HashMap PM_03_MONTH_PLAN_CKSTAT_SEL(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_03_MONTH_PLAN_CKSTAT_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_03_MONTH_PLAN_CKSTAT_SEL(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR",V_V_YEAR);
            cstmt.setString("V_V_MONTH",V_V_MONTH);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_CKSTAT_SEL");
        return result;
    }
    // 周计划厂矿执行率统计
    public HashMap PM_03_WEEK_PLAN_CKSTAT_SEL(String V_V_YEAR,String V_V_MONTH,String V_V_WEEK,String V_V_ORGCODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_03_WEEK_PLAN_CKSTAT_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_03_WEEK_PLAN_CKSTAT_SEL(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR",V_V_YEAR);
            cstmt.setString("V_V_MONTH",V_V_MONTH);
            cstmt.setString("V_V_WEEK",V_V_WEEK);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_WEEK_PLAN_CKSTAT_SEL");
        return result;
    }
    // 月计划作业区执行率统计
    public HashMap PM_03_MONTH_PLAN_ZYQSTAT_SEL(String V_V_YEAR,String V_V_MONTH,String V_V_ORGCODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_03_MONTH_PLAN_ZYQSTAT_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_03_MONTH_PLAN_ZYQSTAT_SEL(:V_V_YEAR,:V_V_MONTH,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR",V_V_YEAR);
            cstmt.setString("V_V_MONTH",V_V_MONTH);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_MONTH_PLAN_ZYQSTAT_SEL");
        return result;
    }
    // 周计划作业区执行率统计
    public HashMap PM_03_WEEK_PLAN_ZYQSTAT_SEL(String V_V_YEAR,String V_V_MONTH,String V_V_WEEK,String V_V_ORGCODE)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_03_WEEK_PLAN_ZYQSTAT_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_03_WEEK_PLAN_ZYQSTAT_SEL(:V_V_YEAR,:V_V_MONTH,:V_V_WEEK,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_V_YEAR",V_V_YEAR);
            cstmt.setString("V_V_MONTH",V_V_MONTH);
            cstmt.setString("V_V_WEEK",V_V_WEEK);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_03_WEEK_PLAN_ZYQSTAT_SEL");
        return result;
    }
    // 工单执行率
    public HashMap PRO_PM_DEPT_SORT(String V_D_ENTER_DATE_B,String V_D_ENTER_DATE_E,String V_V_ORGCODE)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PRO_PM_DEPT_SORT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PRO_PM_DEPT_SORT(:V_D_ENTER_DATE_B,:V_D_ENTER_DATE_E,:V_V_ORGCODE,:V_CURSOR)}");
            cstmt.setString("V_D_ENTER_DATE_B",V_D_ENTER_DATE_B);
            cstmt.setString("V_D_ENTER_DATE_E",V_D_ENTER_DATE_E);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);

            cstmt.registerOutParameter("V_CURSOR",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_DEPT_SORT");
        return result;
    }
    // 计划模型修改
    public HashMap PM_1921_PLAN_MX_DATA_UPDATE(String V_V_MX_CODE,String V_V_PERNUM,String V_V_LIFELONG)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_1921_PLAN_MX_DATA_UPDATE");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_1921_PLAN_MX_DATA_UPDATE(:V_V_MX_CODE,:V_V_PERNUM,:V_V_LIFELONG,:RET)}");
            cstmt.setString("V_V_MX_CODE",V_V_MX_CODE);
            cstmt.setString("V_V_PERNUM",V_V_PERNUM);
            cstmt.setString("V_V_LIFELONG",V_V_LIFELONG);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_1921_PLAN_MX_DATA_UPDATE");
        return result;
    }
    //-年计划检修类别下拉列表
    public HashMap PM_YEAR_REPARI_SELECT()throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_YEAR_REPARI_SELECT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_YEAR_REPARI_SELECT(:RET)}");

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_YEAR_REPARI_SELECT");
        return result;
    }
    // 年计划-计划模型选择
    public HashMap PM_PLAN_YEAR_GETMX_INSERT(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_REPAIRTYPE,String V_V_PLANTYPE,String V_V_PERCODE,String V_V_YEAR,String V_V_MONTH,String V_V_SUNTIME)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_PLAN_YEAR_GETMX_INSERT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_GETMX_INSERT(:V_V_GUID,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_REPAIRTYPE,:V_V_PLANTYPE,:V_V_PERCODE,:V_V_YEAR,:V_V_MONTH,:V_V_SUNTIME,:V_INFO)}");
            cstmt.setString("V_V_GUID",V_V_GUID);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_V_REPAIRTYPE",V_V_REPAIRTYPE);
            cstmt.setString("V_V_PLANTYPE",V_V_PLANTYPE);
            cstmt.setString("V_V_PERCODE",V_V_PERCODE);
            cstmt.setString("V_V_YEAR",V_V_YEAR);
            cstmt.setString("V_V_MONTH",V_V_MONTH);
            cstmt.setString("V_V_SUNTIME",V_V_SUNTIME);

            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("V_INFO"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_GETMX_INSERT");
        return result;
    }
    // 年计划查询
    public HashMap PM_PLAN_YEAR_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_PERCODE,String V_V_ZY)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_PLAN_YEAR_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_SEL(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:RET)}");
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_V_PERCODE",V_V_PERCODE);
            cstmt.setString("V_V_ZY",V_V_ZY);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_SEL");
        return result;
    }

    // 年计划单条数据返回
    public HashMap PM_PLAN_YEAR_GETONE_SEL(String V_GUID)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_PLAN_YEAR_GETONE_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_GETONE_SEL(:V_GUID,:RET)}");
            cstmt.setString("V_GUID",V_GUID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_GETONE_SEL");
        return result;
    }

    //- 年计划添加和修改
    public HashMap PM_PLAN_YEAR_INSERT(String V_GUID,String V_ORGCODE ,String V_ORGNAME,String V_DEPTCODE,String V_DEPTNAME,
                                       String V_ZYCODE ,String V_ZYNAME ,String V_EQUCODE,String V_EQUTYPE ,String V_REPAIRCONTENT ,
                                       String V_PLANHOUR ,String V_REPAIRTYPE ,String V_REPAIRTYPENAME ,String V_INPERCODE,String V_INPERNAME ,
                                       String V_REMARK,String V_V_YEAR,String V_V_MONTH,String V_TGTIME,String V_JGTIME,String V_WXTYPECODE,String V_WXTYPENAME,
                                       String V_PTYPECODE,String V_PTYPENAME,String V_OLD_FLAG,String V_REDEPTCODE,String V_REDEPTNAME,
                                       String V_PLANDAY,String V_FZPERCODE,String V_FZPERNAME,String V_SGTYPECODE,String V_SGTYPENAME,String V_SCLBCODE,String V_SCLBNAME,String V_PRO_NAME)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_PLAN_YEAR_INSERT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_INSERT(:V_GUID,:V_ORGCODE,:V_ORGNAME,:V_DEPTCODE,:V_DEPTNAME," +
                    ":V_ZYCODE,:V_ZYNAME,:V_EQUCODE,:V_EQUTYPE,:V_REPAIRCONTENT," +
                    ":V_PLANHOUR,:V_REPAIRTYPE,:V_REPAIRTYPENAME,:V_INPERCODE,:V_INPERNAME," +
                    ":V_REMARK,:V_V_YEAR,:V_V_MONTH,:V_TGTIME,:V_JGTIME,:V_WXTYPECODE,:V_WXTYPENAME,"+
                    ":V_PTYPECODE,:V_PTYPENAME," +
                    ":V_OLD_FLAG,:V_REDEPTCODE,:V_REDEPTNAME,:V_PLANDAY,:V_FZPERCODE,:V_FZPERNAME,:V_SGTYPECODE,"+
                    ":V_SGTYPENAME,:V_SCLBCODE,:V_SCLBNAME,:V_PRO_NAME,:RET)}");
            cstmt.setString("V_GUID",V_GUID);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_ORGNAME",V_ORGNAME);
            cstmt.setString("V_DEPTCODE",V_DEPTCODE);
            cstmt.setString("V_DEPTNAME",V_DEPTNAME);
            cstmt.setString("V_ZYCODE",V_ZYCODE);
            cstmt.setString("V_ZYNAME",V_ZYNAME);
            cstmt.setString("V_EQUCODE",V_EQUCODE);
            cstmt.setString("V_EQUTYPE",V_EQUTYPE);
            cstmt.setString("V_REPAIRCONTENT",V_REPAIRCONTENT);
            cstmt.setString("V_PLANHOUR",V_PLANHOUR);
            cstmt.setString("V_REPAIRTYPE",V_REPAIRTYPE);
            cstmt.setString("V_REPAIRTYPENAME",V_REPAIRTYPENAME);
            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_INPERNAME",V_INPERNAME);
            cstmt.setString("V_REMARK",V_REMARK);
            cstmt.setString("V_V_YEAR",V_V_YEAR);
            cstmt.setString("V_V_MONTH",V_V_MONTH);

            cstmt.setString("V_TGTIME",V_TGTIME);
            cstmt.setString("V_JGTIME",V_JGTIME);
            cstmt.setString("V_WXTYPECODE",V_WXTYPECODE);
            cstmt.setString("V_WXTYPENAME",V_WXTYPENAME);
            cstmt.setString("V_PTYPECODE",V_PTYPECODE);
            cstmt.setString("V_PTYPENAME",V_PTYPENAME);
            cstmt.setString("V_OLD_FLAG",V_OLD_FLAG);
            cstmt.setString("V_REDEPTCODE",V_REDEPTCODE);
            cstmt.setString("V_REDEPTNAME",V_REDEPTNAME);
            cstmt.setString("V_PLANDAY",V_PLANDAY);
            cstmt.setString("V_FZPERCODE",V_FZPERCODE);
            cstmt.setString("V_FZPERNAME",V_FZPERNAME);
            cstmt.setString("V_SGTYPECODE",V_SGTYPECODE);
            cstmt.setString("V_SGTYPENAME",V_SGTYPENAME);
            cstmt.setString("V_SCLBCODE",V_SCLBCODE);
            cstmt.setString("V_SCLBNAME",V_SCLBNAME);
            cstmt.setString("V_PRO_NAME",V_PRO_NAME);


            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_INSERT");
        return result;
    }
    // 年计划删除

    public HashMap PM_PLAN_YEAR_DEL(String V_GUID)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_PLAN_YEAR_DEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_DEL(:V_GUID,:RET)}");
            cstmt.setString("V_GUID",V_GUID);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_DEL");
        return result;
    }
    // 年计划上报
    public List<Map> PRO_PM_03_PLAN_YEAR_SEND(String V_V_GUID,String V_V_ORGCODE,String V_V_DEPTCODE,
                                              String V_V_FLOWCODE, String  V_V_PLANTYPE,
                                              String V_V_PERSONCODE) throws SQLException {
        logger.info("begin PRO_PM_03_PLAN_YEAR_SEND");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_03_PLAN_YEAR_SEND(:V_V_WEEKPLAN_GUID,:V_V_ORGCODE,:V_V_DEPTCODE," +
                    ":V_V_FLOWCODE,:V_V_PLANTYPE,:V_V_PERSONCODE,:V_INFO)}");
            cstmt.setString("V_V_GUID", V_V_GUID);
            cstmt.setString("V_V_ORGCODE", V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_FLOWCODE", V_V_FLOWCODE);
            cstmt.setString("V_V_PLANTYPE", V_V_PLANTYPE);
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);
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
        logger.info("end PRO_PM_03_PLAN_YEAR_SEND");
        return result;
    }
    // 周月计划-工序调取
    public HashMap BASE_OPERATION_SEL(String V_PERCODE,String V_DPPTCODE,String V_ORGCODE,String V_FLAG) throws SQLException {
        List<Map> list = new ArrayList<>();
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin BASE_OPERATION_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call BASE_OPERATION_SEL(:V_PERCODE,:V_DPPTCODE,:V_ORGCODE,:V_FLAG,:RET)}");
            cstmt.setString("V_PERCODE",V_PERCODE);
            cstmt.setString("V_DPPTCODE",V_DPPTCODE);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_FLAG",V_FLAG);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("RET", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end BASE_OPERATION_SEL");
        return result;
    }
    //- 年计划创建guid
    public HashMap PM_PLAN_YEAR_GET_NEWGUID(String V_GUID,String V_INPERCODE ,String V_INPERNAME)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_PLAN_YEAR_GET_NEWGUID");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_GET_NEWGUID(:V_GUID,:V_INPERCODE ,:V_INPERNAME,:RET )}");
            cstmt.setString("V_GUID",V_GUID);
            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_INPERNAME",V_INPERNAME);


            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_GET_NEWGUID");
        return result;
    }
    //年计划关联模型添加
    public HashMap PM_PLAN_YEAR_RE_JXMOD_IN(String V_GUID,String V_EQUCODE ,String V_MODCODE,String V_MODNAME,String V_MODBBH,String V_MODBZ)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_PLAN_YEAR_RE_JXMOD_IN");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_RE_JXMOD_IN(:V_GUID,:V_EQUCODE,:V_MODCODE,:V_MODNAME,:V_MODBBH,:V_MODBZ,:RET )}");
            cstmt.setString("V_GUID",V_GUID);
            cstmt.setString("V_EQUCODE",V_EQUCODE);
            cstmt.setString("V_MODCODE",V_MODCODE);
            cstmt.setString("V_MODNAME",V_MODNAME);
            cstmt.setString("V_MODBBH",V_MODBBH);
            cstmt.setString("V_MODBZ",V_MODBZ);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_RE_JXMOD_IN");
        return result;
    }
    // 年计划查询相关物料、机具等信息
    public Map PRO_YEAR_PLAN_MXUSE_SEL(String V_V_YEARGUID,String V_V_TYPE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_YEAR_PLAN_MXUSE_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_YEAR_PLAN_MXUSE_SEL" + "(:V_V_YEARGUID,:V_V_TYPE,:V_CURSOR)}");
            cstmt.setString("V_V_YEARGUID", V_V_YEARGUID);
            cstmt.setString("V_V_TYPE", V_V_TYPE);
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
        logger.info("end PRO_YEAR_PLAN_MXUSE_SEL");
        return result;
    }
    // 年计划缺陷添加
    public HashMap PM_PLAN_YEAR_RE_DEFECT_IN(String V_GUID,String V_DEFECTCODE ,String V_EQUCODE,String V_EQUNAME,String V_DEFECT_TYPE,String V_DEFECT_CONTENT,String V_DEFECT_DATE)throws Exception,SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_PLAN_YEAR_RE_DEFECT_IN");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_RE_DEFECT_IN(:V_GUID,:V_DEFECTCODE,:V_EQUCODE,:V_EQUNAME,:V_DEFECT_TYPE,:V_DEFECT_CONTENT,:V_DEFECT_DATE,:RET )}");
            cstmt.setString("V_GUID",V_GUID);
            cstmt.setString("V_DEFECTCODE",V_DEFECTCODE);
            cstmt.setString("V_EQUCODE",V_EQUCODE);
            cstmt.setString("V_EQUNAME",V_EQUNAME);
            cstmt.setString("V_DEFECT_TYPE",V_DEFECT_TYPE);
            cstmt.setString("V_DEFECT_CONTENT",V_DEFECT_CONTENT);
            cstmt.setString("V_DEFECT_DATE",V_DEFECT_DATE);

            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", (String) cstmt.getObject("RET"));
        }catch(SQLException e){
            logger.error(e);
        }finally{
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_PLAN_YEAR_RE_DEFECT_IN");
        return result;
    }
    //年计划缺陷查询
    public Map PM_PLAN_YEAR_RE_DEFECT_SEL(String V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_DEFECT_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_DEFECT_SEL" + "(:V_GUID,:RET)}");
            cstmt.setString("V_GUID", V_GUID);

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
        logger.info("end PM_PLAN_YEAR_RE_DEFECT_SEL");
        return result;
    }
    //年计划模型查询
    public Map PM_PLAN_YEAR_RE_JXMOD_SEL(String V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_JXMOD_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_JXMOD_SEL" + "(:V_GUID,:RET)}");
            cstmt.setString("V_GUID", V_GUID);

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
        logger.info("end PM_PLAN_YEAR_RE_JXMOD_SEL");
        return result;
    }
    //年计划缺陷删除
    public Map PM_PLAN_YEAR_RE_DEFECT_DEL(String V_GUID,String V_DEFECTCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_DEFECT_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_DEFECT_DEL" + "(:V_GUID,:V_DEFECTCODE,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_DEFECTCODE", V_DEFECTCODE);

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
        logger.info("end PM_PLAN_YEAR_RE_DEFECT_DEL");
        return result;
    }
    //年计划模型删除
    public Map PM_PLAN_YEAR_RE_JXMOD_DEL(String V_GUID,String V_MODCODE) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_RE_JXMOD_DEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_RE_JXMOD_DEL" + "(:V_GUID,:V_MODCODE,:RET)}");
            cstmt.setString("V_GUID", V_GUID);
            cstmt.setString("V_MODCODE", V_MODCODE);

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
        logger.info("end PM_PLAN_YEAR_RE_JXMOD_DEL");
        return result;
    }
    //大修作业区查看上报数量
    public Map PRO_PM_YEAR_GROUPEBY_DEPT() throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_YEAR_GROUPEBY_DEPT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_YEAR_GROUPEBY_DEPT" + "(:RET)}");

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
        logger.info("end PRO_PM_YEAR_GROUPEBY_DEPT");
        return result;
    }
    //大修专业查看上报数量
    public Map PRO_PM_YEAR_GROUPEBY_ZY() throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_PM_YEAR_GROUPEBY_ZY");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_PM_YEAR_GROUPEBY_ZY" + "(:RET)}");

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
        logger.info("end PRO_PM_YEAR_GROUPEBY_ZY");
        return result;
    }
    //-月计划统计表1查询
    public Map PRO_MONTH_EQU_STATIS_IN_SEL(String V_EOS_GUID,String V_YEAR,String V_MONTH,String V_ORGCODE,
                                           String V_ORGNAME,String V_INPERCODE,String V_INPERNAME) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_MONTH_EQU_STATIS_IN_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MONTH_EQU_STATIS_IN_SEL" + "(:V_EOS_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_INPERCODE,:V_INPERNAME,:V_NUM,:RET)}");
            cstmt.setString("V_EOS_GUID",V_EOS_GUID);
            cstmt.setString("V_YEAR",V_YEAR);
            cstmt.setString("V_MONTH",V_MONTH);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_ORGNAME",V_ORGNAME);
            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_INPERNAME",V_INPERNAME);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM",(String) cstmt.getObject("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_MONTH_EQU_STATIS_IN_SEL");
        return result;
    }
    //-月计划统计表1-add
    public Map PRO_MONTH_EQU_STATIS_IN_IN(String V_EOS_GUID,String V_YEAR, String V_MONTH, String V_ORGCODE,String V_ORGNAME,String V_EFPLAN,String V_EFHOUR,String V_EFACTUAL,
                                          String V_CPLAN,String V_CSNUM,String V_CCNUM,String V_CACT, String V_CUSEPLAN,String V_CUSEACTUAL,String V_DXPFPLAN,String V_DXPFACTUAL,
                                          String V_DXPFRATE,String V_DXTPLAN,String V_DXTACT,String V_DXTRATE ,String V_COPTPLAN,String V_COPTACT,String V_XKOPTPLAN,
                                          String V_XKOPTACT,String V_SJSPLAN,String V_SJSACT,String V_QTSPLAN,String V_QTSACT,String V_INERTDATE,String V_INPERCODE,
                                          String V_INPERNAME) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PRO_MONTH_EQU_STATIS_IN_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_MONTH_EQU_STATIS_IN_IN" +
                            "(:V_EOS_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_EFPLAN,:V_EFHOUR,:V_EFACTUAL,:V_CPLAN,:V_CSNUM,:V_CCNUM,:V_CACT,:V_CUSEPLAN,:V_CUSEACTUAL," +
                            ":V_DXPFPLAN,:V_DXPFACTUAL,:V_DXPFRATE,:V_DXTPLAN,:V_DXTACT,:V_DXTRATE,:V_COPTPLAN,:V_COPTACT,:V_XKOPTPLAN,:V_XKOPTACT,:V_SJSPLAN,:V_SJSACT," +
                            ":V_QTSPLAN,:V_QTSACT,:V_INERTDATE,:V_INPERCODE,:V_INPERNAME,:RET)}");
            cstmt.setString("V_EOS_GUID",V_EOS_GUID);
            cstmt.setString("V_YEAR",V_YEAR);
            cstmt.setString("V_MONTH",V_MONTH);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_ORGNAME",V_ORGNAME);
            cstmt.setString("V_EFPLAN",V_EFPLAN);
            cstmt.setString("V_EFHOUR",V_EFHOUR);
            cstmt.setString("V_EFACTUAL",V_EFACTUAL);
            cstmt.setString("V_CPLAN",V_CPLAN);
            cstmt.setString("V_CSNUM",V_CSNUM);
            cstmt.setString("V_CCNUM",V_CCNUM);
            cstmt.setString("V_CACT",V_CACT);
            cstmt.setString("V_CUSEPLAN",V_CUSEPLAN);
            cstmt.setString("V_CUSEACTUAL",V_CUSEACTUAL);

            cstmt.setString("V_DXPFPLAN",V_DXPFPLAN);
            cstmt.setString("V_DXPFACTUAL",V_DXPFACTUAL);
            cstmt.setString("V_DXPFRATE",V_DXPFRATE);
            cstmt.setString("V_DXTPLAN",V_DXTPLAN);
            cstmt.setString("V_DXTACT",V_DXTACT);
            cstmt.setString("V_DXTRATE",V_DXTRATE);
            cstmt.setString("V_COPTPLAN",V_COPTPLAN);
            cstmt.setString("V_COPTACT",V_COPTACT);
            cstmt.setString("V_XKOPTPLAN",V_XKOPTPLAN);
            cstmt.setString("V_XKOPTACT",V_XKOPTACT);
            cstmt.setString("V_SJSPLAN",V_SJSPLAN);
            cstmt.setString("V_SJSACT",V_SJSACT);
            cstmt.setString("V_QTSPLAN",V_QTSPLAN);
            cstmt.setString("V_QTSACT",V_QTSACT);
            cstmt.setString("V_INERTDATE",V_INERTDATE);
            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_INPERNAME",V_INPERNAME);

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
        logger.info("end PRO_MONTH_EQU_STATIS_IN_IN");
        return result;
    }
    // MONTH SEL TABLE2
    public Map PM_MONTH_EQU_ORG_STATIS2_SEL(String V_EOS_GUID,String V_YEAR,String V_MONTH,String V_ORGCODE,
                                           String V_ORGNAME,String V_INPERCODE,String V_INPERNAME) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORG_STATIS2_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORG_STATIS2_SEL" + "(:V_EOS_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_INPERCODE,:V_INPERNAME,:V_NUM,:RET)}");
            cstmt.setString("V_EOS_GUID",V_EOS_GUID);
            cstmt.setString("V_YEAR",V_YEAR);
            cstmt.setString("V_MONTH",V_MONTH);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_ORGNAME",V_ORGNAME);
            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_INPERNAME",V_INPERNAME);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM",(String) cstmt.getObject("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MONTH_EQU_ORG_STATIS2_SEL");
        return result;
    }
    // MONTH IN TABLE2
    public Map PM_MONTH_EQU_ORG_STATIS2_IN(String V_MAIN_GUID,String V_YEAR,String V_MONTH,String V_ORGCODE,String V_ORGNAME,String V_PERCODE,
                                           String V_PERNAME,String V_DQ_PLAN,String V_DQ_HNUM,String V_DQ_CNUM,String V_DQ_ACT,String V_DL_PLAN,
                                           String V_DL_ACTUAL,String V_GD_PLAN,String V_GD_ACT,String V_DX_FPLAN ,String V_DX_FACT,
                                           String V_DX_FRATE,String V_DX_TPLAN,String V_DX_TACT,String V_DX_TRATE,String V_REMARK) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORG_STATIS2_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORG_STATIS2_IN" +
                    "(:V_MAIN_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_PERCODE,:V_PERNAME,:V_DQ_PLAN,:V_DQ_HNUM,:V_DQ_CNUM,:V_DQ_ACT,:V_DL_PLAN," +
                    ":V_DL_ACTUAL,:V_GD_PLAN,:V_GD_ACT,:V_DX_FPLAN,:V_DX_FACT,:V_DX_FRATE,:V_DX_TPLAN,:V_DX_TACT,:V_DX_TRATE,:V_REMARK,:RET)}");
            cstmt.setString("V_MAIN_GUID",V_MAIN_GUID);
            cstmt.setString("V_YEAR",V_YEAR);
            cstmt.setString("V_MONTH",V_MONTH);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_ORGNAME",V_ORGNAME);
            cstmt.setString("V_PERCODE",V_PERCODE);
            cstmt.setString("V_PERNAME",V_PERNAME);
            cstmt.setString("V_DQ_PLAN",V_DQ_PLAN);
            cstmt.setString("V_DQ_HNUM",V_DQ_HNUM);
            cstmt.setString("V_DQ_CNUM",V_DQ_CNUM);
            cstmt.setString("V_DQ_ACT",V_DQ_ACT);
            cstmt.setString("V_DL_PLAN",V_DL_PLAN);

            cstmt.setString("V_DL_ACTUAL",V_DL_ACTUAL);
            cstmt.setString("V_GD_PLAN",V_GD_PLAN);
            cstmt.setString("V_GD_ACT",V_GD_ACT);
            cstmt.setString("V_DX_FPLAN",V_DX_FPLAN);
            cstmt.setString("V_DX_FACT",V_DX_FACT);
            cstmt.setString("V_DX_FRATE",V_DX_FRATE);
            cstmt.setString("V_DX_TPLAN",V_DX_TPLAN);
            cstmt.setString("V_DX_TACT",V_DX_TACT);
            cstmt.setString("V_DX_TRATE",V_DX_TRATE);
            cstmt.setString("V_REMARK",V_REMARK);

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
        logger.info("end PM_MONTH_EQU_ORG_STATIS2_IN");
        return result;
    }
    // MONTH SEL TABLE3
    public Map PM_MONTH_EQU_ORG_STATIS3_SEL(String V_V_GUID,String V_YEAR,String V_MONTH,String V_ORGCODE,
                                            String V_ORGNAME,String V_INPERCODE,String V_INPERNAME) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORG_STATIS3_SEL");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORG_STATIS3_SEL" + "(:V_V_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_INPERCODE,:V_INPERNAME,:V_NUM,:RET)}");
            cstmt.setString("V_V_GUID",V_V_GUID);
            cstmt.setString("V_YEAR",V_YEAR);
            cstmt.setString("V_MONTH",V_MONTH);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_ORGNAME",V_ORGNAME);
            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_INPERNAME",V_INPERNAME);
            cstmt.registerOutParameter("V_NUM", OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("V_NUM",(String) cstmt.getObject("V_NUM"));
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_MONTH_EQU_ORG_STATIS3_SEL");
        return result;
    }
    // MONTH IN TABLE3
    public Map PM_MONTH_EQU_ORG_STATIS3_IN(String V_MAIN_GUID,String V_YEAR,String V_MONTH,String V_ORGCODE,String V_ORGNAME,
                                           String V_INPERCODE,String V_INPERNAME,String V_PRO_Q_PLAN,String V_PRO_Q_ACT,String V_RAMARK) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_MONTH_EQU_ORG_STATIS3_IN");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_MONTH_EQU_ORG_STATIS3_IN" +
                    "(:V_MAIN_GUID,:V_YEAR,:V_MONTH,:V_ORGCODE,:V_ORGNAME,:V_INPERCODE,:V_INPERNAME,:V_PRO_Q_PLAN,:V_PRO_Q_ACT,:V_RAMARK,:RET)}");
            cstmt.setString("V_MAIN_GUID",V_MAIN_GUID);
            cstmt.setString("V_YEAR",V_YEAR);
            cstmt.setString("V_MONTH",V_MONTH);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_ORGNAME",V_ORGNAME);

            cstmt.setString("V_INPERCODE",V_INPERCODE);
            cstmt.setString("V_INPERNAME",V_INPERNAME);
            cstmt.setString("V_PRO_Q_PLAN",V_PRO_Q_PLAN);
            cstmt.setString("V_PRO_Q_ACT",V_PRO_Q_ACT);
            cstmt.setString("V_RAMARK",V_RAMARK);


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
        logger.info("end PM_MONTH_EQU_ORG_STATIS3_IN");
        return result;
    }
    //设备部月计划设备开和标准数据计划月报表统计
    public Map PM_MONTH_EQU_ORGCODE_SEL(String V_YEAR,String V_MONTH,String V_ORGCODE,String V_PERCODE,String V_SIGN)throws SQLException{
        Map result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_MONTH_EQU_ORGCODE_SEL");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PM_MONTH_EQU_ORGCODE_SEL(:V_YEAR,:V_MONTH,:V_ORGCODE,:V_PERCODE,:V_SIGN,:RET)}");
            cstmt.setString("V_YEAR",V_YEAR);
            cstmt.setString("V_MONTH",V_MONTH);
            cstmt.setString("V_ORGCODE",V_ORGCODE);
            cstmt.setString("V_PERCODE",V_PERCODE);
            cstmt.setString("V_SIGN",V_SIGN);
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
        logger.info("end PM_MONTH_EQU_ORGCODE_SEL");
        return result;
    }

    // MONTH 分解状态修改
    public Map PM_03_PLAN_MONTH_SIGN_UPDT(String V_V_GUID) throws SQLException {
        Map result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_03_PLAN_MONTH_SIGN_UPDT");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_03_PLAN_MONTH_SIGN_UPDT" +
                    "(:V_V_GUID,:RET)}");
            cstmt.setString("V_V_GUID",V_V_GUID);



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
        logger.info("end PM_03_PLAN_MONTH_SIGN_UPDT");
        return result;
    }

    //月计划、年计划找周计划详情  PM_03_PLAN_MONTH_SEL_WEEKVIEW
    public Map PM_03_PLAN_MONTH_SEL_WEEKVIEW(String V_OTHERGRID,String V_TYPE) throws SQLException{
        Map result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_03_PLAN_MONTH_SEL_WEEKVIEW");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PM_03_PLAN_MONTH_SEL_WEEKVIEW(:V_OTHERGRID,:V_TYPE,:RET)}");
            cstmt.setString("V_OTHERGRID",V_OTHERGRID);
            cstmt.setString("V_TYPE",V_TYPE);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch (SQLException e){
            logger.error(e);
        }finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result"+result);
        logger.info("end PM_03_PLAN_MONTH_SEL_WEEKVIEW");
        return result;
    }
    //预装件备件信息修改
    public Map PRO_PRELOADWARECOMPONENT_SET(String V_V_MODELNUMBER,String V_V_SPCODE,String N_N_NUMBER,String V_V_SIZE) throws SQLException{
        Map result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PRO_PRELOADWARECOMPONENT_SET");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PRO_PRELOADWARECOMPONENT_SET(:V_V_MODELNUMBER,:V_V_SPCODE,:N_N_NUMBER,:V_V_SIZE,:RET)}");
            cstmt.setString("V_V_MODELNUMBER",V_V_MODELNUMBER);
            cstmt.setString("V_V_SPCODE",V_V_SPCODE);
            cstmt.setString("N_N_NUMBER",N_N_NUMBER);
            cstmt.setString("V_V_SIZE",V_V_SIZE);
            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("list",(String) cstmt.getObject("RET"));
        }catch (SQLException e){
            logger.error(e);
        }finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result"+result);
        logger.info("end PRO_PRELOADWARECOMPONENT_SET");
        return result;
    }
    //缺陷厂矿tab-bypersoncode
    public Map PRO_SELECT_ORG_BYPERCODE(String V_PERCODE) throws SQLException{
        Map result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PRO_SELECT_ORG_BYPERCODE");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PRO_SELECT_ORG_BYPERCODE(:V_PERCODE,:RET)}");
            cstmt.setString("V_PERCODE",V_PERCODE);

            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch (SQLException e){
            logger.error(e);
        }finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result"+result);
        logger.info("end PRO_SELECT_ORG_BYPERCODE");
        return result;
    }
    //根据厂矿查看对应每月缺陷数量
    public Map PM_07_DEFECT_STAT(String V_YEAR,String  V_CKCODE,String V_PERCODE) throws SQLException{
        Map result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_07_DEFECT_STAT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PM_07_DEFECT_STAT(:V_YEAR,:V_CKCODE,:V_PERCODE,:RET)}");
            cstmt.setString("V_YEAR",V_YEAR);
            cstmt.setString("V_CKCODE",V_CKCODE);
            cstmt.setString("V_PERCODE",V_PERCODE);

            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch (SQLException e){
            logger.error(e);
        }finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result"+result);
        logger.info("end PM_07_DEFECT_STAT");
        return result;
    }

    //sbb导入week_plan  设备部周计划管理页面
    public HashMap PRO_PM_03_PLAN_WEEK_IMPORT(String V_V_SBBGUID,String V_V_STARTTIME,String V_V_ENDTIME,String V_V_HOUR,String V_LOCKPER,String V_LOCKPERNAME) throws SQLException{
        HashMap result = new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PRO_PM_03_PLAN_WEEK_IMPORT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PRO_PM_03_PLAN_WEEK_IMPORT(:V_V_SBBGUID,:V_V_STARTTIME,:V_V_ENDTIME,:V_V_HOUR,:V_LOCKPER,:V_LOCKPERNAME,:RET)}");
            cstmt.setString("V_V_SBBGUID",V_V_SBBGUID);
            cstmt.setString("V_V_STARTTIME",V_V_STARTTIME);
            cstmt.setString("V_V_ENDTIME",V_V_ENDTIME);
            cstmt.setString("V_V_HOUR",V_V_HOUR);
            cstmt.setString("V_LOCKPER",V_LOCKPER);
            cstmt.setString("V_LOCKPERNAME",V_LOCKPERNAME);

            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        }catch (SQLException e){
            logger.error(e);
        }finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result"+result);
        logger.info("end PRO_PM_03_PLAN_WEEK_IMPORT");
        return result;
    }
    //周月计划添加模型
    public HashMap PM_1921_PLAN_IN_MX_SET(String V_V_MX_NAME,String V_V_ORGCODE,String V_V_DEPTCODE,
                                          String V_V_SPECIALTY,String V_V_MENO,String V_V_INPER,
                                          String V_V_EQUTYPE,String V_V_EQUCODE,String V_V_CONTEXT,
                                          String V_V_JXMX_CODE,String V_V_PERNUM,String V_V_LIFELONG,
                                          String V_V_MAIN_DEFECT,String V_V_SGWAY) throws SQLException{
        HashMap result = new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_1921_PLAN_IN_MX_SET");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PM_1921_PLAN_IN_MX_SET(:V_V_MX_NAME,:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_SPECIALTY,:V_V_MENO,:V_V_INPER," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_CONTEXT,:V_V_JXMX_CODE,:V_V_PERNUM,:V_V_LIFELONG,:V_V_MAIN_DEFECT,:V_V_SGWAY,:RET)}");
            cstmt.setString("V_V_MX_NAME",V_V_MX_NAME);
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_V_SPECIALTY",V_V_SPECIALTY);
            cstmt.setString("V_V_MENO",V_V_MENO);
            cstmt.setString("V_V_INPER",V_V_INPER);

            cstmt.setString("V_V_EQUTYPE",V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE",V_V_EQUCODE);
            cstmt.setString("V_V_CONTEXT",V_V_CONTEXT);
            cstmt.setString("V_V_JXMX_CODE",V_V_JXMX_CODE);
            cstmt.setString("V_V_PERNUM",V_V_PERNUM);
            cstmt.setString("V_V_LIFELONG",V_V_LIFELONG);

            cstmt.setString("V_V_MAIN_DEFECT",V_V_MAIN_DEFECT);
            cstmt.setString("V_V_SGWAY",V_V_SGWAY);

            cstmt.registerOutParameter("RET",OracleTypes.VARCHAR);
            cstmt.execute();
            result.put("RET", cstmt.getString("RET"));
        }catch (SQLException e){
            logger.error(e);
        }finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result"+result);
        logger.info("end PM_1921_PLAN_IN_MX_SET");
        return result;
    }
    // 事故统计分析
    public HashMap PM_14_FAULT_ITEM_DATA_STAT(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_EQUTYPE,
                                          String V_V_EQUCODE,String V_V_EQUCHILD_CODE,String V_V_FAULT_TYPE,
                                          String V_V_FAULT_YY,String V_STAR_DATE,String V_END_DATE) throws SQLException{
        HashMap result = new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_14_FAULT_ITEM_DATA_STAT");
            conn=dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PM_14_FAULT_ITEM_DATA_STAT(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_EQUTYPE," +
                    ":V_V_EQUCODE,:V_V_EQUCHILD_CODE,:V_V_FAULT_TYPE," +
                    ":V_V_FAULT_YY,:V_STAR_DATE,:V_END_DATE,:RET)}");
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_V_EQUTYPE",V_V_EQUTYPE);

            cstmt.setString("V_V_EQUCODE",V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE",V_V_EQUCHILD_CODE);
            cstmt.setString("V_V_FAULT_TYPE",V_V_FAULT_TYPE);

            cstmt.setString("V_V_FAULT_YY",V_V_FAULT_YY);
            cstmt.setString("V_STAR_DATE",V_STAR_DATE);
            cstmt.setString("V_END_DATE",V_END_DATE);

            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch (SQLException e){
            logger.error(e);
        }finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result"+result);
        logger.info("end PM_14_FAULT_ITEM_DATA_STAT");
        return result;
    }
    // 事故、故障月-设备类型统计
    public HashMap PM_14_FAULT_ITEM_STAT_NUM(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_PERSONCODE,String V_V_EQUTYPE
            ,String V_V_EQUCODE,String V_V_EQUCHILD_CODE,String V_V_FAULT_TYPE,String V_V_FAULT_YY,String V_V_YEAR,String V_V_MONTH)throws SQLException{
        HashMap result=new HashMap();
        Connection conn=null;
        CallableStatement cstmt=null;
        try{
            logger.info("begin PM_14_FAULT_ITEM_STAT_NUM");
            conn=dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt=conn.prepareCall("{call PM_14_FAULT_ITEM_STAT_NUM(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERSONCODE," +
                    ":V_V_EQUTYPE,:V_V_EQUCODE,:V_V_EQUCHILD_CODE," +
                    ":V_V_FAULT_TYPE,:V_V_FAULT_YY,:V_V_YEAR,:V_V_MONTH,:MON_NUM,:RET)}");
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_V_PERSONCODE",V_V_PERSONCODE);

            cstmt.setString("V_V_EQUTYPE",V_V_EQUTYPE);
            cstmt.setString("V_V_EQUCODE",V_V_EQUCODE);
            cstmt.setString("V_V_EQUCHILD_CODE",V_V_EQUCHILD_CODE);

            cstmt.setString("V_V_FAULT_TYPE",V_V_FAULT_TYPE);
            cstmt.setString("V_V_FAULT_YY",V_V_FAULT_YY);
            cstmt.setString("V_V_YEAR",V_V_YEAR);

            cstmt.setString("V_V_MONTH",V_V_MONTH);
            cstmt.registerOutParameter("MON_NUM",OracleTypes.VARCHAR);
            cstmt.registerOutParameter("RET",OracleTypes.CURSOR);
            cstmt.execute();
            result.put("NUM",cstmt.getString("MON_NUM"));
            result.put("list",ResultHash((ResultSet) cstmt.getObject("RET")));
        }catch(SQLException ex){
            logger.error(ex);
        }finally{
            logger.debug("result"+result);
            logger.info("end PM_14_FAULT_ITEM_STAT_NUM");
        }
        return result;
    }
}
