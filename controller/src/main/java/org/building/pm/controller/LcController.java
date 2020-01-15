package org.building.pm.controller;

import org.building.pm.service.LcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping("/app/pm/planLockingDate")
public class LcController {

    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private LcService lcService;
    //计划上报时间管理查询
    @RequestMapping(value = "/selectPlanLockingDate", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectPlanLockingDate(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                     @RequestParam(value = "I_I_YEAR") String I_I_YEAR,
                                                     @RequestParam(value = "I_I_MONTH") String I_I_MONTH,
                                                     @RequestParam(value = "I_I_WEEKNUM") String I_I_WEEKNUM,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = lcService.selectPlanLockingDate(V_V_ORGCODE,V_V_DEPTCODE,I_I_YEAR,I_I_MONTH,I_I_WEEKNUM);
        return result;
    }
    //计划上报时间管理新增
    @RequestMapping(value = "/insertPlanLockingDate", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> insertPlanLockingDate(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                      @RequestParam(value = "I_I_YEAR") String I_I_YEAR,
                                                      @RequestParam(value = "I_I_MONTH") String I_I_MONTH,
                                                      @RequestParam(value = "I_I_WEEKNUM") String I_I_WEEKNUM,
                                                      @RequestParam(value = "D_DATE_S") String D_DATE_S,
                                                      @RequestParam(value = "D_DATE_E") String D_DATE_E,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = lcService.insertPlanLockingDate(V_V_ORGCODE, V_V_DEPTCODE, I_I_YEAR, I_I_MONTH, I_I_WEEKNUM,D_DATE_S, D_DATE_E);
        result.put("success", true);
        result.put("data", data);
        result.put("V_INFO", data.get("V_INFO"));
        return result;
    }
//计划上报时间管理修改
    @RequestMapping(value = "/updatePlanLockingDate", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updatePlanLockingDate(@RequestParam(value = "I_I_ID") String I_I_ID,
                                                     @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                     @RequestParam(value = "I_I_YEAR") String I_I_YEAR,
                                                     @RequestParam(value = "I_I_MONTH") String I_I_MONTH,
                                                     @RequestParam(value = "I_I_WEEKNUM") String I_I_WEEKNUM,
                                                     @RequestParam(value = "D_D_DATE_S") String D_D_DATE_S,
                                                     @RequestParam(value = "D_D_DATE_E") String D_D_DATE_E,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = lcService.updatePlanLockingDate(I_I_ID,V_V_ORGCODE, V_V_DEPTCODE, I_I_YEAR, I_I_MONTH, I_I_WEEKNUM,D_D_DATE_S, D_D_DATE_E);
        result.put("success", true);
        result.put("data", data);
        result.put("V_INFO", data.get("V_INFO"));
         result.put("insertPlanLockingDate", lcService.loadPlanLockingDate(I_I_ID).get("list"));
        return result;
    }

    @RequestMapping(value = "/loadPlanLockingDate", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadPlanLockingDate(
            @RequestParam(value = "I_I_ID") String I_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = lcService.loadPlanLockingDate(I_I_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return data;
    }
    //计划上报时间管理批量删除
    @RequestMapping(value = "/deletePlanLockingDate", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deletePlanLockingDate(
                                            @RequestParam(value = "I_I_ID_LIST", required = false) List<String> I_I_ID_LIST,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        String I_ID_LIST = new String();
        for (int i= 0; i < I_I_ID_LIST.size(); i ++){
            if(i<I_I_ID_LIST.size()-1){
                I_ID_LIST +=  I_I_ID_LIST.get(i) + ",";
            }else {
                I_ID_LIST +=  I_I_ID_LIST.get(i) ;
            }
        }
        HashMap data = lcService.deletePlanLockingDate(I_ID_LIST);

        result.put("data", data);

        return result;
    }

    @RequestMapping(value = "/planLockingDateBatchUpdate", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> planLockingDateBatchUpdate(@RequestParam(value = "I_I_ID_LIST") List<String> I_I_ID_LIST,
                                                     @RequestParam(value = "V_V_V_ORGCODE") String V_V_V_ORGCODE,
                                                     @RequestParam(value = "V_V_V_DEPTCODE") String V_V_V_DEPTCODE,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        String I_I_ID = new String();
        for (int i= 0; i < I_I_ID_LIST.size(); i ++){
            if(i<I_I_ID_LIST.size()-1){
                I_I_ID +=  I_I_ID_LIST.get(i) + ",";
            }else {
                I_I_ID +=  I_I_ID_LIST.get(i) ;
            }
        }
        HashMap data = lcService.planLockingDateBatchUpdate(I_I_ID,V_V_V_ORGCODE, V_V_V_DEPTCODE);
        result.put("success", true);
        result.put("data", data);
        result.put("V_INFO", data.get("V_INFO"));
        result.put("insertPlanLockingDate", lcService.loadPlanLockingDate(I_I_ID).get("list"));
        List<Map<String, Object>>  list = ( List<Map<String, Object>>)lcService.loadPlanLockingDate(I_I_ID).get("list");
        result.put("size", list.size());
        return result;
    }

}
