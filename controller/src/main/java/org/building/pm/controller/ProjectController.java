package org.building.pm.controller;

import org.building.pm.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/PROJECT")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    //厂矿
    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                       @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = projectService.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }
    //类型
    @RequestMapping(value = "/PM_04_PROJECT_TYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_04_PROJECT_TYPE_SEL(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = projectService.PM_04_PROJECT_TYPE_SEL();

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }
    //专业
    @RequestMapping(value = "/PM_04_PROJECT_MAJOR_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_04_PROJECT_MAJOR_SEL(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = projectService.PM_04_PROJECT_MAJOR_SEL();

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }
    //查询
    @RequestMapping(value = "/PM_04_PROJECT_DATA_ITEM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_04_PROJECT_DATA_ITEM_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_TYPE_CODE") String V_V_TYPE_CODE,
            @RequestParam(value = "V_V_MAJOR_CODE") String V_V_MAJOR_CODE,
            @RequestParam(value = "V_V_TEXT") String V_V_TEXT,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = projectService.PM_04_PROJECT_DATA_ITEM_SEL(V_V_YEAR,V_V_ORGCODE,V_V_TYPE_CODE,V_V_MAJOR_CODE,V_V_TEXT,V_V_PAGE,V_V_PAGESIZE);

        List<Map<String, Object>> list = (List) data.get("list");

        String total=data.get("total").toString();
        result.put("total",total);
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_04_PROJECT_PARENT_CHILDSEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_04_PROJECT_PARENT_CHILDSEL(
            @RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,
            @RequestParam(value = "V_V_WBSCODE") String V_V_WBSCODE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = projectService.PM_04_PROJECT_PARENT_CHILDSEL(V_V_PROJECT_CODE, V_V_WBSCODE, V_V_PAGE, V_V_PAGESIZE);

        List<Map<String, Object>> list = (List) data.get("list");
        String total=data.get("total").toString();
        result.put("total",total);
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_04_PROJECT_DATA_ITEM_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_04_PROJECT_DATA_ITEM_SAVE(

            @RequestParam(value = "V_V_FUNTYPE") String V_V_FUNTYPE,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_TYPE_CODE") String V_V_TYPE_CODE,
            @RequestParam(value = "V_V_MAJOR_CODE") String V_V_MAJOR_CODE,
            @RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,

            @RequestParam(value = "V_V_PROJECT_NAME") String V_V_PROJECT_NAME,
            @RequestParam(value = "V_V_WBS_CODE") String V_V_WBS_CODE,
            @RequestParam(value = "V_V_WBS_NAME") String V_V_WBS_NAME,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_BUDGET_MONEY") String V_V_BUDGET_MONEY,

            @RequestParam(value = "V_V_REPAIR_DEPT") String V_V_REPAIR_DEPT,
            @RequestParam(value = "V_V_FZR") String V_V_FZR,
            @RequestParam(value = "V_V_DATE_B") String V_V_DATE_B,
            @RequestParam(value = "V_V_DATE_E") String V_V_DATE_E,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,

            @RequestParam(value = "V_V_FLOW_STATE") String V_V_FLOW_STATE,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_INTIEM") String V_V_INTIEM,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = projectService.PM_04_PROJECT_DATA_ITEM_SAVE(
                V_V_FUNTYPE,
                V_V_ORGCODE,
                V_V_TYPE_CODE,
                V_V_MAJOR_CODE,
                V_V_PROJECT_CODE,

                V_V_PROJECT_NAME,
                V_V_WBS_CODE,
                V_V_WBS_NAME,
                V_V_CONTENT,
                V_V_BUDGET_MONEY,

                V_V_REPAIR_DEPT,
                V_V_FZR,
                V_V_DATE_B,
                V_V_DATE_E,
                V_V_BZ,

                V_V_FLOW_STATE,
                V_V_INPER,
                V_V_INTIEM,
                V_V_YEAR);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_04_PROJECT_DATA_ITEM_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_04_PROJECT_DATA_ITEM_DEL(
            @RequestParam(value = "V_V_PROJECTCODE") String V_V_PROJECTCODE,
            @RequestParam(value = "V_V_WBSCODE") String V_V_WBSCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = projectService.PM_04_PROJECT_DATA_ITEM_DEL(V_V_PROJECTCODE,V_V_WBSCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_040303PTREE", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PM_040303PTREE(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_TYPE_CODE") String V_V_TYPE_CODE,
            @RequestParam(value = "V_V_MAJOR_CODE") String V_V_MAJOR_CODE,
            @RequestParam(value = "V_V_TEXT") String V_V_TEXT,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request, HttpServletResponse response) throws Exception {

        List<Map> result = new ArrayList<Map>();

        HashMap data = projectService.PM_04_PROJECT_DATA_ITEM_SEL(V_V_YEAR,V_V_ORGCODE,V_V_TYPE_CODE,V_V_MAJOR_CODE,V_V_TEXT,V_V_PAGE,V_V_PAGESIZE);

        List<Map<String, Object>> list = (List) data.get("list");

        for(int i=0;i<list.size();i++){
            Map temp = new HashMap();
            temp.put("id", list.get(i).get("V_PROJECT_CODE"));
            temp.put("text", list.get(i).get("V_PROJECT_NAME"));
            temp.put("V_ORGNAME", list.get(i).get("V_ORGNAME"));
            temp.put("V_TYPE_NAME", list.get(i).get("V_TYPE_NAME"));
            temp.put("V_MAJOR_NAME", list.get(i).get("V_MAJOR_NAME"));
            temp.put("V_WBS_CODE", list.get(i).get("V_WBS_CODE"));
            temp.put("V_CONTENT", list.get(i).get("V_CONTENT"));
            temp.put("V_BUDGET_MONEY", list.get(i).get("V_BUDGET_MONEY"));
            temp.put("V_REPAIR_DEPTNAME", list.get(i).get("V_REPAIR_DEPTNAME"));
            temp.put("V_FZR", list.get(i).get("V_FZR"));
            temp.put("V_DATE_B", list.get(i).get("V_DATE_B"));
            temp.put("V_DATE_E", list.get(i).get("V_DATE_E"));
            temp.put("V_BZ", list.get(i).get("V_BZ"));
            result.add(temp);
        }

        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_DD_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DD_CREATE(
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = projectService.PRO_PM_WORKORDER_DD_CREATE(V_V_PERCODE,V_V_PERNAME, V_V_ORGCODE, V_V_DEPTCODE, V_V_SOURCECODE);

        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }

}
