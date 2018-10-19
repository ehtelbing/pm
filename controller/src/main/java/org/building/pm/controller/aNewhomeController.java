package org.building.pm.controller;
import org.building.pm.service.AnewhomeService;
import org.building.pm.service.BasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/anewhome/")
public class aNewhomeController {
    @Autowired
    private AnewhomeService anewhomeService;

    //===========update2018-10-08  主页返回菜单
    @RequestMapping(value = "SEL_MENU_HOME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SEL_MENU_HOME(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "SING_ID") String SING_ID
            )
            throws SQLException {
        Map<String, Object> result = anewhomeService.SEL_MENU_HOME(IS_V_ROLECODE,IS_V_SYSTYPE,V_V_DEPTCODE,SING_ID);
        return result;
    }

    @RequestMapping(value = "sel_menu_tree_id", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> sel_menu_tree_id(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_MENUCODE") String V_V_MENUCODE)
            throws SQLException {
        List<Map> result = anewhomeService.sel_menu_tree_id(IS_V_ROLECODE,IS_V_SYSTYPE,V_V_DEPTCODE,V_V_MENUCODE);
        return result;
    }
 //----------old favourit menu
    @RequestMapping(value = "/PRO_BASE_MENU_FAVORITE2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_NEW_MENU_SEL2(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_HOME_MENU") String V_V_HOME_MENU,
            @RequestParam(value = "V_V_USERID") String V_V_USERID)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> deptList = (List<Map<String, Object>>) (anewhomeService.PRO_BASE_MENU_FAVORITE2(IS_V_ROLECODE, IS_V_SYSTYPE, V_V_DEPTCODE, V_V_HOME_MENU, V_V_USERID).get("list"));
        List<Map<String, Object>> children = new ArrayList<Map<String, Object>>();
        Map<String, Object> dept;
        if (deptList != null) {

            for (int i = 0; i < deptList.size(); i++) {
                dept = deptList.get(i);
                if ("-1".equals(dept.get("V_MENUCODE_UP"))) {
                    children.add(dept);
                    if (fillChildDept(dept, deptList).size() <= 0) {
                        dept.put("leaf", true);
                    } else {
                        fillChildDept(dept, deptList);
                    }
                }
            }

        }
        result.put("deptList", deptList);
        result.put("children", children);
        return result;
    }
    private List<Map<String, Object>> fillChildDept(Map<String, Object> dept, List<Map<String, Object>> deptList) {
        List<Map<String, Object>> children = new ArrayList<Map<String, Object>>();
        Map<String, Object> childDept;
        for (int i = 0; i < deptList.size(); i++) {
            childDept = deptList.get(i);
            if (dept.get("V_MENUCODE").equals(childDept.get("V_MENUCODE_UP"))) {
                children.add(childDept);
                if (fillChildDept(childDept, deptList).size() == 0) {
                    childDept.put("leaf", true);
                } else {
                    fillChildDept(childDept, deptList);
                }
            }
        }
        dept.put("children", children);
        return children;
    }

    @RequestMapping(value = "PRO_BASE_ALLMENU_NEW_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_ALLMENU_NEW_VIEW(
            @RequestParam(value = "RoleCode") String RoleCode,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "IS_V_MENUCODE_UP") String IS_V_MENUCODE_UP
    )
            throws SQLException {
        Map<String, Object> result = anewhomeService.PRO_BASE_ALLMENU_NEW_VIEW(RoleCode, IS_V_SYSTYPE, IS_V_MENUCODE_UP);
        return result;
    }
}
