package org.building.pm.controller;

import org.building.pm.service.PM_03Service;
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
@RequestMapping("/app/pm/PM_03")
public class PM_03Controller {

    @Autowired
    private PM_03Service pm_03Service;

    //大修年计划编制
    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_YEAR_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_INPER") String V_V_INPER) throws Exception {

        Map result = pm_03Service.PRO_PM_03_PLAN_YEAR_CREATE(V_V_GUID, V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE, V_V_INPER);
        return result;
    }

    //年计划工程项目查询
    @RequestMapping(value = "/PRO_PM_03_PLAN_PROJECT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_PROJECT_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID) throws Exception {

        Map result = pm_03Service.PRO_PM_03_PLAN_PROJECT_SEL(V_V_GUID);
        return result;
    }

    //大修设备添加
    @RequestMapping(value = "/PM_03_PLAN_YEAR_EQU_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_EQU_SET(
            @RequestParam(value = "V_V_PLANGUID") String V_V_PLANGUID,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_EQU_SET(V_V_PLANGUID, V_V_EQUTYPECODE, V_V_EQUCODE);
        return result;
    }

    //大修已选设备查询
    @RequestMapping(value = "/PM_03_PLAN_YEAR_EQU_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_EQU_SEL(
            @RequestParam(value = "V_V_PLANGUID") String V_V_PLANGUID) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_EQU_SEL(V_V_PLANGUID);
        return result;
    }

    //大修删除已选中设备
    @RequestMapping(value = "/PM_03_PLAN_YEAR_EQU_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_EQU_DEL(
            @RequestParam(value = "V_V_PLANGUID") String V_V_PLANGUID,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_EQU_DEL(V_V_PLANGUID, V_V_EQUCODE);
        return result;
    }

    //根据作业区，设备编码查询缺陷
    @RequestMapping(value = "/PRO_PM_DEFECT_DEPT_SEL_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_DEFECT_DEPT_SEL_ALL(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE) throws Exception {

        Map result = pm_03Service.PRO_PM_DEFECT_DEPT_SEL_ALL(V_V_DEPTCODE, V_V_EQUCODE, V_V_STATECODE);
        return result;
    }

    //根据项目编号查询设备
    @RequestMapping(value = "/PM_03_PROJECT_DEFECT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PROJECT_DEFECT_SEL(
            @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID) throws Exception {

        Map result = pm_03Service.PM_03_PROJECT_DEFECT_SEL(V_V_PROJECT_GUID);
        return result;
    }

    //大修删除缺陷
    @RequestMapping(value = "/PM_03_PLAN_YEAR_DEFECT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_DEFECT_DEL(
            @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
            @RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_DEFECT_DEL(V_V_PROJECT_GUID, V_V_DEFECT_GUID);
        return result;
    }

    //查询选中设备的检修模型
    @RequestMapping(value = "/PM_1917_JXMX_SELBY_MOREEQU", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXMX_SELBY_MOREEQU(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE) throws Exception {

        Map result = pm_03Service.PM_1917_JXMX_SELBY_MOREEQU(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE);
        return result;
    }

    //大修添加检修模型
    @RequestMapping(value = "/PM_03_PLAN_YEAR_MODEL_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_MODEL_SET(
            @RequestParam(value = "V_V_PORJECTGUID") String V_V_PORJECTGUID,
            @RequestParam(value = "V_V_MODELGUID") String V_V_MODELGUID,
            @RequestParam(value = "V_V_MODELNAME") String V_V_MODELNAME,
            @RequestParam(value = "V_V_BBH") String V_V_BBH,
            @RequestParam(value = "V_V_BZ") String V_V_BZ) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_MODEL_SET(V_V_PORJECTGUID, V_V_MODELGUID, V_V_MODELNAME, V_V_BBH, V_V_BZ);
        return result;
    }

    //大修删除检修模型
    @RequestMapping(value = "/PM_03_PLAN_YEAR_MODEL_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_MODEL_DEL(
            @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
            @RequestParam(value = "V_V_MODEL_GUID") String V_V_MODEL_GUID) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_MODEL_DEL(V_V_PROJECT_GUID, V_V_MODEL_GUID);
        return result;
    }

    //查询大修已选择的检修模型

    @RequestMapping(value = "/PM_03_PLAN_YEAR_MODEL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_MODEL_SEL(
            @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_MODEL_SEL(V_V_PROJECT_GUID);
        return result;
    }

    //查询大修检修模型需要的所有物料，人工，机具，工具等信息
    @RequestMapping(value = "/PRO_YEAR_PROJECT_MXUSE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_YEAR_PROJECT_MXUSE_SEL(
            @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE) throws Exception {

        Map result = pm_03Service.PRO_YEAR_PROJECT_MXUSE_SEL(V_V_PROJECT_GUID, V_V_TYPE);
        return result;
    }

    //大修计划保存过程
    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_YEAR_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
            @RequestParam(value = "V_V_PORJECT_CODE") String V_V_PORJECT_CODE,
            @RequestParam(value = "V_V_PORJECT_NAME") String V_V_PORJECT_NAME,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_SPECIALTYNAME") String V_V_SPECIALTYNAME,
            @RequestParam(value = "V_V_SPECIALTYMANCODE") String V_V_SPECIALTYMANCODE,
            @RequestParam(value = "V_V_SPECIALTYMAN") String V_V_SPECIALTYMAN,
            @RequestParam(value = "V_V_WXTYPECODE") String V_V_WXTYPECODE,
            @RequestParam(value = "V_V_WXTYPENAME") String V_V_WXTYPENAME,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_MONEYBUDGET") String V_V_MONEYBUDGET,
            @RequestParam(value = "V_V_REPAIRDEPTCODE") String V_V_REPAIRDEPTCODE,
            @RequestParam(value = "V_V_BDATE") String V_V_BDATE,
            @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
            @RequestParam(value = "V_V_INMAN") String V_V_INMAN,
            @RequestParam(value = "V_V_INMANCODE") String V_V_INMANCODE) throws Exception {

        Map result = pm_03Service.PRO_PM_03_PLAN_YEAR_SET(V_V_GUID, V_V_YEAR,V_V_MONTH,V_V_ORGCODE,V_V_ORGNAME,V_V_DEPTCODE,V_V_DEPTNAME,V_V_PORJECT_CODE,V_V_PORJECT_NAME,V_V_SPECIALTY,V_V_SPECIALTYNAME,V_V_SPECIALTYMANCODE,V_V_SPECIALTYMAN,V_V_WXTYPECODE,V_V_WXTYPENAME,V_V_CONTENT,V_V_MONEYBUDGET,V_V_REPAIRDEPTCODE,V_V_BDATE,V_V_EDATE,V_V_INMAN,V_V_INMANCODE);
        return result;
    }

    /*
    * 大修年计划删除
    * */

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_YEAR_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID) throws Exception {

        Map result = pm_03Service.PRO_PM_03_PLAN_YEAR_DEL(V_V_GUID);
        return result;
    }

    /*
    * 大修年计划状态修改
    * */
    @RequestMapping(value = "/PM_03_PLAN_YEAR_STATE_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_STATE_SEND(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_STATE_SEND(V_V_GUID,V_V_STATECODE);
        return result;
    }

    /*
     * 大修年计划审批流程查询
     * */
    @RequestMapping(value = "/PM_03_PLAN_YEAR_FLOW_LOG_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_FLOW_LOG_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_FLOW_LOG_SEL(V_V_GUID);
        return result;
    }

    /*
    * 大修年计划上报
    * */
    @RequestMapping(value = "/PM_03_PLAN_YEAR_FLOW_LOG_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_YEAR_FLOW_LOG_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_FLOWNAME") String V_V_FLOWNAME,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_INPERCODE") String V_V_INPERCODE,
            @RequestParam(value = "V_V_INPERNAME") String V_V_INPERNAME,
            @RequestParam(value = "V_V_NEXTPERCODE") String V_V_NEXTPERCODE,
            @RequestParam(value = "V_V_NEXTPERNAME") String V_V_NEXTPERNAME) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_YEAR_FLOW_LOG_SET(V_V_GUID,V_V_FLOWCODE,V_V_FLOWNAME,V_V_IDEA,V_V_INPERCODE,V_V_INPERNAME,V_V_NEXTPERCODE,V_V_NEXTPERNAME);
        return result;
    }

    //计划类别查询
    @RequestMapping(value = "/PM_03_PLAN_JHLB_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_JHLB_SEL() throws Exception {

        Map result = pm_03Service.PM_03_PLAN_JHLB_SEL();
        return result;
    }

    //生产类别查询
    @RequestMapping(value = "/PM_03_PLAN_SCLB_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_SCLB_SEL() throws Exception {

        Map result = pm_03Service.PM_03_PLAN_SCLB_SEL();
        return result;
    }

    //产品种类查询
    @RequestMapping(value = "/PM_03_PLAN_CPZL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_CPZL_SEL( @RequestParam(value = "V_V_SCLB") String V_V_SCLB) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_CPZL_SEL(V_V_SCLB);
        return result;
    }

    //大修工序查询
    @RequestMapping(value = "/PM_03_PLAN_GX_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_GX_SEL( @RequestParam(value = "V_V_CPCODE") String V_V_CPCODE) throws Exception {

        Map result = pm_03Service.PM_03_PLAN_GX_SEL(V_V_CPCODE);
        return result;
    }

    //施工方式查询
    @RequestMapping(value = "/PM_03_PLAN_SGFS_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_SGFS_SEL() throws Exception {

        Map result = pm_03Service.PM_03_PLAN_SGFS_SEL();
        return result;
    }

    //大修专业查询
    @RequestMapping(value = "/PM_03_PLAN_ZY_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_ZY_SEL() throws Exception {

        Map result = pm_03Service.PM_03_PLAN_ZY_SEL();
        return result;
    }

    /*
     * 大修年计划工程编号设置
     * */
    @RequestMapping(value = "/PRO_PM_03_PLAN_PROJECTCODE_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_PROJECTCODE_CREATE(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_JHLB") String V_V_JHLB,
            @RequestParam(value = "V_V_ZY") String V_V_ZY) throws Exception {

        Map result = pm_03Service.PRO_PM_03_PLAN_PROJECTCODE_CREATE(V_V_GUID,V_V_YEAR,V_V_ORGCODE,V_V_DEPTCODE,V_V_JHLB,V_V_ZY);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_YEAR_SELECT(
            @RequestParam(value = "V_V_JXGX_CODE_NEW") String V_V_JXGX_CODE_NEW,
            @RequestParam(value = "V_V_JXGX_CODE_OLD") String V_V_JXGX_CODE_OLD,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_03Service.PRO_PM_03_PLAN_YEAR_SELECT(V_V_JXGX_CODE_NEW, V_V_JXGX_CODE_OLD);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_DJY_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_DJY_VIEW(@RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PRO_PM_03_PLAN_YEAR_DJY_VIEW(V_V_INPER, V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_YEAR_SEND(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_PM_03_PLAN_YEAR_SEND(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_FLOWCODE, V_V_PLANTYPE, V_V_PERSONCODE);
        return result;
    }


    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_VIEW(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                        @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                        @RequestParam(value = "V_V_ZY") String V_V_ZY,
                                                        @RequestParam(value = "V_V_WXLX") String V_V_WXLX,
                                                        @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                                        @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                        @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE) throws Exception {


        Map result = pm_03Service.PRO_PM_03_PLAN_YEAR_VIEW(V_V_YEAR,  V_V_ORGCODE, V_V_DEPTCODE, V_V_ZY, V_V_WXLX, V_V_CONTENT, V_V_PAGE, V_V_PAGESIZE);

        return result;
    }


    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_VIEW1", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_VIEW1(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                         @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                                                         @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PRO_PM_03_PLAN_YEAR_VIEW1(V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_FLOWCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }


    @RequestMapping(value = "/PM_03_JXMX_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_JXMX_DATA_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
            @RequestParam(value = "V_V_JXMX_NAME") String V_V_JXMX_NAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PM_03_JXMX_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_JXMX_NAME);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_GET(
            @RequestParam(value = "V_V_YEARPLAN_GUID") String V_V_YEARPLAN_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PRO_PM_03_PLAN_YEAR_GET(V_V_YEARPLAN_GUID);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_03_JXMX_DETAIL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_JXMX_DETAIL_SEL(
            @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PM_03_JXMX_DETAIL_SEL(V_V_JXMX_CODE);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    //PM_03010201,月计划报表，选择计划查询
    @RequestMapping(value = "/PM_03_MONTH_PLAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_MONTH_PLAN_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_MONTH_PLAN_SEL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY, V_V_CONTENT, V_V_STATECODE, V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    //PM_03010201,月计划报表,表格信息加载
    @RequestMapping(value = "/PRO_PM_03_PLAN_MONTH_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_MONTH_VIEW(@RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                         @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                         @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                         @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                                                         @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PRO_PM_03_PLAN_MONTH_VIEW(V_V_INPER, V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_PLANTYPE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //PM_03010201,月计划报表,修改时信息绑定
    @RequestMapping(value = "/PRO_PM_03_PLAN_MONTH_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_MONTH_GET(
            @RequestParam(value = "V_V_MONTHPLAN_GUID") String V_V_MONTHPLAN_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PRO_PM_03_PLAN_MONTH_GET(V_V_MONTHPLAN_GUID);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    //PM_03010201,月计划报表，删除
    @RequestMapping(value = "/PRO_PM_03_PLAN_MONTH_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_MONTH_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = pm_03Service.PRO_PM_03_PLAN_MONTH_DEL(V_V_GUID);
        return result;
    }

    //PM_03010201,月计划报表，上传
    @RequestMapping(value = "/PRO_PM_03_PLAN_MONTH_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_MONTH_SEND(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_03Service.PRO_PM_03_PLAN_MONTH_SEND(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_FLOWCODE, V_V_PLANTYPE, V_V_PERSONCODE);
        test.put("list", result);
        return test;
    }

    //PM_03010201,季度计划报表，选择计划查询
    @RequestMapping(value = "/PM_03_QUARTER_PLAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_QUARTER_PLAN_SEL(
            @RequestParam(value = "V_V_PLAN_NAME") String V_V_PLAN_NAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PM_03_QUARTER_PLAN_SEL(V_V_PLAN_NAME);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    //PM_03010101,季度计划报表,表格信息加载
    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_QUARTER_VIEW(@RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                           @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                           @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
                                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                                                           @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_03Service.PRO_PM_03_PLAN_QUARTER_VIEW(V_V_INPER, V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_PLANTYPE);
        List<Map<String, Object>> pm_06list = (List) data.get("list");
        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //PM_03010101,季度检修计划,修改时信息绑定
    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_QUARTER_GET(
            @RequestParam(value = "V_V_QUARTERPLAN_GUID") String V_V_QUARTERPLAN_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PRO_PM_03_PLAN_QUARTER_GET(V_V_QUARTERPLAN_GUID);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    //PM_03010101,季度检修计划，删除
    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_QUARTER_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = pm_03Service.PRO_PM_03_PLAN_QUARTER_DEL(V_V_GUID);
        return result;
    }

    //PM_03010101,季度检修计划，上传
    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_QUARTER_SEND(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = pm_03Service.PRO_PM_03_PLAN_QUARTER_SEND(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_FLOWCODE, V_V_PLANTYPE, V_V_PERSONCODE);

        return result;
    }

    //PM_03010101,季度计划报表,表格信息加载
    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_VIEW(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                        @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                        @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                                                        @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                        @RequestParam(value = "V_V_ZY") String V_V_ZY,
                                                        @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                        @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                        @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                                        @RequestParam(value = "V_V_STATE") String V_V_STATE,
                                                        @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                        @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = pm_03Service.PRO_PM_03_PLAN_WEEK_VIEW(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_ZY, V_V_EQUTYPE, V_V_EQUCODE, V_V_CONTENT, V_V_STATE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    //PM_03010301,周计划报表，选择计划查询
    @RequestMapping(value = "/PM_03_WEEK_PLAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_WEEK_PLAN_SEL(
            @RequestParam(value = "V_V_PLAN_NAME") String V_V_PLAN_NAME,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = pm_03Service.PM_03_WEEK_PLAN_SEL(V_V_PLAN_NAME, V_V_TYPE, V_V_ORGCODE);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    //PM_03010301,周检修计划，删除
    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_WEEK_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = pm_03Service.PRO_PM_03_PLAN_WEEK_DEL(V_V_GUID);
        return result;
    }

    //PM_03010301,周检修计划,修改时信息绑定
    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_GET(
            @RequestParam(value = "V_V_WEEKPLAN_GUID") String V_V_WEEKPLAN_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_03Service.PRO_PM_03_PLAN_WEEK_GET(V_V_WEEKPLAN_GUID);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    //PM_03010301,周检修计划，上传
    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_WEEK_SEND(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_03Service.PRO_PM_03_PLAN_WEEK_SEND(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_FLOWCODE, V_V_PLANTYPE, V_V_PERSONCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_03_MONTH_PLAN_PLANCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_MONTH_PLAN_PLANCODE_SEL(
            @RequestParam(value = "V_V_PLANCODEE") String V_V_PLANCODEE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_MONTH_PLAN_PLANCODE_SEL(V_V_PLANCODEE);
        return result;
    }

    @RequestMapping(value = "/PM_03_JXMX_DATA_MXCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_JXMX_DATA_MXCODE_SEL(
            @RequestParam(value = "V_V_MX_CODE") String V_V_MX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_JXMX_DATA_MXCODE_SEL(V_V_MX_CODE);
        return result;
    }

    @RequestMapping(value = "/PM_03_WEEK_PLAN_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_WEEK_PLAN_GET(
            @RequestParam(value = "V_V_PLANCODE") String V_V_PLANCODE,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_WEEK_PLAN_GET(V_V_PLANCODE, V_V_TYPE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_VIEW1", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_QUARTER_VIEW1(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_PM_03_PLAN_QUARTER_VIEW1(V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_FLOWCODE, V_V_CONTENT);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_PLAN_LOCKING_Q_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PLAN_LOCKING_Q_VIEW(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_PM_PLAN_LOCKING_Q_VIEW(V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_CONTENT);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_PLAN_LOCKING_DATE_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PLAN_LOCKING_DATE_GET(
            @RequestParam(value = "V_I_YEAR") String V_I_YEAR,
            @RequestParam(value = "V_I_MONTH") String V_I_MONTH,
            @RequestParam(value = "V_I_WEEKNUM") String V_I_WEEKNUM,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_PM_PLAN_LOCKING_DATE_GET(V_I_YEAR, V_I_MONTH, V_I_WEEKNUM, V_V_TYPE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_PLAN_LOCKING_DATE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PLAN_LOCKING_DATE_SET(
            @RequestParam(value = "V_I_YEAR") String V_I_YEAR,
            @RequestParam(value = "V_I_MONTH") String V_I_MONTH,
            @RequestParam(value = "V_I_WEEKNUM") String V_I_WEEKNUM,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_D_DATE_E") String V_D_DATE_E,
            @RequestParam(value = "V_I_LOCK") Integer V_I_LOCK,
            @RequestParam(value = "V_D_DATE_S") String V_D_DATE_S,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_PM_PLAN_LOCKING_DATE_SET(V_I_YEAR, V_I_MONTH, V_I_WEEKNUM, V_V_TYPE, V_D_DATE_E, V_I_LOCK, V_D_DATE_S);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_04_PROJECT_DATA_ITEM_V", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_04_PROJECT_DATA_ITEM_V(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,
            @RequestParam(value = "V_V_PROJECT_NAME") String V_V_PROJECT_NAME,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_BY1") String V_V_BY1,
            @RequestParam(value = "V_V_BY2") String V_V_BY2,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_PM_04_PROJECT_DATA_ITEM_V(V_V_YEAR, V_V_MONTH, V_V_PERCODE, V_V_ORGCODE, V_V_SPECIALTY, V_V_PROJECT_CODE, V_V_PROJECT_NAME, V_V_CONTENT, V_V_BY1, V_V_BY2);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,

            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,

            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_PLAN_SEL(V_V_YEAR, V_V_QUARTER, V_V_MONTH, V_V_PLANTYPE, V_V_ORGCODE,
                V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY, V_V_CONTENT,
                V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_AGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_AGREE(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_PLAN_AGREE(V_V_GUID, V_V_PLANTYPE, V_V_IDEA, V_V_INPER);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_DISAGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_DISAGREE(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_PLAN_DISAGREE(V_V_GUID, V_V_PLANTYPE, V_V_IDEA, V_V_INPER);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_STATE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_STATE_SEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_PLAN_STATE_SEL();
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_CHOOSE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_CHOOSE_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PM_03_PLAN_CHOOSE_SEL(V_V_GUID, V_V_PLANTYPE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE_PLAN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE_PLAN(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                            @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                            @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_BASE_DEPT_VIEW_ROLE_PLAN(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_PLAN_LOCKING_M_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PLAN_LOCKING_M_VIEW(
            @RequestParam(value = "V_I_YEAR") String V_I_YEAR,
            @RequestParam(value = "V_I_MONTH") String V_I_MONTH,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_PM_PLAN_LOCKING_M_VIEW(V_I_YEAR, V_I_MONTH, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_CONTENT);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_PLAN_LOCKING_W_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PLAN_LOCKING_W_VIEW(
            @RequestParam(value = "V_I_YEAR") String V_I_YEAR,
            @RequestParam(value = "V_I_MONTH") String V_I_MONTH,
            @RequestParam(value = "V_I_WEEKNUM") String V_I_WEEKNUM,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_03Service.PRO_PM_PLAN_LOCKING_W_VIEW(V_I_YEAR, V_I_MONTH, V_I_WEEKNUM, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_CONTENT);
        return result;
    }

    @RequestMapping(value = "/PRO_PLAN_LOCK_DATE_HOMENOW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PLAN_LOCK_DATE_HOMENOW(
            @RequestParam(value = "V_I_YEAR") String V_I_YEAR,
            @RequestParam(value = "V_I_MONTH") String V_I_MONTH,
            @RequestParam(value = "V_I_WEEKNUM") String V_I_WEEKNUM) throws Exception {
        Map result = pm_03Service.PRO_PLAN_LOCK_DATE_HOMENOW(V_I_YEAR, V_I_MONTH, V_I_WEEKNUM);
        return result;
    }

}
