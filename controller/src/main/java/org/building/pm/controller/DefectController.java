package org.building.pm.controller;

import org.building.pm.service.DefectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/app/pm/defect/")
public class DefectController {
    @Autowired
    private DefectService defectService;

    //根据人员查询厂矿缺陷
    @RequestMapping(value = "PM_07_DEFECT_STAT_N", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_07_DEFECT_STAT_N(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE) throws Exception {
        Map data = defectService.PM_07_DEFECT_STAT_N(V_V_YEAR,V_V_PERCODE);
        return data;
    }
}
