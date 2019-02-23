package org.building.pm.controller;

/**
 * Created by cxy on 2019/1/24.
 */

import org.building.pm.service.CxyService;
import org.building.pm.service.LxmService;
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
@RequestMapping("/app/pm/cxy")
public class CxyController {
    @Autowired
    private CxyService cService;

    @RequestMapping(value = "/BASE_ROLETOTABLE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_ROLETOTABLE_SEL(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
            @RequestParam(value = "V_V_UPCODE") String V_V_UPCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.BASE_ROLETOTABLE_SEL(V_V_DEPTCODE, V_V_ROLECODE,V_V_UPCODE);
        List<Map<String, Object>> lxmlist = (List) data.get("list");
        result.put("list", lxmlist);
        result.put("success", true);
        return result;
    }

    //通过月计划的GUID查询对应周计划
    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_BY_MONTHGUID", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_BY_MONTHGUID(@RequestParam(value = "V_V_OTHERPLAN_GUID") String V_V_OTHERPLAN_GUID,

                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = cService.PRO_PM_03_PLAN_WEEK_BY_MONTHGUID(V_V_OTHERPLAN_GUID);
        return data;
    }

    @RequestMapping(value = "/PRO_BASE_FAULT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FAULT_SEL(HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.PRO_BASE_FAULT_SEL();
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
//        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "PRO_PM_STANDARD_GX_BOM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_STANDARD_GX_BOM_SEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                          @RequestParam(value = "V_V_REPAIR_CODE") String V_V_REPAIR_CODE,
                                                          @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                         HttpServletRequest request)
            throws SQLException {

        return cService.PRO_PM_STANDARD_GX_BOM_SEL(V_V_PERSONCODE,V_V_DEPTCODE,V_V_REPAIR_CODE,V_V_EQUTYPE);
    }
}

