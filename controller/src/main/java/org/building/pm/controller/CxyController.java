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





}

