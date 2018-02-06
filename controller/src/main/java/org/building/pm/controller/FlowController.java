package org.building.pm.controller;

import org.building.pm.service.FlowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
@Controller
@RequestMapping("/app/pm/Flow")
public class FlowController {
    @Autowired
    FlowService folwServicef;
    @RequestMapping(value = "OrgTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> OrgTree(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        //List<Map> result = pm_19Service.OrgAndPersonTree(V_V_DEPTCODE);
        List<Map> result = folwServicef.OrgAndPersonTree(V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "DepartAndEquTypeTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> DepartAndEquTypeTree(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        List<Map> result = folwServicef.DepartAndEquTypeTree(V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_ACTIVITI_DESC_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_ACTIVITI_DESC_SEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = folwServicef.PRO_PM_ACTIVITI_DESC_SEL();
        return result;
    }

    @RequestMapping(value = "/PRO_PM_ACTIVITI_DESC_REPAIRSEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_ACTIVITI_DESC_REPAIRSEL(
            @RequestParam(value = "V_V_DEPTCODE" ,required = false) String V_V_DEPTCODE,
            @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
            @RequestParam(value = "V_V_ORGCODE",required = false) String V_V_ORGCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = folwServicef.PRO_PM_ACTIVITI_DESC_REPAIRSEL(V_V_ORGCODE,V_V_DEPTCODE, V_V_REPAIRCODE);
        return result;
    }

    @RequestMapping(value = "/PM_ACTIVITI_ORG_PROCESS_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_ACTIVITI_ORG_PROCESS_SET(
            @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_PROCESS_CODE") String V_V_PROCESS_CODE,
            @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
            @RequestParam(value = "V_V_CHECK") String V_V_CHECK,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = folwServicef.PM_ACTIVITI_ORG_PROCESS_SET(V_V_DEPTCODE, V_V_REPAIRCODE, V_V_FLOWTYPE, V_V_PROCESS_CODE, V_V_CHECK);
        return result;
    }
}
