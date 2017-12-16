package org.building.pm.controller;

import org.apache.log4j.Logger;
import org.building.pm.service.StrService;
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
 * Created by STR on 2017/12/13.
 *
 */
@Controller
@RequestMapping("/app/pm/str")
public class StrController {
    private static final Logger logger = Logger.getLogger(StrController.class.getName());
    @Autowired
    private StrService strService;

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TOWORK_C1", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TOWORK_C1(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = strService.PRO_PM_EQUREPAIRPLAN_TOWORK_C1(V_V_IP, V_V_PERCODE,V_V_PERNAME,V_V_GUID);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }

}
