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
import java.util.ArrayList;
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
    public Map<String, Object> PRO_BASE_DRAWING_SEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                           @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = drawingManageService.PRO_BASE_DRAWING_SEL(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUCODE, V_V_EQUNAME);
        Integer page = Integer.valueOf(request.getParameterValues("page")[0].toString());
        Integer start = Integer.valueOf(request.getParameterValues("start")[0].toString());
        Integer limit = Integer.valueOf(request.getParameterValues("limit")[0].toString());
        List list =  (List)result.get("list");
        List temp = new ArrayList();
        int total = list.size();
        int end = start + limit > total ? total : start + limit;
        for(int i = start ; i < end ; i++){
            temp.add(list.get(i));
        }
        result.put("list",temp);
        result.put("total",total);
        result.put("success", true);
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

    @RequestMapping(value = "/PRO_PM_PLAN_BUDGET_YEAR_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PLAN_BUDGET_YEAR_SEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = drawingManageService.PRO_PM_PLAN_BUDGET_YEAR_SEL(V_V_PERSONCODE, V_V_DEPTCODE, V_V_YEAR);
        Integer page = Integer.valueOf(request.getParameterValues("page")[0].toString());
        Integer start = Integer.valueOf(request.getParameterValues("start")[0].toString());
        Integer limit = Integer.valueOf(request.getParameterValues("limit")[0].toString());
        List list =  (List)result.get("list");
        List temp = new ArrayList();
        int total = list.size();
        int end = start + limit > total ? total : start + limit;
        for(int i = start ; i < end ; i++){
            temp.add(list.get(i));
        }
        result.put("list",temp);
        result.put("total",total);
        result.put("success", true);
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
    public Map<String, Object> getDeptByParentDeptcode(@RequestParam(value = "V_V_DEPT_PCODE") String V_V_DEPT_PCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws SQLException {
        Map<String, Object> result = drawingManageService.PRO_BASE_DEPT_TREE_BY_PCODE(V_V_DEPT_PCODE);
        Integer page = Integer.valueOf(request.getParameterValues("page")[0].toString());
        Integer start = Integer.valueOf(request.getParameterValues("start")[0].toString());
        Integer limit = Integer.valueOf(request.getParameterValues("limit")[0].toString());
        List list =  (List)result.get("list");
        List temp = new ArrayList();
        int total = list.size();
        int end = start + limit > total ? total : start + limit;
        for(int i = start ; i < end ; i++){
            temp.add(list.get(i));
        }
        result.put("list",temp);
        result.put("total",total);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPT_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DEPT_ADD(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                 @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                 @RequestParam(value = "V_V_DEPTCODE_UP") String V_V_DEPTCODE_UP,
                                 @RequestParam(value = "V_V_DEPTSMALLNAME") String V_V_DEPTSMALLNAME,
                                 @RequestParam(value = "V_V_DEPTFULLNAME") String V_V_DEPTFULLNAME,
                                 @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                 @RequestParam(value = "V_I_ORDERID") String V_I_ORDERID,
                                 @RequestParam(value = "V_V_SAP_DEPT") String V_V_SAP_DEPT,
                                 @RequestParam(value = "V_V_SAP_WORK") String V_V_SAP_WORK,
                                 @RequestParam(value = "V_V_SAP_JHGC") String V_V_SAP_JHGC,
                                 @RequestParam(value = "V_V_SAP_YWFW") String V_V_SAP_YWFW,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = drawingManageService.PRO_BASE_DEPT_ADD(V_V_DEPTCODE, V_V_DEPTNAME,V_V_DEPTCODE_UP,V_V_DEPTSMALLNAME,V_V_DEPTFULLNAME,
                V_V_DEPTTYPE,V_I_ORDERID,V_V_SAP_DEPT,V_V_SAP_WORK,V_V_SAP_JHGC,V_V_SAP_YWFW);
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
                                 @RequestParam(value = "V_V_DEPTCODE_UP") String V_V_DEPTCODE_UP,
                                 @RequestParam(value = "V_V_DEPTSMALLNAME") String V_V_DEPTSMALLNAME,
                                 @RequestParam(value = "V_V_DEPTFULLNAME") String V_V_DEPTFULLNAME,
                                 @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                 @RequestParam(value = "V_I_ORDERID") String V_I_ORDERID,
                                 @RequestParam(value = "V_V_SAP_DEPT") String V_V_SAP_DEPT,
                                 @RequestParam(value = "V_V_SAP_WORK") String V_V_SAP_WORK,
                                 @RequestParam(value = "V_V_SAP_JHGC") String V_V_SAP_JHGC,
                                 @RequestParam(value = "V_V_SAP_YWFW") String V_V_SAP_YWFW,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = drawingManageService.PRO_BASE_DEPT_UPD(V_V_DEPTID,V_V_DEPTCODE, V_V_DEPTNAME,
                     V_V_DEPTCODE_UP,V_V_DEPTSMALLNAME,V_V_DEPTFULLNAME,V_V_DEPTTYPE,V_I_ORDERID,
                     V_V_SAP_DEPT,V_V_SAP_WORK,V_V_SAP_JHGC,V_V_SAP_YWFW);
        return result;
    }

    @RequestMapping(value = "/PRO_OIL_YEAR_PLAN_AND_APP_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_OIL_YEAR_PLAN_AND_APP_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
//            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE) throws Exception {

        HashMap data = drawingManageService.PRO_OIL_YEAR_PLAN_AND_APP_SEL(V_V_YEAR,V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PRO_OIL_YEAR_PLAN_APPROVAL_SEL", method = RequestMethod.POST)
      @ResponseBody
      public Map<String, Object> PRO_OIL_YEAR_PLAN_APPROVAL_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE) throws Exception {

        HashMap data = drawingManageService.PRO_OIL_YEAR_PLAN_APPROVAL_SEL(V_V_YEAR, V_V_ORGCODE,V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PRO_OIL_YEAR_PLAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_OIL_YEAR_PLAN_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE) throws Exception {

        HashMap data = drawingManageService.PRO_OIL_YEAR_PLAN_SEL(V_V_YEAR, V_V_ORGCODE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/FIXED_ASSETS_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> FIXED_ASSETS_SEL(
            @RequestParam(value = "V_V_ORG_CODE") String V_V_ORG_CODE,
            @RequestParam(value = "V_V_ASSETS_CODE") String V_V_ASSETS_CODE,
            @RequestParam(value = "V_V_ASSETS_NAME") String V_V_ASSETS_NAME,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE) throws Exception {

        HashMap data = drawingManageService.FIXED_ASSETS_SEL(V_V_ORG_CODE,V_V_ASSETS_CODE ,V_V_ASSETS_NAME, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }
}
