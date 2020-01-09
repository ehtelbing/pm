package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.CglService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 * <p>
 * �豸�¹�controller
 */
@Controller
@RequestMapping("/app/pm/cgl")
public class CglController {

    @Autowired
    private CglService cglService;

    @RequestMapping(value = "PRO_PM_07_DEFECT_TJ_VIEW_WCL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_TJ_VIEW(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                        @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                        @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                                                        @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,

                                                        HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = cglService.PRO_PM_07_DEFECT_TJ_VIEW_WCL(V_V_YEAR, V_V_MONTH, V_V_WEEK,
                V_V_ORGCODE,V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "PM_03_PLAN_CKSTAT_SEL_WCL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_CKSTAT_SEL_WCL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                        @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                        @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                                                        @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,

                                                        HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = cglService.PM_03_PLAN_CKSTAT_SEL_WCL(V_V_YEAR, V_V_MONTH, V_V_WEEK,
                V_V_ORGCODE,V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_DEPT_SORT_WCL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_DEPT_SORT_WCL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                    @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                    @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                                                    @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,

                                                    HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = cglService.PM_03_PLAN_CKSTAT_SEL_WCL(V_V_YEAR, V_V_MONTH, V_V_WEEK,
                V_V_ORGCODE,V_V_DEPTCODE);
        return result;
    }
}
