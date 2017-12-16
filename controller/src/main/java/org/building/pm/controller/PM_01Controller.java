package org.building.pm.controller;

import org.building.pm.service.PM_01Service;
import org.building.pm.service.PM_06Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/PM_01")
public class PM_01Controller {

    @Autowired
    private PM_01Service pm_01Service;

    @RequestMapping(value = "/PRO_HZTJ_RIGHT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_HZTJ_RIGHT_SEL(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                                       @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                                       @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PRO_HZTJ_RIGHT_SEL(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_EQU_CODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_HZTJ_RIGHT_QX", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_HZTJ_RIGHT_QX(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                                  @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                                  @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PRO_HZTJ_RIGHT_QX(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_EQU_CODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_HZTJ_RIGHT_GD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_HZTJ_RIGHT_GD(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                                 @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                                 @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PRO_HZTJ_RIGHT_GD(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_EQU_CODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_PER(@RequestParam(value = "V_DEPTCODE") String V_DEPTCODE,
                                                      @RequestParam(value = "V_DEPTTYPE") String V_DEPTTYPE,
                                                      @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PRO_BASE_DEPT_VIEW_PER(V_DEPTCODE, V_DEPTTYPE, V_V_PERSON);

        List<Map<String, Object>> rlist = (List) data.get("list");

        result.put("list", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_04_PROJECT_MAJOR_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_04_PROJECT_MAJOR_SEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PM_04_PROJECT_MAJOR_SEL();

        List<Map<String, Object>> rlist = (List) data.get("list");

        result.put("list", rlist);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TREE(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_BY1") String V_BY1,
            @RequestParam(value = "V_BY2") String V_BY2,
            @RequestParam(value = "V_BY3") String V_BY3,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PRO_PM_EQUREPAIRPLAN_TREE(V_V_GUID_FXJH,V_BY1,V_BY2,V_BY3);

        List<Map<String, Object>> rlist = (List) data.get("list");

        result.put("list", rlist);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PM_RET_DATETIME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_RET_DATETIME(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PM_RET_DATETIME();

        List<Map<String, Object>> rlist = (List) data.get("list");

        result.put("list", rlist);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TREE_SET(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,
            @RequestParam(value = "V_V_PROJECT_NAME") String V_V_PROJECT_NAME,
            @RequestParam(value = "V_V_PLAN_MONEY") String V_V_PLAN_MONEY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_DATE_DESIGN") String V_V_DATE_DESIGN,
            @RequestParam(value = "V_V_DATE_INVITE") String V_V_DATE_INVITE,
            @RequestParam(value = "V_V_DATE_B") String V_V_DATE_B,
            @RequestParam(value = "V_V_DATE_E") String V_V_DATE_E,
            @RequestParam(value = "V_V_BUDGET_MONEY") String V_V_BUDGET_MONEY,
            @RequestParam(value = "V_V_PROGRESS") String V_V_PROGRESS,
            @RequestParam(value = "V_V_BUILD_NAMAGER") String V_V_BUILD_NAMAGER,
            @RequestParam(value = "V_V_BULID_PERSON") String V_V_BULID_PERSON,
            @RequestParam(value = "V_V_DIRECT_PERSON") String V_V_DIRECT_PERSON,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_BUILD_DEPT") String V_V_BUILD_DEPT,
            @RequestParam(value = "V_V_GUID_P") String V_V_GUID_P,
            @RequestParam(value = "V_V_PROJECT_CODE_P") String V_V_PROJECT_CODE_P,
            @RequestParam(value = "V_V_PROJECT_NAME_P") String V_V_PROJECT_NAME_P,
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_V_PROJECT_CODE_FXJH") String V_V_PROJECT_CODE_FXJH,
            @RequestParam(value = "V_V_PROJECT_NAME_FXJH") String V_V_PROJECT_NAME_FXJH,
            @RequestParam(value = "V_V_SGYC") String V_V_SGYC,
            @RequestParam(value = "V_V_AQDC") String V_V_AQDC,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PRO_PM_EQUREPAIRPLAN_TREE_SET(V_V_IP,V_V_PERCODE,V_V_PERNAME,V_V_GUID,V_V_ORGCODE,V_V_DEPTCODE,V_V_YEAR,V_V_MONTH,V_V_PROJECT_CODE,
                V_V_PROJECT_NAME,V_V_PLAN_MONEY,V_V_CONTENT,V_V_DATE_DESIGN,V_V_DATE_INVITE,V_V_DATE_B,V_V_DATE_E,V_V_BUDGET_MONEY,V_V_PROGRESS,V_V_BUILD_NAMAGER,
                V_V_BULID_PERSON,V_V_DIRECT_PERSON,V_V_EQUCODE,V_V_EQUNAME,V_V_SPECIALTY,V_V_BUILD_DEPT,V_V_GUID_P,V_V_PROJECT_CODE_P,V_V_PROJECT_NAME_P,V_V_GUID_FXJH,V_V_PROJECT_CODE_FXJH,
                V_V_PROJECT_NAME_FXJH,V_V_SGYC,V_V_AQDC);

        String rlist = (String) data.get("V_INFO");
        String guid = (String) data.get("guid");

        result.put("v_info", rlist);
        result.put("guid", guid);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TREE_DEL(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_01Service.PRO_PM_EQUREPAIRPLAN_TREE_DEL(V_V_IP, V_V_PERCODE, V_V_PERNAME, V_V_GUID);

        String rlist = (String) data.get("V_INFO");

        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

}
