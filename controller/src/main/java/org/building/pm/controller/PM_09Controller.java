package org.building.pm.controller;

import org.building.pm.service.PM_09Service;
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
@RequestMapping("/app/pm/PM_09")
public class PM_09Controller {

    @Autowired
    private PM_09Service pm09Service;

    @RequestMapping(value = "/PM_09_WORKORDER_LIST_REPAIR", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_09_WORKORDER_LIST_REPAIR(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                           @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                           @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm09Service.PM_09_WORKORDER_LIST_REPAIR(V_V_PERSONCODE, V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR,
                V_V_STATECODE, V_V_SHORT_TXT);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_09_REPAIRDEPT_TODEPT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_09_REPAIRDEPT_TODEPT(@RequestParam(value = "V_REPAIRDEPTCODE") String V_REPAIRDEPTCODE,
                                                           @RequestParam(value = "V_PERSONCODE") String V_PERSONCODE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm09Service.PM_09_REPAIRDEPT_TODEPT(V_REPAIRDEPTCODE, V_PERSONCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_09_WORKORDER_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_09_WORKORDER_GET(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm09Service.PM_09_WORKORDER_GET(V_V_ORDERGUID);

        List<Map<String, Object>> pm_09list = (List) data.get("list");

        result.put("list", pm_09list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_09_WORKORDER_JS_REPAIRDEPT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_09_WORKORDER_JS_REPAIRDEPT(@RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                            @RequestParam(value = "V_DEFECT_GUID") String V_DEFECT_GUID,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm09Service.PM_09_WORKORDER_JS_REPAIRDEPT(V_V_PERNAME, V_DEFECT_GUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_09_WORKORDER_SP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_09_WORKORDER_SP(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                             @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                             @RequestParam(value = "V_V_STEPNAME") String V_V_STEPNAME,
                                                             @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                             @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm09Service.PM_09_WORKORDER_SP(V_V_PERSONCODE, V_V_ORDERGUID,V_V_STEPNAME,V_V_MEMO,V_V_STATECODE);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_WORKORDER_SEL_BYGUID", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WORKORDER_SEL_BYGUID(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm09Service.PRO_WORKORDER_SEL_BYGUID(V_V_ORDERGUID);

        List<Map<String, Object>> pm_09list = (List) data.get("list");

        result.put("list", pm_09list);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_WORKORDER_ZS_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WORKORDER_ZS_SET(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = pm09Service.PRO_WORKORDER_ZS_SET(V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_WORKORDER_YL_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WORKORDER_YL_SET(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = pm09Service.PRO_WORKORDER_YL_SET(V_V_ORDERGUID);
        return result;
    }
}
