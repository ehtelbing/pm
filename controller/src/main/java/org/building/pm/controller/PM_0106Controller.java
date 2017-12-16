package org.building.pm.controller;

import org.building.pm.service.PM_0106Service;
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
 * Created by STR on 2017/11/27.
 */
@Controller
@RequestMapping("/app/pm/PM_0106")
public class PM_0106Controller {

    @Autowired
    private PM_0106Service pm_0106Service;

    /**
     * 主表格 C 层
     * @param V_V_ORGCODE
     * @param V_V_DEPTCODE
     * @param V_V_EQUCODE
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/PRO_PM_0106_JX_MAIN_LEDGER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_0106_JX_MAIN_LEDGER(
            @RequestParam(value = "V_V_ORGCODE")  String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response
    )throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_0106Service.PRO_PM_0106_JX_MAIN_LEDGER(V_V_ORGCODE,V_V_DEPTCODE,V_V_EQUCODE,start,limit);

        List<Map<String, Object>> pm_0106list = (List) data.get("list");
        int total = 0;
        if(pm_0106list!=null&&pm_0106list.size()>0){
            double t = Double.valueOf(pm_0106list.get(0).get("TOTAL").toString());
            total = (int)t;
        }
        result.put("list", pm_0106list);
        result.put("total",total);
        result.put("success", true);
        return result;
    }

    /**
     * 大修
     * @param V_V_ORGCODE
     * @param V_V_DEPTCODE
     * @param V_V_EQUCODE
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/PRO_PM_0106_OVERHUAL_LEDGER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_0106_OVERHUAL_LEDGER(
            @RequestParam(value = "V_V_ORGCODE")  String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response
    )throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_0106Service.PRO_PM_0106_OVERHUAL_LEDGER(V_V_ORGCODE,V_V_DEPTCODE,V_V_EQUCODE,start,limit);

        List<Map<String, Object>> pm_0106list = (List) data.get("list");
        int total = 0;
        if(pm_0106list!=null&&pm_0106list.size()>0){
            double t = Double.valueOf(pm_0106list.get(0).get("TOTAL").toString());
            total = (int)t;
        }
        result.put("list", pm_0106list);
        result.put("total",total);
        result.put("success", true);
        return result;
    }

    /**
     * 日修
     * @param V_V_DEPTCODE
     * @param V_V_EQUCODE
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/PRO_PM_0106_WORKORDER_LEDGER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_0106_WORKORDER_LEDGER(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response
    )throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_0106Service.PRO_PM_0106_WORKORDER_LEDGER(V_V_DEPTCODE,V_V_EQUCODE,start,limit);

        List<Map<String, Object>> pm_0106list = (List) data.get("list");
        int total = 0;
        if(pm_0106list!=null&&pm_0106list.size()>0){
            double t = Double.valueOf(pm_0106list.get(0).get("TOTAL").toString());
            total = (int)t;
        }
        result.put("list", pm_0106list);
        result.put("total",total);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_0106_OVERHUAL_DETAIL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_0106_OVERHUAL_DETAIL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response
    )throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_0106Service.PRO_PM_0106_OVERHUAL_DETAIL(V_V_GUID,start,limit);

        List<Map<String, Object>> pm_0106list = (List) data.get("list");
        Long total = 0L;
        if(pm_0106list!=null&&pm_0106list.size()>0){
            total = Long.valueOf(pm_0106list.get(0).get("TOTAL").toString());
        }
        result.put("list", pm_0106list);
        result.put("total",total);
        result.put("success", true);
        return result;
    }


    @RequestMapping(value = "/PRO_PM_0106_MODIFY_MAIN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_0106_MODIFY_MAIN(
            @RequestParam(value = "V_V_COLUMN") String V_V_COLUMN,
            @RequestParam(value = "V_V_VALUE") String V_V_VALUE,
            @RequestParam(value = "V_I_ID") String V_I_ID,
            HttpServletRequest request,
            HttpServletResponse response
    )throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        String ref_info= pm_0106Service.PRO_PM_0106_MODIFY_MAIN(V_V_COLUMN,V_V_VALUE,V_I_ID);

        result.put("result", ref_info);
        result.put("success", true);
        return result;
    }


}
