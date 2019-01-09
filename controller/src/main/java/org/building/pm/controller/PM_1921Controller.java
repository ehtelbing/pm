package org.building.pm.controller;

import org.building.pm.service.PM_1921Service;
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
 * Created by zjh on 2017/1/22.
 * <p>
 * �豸�¹�controller
 */
@Controller
@RequestMapping("/app/pm/pm_1921")
public class PM_1921Controller {

    @Autowired
    private PM_1921Service pm_1921Service;

    @RequestMapping(value = "/PM_1921_PLAN_MX_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1921_PLAN_MX_DATA_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ZYCODE") String V_V_ZYCODE,
            @RequestParam(value = "V_V_MXNAME") String V_V_MXNAME,
            @RequestParam(value = "page") Integer page,
            @RequestParam(value = "limit") Integer limit,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
            String V_V_PAGE = page.toString();
            String V_V_PAGESIZE = limit.toString();

        HashMap data = pm_1921Service.PM_1921_PLAN_MX_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE,V_V_ZYCODE,V_V_MXNAME,
                  V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PM_1921_PLAN_EQU_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1921_PLAN_EQU_DATA_SEL(
            @RequestParam(value = "V_V_MXCODE") String V_V_MXCODE,
            @RequestParam(value = "page") Integer page,
            @RequestParam(value = "limit") Integer limit,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        String V_V_PAGE = page.toString();
        String V_V_PAGESIZE = limit.toString();

        HashMap data = pm_1921Service.PM_1921_PLAN_EQU_DATA_SEL(V_V_MXCODE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PM_1921_PLAN_MX_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1921_PLAN_MX_DATA_SET(
            @RequestParam(value = "V_V_MX_CODE") String V_V_MX_CODE,
            @RequestParam(value = "V_V_MX_NAME") String V_V_MX_NAME,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_MENO") String V_V_MENO,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;


        result = pm_1921Service.PM_1921_PLAN_MX_DATA_SET(V_V_MX_CODE, V_V_MX_NAME, V_V_ORGCODE, V_V_DEPTCODE, V_V_SPECIALTY, V_V_MENO, V_V_INPER);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1921_PLAN_EQU_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1921_PLAN_EQU_DATA_SET(
            @RequestParam(value = "V_V_MX_CODE") String V_V_MX_CODE,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_MENO") String V_V_MENO,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
            @RequestParam(value = "V_V_PERNUM") String V_V_PERNUM,
            @RequestParam(value = "V_V_LIFELONG") String V_V_LIFELONG,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;


        result = pm_1921Service.PM_1921_PLAN_EQU_DATA_SET(V_V_MX_CODE, V_V_GUID, V_V_EQUTYPE, V_V_EQUCODE, V_V_MENO, V_V_INPER, V_V_JXMX_CODE,V_V_PERNUM,V_V_LIFELONG);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1921_PLAN_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1921_PLAN_DATA_DEL(@RequestParam(value = "V_V_TYPE") String V_V_TYPE,
                                                     @RequestParam(value = "V_MX_CODE_ID_LIST") List<String> V_MX_CODE_ID_LIST,
                                                    @RequestParam(value = "V_GUID_ID_LIST") List<String>  V_GUID_ID_LIST,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        String V_V_IP =request.getRemoteAddr();
        String V_V_MXCODE;
        String V_V_GUID ;


        for (int i = 0 ; i<V_MX_CODE_ID_LIST.size(); i++)
        {
            V_V_MXCODE = V_MX_CODE_ID_LIST.get(i);
            V_V_GUID = V_GUID_ID_LIST.get(i);
            pm_1921Service.PM_1921_PLAN_DATA_DEL(V_V_TYPE, V_V_MXCODE, V_V_GUID);
        }


       // HashMap data = pm_1921Service.PM_1921_PLAN_DATA_DEL(V_V_TYPE, V_V_MXCODE, V_V_GUID);

        /*String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);*/
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1921_PLAN_DATA_DELFIRST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1921_PLAN_DATA_DELFIRST(@RequestParam(value = "V_V_TYPE") String V_V_TYPE,
                                                     @RequestParam(value = "V_MX_CODE_ID_LIST") List<String> V_MX_CODE_ID_LIST,
                                                     @RequestParam(value = "V_V_GUID") String  V_V_GUID,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        String V_V_IP =request.getRemoteAddr();
        String V_V_MXCODE;


        for (int i = 0 ; i<V_MX_CODE_ID_LIST.size(); i++)
        {
            V_V_MXCODE = V_MX_CODE_ID_LIST.get(i);
            pm_1921Service.PM_1921_PLAN_DATA_DEL(V_V_TYPE, V_V_MXCODE, V_V_GUID);
        }


        // HashMap data = pm_1921Service.PM_1921_PLAN_DATA_DEL(V_V_TYPE, V_V_MXCODE, V_V_GUID);

        /*String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);*/
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1921_PLAN_MX_DATA_CHECK", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1921_PLAN_MX_DATA_CHECK(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_STIME") String V_V_STIME,
            @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
            @RequestParam(value = "V_V_SUNTIME") String V_V_SUNTIME,
            @RequestParam(value = "V_V_PRENUM") String V_V_PRENUM,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;

        result = pm_1921Service.PM_1921_PLAN_MX_DATA_CHECK(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_PLANTYPE, V_V_PERCODE,
                V_V_YEAR, V_V_QUARTER, V_V_MONTH, V_V_WEEK, V_V_STIME, V_V_ETIME, V_V_SUNTIME,V_V_PRENUM);
        test.put("list", result);
        return test;
    }
}
