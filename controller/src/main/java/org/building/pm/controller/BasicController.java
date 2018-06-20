package org.building.pm.controller;

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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 * <p>
 * �豸�¹�controller
 */
@Controller
@RequestMapping("/app/pm/basic")
public class BasicController {

    @Autowired
    private BasicService basicService;

    /*
     * 班组详情查询
     * */
    @RequestMapping(value = "PRO_BASE_PERSONROLE_VIEW_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_PERSONROLE_VIEW_NEW(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = basicService.PRO_BASE_PERSONROLE_VIEW_NEW(V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_PERSONROLE_SET_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSONROLE_SET_NEW(@RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                           @RequestParam(value = "V_V_ROLENAME") String V_V_ROLENAME,
                                           @RequestParam(value = "V_V_ROLEMEMO") String V_V_ROLEMEMO,
                                           @RequestParam(value = "V_V_ROLETYPE") String V_V_ROLETYPE,
                                           @RequestParam(value = "V_I_ORDERID") Double V_I_ORDERID,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PRO_BASE_PERSONROLE_SET_NEW(V_V_ROLECODE, V_V_ROLENAME, V_V_ROLEMEMO, V_V_ROLETYPE,
                V_I_ORDERID, V_V_DEPTCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_BASE_PERSONROLE_DEL_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSONROLE_DEL_NEW(@RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PRO_BASE_PERSONROLE_DEL_NEW(V_V_ROLECODE, V_V_DEPTCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_BASE_ROLETOMENU_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_ROLETOMENU_SET(@RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                       @RequestParam(value = "V_V_MENUCODE") String V_V_MENUCODE,
                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PRO_BASE_ROLETOMENU_SET(V_V_ROLECODE, V_V_MENUCODE, V_V_DEPTCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_BASE_ROLETOMENU_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_ROLETOMENU_DEL(@RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                       @RequestParam(value = "V_V_MENUCODE") String V_V_MENUCODE,
                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PRO_BASE_ROLETOMENU_DEL(V_V_ROLECODE, V_V_MENUCODE, V_V_DEPTCODE);
        test.put("list", result);
        return test;
    }

    //上传测试
    @RequestMapping(value = "/PRO_BASE_ROLETOMENU_DEL1", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_ROLETOMENU_DEL1(@RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                        @RequestParam(value = "V_V_MENUCODE") String V_V_MENUCODE,
                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PRO_BASE_ROLETOMENU_DEL(V_V_ROLECODE, V_V_MENUCODE, V_V_DEPTCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_SEL(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = basicService.PRO_SAP_PM_EQU_P_GET(V_V_EQUCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXMX_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1917_JXMX_DATA_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
            @RequestParam(value = "V_V_JXMX_NAME") String V_V_JXMX_NAME,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = basicService.PM_1917_JXMX_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_JXMX_NAME, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PM_1917_JXMX_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXMX_DATA_SET(
            @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
            @RequestParam(value = "V_V_JXMX_NAME") String V_V_JXMX_NAME,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUCODE_CHILD") String V_V_EQUCODE_CHILD,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
            @RequestParam(value = "V_V_IN_PER") String V_V_IN_PER,
            @RequestParam(value = "V_V_IN_DATE") String V_V_IN_DATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PM_1917_JXMX_DATA_SET(V_V_JXMX_CODE, V_V_JXMX_NAME, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE,
                V_V_EQUCODE, V_V_EQUCODE_CHILD, V_V_REPAIRMAJOR_CODE, V_V_BZ, V_V_HOUR, V_V_IN_PER, V_V_IN_DATE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXMX_JJ_CHANGE", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXMX_JJ_CHANGE(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_JJCODE") String V_V_JJCODE,
            @RequestParam(value = "V_V_TS") String V_V_TS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PM_1917_JXMX_JJ_CHANGE(V_V_JXGX_CODE, V_V_JJCODE, V_V_TS);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXGX_GJ_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_GJ_DATA_SET(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_GJ_CODE") String V_V_GJ_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PM_1917_JXGX_GJ_DATA_SET(V_V_JXGX_CODE, V_V_GJ_CODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXGX_PER_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_PER_DATA_SET(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_PERCODE_DE") String V_V_PERCODE_DE,
            @RequestParam(value = "V_V_TS") String V_V_TS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PM_1917_JXGX_PER_DATA_SET(V_V_JXGX_CODE, V_V_PERCODE_DE, V_V_TS);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXGX_PER_DATA_SET_N", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_PER_DATA_SET_N(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_PERCODE_DE") String V_V_PERCODE_DE,
            @RequestParam(value = "V_V_TS") String V_V_TS,
            @RequestParam(value = "V_V_PERNUM") String V_V_PERNUM,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PM_1917_JXGX_PER_DATA_SET_N(V_V_JXGX_CODE, V_V_PERCODE_DE, V_V_TS, V_V_PERNUM);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_BASE_DEPTTOSAPWORKCSAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPTTOSAPWORKCSAT(
            @RequestParam(value = "V_V_DEPTREPAIRCODE") String V_V_DEPTREPAIRCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = basicService.PRO_BASE_DEPTTOSAPWORKCSAT(V_V_DEPTREPAIRCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXGX_AQCS_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_AQCS_DATA_SET(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PM_1917_JXGX_AQCS_DATA_SET(V_V_JXGX_CODE, V_V_AQCS_CODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXGX_JSYQ_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_JSYQ_DATA_SET(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_JSYQ_CODE") String V_V_JSYQ_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PM_1917_JXGX_JSYQ_DATA_SET(V_V_JXGX_CODE, V_V_JSYQ_CODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_SAP_EQU_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SAP_EQU_VIEW(
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = basicService.PRO_SAP_EQU_VIEW(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUTYPECODE, V_V_EQUCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_SPECIALTY_DEPT_SPECIN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_SPECIALTY_DEPT_SPECIN(
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = basicService.PRO_BASE_SPECIALTY_DEPT_SPECIN(V_V_PERSONCODE, V_V_DEPTNEXTCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //查询检修单位
    @RequestMapping(value = "/PRO_PM_REPAIRDEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_REPAIRDEPT_VIEW(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            //@RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = basicService.PRO_PM_REPAIRDEPT_VIEW(V_V_DEPTCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }


    //查询状态编码
    @RequestMapping(value = "/PM_03_FLOWCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_FLOWCODE_SEL(
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PM_03_FLOWCODE_SEL(V_V_PLANTYPE, V_V_ORGCODE, V_V_DEPTCODE, V_V_PERSONCODE);
        test.put("list", result);
        return test;
    }


    //查询状态编码
    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_YEAR_SET(
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_YEARPLAN_GUID") String V_V_YEARPLAN_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
            @RequestParam(value = "V_V_JXBZ_CODE") String V_V_JXBZ_CODE,
            @RequestParam(value = "V_V_REPAIRDEPT_CODE") String V_V_REPAIRDEPT_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = basicService.PRO_PM_03_PLAN_YEAR_SET(V_V_INPER,
                V_V_YEARPLAN_GUID,
                V_V_YEAR,
                V_V_ORGCODE,
                V_V_DEPTCODE,
                V_V_EQUTYPECODE,
                V_V_EQUCODE,
                V_V_REPAIRMAJOR_CODE,
                V_V_CONTENT,
                V_V_STARTTIME,
                V_V_ENDTIME,
                V_V_FLOWCODE,
                V_V_JXGX_CODE,
                V_V_JXMX_CODE,
                V_V_JXBZ_CODE,
                V_V_REPAIRDEPT_CODE);
        test.put("list", result);
        return test;
    }

    //月检修计划保存
    @RequestMapping(value = "/PRO_PM_03_PLAN_MONTH_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_MONTH_SET(
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_OTHERPLAN_GUID") String V_V_OTHERPLAN_GUID,
            @RequestParam(value = "V_V_OTHERPLAN_TYPE") String V_V_OTHERPLAN_TYPE,
            @RequestParam(value = "V_V_JHMX_GUID") String V_V_JHMX_GUID,
            @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_MAIN_DEFECT") String V_V_MAIN_DEFECT,
            @RequestParam(value = "V_V_EXPECT_AGE") String V_V_EXPECT_AGE,
            @RequestParam(value = "V_V_REPAIR_PER") String V_V_REPAIR_PER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PRO_PM_03_PLAN_MONTH_SET(
                V_V_INPER,
                V_V_GUID,
                V_V_YEAR,
                V_V_MONTH,
                V_V_ORGCODE,
                V_V_DEPTCODE,
                V_V_EQUTYPECODE,
                V_V_EQUCODE,
                V_V_REPAIRMAJOR_CODE,
                V_V_CONTENT,
                V_V_STARTTIME,
                V_V_ENDTIME,
                V_V_OTHERPLAN_GUID,
                V_V_OTHERPLAN_TYPE,
                V_V_JHMX_GUID,
                V_V_HOUR,
                V_V_BZ,
                V_V_MAIN_DEFECT,
                V_V_EXPECT_AGE,
                V_V_REPAIR_PER);
        return result;
    }

    //季度检修计划保存
    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_QUARTER_SET(
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_QUARTERPLAN_GUID") String V_V_QUARTERPLAN_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
            @RequestParam(value = "V_V_JXBZ_CODE") String V_V_JXBZ_CODE,
            @RequestParam(value = "V_V_REPAIRDEPT_CODE") String V_V_REPAIRDEPT_CODE,
            @RequestParam(value = "V_V_YEARPLAN_CODE") String V_V_YEARPLAN_CODE,
            @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PRO_PM_03_PLAN_QUARTER_SET(
                V_V_INPER,
                V_V_QUARTERPLAN_GUID,
                V_V_YEAR,
                V_V_QUARTER,
                V_V_ORGCODE,
                V_V_DEPTCODE,
                V_V_EQUTYPECODE,
                V_V_EQUCODE,
                V_V_REPAIRMAJOR_CODE,
                V_V_CONTENT,
                V_V_STARTTIME,
                V_V_ENDTIME,
                V_V_FLOWCODE,
                V_V_JXGX_CODE,
                V_V_JXMX_CODE,
                V_V_JXBZ_CODE,
                V_V_REPAIRDEPT_CODE,
                V_V_YEARPLAN_CODE,
                V_V_HOUR,
                V_V_BZ);
        return result;
    }

    //周检修计划保存
    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_WEEK_SET(
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,

            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,

            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_OTHERPLAN_GUID") String V_V_OTHERPLAN_GUID,
            @RequestParam(value = "V_V_OTHERPLAN_TYPE") String V_V_OTHERPLAN_TYPE,

            @RequestParam(value = "V_V_JHMX_GUID") String V_V_JHMX_GUID,
            @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_DEFECTGUID") String V_V_DEFECTGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PRO_PM_03_PLAN_WEEK_SET(
                V_V_INPER,
                V_V_GUID,
                V_V_YEAR,
                V_V_MONTH,
                V_V_WEEK,

                V_V_ORGCODE,
                V_V_DEPTCODE,
                V_V_EQUTYPECODE,
                V_V_EQUCODE,
                V_V_REPAIRMAJOR_CODE,

                V_V_CONTENT,
                V_V_STARTTIME,
                V_V_ENDTIME,
                V_V_OTHERPLAN_GUID,
                V_V_OTHERPLAN_TYPE,

                V_V_JHMX_GUID,
                V_V_HOUR,
                V_V_BZ,
                V_V_DEFECTGUID);
        return result;
    }

    //查询待办类型以及数量
    @RequestMapping(value = "/PRO_FLOW_TYPE_PERNUM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_FLOW_TYPE_PERNUM_SEL(
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_D_BEGINTIME") String V_D_BEGINTIME,
            @RequestParam(value = "V_D_ENDTIME") String V_D_ENDTIME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = basicService.PRO_FLOW_TYPE_PERNUM_SEL(V_V_PERCODE, V_D_BEGINTIME, V_D_ENDTIME);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }


    @RequestMapping(value = "/PRO_WO_FLOW_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_DATA_SEL(
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_D_BEGINTIME") String V_D_BEGINTIME,
            @RequestParam(value = "V_D_ENDTIME") String V_D_ENDTIME,
            @RequestParam(value = "V_V_GDH") String V_V_GDH,
            @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
            @RequestParam(value = "V_I_PAGE") Integer V_I_PAGE,
            @RequestParam(value = "V_I_PAGENUMBER") Integer V_I_PAGENUMBER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = basicService.PRO_WO_FLOW_DATA_SEL(V_V_PERCODE, V_D_BEGINTIME, V_D_ENDTIME, V_V_GDH, V_V_FLOWTYPE, V_I_PAGE, V_I_PAGENUMBER);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("V_INFO", data.get("V_INFO").toString());
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXGX_WL_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_WL_DATA_SET(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_KFNAME") String V_V_KFNAME,
            @RequestParam(value = "V_V_WLCODE") String V_V_WLCODE,
            @RequestParam(value = "V_V_WLSM") String V_V_WLSM,
            @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
            @RequestParam(value = "V_V_JLDW") String V_V_JLDW,
            @RequestParam(value = "V_V_PRICE") String V_V_PRICE,
            @RequestParam(value = "V_V_NUM") String V_V_NUM,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PM_1917_JXGX_WL_DATA_SET(V_V_JXGX_CODE, V_V_KFNAME, V_V_WLCODE, V_V_WLSM, V_V_GGXH, V_V_JLDW, V_V_PRICE, V_V_NUM);
        return result;
    }

    @RequestMapping(value = "/PRO_WO_FLOW_DATA_DETAIL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_DATA_DETAIL_SEL(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PRO_WO_FLOW_DATA_DETAIL_SEL(V_V_ORDERID, V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_HOME_FLOW_NUM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_HOME_FLOW_NUM_SEL(
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_D_STARTDATE") String V_D_STARTDATE,
            @RequestParam(value = "V_D_ENDDTTE") String V_D_ENDDTTE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PRO_HOME_FLOW_NUM_SEL(V_V_PERCODE, V_D_STARTDATE, V_D_ENDDTTE);
        return result;
    }

    @RequestMapping(value = "/PM_PRO_DB_PERSONNUM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_PRO_DB_PERSONNUM_SEL(
            @RequestParam(value = "V_V_SDATE") String V_V_SDATE,
            @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
            @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PM_PRO_DB_PERSONNUM_SEL(V_V_SDATE, V_V_EDATE, V_V_PERSON);
        return result;
    }

    @RequestMapping(value = "/PM_PRO_DEFECT_PERSONNUM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_PRO_DEFECT_PERSONNUM_SEL(
            @RequestParam(value = "V_V_SDATE") String V_V_SDATE,
            @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
            @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PM_PRO_DEFECT_PERSONNUM_SEL(V_V_SDATE, V_V_EDATE, V_V_PERSON);
        return result;
    }

    @RequestMapping(value = "/PM_PRO_PLAN_PERSONNUM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_PRO_PLAN_PERSONNUM_SEL(
            @RequestParam(value = "V_V_SDATE") String V_V_SDATE,
            @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
            @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PM_PRO_PLAN_PERSONNUM_SEL(V_V_SDATE, V_V_EDATE, V_V_PERSON);
        return result;
    }

    @RequestMapping(value = "/PM_PRO_WORKORDER_PERSONNUM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_PRO_WORKORDER_PERSONNUM_SEL(
            @RequestParam(value = "V_V_SDATE") String V_V_SDATE,
            @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
            @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = basicService.PM_PRO_WORKORDER_PERSONNUM_SEL(V_V_SDATE, V_V_EDATE, V_V_PERSON);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ADMIN", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DEPT_VIEW_ADMIN(
            @RequestParam(value = "IS_V_DEPTCODE") String IS_V_DEPTCODE,
            @RequestParam(value = "IS_V_DEPTTYPE") String IS_V_DEPTTYPE) throws Exception {
        Map result = basicService.PRO_BASE_DEPT_VIEW_ADMIN(IS_V_DEPTCODE, IS_V_DEPTTYPE);
        return result;
    }

    @RequestMapping(value = "/PM_WORK_FLOW_PERBYROLE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_WORK_FLOW_PERBYROLE_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE) throws Exception {
        Map result = basicService.PM_WORK_FLOW_PERBYROLE_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_ROLECODE, V_V_PERNAME, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_WORK_FLOW_PERBYROLE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_WORK_FLOW_PERBYROLE_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE) throws Exception {
        Map result = basicService.PM_WORK_FLOW_PERBYROLE_SET(V_V_GUID, V_V_ROLECODE, V_V_PERCODE);
        return result;
    }

    @RequestMapping(value = "/PM_WORK_REPAIRPER_HISTORY_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_WORK_FLOW_PERBYROLE_SET(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_INPER") String V_V_INPER) throws Exception {
        Map result = basicService.PM_WORK_REPAIRPER_HISTORY_SEL(V_V_DEPTCODE, V_V_INPER);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_NEW_MENU_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_NEW_MENU_SEL(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_HOME_MENU") String V_V_HOME_MENU)
            throws SQLException {
        Map result = basicService.PRO_BASE_NEW_MENU_SEL(IS_V_ROLECODE, IS_V_SYSTYPE, V_V_DEPTCODE, V_V_HOME_MENU);
        return result;
    }

    /*
     * 根据岗位生成点检计划
     * */
    @RequestMapping(value = "/PM_06_DJ_CRITERION_SETBYGW", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_06_DJ_CRITERION_SETBYGW(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
            @RequestParam(value = "V_V_POSTCODE") String V_V_POSTCODE,
            @RequestParam(value = "V_V_PLAN_STATE") String V_V_PLAN_STATE,
            @RequestParam(value = "V_V_PLAN_TIME") String V_V_PLAN_TIME,
            @RequestParam(value = "V_V_PLAN_PER") String V_V_PLAN_PER,
            @RequestParam(value = "V_V_DJ_TYPE") String V_V_DJ_TYPE)
            throws SQLException {
        Map result = basicService.PM_06_DJ_CRITERION_SETBYGW(V_V_DEPTCODE, V_V_CRITERION_CODE, V_V_POSTCODE, V_V_PLAN_STATE, V_V_PLAN_TIME, V_V_PLAN_PER, V_V_DJ_TYPE);
        return result;
    }

    /*
     * 点检类型
     * */

    @RequestMapping(value = "/PRO_PM_06_CK_TYPE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_06_CK_TYPE_VIEW(
            @RequestParam(value = "V_V_CKTYPE") String V_V_CKTYPE)
            throws SQLException {
        Map result = basicService.PRO_PM_06_CK_TYPE_VIEW(V_V_CKTYPE);
        return result;
    }

    /*
     * 点检计划所有点检详细信息
     * */

    @RequestMapping(value = "/PM_06_DJ_DATA_SEL_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_06_DJ_DATA_SEL_ALL(
            @RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
            @RequestParam(value = "V_V_STIME") String V_V_STIME,
            @RequestParam(value = "V_V_ETIME") String V_V_ETIME)
            throws SQLException {
        Map result = basicService.PM_06_DJ_DATA_SEL_ALL(V_V_CRITERION_CODE, V_V_STIME, V_V_ETIME);
        return result;
    }

    /*
     * 岗位树
     * */
    @RequestMapping(value = "/PRO_BASE_POST_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_BASE_POST_TREE(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE)
            throws SQLException {
        List<Map> result = basicService.PRO_BASE_POST_TREE(V_V_DEPTCODE);
        return result;
    }

    /*
     * 岗位编辑
     * */
    @RequestMapping(value = "/PRO_BASE_POST_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_POST_SET(
            @RequestParam(value = "V_V_UPCODE") String V_V_UPCODE,
            @RequestParam(value = "V_V_POSTCODE") String V_V_POSTCODE,
            @RequestParam(value = "V_V_POSTNAME") String V_V_POSTNAME)
            throws SQLException {
        Map result = basicService.PRO_BASE_POST_SET(V_V_UPCODE, V_V_POSTCODE, V_V_POSTNAME);
        return result;
    }

    /*
     * 岗位删除
     * */
    @RequestMapping(value = "/PRO_BASE_POST_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_POST_DEL(
            @RequestParam(value = "V_V_POSTCODE") String V_V_POSTCODE)
            throws SQLException {
        Map result = basicService.PRO_BASE_POST_DEL(V_V_POSTCODE);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXGX_PER_DATA_SELALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_PER_DATA_SELALL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_WORKNAME") String V_V_WORKNAME)
            throws SQLException {
        Map result = basicService.PM_1917_JXGX_PER_DATA_SELALL(V_V_JXGX_CODE, V_V_WORKNAME);
        return result;
    }

    /*
     * 根据工单号查询工单信息
     * */
    @RequestMapping(value = "/PRO_PM_WORKORDER_GETBYID", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_GETBYID(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID)
            throws SQLException {
        Map result = basicService.PRO_PM_WORKORDER_GETBYID(V_V_ORDERID);
        return result;
    }

}
