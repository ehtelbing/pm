package org.building.pm.controller;

import org.building.pm.service.No4120Service;
import org.building.pm.service.PM_0303_FXJH_DATAService;
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
@RequestMapping("/app/pm/PM_0303")
public class PM_0303_FXJH_DATAController {

    @Autowired
    private PM_0303_FXJH_DATAService pm_0303_fxjh_dataService;

    @RequestMapping(value = "/PM_03_FXJH_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_FXJH_DATA_SEL(@RequestParam(value = "V_V_YEAR_B") String V_V_YEAR_B,
                                                   @RequestParam(value = "V_V_YEAR_E") String V_V_YEAR_E,
                                                   @RequestParam(value = "V_V_MONTH_B") String V_V_MONTH_B,
                                                   @RequestParam(value = "V_V_MONTH_E") String V_V_MONTH_E,
                                                   @RequestParam(value = "V_V_PROJECT_NAME") String V_V_PROJECT_NAME,
                                                   @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                   @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                   @RequestParam(value = "V_V_BY1") String V_V_BY1,
                                                   @RequestParam(value = "V_V_BY2") String V_V_BY2,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_0303_fxjh_dataService.PM_03_FXJH_DATA_SEL(V_V_YEAR_B, V_V_YEAR_E, V_V_MONTH_B, V_V_MONTH_E,
                V_V_PROJECT_NAME, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_BY1, V_V_BY2);

        List<Map<String, Object>> pm0303list = (List) data.get("list");

        result.put("list", pm0303list);
        result.put("success", true);
        return result;
    }



}
