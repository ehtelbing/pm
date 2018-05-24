package org.building.pm.controller;

/**
 * Created by lxm on 2017/8/5.
 */

import org.building.pm.service.lxmService;
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

@Controller
@RequestMapping("/app/pm/lxm")
public class lxmController {
    @Autowired
    private lxmService mService;

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TREE_GET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_BY1") String V_BY1,
            @RequestParam(value = "V_BY2") String V_BY2,
            @RequestParam(value = "V_BY3") String V_BY3,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_TREE_GET(V_V_GUID, V_BY1,V_BY2,V_BY3);
        List<Map<String, Object>> lxmlist = (List) data.get("list");
        result.put("list", lxmlist);
        result.put("success", true);
        return result;
    }
    //out varchar
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_WL_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_WL_SET(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_WL_CODE") String V_V_WL_CODE,
            @RequestParam(value = "V_V_WL_NAME") String V_V_WL_NAME,
            @RequestParam(value = "V_V_JLDW") String V_V_JLDW,
            @RequestParam(value = "V_V_NUM") String V_V_NUM,
            @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
            @RequestParam(value = "V_V_DJ") String V_V_DJ,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_WL_SET(V_I_ID,V_V_GUID,V_V_WL_CODE,V_V_WL_NAME,V_V_JLDW,V_V_NUM,V_V_GGXH,V_V_DJ);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_YG_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_YG_SET(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_GZ") String V_V_GZ,
            @RequestParam(value = "V_V_NUM") String V_V_NUM,
            @RequestParam(value = "V_V_TIME") String V_V_TIME,
            @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
            @RequestParam(value = "V_V_CODE") String V_V_CODE,
            @RequestParam(value = "V_V_DE") String V_V_DE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_YG_SET(V_I_ID,V_V_GUID,V_V_GZ,V_V_NUM,V_V_TIME,V_V_MEMO,V_V_CODE,V_V_DE);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_JJ_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_JJ_SET(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_JJ_CODE") String V_V_JJ_CODE,
            @RequestParam(value = "V_V_JJ_NAME") String V_V_JJ_NAME,
            @RequestParam(value = "V_V_JLDW") String V_V_JLDW,
            @RequestParam(value = "V_V_NUM") String V_V_NUM,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_JJ_SET(V_I_ID,V_V_GUID,V_V_JJ_CODE,V_V_JJ_NAME,V_V_JLDW,V_V_NUM);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_YG_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_YG_DEL(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_YG_DEL(V_I_ID);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_WL_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_WL_DEL(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_WL_DEL(V_I_ID);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }
    //out varchar out cursor
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_WL_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_WL_VIEW(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_WL_VIEW(V_V_GUID);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_YG_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_YG_VIEW(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_YG_VIEW(V_V_GUID);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_JJ_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_JJ_VIEW(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_JJ_VIEW(V_V_GUID);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_JJ_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_JJ_DEL(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_JJ_DEL(V_I_ID);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_04_PROJECT_DATA_ITEM_G", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_04_PROJECT_DATA_ITEM_G(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_04_PROJECT_DATA_ITEM_G(V_V_GUID);

        List<Map<String, Object>> rlist = (List) data.get("list");
        result.put("list", rlist);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_GETGS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_GETGS(
            @RequestParam(value = "V_V_PROJECTCODE_GS") String V_V_PROJECTCODE_GS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_GETGS(V_V_PROJECTCODE_GS);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
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

        HashMap data = mService.PRO_BASE_DEPT_VIEW_PER(V_DEPTCODE, V_DEPTTYPE, V_V_PERSON);

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

        HashMap data = mService.PM_04_PROJECT_MAJOR_SEL();

        List<Map<String, Object>> rlist = (List) data.get("list");

        result.put("list", rlist);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TREE_SEL(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                             @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                             @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                             @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                                                             @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                                             @RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,
                                                             @RequestParam(value = "V_V_PROJECT_NAME") String V_V_PROJECT_NAME,
                                                             @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                                             @RequestParam(value = "V_BY1") String V_BY1,
                                                             @RequestParam(value = "V_BY2") String V_BY2,
                                                             @RequestParam(value = "V_BY3") String V_BY3,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_TREE_SEL(V_V_PERCODE, V_V_YEAR, V_V_MONTH,V_V_ORGCODE,V_V_DEPTCODE,V_V_SPECIALTY,V_V_EQUNAME,V_V_PROJECT_CODE,V_V_PROJECT_NAME, V_V_CONTENT,V_BY1,V_BY2,V_BY3 );

        List<Map<String, Object>> rlist = (List) data.get("list");

        result.put("list", rlist);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TOWORK_C", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TOWORK_C(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_TOWORK_C(V_V_IP, V_V_PERCODE,V_V_PERNAME,V_V_GUID);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TOWORK_U", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TOWORK_U(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_TOWORK_U(V_V_IP, V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_V_GUID);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_TJ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TREE_TJ(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_BY1") String V_BY1,
            @RequestParam(value = "V_BY2") String V_BY2,
            @RequestParam(value = "V_BY3") String V_BY3,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_TREE_TJ(V_V_GUID_FXJH, V_BY1, V_BY2, V_BY3);

        List<Map<String, Object>> rlist = (List) data.get("list");
        result.put("list", rlist);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_NR_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_NR_DEL(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_NR_DEL(V_I_ID);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_NR_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_NR_SET(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_NR_SET(V_I_ID, V_V_GUID,V_V_MEMO);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_NR_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_NR_VIEW(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PRO_PM_EQUREPAIRPLAN_NR_VIEW(V_V_GUID);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/pro_pm_basedic_zy", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_pm_basedic_zy(
            @RequestParam(value = "V_V_PLAN") String V_V_PLAN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.pro_pm_basedic_zy(V_V_PLAN);

        List<Map<String, Object>> rlist = (List) data.get("list");
        result.put("list", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_CREATE_WORKORDERBEF", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_CREATE_WORKORDERBEF(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PM_03_PLAN_CREATE_WORKORDERBEF(V_V_GUID);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_CREATE_WORKORDER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_CREATE_WORKORDER(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PM_03_PLAN_CREATE_WORKORDER(V_V_GUID,V_V_PERCODE);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        String V_V_ORDERGUID=data.get("V_V_ORDERGUID").toString();
        String V_V_SOURCECODE=data.get("V_V_SOURCECODE").toString();
        String V_V_EQUTYPE=data.get("V_V_EQUTYPE").toString();
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("V_V_ORDERGUID", V_V_ORDERGUID);
        result.put("V_V_SOURCECODE", V_V_SOURCECODE);
        result.put("V_V_EQUTYPE", V_V_EQUTYPE);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_WEEK_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_WEEK_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
            @RequestParam(value = "V_V_STATE") String V_V_STATE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mService.PM_03_PLAN_WEEK_SEL(V_V_YEAR, V_V_MONTH, V_V_WEEK,V_V_ORGCODE,V_V_DEPTCODE,
                V_V_ZY, V_V_EQUTYPE, V_V_EQUCODE, V_V_CONTENT, V_V_FLOWTYPE, V_V_STATE, V_V_PAGE, V_V_PAGESIZE);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("total");
        result.put("list", rlist);
        result.put("total", v_info);
        result.put("success", true);
        return result;
    }
}

