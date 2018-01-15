package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Service
public class MenuService {

    @Autowired
    private ComboPooledDataSource dataSources;

    //查询数据
    public List<Map> queryMenu(String IS_V_ROLECODE, String IS_V_SYSTYPE, String V_V_DEPTCODE,String V_V_HOME_MENU) throws Exception {

        int menu_num = 0;
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;

        conn = dataSources.getConnection();
        conn.setAutoCommit(true);
        cstmt = conn.prepareCall("{call PRO_BASE_NEW_MENU_SEL(:IS_V_ROLECODE,:IS_V_SYSTYPE,:V_V_DEPTCODE,:V_V_HOME_MENU,:V_CURSOR)}");
        cstmt.setString("IS_V_ROLECODE", IS_V_ROLECODE);
        cstmt.setString("IS_V_SYSTYPE", IS_V_SYSTYPE);
        cstmt.setString("V_V_DEPTCODE", V_V_DEPTCODE);
        cstmt.setString("V_V_HOME_MENU", V_V_HOME_MENU);
        cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
        cstmt.execute();
        ResultSet rs = (ResultSet) cstmt.getObject("V_CURSOR");
        while (rs.next()) {
                Map temp = new HashMap();
                temp.put("id", rs.getString("V_MENUCODE").toString());
                temp.put("text", rs.getString("V_MENUNAME").toString());
                temp.put("pid", rs.getString("V_MENUCODE_UP").toString());
                if(rs.getString("V_URL")!=null) {
                    temp.put("src", rs.getString("V_URL").toString());
                }else{
                    temp.put("src", "");
                }
                result.add(temp);
        }
        cstmt.close();
        conn.close();
        return result;
    }

    //构建菜单
    public List<Object> getMenuData(String IS_V_ROLECODE,String IS_V_SYSTYPE,String V_V_DEPTCODE,String V_V_HOME_MENU) {

        List<Object> result = new ArrayList<Object>();

        List<Map> listAll = null;
        List<Map> list = null;

        try {
            listAll = queryMenu(IS_V_ROLECODE, IS_V_SYSTYPE,V_V_DEPTCODE, V_V_HOME_MENU); //查找全部
            list = findMenu(listAll,"-1");                                           //查找一级
        } catch (Exception e) {
            e.printStackTrace();
        }
        int st = 0;
        for (Map<String, Object> m : list) {

            Map item = new LinkedHashMap();
                item.put("sid", m.get("id").toString());
                item.put("text", m.get("text").toString());

                Map itemNode = new LinkedHashMap();
                    itemNode.put("items",this.getMenuItems(listAll, m.get("id").toString()));
                item.put("menu", itemNode);

            if(st>0)result.add("-");
            result.add(item);
            st++;
        }
        return result;
    }

    //构建子级
    private List<Map> getMenuItems(List<Map> list, String pid) {

        List<Map> listMenu = new ArrayList<Map>();
               //获取下级数据
               List<Map> listData = findMenu(list,pid);
               //构建下级菜单
               for(Map m:listData){
                   Map item = new LinkedHashMap();
                       item.put("sid",m.get("id").toString());
                       item.put("text", m.get("text").toString());
                       //查询子级
                       List<Map> mmm = this.getMenuItems(list, m.get("id").toString());
                       if(mmm.size()>0) {
                           Map itemNode = new LinkedHashMap();
                           itemNode.put("items", mmm);
                           item.put("menu", itemNode);
                       }else{
                           item.put("src",m.get("src").toString()); //添加链接
                       }
                   listMenu.add(item);
               }
            return listMenu;
    }

    //查找菜单
    public List<Map> findMenu(List<Map> list,String pid){

        List<Map> listM = new ArrayList<Map>();
        for(Map m:list){
            if(m.get("pid").toString().equals(pid)){
                listM.add(m);
            }
        }
        return listM;
    }
}
