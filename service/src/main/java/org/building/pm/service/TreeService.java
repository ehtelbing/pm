package org.building.pm.service;

import org.building.pm.service.DxService;
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
 * Created by zjh on 2017/1/20.
 */

@Service
public class TreeService {
    private static final Logger logger = Logger.getLogger(TreeService.class.getName());

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;

    @Autowired
    private DxService dxService;

    @Autowired
    private BasicService basicService;

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

    public List<Map> MenuTree(String RoleCode,String DEPTCODE) throws SQLException {
        List<Map> result = CreateMenuTree(RoleCode, "1", "-1",DEPTCODE);
        return result;
    }

    public List<Map> NewMenuTree(String RoleCode,String DEPTCODE,String menutype) throws SQLException {
        List<Map> result = CreateNewMenuTree(RoleCode, "1", "-1", DEPTCODE, menutype);
        return result;
    }

    /*
    * �����˵���
    * */
    public List<Map> CreateMenuTree(String RoleCode, String V_SYSTYPE, String V_MENUCODE_UP,String DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_ROLETOMENU_NEW_VIEW");
        logger.debug("params:IS_V_ROLECODE:" + RoleCode + "params:IS_V_SYSTYPE:" + V_SYSTYPE + "params:IS_V_MENUCODE_UP:" + V_MENUCODE_UP);

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_NEW_VIEW(:IS_V_ROLECODE,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:DEPTCODE,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", RoleCode);
            cstmt.setString("IS_V_SYSTYPE", V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", V_MENUCODE_UP);
            cstmt.setString("DEPTCODE", DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                if (IfHasMenuChildNode(RoleCode, V_SYSTYPE, rs.getString("V_MENUCODE").toString(),DEPTCODE)) {
                    Map temp = new HashMap();
                    temp.put("id", rs.getString("V_MENUCODE").toString());
                    temp.put("text", rs.getString("V_MENUNAME").toString());
                    temp.put("title", rs.getString("V_MENUNAME").toString());
                    temp.put("cls", "empty");
                    if (V_MENUCODE_UP.equals("-1")) {
                        temp.put("expanded", true);
                    } else {
                        temp.put("expanded", false);
                    }
                    temp.put("children", CreateMenuTree(RoleCode, V_SYSTYPE, rs.getString("V_MENUCODE").toString(),DEPTCODE));
                    result.add(temp);
                } else {
                    Map temp = new HashMap();

                    temp.put("id", rs.getString("V_MENUCODE").toString());
                    temp.put("text", rs.getString("V_MENUNAME").toString());
                    temp.put("title", rs.getString("V_MENUNAME").toString());
                    temp.put("cls", "empty");
                    temp.put("leaf", true);
                    temp.put("src", rs.getString("V_URL"));
                    if (!V_MENUCODE_UP.equals("-1")) {
                        temp.put("href", rs.getString("V_URL"));
                    }
                    temp.put("hrefTarget", "Workspace");
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
        logger.info("end PRO_BASE_PERSON_LOGIN");
        return result;
    }

    public List<Map> CreateNewMenuTree(String RoleCode, String V_SYSTYPE, String V_MENUCODE_UP,String DEPTCODE,String menutype) throws SQLException {
        logger.info("begin PRO_BASE_NEW_MENU");
        logger.debug("params:IS_V_ROLECODE:" + RoleCode + "params:IS_V_SYSTYPE:" + V_SYSTYPE + "params:IS_V_MENUCODE_UP:" + V_MENUCODE_UP);

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_NEW_MENU(:IS_V_ROLECODE,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:DEPTCODE,:V_V_HOME_MENU,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", RoleCode);
            cstmt.setString("IS_V_SYSTYPE", V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", V_MENUCODE_UP);
            cstmt.setString("DEPTCODE", DEPTCODE);
            cstmt.setString("V_V_HOME_MENU", menutype);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
                while (rs.next()) {
                    if (IfHasMenuChildNode(RoleCode, V_SYSTYPE, rs.getString("V_MENUCODE").toString(),DEPTCODE)) {
                        Map temp = new HashMap();
                        temp.put("id", rs.getString("V_MENUCODE").toString());
                        temp.put("text", rs.getString("V_MENUNAME").toString());
                        temp.put("title", rs.getString("V_MENUNAME").toString());
                        temp.put("cls", "empty");
                        if (V_MENUCODE_UP.equals("-1")) {
                            temp.put("expanded", true);
                        } else {
                            temp.put("expanded", false);
                        }
                        temp.put("children", CreateMenuTree(RoleCode, V_SYSTYPE, rs.getString("V_MENUCODE").toString(),DEPTCODE));
                        result.add(temp);
                    } else {
                        Map temp = new HashMap();

                        temp.put("id", rs.getString("V_MENUCODE").toString());
                        temp.put("text", rs.getString("V_MENUNAME").toString());
                        temp.put("title", rs.getString("V_MENUNAME").toString());
                        temp.put("cls", "empty");
                        temp.put("leaf", true);
                        temp.put("src", rs.getString("V_URL"));
                        if (!V_MENUCODE_UP.equals("-1")) {
                            temp.put("href", rs.getString("V_URL"));
                        }
                        temp.put("hrefTarget", "Workspace");
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
        logger.info("end PRO_BASE_PERSON_LOGIN");
        return result;
    }

    public boolean IfHasMenuChildNode(String is_V_ROLECODE, String is_V_SYSTYPE,
                                      String is_V_MENUCODE_UP,String DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_ROLETOMENU_NEW_VIEW");
        logger.debug("params:IS_V_ROLECODE:" + is_V_ROLECODE + "params:IS_V_SYSTYPE:" + is_V_SYSTYPE + "params:IS_V_MENUCODE_UP:" + is_V_MENUCODE_UP);
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_NEW_VIEW(:IS_V_ROLECODE,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:DEPTCODE,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", is_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", is_V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", is_V_MENUCODE_UP);
            cstmt.setString("DEPTCODE", DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
//                sledata.put("I_MENUID", rs.getString("I_ID"));
                sledata.put("V_MENUCODE", rs.getString("V_MENUCODE"));
                sledata.put("V_MENUNAME", rs.getString("V_MENUNAME"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_PERSON_LOGIN");

        if (resultList.size() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public List<Map> DeptTree(String V_V_PERSONCODE,String V_V_DEPTCODENEXT, String V_V_DEPTCODE, String V_V_TYPE) throws SQLException {
        String[] parVal = new String[]{};
        List<Map> list = null;
        if (V_V_TYPE.equals("root")) {
            list = dxService.PRO_BASE_DEPT_TREE(V_V_DEPTCODE);
        }
        else{
            list = dxService.PRO_GET_DEPTEQUTYPE_WXPER(V_V_PERSONCODE,V_V_DEPTCODENEXT);
        }

        List<Map> ListTree = new ArrayList<Map>();

        for (int i = 0; i < list.size(); i++) {
            Map tree = new HashMap();

            tree.put("id", java.util.UUID.randomUUID().toString());   //list.get(i).get(id)
            tree.put("qtip", list.get(i).get("ID"));
            tree.put("text", list.get(i).get("NAME"));

            if (!V_V_TYPE.equals("root")) {

                //外部传值确认为末节点
                if (V_V_TYPE.equals("leaf")) {
                    tree.put("leaf", true);
                }
            }
            ListTree.add(tree);
        }
        return ListTree;
    }


    //基本树
    public List<Map> ModelTree(String V_V_DEPTCODE,String V_V_DEPTNAME,String V_V_ID,String V_V_TEXT,String V_V_PARENTID,
                               String V_V_LEAF,String V_V_CHECKED,String V_V_DEPTVAL,String V_V_CODEVAL,
                               String V_V_PRONAME) throws SQLException {

        List<String> listCheck = new ArrayList<String>();

        List<Map> list = null;
        if(V_V_PRONAME.equals("PRO_BASE_DEPT_TREE")){
            list =  dxService.PRO_BASE_DEPT_TREE(V_V_DEPTCODE);
        }
        else{
            list =  dxService.PRO_BASE_POST_TREE(V_V_DEPTCODE);
        }
        List<Map> ListTree = new ArrayList<Map>();


            Map tree = new HashMap();

            tree.put("parentid","-1");
            tree.put("id", V_V_DEPTCODE);
            tree.put("text", V_V_DEPTNAME);
            tree.put("expanded", true);
            tree.put("children", GetSecondTreeChildren(list, V_V_DEPTCODE));


            /*if(V_V_CHECKED.equals("true")){

                if(V_V_CODEVAL.equals("PRO_BASE_POSTTOPERSON_GET")){
                    Map ff =list.get(i);
                    List<Map> listChecks = dxService.PRO_BASE_POSTTOPERSON_GET(V_V_DEPTVAL,list.get(i).get("V_POSTCODE").toString());
                    if(listChecks.size()>0){
                        String dd= listChecks.get(0).get("V_POSTCODE").toString();
                        if (!listChecks.get(0).get("V_POSTCODE").toString().equals("")) {
                            tree.put("checked",true); }
                        else {tree.put("checked",false); }

                    }else{ tree.put("checked",false);  }
                }else{
                    listCheck = dxService.PRO_BASE_DEPTTOSAPCSAT_VIEW(V_V_DEPTVAL,list.get(i).get("V_CASTCODE").toString());
                    if (listCheck.get(0).toString().equals("1")) {  tree.put("checked",true); }
                    else {tree.put("checked",false); }
                }
                //tree.put("checked",check);
            }*/
            ListTree.add(tree);

        return  ListTree;
    }
    private List<Map> GetSecondTreeChildren(List<Map> list, String code) {
        List<Map> menu = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_DEPTCODE_UP").equals(code)) {
                HashMap temp = new HashMap();
                temp.put("id", list.get(i).get("V_DEPTCODE"));
                temp.put("text", list.get(i).get("V_DEPTNAME"));
                if(GetSecondTreeChildren(list, list.get(i).get("V_DEPTCODE").toString()).size()>0){
                    temp.put("expanded", false);
                    temp.put("children", GetSecondTreeChildren(list, list.get(i).get("V_DEPTCODE").toString()));
                }else{
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }

    public List<Map> AllMenuTree(String RoleCode,String DEPTCODE) throws SQLException {
        List<Map> result = CreateAllMenuTree(RoleCode,"1", "-1",DEPTCODE);
        return result;
    }

    public List<Map> CreateAllMenuTree(String RoleCode, String V_SYSTYPE, String V_MENUCODE_UP,String DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_ALLMENU_NEW_VIEW");

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_ALLMENU_NEW_VIEW(:RoleCode,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:V_CURSOR)}");
            cstmt.setString("RoleCode", RoleCode);
            cstmt.setString("IS_V_SYSTYPE", V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", V_MENUCODE_UP);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs1 = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs1.next()) {
                if (IfHasAllMenuChildNode(RoleCode,V_SYSTYPE, rs1.getString("V_MENUCODE").toString())) {
                    Map temp = new HashMap();
                    temp.put("id", rs1.getString("V_MENUCODE").toString());
                    temp.put("text", rs1.getString("V_MENUNAME").toString());
                    temp.put("title", rs1.getString("V_MENUNAME").toString());
                    temp.put("cls", "empty");

                    if (V_MENUCODE_UP.equals("-1")) {
                        temp.put("expanded", true);
                    } else {
                        temp.put("expanded", false);
                    }

                    if(IfChecked(RoleCode, V_SYSTYPE, rs1.getString("V_MENUCODE").toString(),DEPTCODE)){
                        temp.put("checked",true);
                    }
                    else{
                        temp.put("checked",false);
                    }

                    temp.put("children", CreateAllMenuTree(RoleCode,V_SYSTYPE, rs1.getString("V_MENUCODE").toString(),DEPTCODE));
                    result.add(temp);
                } else {
                    Map temp = new HashMap();

                    temp.put("id", rs1.getString("V_MENUCODE").toString());
                    temp.put("text", rs1.getString("V_MENUNAME").toString());
                    temp.put("title", rs1.getString("V_MENUNAME").toString());
                    temp.put("cls", "empty");
                    temp.put("leaf", true);
                    temp.put("src", rs1.getString("V_URL"));
                    if(IfChecked(RoleCode, V_SYSTYPE, rs1.getString("V_MENUCODE").toString(),DEPTCODE)){
                        temp.put("checked",true);
                    }
                    else{
                        temp.put("checked",false);
                    }
                    temp.put("hrefTarget", "Workspace");
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
        logger.info("end PRO_BASE_ALLMENU_NEW_VIEW");
        return result;
    }

    public boolean IfHasAllMenuChildNode(String RoleCode, String is_V_SYSTYPE,
                                         String is_V_MENUCODE_UP) throws SQLException {
        logger.info("begin PRO_BASE_ALLMENU_NEW_VIEW");
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ALLMENU_NEW_VIEW(:RoleCode,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:V_CURSOR)}");
            cstmt.setString("RoleCode", RoleCode);
            cstmt.setString("IS_V_SYSTYPE", is_V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", is_V_MENUCODE_UP);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                Map sledata = new HashMap();
                sledata.put("V_MENUCODE", rs.getString("V_MENUCODE"));
                sledata.put("V_MENUNAME", rs.getString("V_MENUNAME"));
                resultList.add(sledata);
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_ALLMENU_NEW_VIEW");

        if (resultList.size() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public List<Map> RoleMenuTree(String RoleCode,String DEPTCODE) throws SQLException {
        List<Map> result = CreateRoleMenuTree(RoleCode, "1", "-1",DEPTCODE);
        return result;
    }

    /*
    * �����˵���
    * */
    public List<Map> CreateRoleMenuTree(String RoleCode, String V_SYSTYPE, String V_MENUCODE_UP,String DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_ROLETOMENU_NEW_VIEW");
        logger.debug("params:IS_V_ROLECODE:" + RoleCode + "params:IS_V_SYSTYPE:" + V_SYSTYPE + "params:IS_V_MENUCODE_UP:" + V_MENUCODE_UP);

        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_NEW_VIEW(:IS_V_ROLECODE,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:DEPTCODE,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", RoleCode);
            cstmt.setString("IS_V_SYSTYPE", V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", V_MENUCODE_UP);
            cstmt.setString("DEPTCODE", DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()) {
                if (IfHasRoleMenuChildNode(RoleCode, V_SYSTYPE, rs.getString("V_MENUCODE").toString(),DEPTCODE)) {
                    Map temp = new HashMap();
                    temp.put("id", rs.getString("V_MENUCODE").toString());
                    temp.put("text", rs.getString("V_MENUNAME").toString());
                    temp.put("title", rs.getString("V_MENUNAME").toString());
                    temp.put("cls", "empty");
                    if (V_MENUCODE_UP.equals("-1")) {
                        temp.put("expanded", true);
                    } else {
                        temp.put("expanded", false);
                    }
                    temp.put("children", CreateRoleMenuTree(RoleCode, V_SYSTYPE, rs.getString("V_MENUCODE").toString(),DEPTCODE));
                    result.add(temp);
                } else {
                    Map temp = new HashMap();

                    temp.put("id", rs.getString("V_MENUCODE").toString());
                    temp.put("text", rs.getString("V_MENUNAME").toString());
                    temp.put("title", rs.getString("V_MENUNAME").toString());
                    temp.put("cls", "empty");
                    temp.put("leaf", true);
                    temp.put("src", rs.getString("V_URL"));
                    temp.put("hrefTarget", "Workspace");
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
        logger.info("end PRO_BASE_PERSON_LOGIN");
        return result;
    }

    public boolean IfHasRoleMenuChildNode(String is_V_ROLECODE, String is_V_SYSTYPE,
                                          String is_V_MENUCODE_UP,String DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_ROLETOMENU_NEW_VIEW");
        logger.debug("params:IS_V_ROLECODE:" + is_V_ROLECODE + "params:IS_V_SYSTYPE:" + is_V_SYSTYPE + "params:IS_V_MENUCODE_UP:" + is_V_MENUCODE_UP);
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_NEW_VIEW(:IS_V_ROLECODE,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:DEPTCODE,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", is_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", is_V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", is_V_MENUCODE_UP);
            cstmt.setString("DEPTCODE", DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            Map sledata = new HashMap();
            sledata.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            resultList.add(sledata);

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_PERSON_LOGIN");

        if (resultList.size() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public boolean IfChecked(String is_V_ROLECODE, String is_V_SYSTYPE,
                             String is_V_MENUCODE_UP,String DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_ROLETOMENU_NEW_VIEW");
        logger.debug("params:IS_V_ROLECODE:" + is_V_ROLECODE + "params:IS_V_SYSTYPE:" + is_V_SYSTYPE + "params:IS_V_MENUCODE_UP:" + is_V_MENUCODE_UP);
        List<Map> resultList = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        String sss = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_ROLETOMENU_CHECKED(:IS_V_ROLECODE,:IS_V_SYSTYPE,:IS_V_MENUCODE_UP,:DEPTCODE,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", is_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", is_V_SYSTYPE);
            cstmt.setString("IS_V_MENUCODE_UP", is_V_MENUCODE_UP);
            cstmt.setString("DEPTCODE", DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.VARCHAR);
            cstmt.execute();
            sss = (String) cstmt.getObject("V_CURSOR");
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_BASE_PERSON_LOGIN");

        if (sss.equals("SUCCESS")) {
            return true;
        } else {
            return false;
        }
    }

    public List<Map> EquTree(String V_V_PERSONCODE,String V_V_DEPTCODE,String V_V_DEPTNEXTCODE,
                             String V_V_EQUTYPECODE,String V_V_EQUCODE,String V_V_TYPE) throws SQLException {
        String[] parVal = new String[]{};
        List<Map> list = null;
        HashMap data = basicService.PRO_SAP_EQU_VIEW(V_V_PERSONCODE,V_V_DEPTCODE,V_V_DEPTNEXTCODE,V_V_EQUTYPECODE,V_V_EQUCODE);

        list = (List) data.get("list");

        List<Map> ListTree = new ArrayList<Map>();

        Map temp = new HashMap();
        temp.put("id", java.util.UUID.randomUUID().toString());   //list.get(i).get(id)
        temp.put("qtip", V_V_EQUCODE);
        temp.put("expanded", true);
        temp.put("text", V_V_TYPE);

        List<Map> ListTemp = new ArrayList<Map>();

        for (int i = 0; i < list.size(); i++) {
            Map tree = new HashMap();

            tree.put("id", java.util.UUID.randomUUID().toString());   //list.get(i).get(id)
            tree.put("qtip", list.get(i).get("V_EQUCODE"));
            tree.put("text", list.get(i).get("V_EQUNAME"));
            tree.put("leaf", true);
//            if (!V_V_TYPE.equals("root")) {
//
//                //外部传值确认为末节点
//                if (V_V_TYPE.equals("leaf")) {
//                    tree.put("leaf", true);
//                }
//            }
            ListTemp.add(tree);
        }
        temp.put("children", ListTemp);
        ListTree.add(temp);
        return ListTree;
    }

    public HashMap PRO_GET_DEPTEQUTYPE_PER(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
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
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()){
                Map temp = new HashMap();
                if(!rs.getString("V_EQUTYPECODE").toString().equals("%")){
                    temp.put("id", rs.getString("V_EQUTYPECODE"));
                    temp.put("text", rs.getString("V_EQUTYPENAME"));
                    temp.put("parentid",V_V_DEPTCODENEXT);
                    temp.put("treeid",rs.getString("V_EQUTYPECODE"));
                    temp.put("expanded", false);
                    list.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("children",list);
        logger.debug("result:" + result);
        logger.info("end PRO_GET_DEPTEQUTYPE_PER");
        return result;
    }

    public HashMap PRO_PM_07_DEPTEQU_PER_DROP(String V_V_PERSONCODE,String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin PRO_PM_07_DEPTEQU_PER_DROP");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_07_DEPTEQU_PER_DROP" + "(:V_V_PERSONCODE,:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_PERSONCODE", V_V_PERSONCODE);
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()){
                Map temp = new HashMap();
                if(!rs.getString("V_EQUCODE").toString().equals("%")){
                    temp.put("id", rs.getString("V_EQUCODE"));
                    temp.put("text", rs.getString("V_EQUNAME"));
                    temp.put("leaf", true);
                    temp.put("parentid",V_V_EQUTYPECODE);
                    temp.put("treeid",rs.getString("V_EQUCODE"));
                    temp.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                    temp.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                    temp.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                    temp.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                    list.add(temp);
                }

            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("children",list);
        logger.debug("result:" + result);
        logger.info("end PRO_PM_07_DEPTEQU_PER_DROP");
        return result;
    }

    public List<Map> No41020101Tree(String ORDER_ID,String WORK_ID,String DEPARTCODE) throws SQLException {
        List<Map> result = GetParentTree(ORDER_ID, WORK_ID, DEPARTCODE);
        return result;
    }

    /*
    * �����˵���
    * */
    public List<Map> GetParentTree(String ORDER_ID,String WORK_ID,String DEPARTCODE) throws SQLException {
        logger.info("begin PRO_ORDER_PERSON_TREE");

        List<Map> list = new ArrayList<Map>();
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_ORDER_PERSON_TREE(:IN_ORDER_ID,:IN_WORK_ID,:IN_DEPARTCODE,:RET)}");
            cstmt.setString("IN_ORDER_ID", ORDER_ID);
            cstmt.setString("IN_WORK_ID", WORK_ID);
            cstmt.setString("IN_DEPARTCODE", DEPARTCODE);
            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("RET");
            while (rs.next()) {

                Map temp = new HashMap();
                temp.put("V_CLASS_CODE", rs.getString("V_CLASS_CODE"));
                temp.put("V_CLASS_NAME", rs.getString("V_CLASS_NAME"));
                temp.put("V_PERSONCODE", rs.getString("V_PERSONCODE"));
                temp.put("V_PERSONNAME", rs.getString("V_PERSONNAME"));
                temp.put("V_CRAFTCODE", rs.getString("V_CRAFTCODE"));
                temp.put("V_CRAFTNAME", rs.getString("V_CRAFTNAME"));
                temp.put("V_DEPTNAME", rs.getString("V_DEPTNAME"));
                list.add(temp);

            }
            if(list.size()>0){
                Map temp = new HashMap();
                temp.put("parentid", "");
                temp.put("text", list.get(0).get("V_DEPTNAME"));
                temp.put("expanded", true);
                temp.put("children", GetChildren(list));
                result.add(temp);
            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_ORDER_PERSON_TREE");
        return result;
    }

    private List<Map> GetChildren(List<Map> list) {
        List<Map> menu = new ArrayList<Map>();
        List listarr=new ArrayList();
        for (int i = 0; i < list.size(); i++) {
            if(!listarr.contains(list.get(i).get("V_CLASS_CODE"))){
                listarr.add(list.get(i).get("V_CLASS_CODE"));
                Map temp = new HashMap();
                temp.put("sid", list.get(i).get("V_CLASS_CODE"));
                temp.put("text", list.get(i).get("V_CLASS_NAME"));
                if (IfHasChildNode(list, list.get(i).get("V_CLASS_CODE").toString())) {
                    temp.put("leaf", false);
                    temp.put("expanded", false);
                    temp.put("children",GetSecondChildren(list, list.get(i)
                            .get("V_CLASS_CODE").toString()));
                } else {
                    temp.put("leaf", true);
                }
                menu.add(temp);
            }
        }
        return menu;
    }
    private List<Map> GetSecondChildren(List<Map> list, String code) {
        List<Map> menu = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).get("V_CLASS_CODE").equals(code)) {
                Map temp = new HashMap();
                temp.put("sid", list.get(i).get("V_PERSONCODE"));
                temp.put("text", list.get(i).get("V_PERSONNAME"));
                temp.put("leaf", true);
                temp.put("craftcode", list.get(i).get("V_CRAFTCODE"));
                temp.put("craftname", list.get(i).get("V_CRAFTNAME"));
                temp.put("expanded", false);
                menu.add(temp);
            }
        }
        return menu;
    }
    private Boolean IfHasChildNode(List<Map> list, String code) {
        for (int i = 0; i < list.size(); i++) {
            if (code.equals(list.get(i).get("V_CLASS_CODE").toString())) {
                return true;
            }
        }
        return false;
    }

    public List<Map> PRO_BASE_NEW_MENU_SEL(String IS_V_ROLECODE,String IS_V_SYSTYPE,String V_V_DEPTCODE,String V_V_HOME_MENU) throws SQLException {
        List<Map> result = PRO_BASE_NEW_MENU_SELTree(IS_V_ROLECODE, IS_V_SYSTYPE, V_V_DEPTCODE, V_V_HOME_MENU);
        return result;
    }

    public List<Map> PRO_BASE_NEW_MENU_SELTree(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE,String V_V_HOME_MENU) throws SQLException {
        logger.info("begin PRO_BASE_NEW_MENU");
        List<Map> list=new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PRO_BASE_NEW_MENU_SEL(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:V_V_HOME_MENU,:V_CURSOR)}");
            cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
            cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_HOME_MENU", V_V_HOME_MENU);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            HashMap result = new HashMap();
            result.put("list",
                    ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
            List<Map> datalist = (List) result.get("list");

            if(datalist.size()>0){
                for(Map item:datalist){
                    if (item.get("V_MENUCODE_UP").toString().equals("-1")) {
                        Map temp = new HashMap();
                        temp.put("id", item.get("V_MENUCODE").toString());
                        temp.put("text", item.get("V_MENUNAME").toString());
                        temp.put("title", item.get("V_MENUNAME").toString());
                        temp.put("pid", item.get("V_MENUCODE_UP").toString());
                        temp.put("type", item.get("V_TYPE").toString());
                        temp.put("flag", item.get("V_FLAG").toString());
                        temp.put("other", item.get("V_OTHER").toString());
                        temp.put("cls", "empty");
                        temp.put("expanded", false);
                        temp.put("hrefTarget", "Workspace");
                        if(getChildren(datalist,item.get("V_MENUCODE").toString()).size()<=0){//无子节点
                            temp.put("leaf",true);
                            temp.put("src", item.get("V_URL").toString());
                            temp.put("href", item.get("V_URL").toString());
                        }else{//有子节点
                            temp.put("leaf",false);
                            temp.put("children",getChildren(datalist,item.get("V_MENUCODE").toString()));
                        }
                        list.add(temp);
                    }

                }

            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PRO_BASE_PERSON_LOGIN");
        return list;
    }

    public List<Map> getChildren(List<Map> list,String parentNode) {
        List<Map> menu=new ArrayList<>();
        for(Map item:list){
            if(item.get("V_MENUCODE_UP").equals(parentNode)){
                Map temp=new HashMap();
                temp.put("id", item.get("V_MENUCODE").toString());
                temp.put("text", item.get("V_MENUNAME").toString());
                temp.put("title", item.get("V_MENUNAME").toString());
                temp.put("pid", item.get("V_MENUCODE_UP").toString());
                temp.put("type", item.get("V_TYPE").toString());
                temp.put("flag", item.get("V_FLAG").toString());
                temp.put("other", item.get("V_OTHER").toString());
                temp.put("cls", "empty");
                temp.put("expanded",false);
                temp.put("hrefTarget", "Workspace");
                if(getChildren(list,item.get("V_MENUCODE").toString()).size()==0){//无子节点
                    temp.put("leaf",true);
                    temp.put("src", item.get("V_URL").toString());
                    temp.put("href", item.get("V_URL").toString());
                }else{//有子节点
                    temp.put("leaf",false);
                    temp.put("children",getChildren(list,item.get("V_MENUCODE").toString()));
                }
                menu.add(temp);
            }
        }
        return menu;
    }

    public List<Map> PRO_GET_DEPTEQUTYPE_PER_tree(String V_V_PERSONCODE,String V_V_DEPTCODENEXT) throws SQLException {
        logger.info("begin PRO_GET_DEPTEQUTYPE_PER");
        List<Map> menu = new ArrayList<Map>();
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
            for (int i = 0; i < list.size(); i++) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_EQUTYPECODE"));
                temp.put("text", list.get(i).get("V_EQUTYPENAME"));
                temp.put("parentid","-1");
                temp.put("leaf", false);
                temp.put("expanded", false);
                menu.add(temp);
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_GET_DEPTEQUTYPE_PER");
        return menu;
    }

    public List<Map> QUERY_DEPT_EQUTYPE_PRELOADWARE_tree(String X_DEPTCODE,String X_EQUTYPECODE) throws SQLException {
        logger.info("begin QUERY_DEPT_EQUTYPE_PRELOADWARE");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call QUERY_DEPT_EQUTYPE_PRELOADWARE" + "(:X_DEPTCODE,:X_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("X_DEPTCODE", X_DEPTCODE);
            cstmt.setString("X_EQUTYPECODE", X_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));
            for (int i = 0; i < list.size(); i++) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_MODELNUMBER"));
                temp.put("text", list.get(i).get("V_MODELNAME"));
                temp.put("parentid", X_EQUTYPECODE);
                temp.put("leaf", true);
                menu.add(temp);
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end QUERY_DEPT_EQUTYPE_PRELOADWARE");
        return menu;
    }

    public List<Map> PRO_BASE_PERSONROLE_NEW_VIEW(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_BASE_PERSONROLE_NEW_VIEW");
        List<Map> menu = new ArrayList<Map>();
        String orgcode=V_V_DEPTCODE.substring(0,4);
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_PERSONROLE_NEW_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", orgcode);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for (int i = 0; i < list.size(); i++) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_ROLECODE"));
                temp.put("text", list.get(i).get("V_ROLENAME"));
                temp.put("deptcode",V_V_DEPTCODE);
                temp.put("parentid", "role");
                menu.add(temp);
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end QUERY_DEPT_EQUTYPE_PRELOADWARE");
        return menu;
    }

    public List<Map> PRO_PM_REPAIRDEPT_VIEW(String V_V_DEPTCODE) throws SQLException {
        logger.info("begin PRO_PM_REPAIRDEPT_VIEW");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_REPAIRDEPT_VIEW" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));


            for (int i = 0; i < list.size(); i++) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_DEPTREPAIRCODE"));
                temp.put("text", list.get(i).get("V_DEPTREPAIRNAME"));
                temp.put("parentid", "dept");
                menu.add(temp);
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PRO_PM_REPAIRDEPT_VIEW");
        return menu;
    }

    public List<Map> PM_WORKREPAIR_PERBYROLE_SEL(String V_V_DEPTCODE,String V_V_ROLECODE) throws SQLException {
        logger.info("begin PM_WORKREPAIR_PERBYROLE_SEL");
        List<Map> menu = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_WORKREPAIR_PERBYROLE_SEL" + "(:V_V_DEPTCODE,:V_V_ROLECODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
            cstmt.setString("V_V_ROLECODE", V_V_ROLECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            List<HashMap> list=ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));


            for (int i = 0; i < list.size(); i++) {
                HashMap temp = new HashMap();
                temp.put("sid", list.get(i).get("V_PERSONCODE"));
                temp.put("text", list.get(i).get("V_PERSONNAME"));
                temp.put("deptcode",V_V_DEPTCODE);
                temp.put("rolecode",V_V_ROLECODE);
                temp.put("leaf", true);
                temp.put("checked", false);
                menu.add(temp);
            }
            conn.commit();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.info("end PM_WORKREPAIR_PERBYROLE_SEL");
        return menu;
    }
    // ADMIN deptEQU TREE

    public HashMap GET_ADMIN_DEPTEQUTYPE_ADMIN_TREE(String V_V_DEPTCODENEXT) throws SQLException {

        logger.info("begin GET_ADMIN_DEPTEQUTYPE_ADMIN_TREE");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQUTYPE_ADMIN" + "(:V_V_DEPTCODENEXT,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()){
                Map temp = new HashMap();
                if(!rs.getString("V_EQUTYPECODE").toString().equals("%")){
                    temp.put("id", rs.getString("V_EQUTYPECODE"));
                    temp.put("text", rs.getString("V_EQUTYPENAME"));
                    temp.put("parentid",V_V_DEPTCODENEXT);
                    temp.put("treeid",rs.getString("V_EQUTYPECODE"));
                    temp.put("expanded", false);
                    list.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("children",list);
        logger.debug("result:" + result);
        logger.info("end GET_ADMIN_DEPTEQUTYPE_ADMIN_TREE");
        return result;
    }
    // ADMIN EQU TREE
    public HashMap GETADMIN_DEPTEQU_ADMIN_TREE(String V_V_DEPTCODENEXT,String V_V_EQUTYPECODE) throws SQLException {

        logger.info("begin GETADMIN_DEPTEQU_ADMIN_TREE");
        HashMap result = new HashMap();
        List<Map> list = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_GET_DEPTEQU_ADMIN" + "(:V_V_DEPTCODENEXT,:V_V_EQUTYPECODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODENEXT", V_V_DEPTCODENEXT);
            cstmt.setString("V_V_EQUTYPECODE", V_V_EQUTYPECODE);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
            while (rs.next()){
                Map temp = new HashMap();
                if(!rs.getString("V_EQUCODE").toString().equals("%")){
                    temp.put("id", rs.getString("V_EQUCODE"));
                    temp.put("text", rs.getString("V_EQUNAME"));
                    temp.put("leaf", true);
                    temp.put("parentid",V_V_EQUTYPECODE);
                    temp.put("treeid",rs.getString("V_EQUCODE"));
                    temp.put("V_EQUSITE", rs.getString("V_EQUSITE"));
                    temp.put("V_EQUSITENAME", rs.getString("V_EQUSITENAME"));
                    temp.put("V_EQUTYPECODE", rs.getString("V_EQUTYPECODE"));
                    temp.put("V_EQUTYPENAME", rs.getString("V_EQUTYPENAME"));
                    list.add(temp);
                }

            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        result.put("children",list);
        logger.debug("result:" + result);
        logger.info("end GETADMIN_DEPTEQU_ADMIN_TREE");
        return result;
    }
//年计划分解查询

public List<Map> PM_PLAN_YEAR_SEL_FJ(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_PERCODE,String V_V_ZY
            ,String V_SDATE,String V_EDATE,String V_UPGRID) throws SQLException {
    List<Map> result = PM_PLAN_YEAR_SEL_FJ_SEL(V_V_ORGCODE,V_V_DEPTCODE,V_V_PERCODE,V_V_ZY,V_SDATE,V_EDATE,V_UPGRID);
    return result;
}
    /* chocie tree*/
    public List<Map> PM_PLAN_YEAR_SEL_FJ_SEL(String V_V_ORGCODE,String V_V_DEPTCODE,String V_V_PERCODE,String V_V_ZY
            ,String V_SDATE,String V_EDATE,String V_UPGRID) throws SQLException {
        List<Map> list = new ArrayList<>();
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_SEL_FJ");
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt=conn.prepareCall("{call PM_PLAN_YEAR_SEL_FJ(:V_V_ORGCODE,:V_V_DEPTCODE,:V_V_PERCODE,:V_V_ZY,:V_SDATE,:V_EDATE,:V_UPGRID,:RET)}");
            cstmt.setString("V_V_ORGCODE",V_V_ORGCODE);
            cstmt.setString("V_V_DEPTCODE",V_V_DEPTCODE);
            cstmt.setString("V_V_PERCODE",V_V_PERCODE);
            cstmt.setString("V_V_ZY",V_V_ZY);
            cstmt.setString("V_SDATE",V_SDATE);
            cstmt.setString("V_EDATE",V_EDATE);
            cstmt.setString("V_UPGRID",V_UPGRID);

            cstmt.registerOutParameter("RET", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("RET")));
            List<Map> datalist = (List) result.get("list");
            if (datalist.size() > 0) {
                for (Map item : datalist) {
                    Map temp = new HashMap();

                    temp.put("ID_GUID",item.get("ID_GUID").toString());
                    temp.put("PRO_NAME",item.get("PRO_NAME").toString());
                    temp.put("UPYEARGUID",item.get("UPYEARGUID").toString());
                    temp.put("YEARID", item.get("YEARID").toString());
                    temp.put("STATE", item.get("STATE").toString());
                    temp.put("V_BASENAME", item.get("V_BASENAME").toString());
                    temp.put("V_YEAR", item.get("V_YEAR").toString());
                    temp.put("V_MONTH", item.get("V_MONTH").toString());
                    temp.put("ORGNAME", item.get("ORGNAME").toString());
                    temp.put("ZYCODE", item.get("ZYCODE").toString());
                    temp.put("ZYNAME", item.get("ZYNAME").toString());
                    temp.put("V_EQUNAME", item.get("V_EQUNAME").toString());
                    temp.put("V_EQUTYPENAME", item.get("V_EQUTYPENAME").toString());
                    temp.put("REPAIRCONTENT", item.get("REPAIRCONTENT").toString());
                    temp.put("PLANHOUR", item.get("PLANHOUR").toString());
                    temp.put("REPAIRTYPENAME", item.get("REPAIRTYPENAME").toString());
                    temp.put("INPERNAME", item.get("INPERNAME").toString());
                    temp.put("INPERCODE", item.get("INPERCODE").toString());
                    temp.put("INDATE", item.get("INDATE").toString());
                    if (item.get("UPYEARGUID").toString().equals("-1")) {
//                    if (item.get("ID_GUID").toString().equals("-1")) {ChildFalgMenu(item.get("ID_GUID").toString())
                        temp.put("leaf", false);
                        temp.put("expanded", true);
                        temp.put("children", PM_PLAN_YEAR_SEL_FJ(V_V_ORGCODE,V_V_DEPTCODE,V_V_PERCODE,V_V_ZY,V_SDATE,V_EDATE,item.get("ID_GUID").toString()));
                    }else {
                        if (ChildFalgMenu(item.get("ID_GUID").toString())) {
                            temp.put("leaf", false);
                            temp.put("expanded", true);
                            temp.put("children", PM_PLAN_YEAR_SEL_FJ(V_V_ORGCODE, V_V_DEPTCODE, V_V_PERCODE, V_V_ZY, V_SDATE, V_EDATE, item.get("ID_GUID").toString()));
                        }
                        else{
                            temp.put("leaf", true);
                            temp.put("expanded", false);
                        }
//                        temp.put("leaf", true);
//                        temp.put("expanded", false);
                    }
                    list.add(temp);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("PM_PLAN_YEAR_SEL_FJ");
        return list;
    }
    public boolean ChildFalgMenu(String parentCode) throws SQLException {
        boolean flag = true;

        List<Map> list = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            logger.info("begin PM_PLAN_YEAR_SEL_FJ_CHILE");
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_PLAN_YEAR_SEL_FJ_CHILE(:UP_ID,:RET)}");
            cstmt.setString("UP_ID", parentCode);
            cstmt.registerOutParameter("RET", OracleTypes.VARCHAR);
            cstmt.execute();

            String result=new String();
            result=(String) cstmt.getObject("RET");
            if (!result.equals("0")) {
                flag = true;
            } else {
                flag = false;
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + list);
        logger.info("end PM_PLAN_YEAR_SEL_FJ_CHILE");
        return flag;
    }
//维修计划 分解查询

}
