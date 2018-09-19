package org.building.pm.controller;

import org.building.pm.service.DrawingManageService;
import org.building.pm.service.PM_06Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by cxy on 2018/9/11.
 * DrawingManageController
 */
@Controller
@RequestMapping("/app/pm/drawingManage")
public class DrawingManageController {

    @Autowired
    private DrawingManageService drawingManageService;

//    @Autowired
//    private PM_06Service pm_06Service;
    @RequestMapping(value = "/PRO_BASE_DRAWING_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DRAWING_SEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                           @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = drawingManageService.PRO_BASE_DRAWING_SEL(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUCODE, V_V_EQUNAME);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_BYZYQ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SAP_PM_EQU_P_BYZYQ(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = drawingManageService.PRO_SAP_PM_EQU_P_BYZYQ(V_V_PERSONCODE, V_V_DEPTNEXTCODE);
        List<Map<String, Object>> drawingManagelist = (List) data.get("list");
        result.put("list", drawingManagelist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_NEW_MENU_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_PLAN_BUDGET_YEAR_SEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = drawingManageService.PRO_PM_PLAN_BUDGET_YEAR_SEL(V_V_PERSONCODE, V_V_DEPTCODE, V_V_YEAR);
        return result;
    }
    @RequestMapping(value = "/topMenu", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> topMenu(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_HOME_MENU") String V_V_HOME_MENU)
            throws SQLException {
        List<Map> result = drawingManageService.PRO_BASE_NEW_MENU_SEL(IS_V_ROLECODE, IS_V_SYSTYPE,V_V_DEPTCODE, V_V_HOME_MENU);
        return result;
    }
    @RequestMapping(value = "/orgTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> orgTree(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE) throws SQLException {
        List<Map> result = drawingManageService.getTreeData(V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/getDeptByParentDeptcode", method = RequestMethod.POST)
    @ResponseBody
    public Map getDeptByParentDeptcode(@RequestParam(value = "V_V_DEPT_PCODE") String V_V_DEPT_PCODE) throws SQLException {
        Map result = drawingManageService.PRO_BASE_DEPT_TREE_BY_PCODE(V_V_DEPT_PCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPT_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DEPT_ADD(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                       @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                 @RequestParam(value = "V_V_DEPTCODE_UP") String V_V_DEPTCODE_UP,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = drawingManageService.PRO_BASE_DEPT_ADD(V_V_DEPTCODE, V_V_DEPTNAME,V_V_DEPTCODE_UP);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DEPT_DEL(@RequestParam(value = "V_V_DEPTIDS") String V_V_DEPTIDS,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result =null;
        String[] parts = V_V_DEPTIDS.split(",");
        for(int i=0;i<parts.length;i++){
            result=drawingManageService.PRO_BASE_DEPT_DEL(parts[i]);
        }
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPT_UPD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DEPT_UPD(@RequestParam(value = "V_V_DEPTID") String V_V_DEPTID,
                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                 @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
//                                 @RequestParam(value = "V_V_DEPTCODE_UP") String V_V_DEPTCODE_UP,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = drawingManageService.PRO_BASE_DEPT_UPD(V_V_DEPTID,V_V_DEPTCODE, V_V_DEPTNAME);
        return result;
    }
//    @RequestMapping(value = "topMenu", method = RequestMethod.POST)
//    @ResponseBody
//    public List<Object> topMenu(User user) {
//        List<Object> result = menuService.getMenuData(user);
//        return result;
//    }
//    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE_NEW", method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE_NEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
//                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
//                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
//                                                       @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
//                                                       HttpServletRequest request,
//                                                       HttpServletResponse response) throws Exception {
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        HashMap data = pm_06Service.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);
//        List<Map<String, Object>> pm_06list = (List) data.get("list");
//        pm_06list.remove(0);
//        result.put("list", pm_06list);
//        result.put("success", true);
//        return result;
//    }

}
