package org.building.pm.controller;

import org.building.pm.service.DrawingManageService;
import org.building.pm.service.PM_06Service;
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
 * Created by cxy on 2018/9/11.
 * DrawingManageController
 */
@Controller
@RequestMapping("/app/pm/drawingManage")
public class DrawingManageController {

    @Autowired
    private DrawingManageService drawingManageService;

//    @Autowired
//    private PM_06Service pm_06Service;
    @RequestMapping(value = "/PRO_BASE_DRAWING_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DRAWING_SEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                           @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = drawingManageService.PRO_BASE_DRAWING_SEL(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUCODE, V_V_EQUNAME);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_BYZYQ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SAP_PM_EQU_P_BYZYQ(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = drawingManageService.PRO_SAP_PM_EQU_P_BYZYQ(V_V_PERSONCODE, V_V_DEPTNEXTCODE);
        List<Map<String, Object>> drawingManagelist = (List) data.get("list");
        result.put("list", drawingManagelist);
        result.put("success", true);
        return result;
    }
//    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE_NEW", method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE_NEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
//                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
//                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
//                                                       @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
//                                                       HttpServletRequest request,
//                                                       HttpServletResponse response) throws Exception {
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        HashMap data = pm_06Service.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);
//        List<Map<String, Object>> pm_06list = (List) data.get("list");
//        pm_06list.remove(0);
//        result.put("list", pm_06list);
//        result.put("success", true);
//        return result;
//    }

}
