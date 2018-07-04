package org.building.pm.controller;

import org.building.pm.service.GanttService;
import org.building.pm.service.PM_01Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/12/13.
 */

@Controller
@RequestMapping("/app/pm/gantt")
public class GanttController {
    @Autowired
    private GanttService ganttService;
    @Autowired
    private PM_01Service pm_01Service;

    /*
    * 大修工程放行计划树形结构
    * */
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_PM_EQUREPAIRPLAN_TREE(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_BY1") String V_BY1,
            @RequestParam(value = "V_BY2") String V_BY2,
            @RequestParam(value = "V_BY3") String V_BY3) throws Exception {

        List<Map> result = ganttService.PRO_PM_EQUREPAIRPLAN_TREE(V_V_GUID_FXJH, V_BY1, V_BY2, V_BY3);

        return result;
    }

    /*
   * 大修工程放行计划树形甘特图
   * */
    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_GANTT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_EQUREPAIRPLAN_TREE_GANTT(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_BY1") String V_BY1,
            @RequestParam(value = "V_BY2") String V_BY2,
            @RequestParam(value = "V_BY3") String V_BY3) throws Exception {

        Map result = pm_01Service.PRO_PM_EQUREPAIRPLAN_TREE(V_V_GUID_FXJH, V_BY1, V_BY2, V_BY3);



        return result;
    }


    /*
  * 大修工程放行计划树形动态添加修改单个字段值
  * */
    @RequestMapping(value = "/PM_EQUREPAIRPLAN_TREE_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_EQUREPAIRPLAN_TREE_INSERT(
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_V_ROWNUMBER") String V_V_ROWNUMBER,
            @RequestParam(value = "V_V_COLUMN") String V_V_COLUMN,
            @RequestParam(value = "V_V_VALUE") String V_V_VALUE) throws Exception {

        HashMap result = ganttService.PM_EQUREPAIRPLAN_TREE_INSERT(V_V_PERCODE, V_V_PERNAME, V_V_GUID, V_V_GUID_FXJH,V_V_ROWNUMBER,V_V_COLUMN,V_V_VALUE);


        return result;
    }

    /*
     * 周计划树形表格
     * */
    @RequestMapping(value = "weekPlanSelTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> weekPlanSelTree(@RequestParam(value = "V_V_SDATE") String V_V_SDATE,
                                               @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
                                               @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               HttpServletRequest request)
            throws SQLException {
        List<Map> result = ganttService.weekPlanSelTree(V_V_SDATE, V_V_EDATE,V_V_ORGCODE,V_V_DEPTCODE);
        return result;
    }
}
