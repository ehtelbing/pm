package org.building.pm.controller;

import org.building.pm.service.PM_19Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 * <p>
 * �豸�¹�controller
 */
@Controller
@RequestMapping("/app/pm/pm_19")
public class PM_19Controller {

    @Autowired
    private PM_19Service pm_19Service;

    @RequestMapping(value = "PRO_PM_19_WORKTYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_19_WORKTYPE_SEL(@RequestParam(value = "V_V_WORKNAME") String V_V_WORKNAME,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_19Service.PRO_PM_19_WORKTYPE_SEL(V_V_WORKNAME);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_WORKTYPE_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_WORKTYPE_EDIT(@RequestParam(value = "V_V_WORKCODE") String V_V_WORKCODE,
                                       @RequestParam(value = "V_V_WORKNAME") String V_V_WORKNAME,
                                       @RequestParam(value = "V_V_WORKTYPE") String V_V_WORKTYPE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_WORKTYPE_EDIT(V_V_WORKCODE, V_V_WORKNAME, V_V_WORKTYPE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_19_WORKTYPE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_WORKTYPE_DEL(@RequestParam(value = "V_V_WORKCODE") String V_V_WORKCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_WORKTYPE_DEL(V_V_WORKCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "PRO_PM_19_TOOLTYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_19_TOOLTYPE_SEL(@RequestParam(value = "V_V_TOOLNAME") String V_V_TOOLNAME,
                                                      @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_19Service.PRO_PM_19_TOOLTYPE_SEL(V_V_TOOLNAME,V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_TOOLTYPE_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_TOOLTYPE_EDIT(@RequestParam(value = "V_V_TOOLCODE") String V_V_TOOLCODE,
                                       @RequestParam(value = "V_V_TOOLNAME") String V_V_TOOLNAME,
                                       @RequestParam(value = "V_V_TOOLTYPE") String V_V_TOOLTYPE,
                                       @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                       @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                       @RequestParam(value = "V_V_EQUSITE") String V_V_EQUSITE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_TOOLTYPE_EDIT(V_V_TOOLCODE, V_V_TOOLNAME, V_V_TOOLTYPE ,V_V_EQUCODE,V_V_EQUNAME,V_V_EQUSITE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_19_TOOLTYPE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_TOOLTYPE_DEL(@RequestParam(value = "V_V_TOOLCODE") String V_V_TOOLCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_TOOLTYPE_DEL(V_V_TOOLCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "PRO_PM_19_CARTYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_19_CARTYPE_SEL(@RequestParam(value = "V_V_CARNAME") String V_V_CARNAME,
                                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                     HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_19Service.PRO_PM_19_CARTYPE_SEL(V_V_CARNAME,V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_CARTYPE_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_CARTYPE_EDIT(@RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
                                      @RequestParam(value = "V_V_CARNAME") String V_V_CARNAME,
                                      @RequestParam(value = "V_V_CARTYPE") String V_V_CARTYPE,
                                      @RequestParam(value = "V_V_CARGUISUO") String V_V_CARGUISUO,
                                      @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                      @RequestParam(value = "V_V_CARINFO") String V_V_CARINFO,
                                      @RequestParam(value = "V_V_DE") String V_V_DE,
                                      @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                      @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                      @RequestParam(value = "V_V_EQUSITE") String V_V_EQUSITE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_CARTYPE_EDIT(V_V_CARCODE, V_V_CARNAME, V_V_CARTYPE, V_V_CARGUISUO, V_V_FLAG, V_V_CARINFO, V_V_DE,V_V_EQUCODE,V_V_EQUNAME,V_V_EQUSITE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_19_CARTYPE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_CARTYPE_DEL(@RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_CARTYPE_DEL(V_V_CARCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "PRO_PM_19_WORKDE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_19_WORKDE_SEL(@RequestParam(value = "V_V_WORKNAME") String V_V_WORKNAME,
                                                    HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_19Service.PRO_PM_19_WORKDE_SEL(V_V_WORKNAME);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_WORKDE_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_WORKDE_EDIT(@RequestParam(value = "I_I_ID") String I_I_ID,
                                     @RequestParam(value = "V_V_WORKCODE") String V_V_WORKCODE,
                                     @RequestParam(value = "V_V_WORKNAME") String V_V_WORKNAME,
                                     @RequestParam(value = "V_V_WORKTYPE") String V_V_WORKTYPE,
                                     @RequestParam(value = "V_V_TIME") String V_V_TIME,
                                     @RequestParam(value = "V_V_DE") String V_V_DE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_WORKDE_EDIT(I_I_ID, V_V_WORKCODE, V_V_WORKNAME, V_V_WORKTYPE,
                V_V_TIME, V_V_DE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_19_WORKDE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_WORKDE_DEL(@RequestParam(value = "I_I_ID") String I_I_ID,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_WORKDE_DEL(I_I_ID);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_19_CARDE_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_CARDE_EDIT(@RequestParam(value = "I_I_ID") String I_I_ID,
                                    @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
                                    @RequestParam(value = "V_V_CARNAME") String V_V_CARNAME,
                                    @RequestParam(value = "V_V_CARTYPE") String V_V_CARTYPE,
                                    @RequestParam(value = "V_V_CARGUISUO") String V_V_CARGUISUO,
                                    @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                    @RequestParam(value = "V_V_CARINFO") String V_V_CARINFO,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_CARDE_EDIT(I_I_ID, V_V_CARCODE, V_V_CARNAME, V_V_CARTYPE,
                V_V_CARGUISUO, V_V_FLAG, V_V_CARINFO);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_19_CARDE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_CARDE_DEL(@RequestParam(value = "I_I_ID") String I_I_ID,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_CARDE_DEL(I_I_ID);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXGX_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_DATA_SET(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                     @RequestParam(value = "V_V_JXGX_NAME") String V_V_JXGX_NAME,
                                     @RequestParam(value = "V_V_JXGX_NR") String V_V_JXGX_NR,
                                     @RequestParam(value = "V_V_GZZX_CODE") String V_V_GZZX_CODE,
                                     @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
                                     @RequestParam(value = "V_V_ORDER") String V_V_ORDER,
                                     @RequestParam(value = "V_V_PERNUM") String V_V_PERNUM,
                                     @RequestParam(value = "V_V_PERTIME") String V_V_PERTIME,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PM_1917_JXGX_DATA_SET(V_V_JXGX_CODE, V_V_JXGX_NAME, V_V_JXGX_NR, V_V_GZZX_CODE,
                V_V_JXMX_CODE, V_V_ORDER,V_V_PERNUM,V_V_PERTIME);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXGX_DATA_SETNEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_DATA_SETNEW(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                     @RequestParam(value = "V_V_JXGX_NAME") String V_V_JXGX_NAME,
                                     @RequestParam(value = "V_V_JXGX_NR") String V_V_JXGX_NR,
                                     @RequestParam(value = "V_V_GZZX_CODE") String V_V_GZZX_CODE,
                                     @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
                                     @RequestParam(value = "V_V_ORDER") String V_V_ORDER,
                                     @RequestParam(value = "V_V_PERNUM") String V_V_PERNUM,
                                     @RequestParam(value = "V_V_PERTIME") String V_V_PERTIME,
                                     @RequestParam(value = "V_V_JXBZ") String V_V_JXBZ,
                                     @RequestParam(value = "V_V_JXBZ_VALUE") String V_V_JXBZ_VALUE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PM_1917_JXGX_DATA_SETNEW(V_V_JXGX_CODE, V_V_JXGX_NAME, V_V_JXGX_NR, V_V_GZZX_CODE,
                V_V_JXMX_CODE, V_V_ORDER,V_V_PERNUM,V_V_PERTIME,V_V_JXBZ,V_V_JXBZ_VALUE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXGX_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1917_JXGX_DATA_SEL(
            @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_19Service.PM_1917_JXGX_DATA_SEL(V_V_JXMX_CODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_CARDE_GXSEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_19_CARDE_GXSEL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_19Service.PRO_PM_19_CARDE_GXSEL(V_V_JXGX_CODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_WORKDE_GXSEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_19_WORKDE_GXSEL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_19Service.PRO_PM_19_WORKDE_GXSEL(V_V_JXGX_CODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXGX_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_DATA_DEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PM_1917_JXGX_DATA_DEL(V_V_JXGX_CODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PM_1917_JXGX_CHILD_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_CHILD_DEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PM_1917_JXGX_CHILD_DEL(V_V_JXGX_CODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "PRO_PM_19_AQCS_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_19_AQCS_SEL(@RequestParam(value = "V_V_AQCS_NAME") String V_V_AQCS_NAME,
                                                  @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                  HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_19Service.PRO_PM_19_AQCS_SEL(V_V_AQCS_NAME,V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_19_JSYQ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_19_JSYQ_SEL(@RequestParam(value = "V_V_JSYQ_NAME") String V_V_JSYQ_NAME,
                                                  @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                  HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_19Service.PRO_PM_19_JSYQ_SEL(V_V_JSYQ_NAME,V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "PM_1917_JXGX_BYCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1917_JXGX_BYCODE_SEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                                       HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_19Service.PM_1917_JXGX_BYCODE_SEL(V_V_JXGX_CODE);
        return result;
    }

    @RequestMapping(value = "BASE_PER_POST_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_PER_POST_SEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                 @RequestParam(value = "V_V_POSTCODE") String V_V_POSTCODE,
                                                 HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = pm_19Service.BASE_PER_POST_SEL(V_V_DEPTCODE, V_V_POSTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_MODEL_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_MODEL_SELECT(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                   @RequestParam(value = "V_V_MXCODE") String V_V_MXCODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_MODEL_SELECT(V_V_ORDERGUID, V_V_MXCODE);
        test.put("list", result);
        return test;
    }
    @RequestMapping(value = "/PM_REPAIRDEPT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_REPAIRDEPT_SEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PM_REPAIRDEPT_SEL(V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PM_FLOW_TYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_FLOW_TYPE_SEL(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PM_FLOW_TYPE_SEL();
        return result;
    }
    @RequestMapping(value = "/PM_WORKORDER_FLOW_STEP_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_WORKORDER_FLOW_STEP_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
                                          @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PM_WORKORDER_FLOW_STEP_SEL(V_V_ORGCODE,V_V_DEPTCODE,V_V_REPAIRCODE,V_V_FLOWTYPE);
        return result;
    }
    @RequestMapping(value = "/PM_WORKORDER_FLOW_STEP_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_WORKORDER_FLOW_STEP_DEL(@RequestParam(value = "V_V_ID") String V_V_ID,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PM_WORKORDER_FLOW_STEP_DEL(V_V_ID);
        return result;
    }
    @RequestMapping(value = "/PM_FLOW_PAGE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_FLOW_PAGE_SEL(@RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PM_FLOW_PAGE_SEL(V_V_FLOWTYPE);
        return result;
    }
    @RequestMapping(value = "/PM_WORKORDER_FLOW_STEP_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_WORKORDER_FLOW_STEP_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
                                          @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
                                          @RequestParam(value = "V_V_FLOWNAME") String V_V_FLOWNAME,
                                          @RequestParam(value = "V_V_FLOWSTEP") String V_V_FLOWSTEP,
                                          @RequestParam(value = "V_V_ORDER") String V_V_ORDER,
                                          @RequestParam(value = "V_V_BZ") String V_V_BZ,
                                          @RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                          @RequestParam(value = "V_V_NEXTSTEP") String V_V_NEXTSTEP,
                                          @RequestParam(value = "V_V_URL") String V_V_URL,
                                          @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PM_WORKORDER_FLOW_STEP_SET(V_V_GUID,V_V_ORGCODE,V_V_DEPTCODE,V_V_REPAIRCODE,V_V_FLOWCODE,V_V_FLOWNAME,V_V_FLOWSTEP,V_V_ORDER,V_V_BZ,V_V_ROLECODE,V_V_NEXTSTEP,V_V_URL,V_V_FLOWTYPE,V_V_PERCODE);
        return result;
    }
    @RequestMapping(value = "/PM_WORKORDER_FLOW_STEP_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_WORKORDER_FLOW_STEP_GET(@RequestParam(value = "V_V_ID") String V_V_ID,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PM_WORKORDER_FLOW_STEP_GET(V_V_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_SAP_EQU_VIEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                      @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                      @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                      @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.PRO_SAP_EQU_VIEW(V_V_PERSONCODE, V_V_DEPTCODE,V_V_DEPTNEXTCODE,V_V_EQUTYPECODE,V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_DIC", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_DIC(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_DIC(A_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_DIC_REMARK", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_DIC_REMARK(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_DIC_REMARK();
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_DIC_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_DIC_UPDATE(@RequestParam(value = "A_DICID") String A_DICID,
                                      @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                      @RequestParam(value = "A_FLOWNAME") String A_FLOWNAME,
                                      @RequestParam(value = "A_REMARK") String A_REMARK,
                                      @RequestParam(value = "A_TYPE") String A_TYPE,
                                      @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                      @RequestParam(value = "A_STATUSFLAG") String A_STATUSFLAG,
                                      @RequestParam(value = "A_STARTSTEP") String A_STARTSTEP,
                                      @RequestParam(value = "OP") String OP,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_DIC_UPDATE(A_DICID,A_PLANTCODE,A_FLOWNAME,A_REMARK,A_TYPE,A_ORDERID,A_STATUSFLAG,A_STARTSTEP,OP);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_STEP", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_STEP(@RequestParam(value = "A_DICID") String A_DICID,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_STEP(A_DICID);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_STEP_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_STEP_UPDATE(@RequestParam(value = "A_DICID") String A_DICID,
                                       @RequestParam(value = "A_STEPID") String A_STEPID,
                                       @RequestParam(value = "A_STEPNAME") String A_STEPNAME,
                                       @RequestParam(value = "A_PRE_STEPID") String A_PRE_STEPID,
                                       @RequestParam(value = "A_AFTER_STEPID") String A_AFTER_STEPID,
                                       @RequestParam(value = "A_URL") String A_URL,
                                       @RequestParam(value = "A_REMARK") String A_REMARK,
                                       @RequestParam(value = "A_FINGER") String A_FINGER,
                                       @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                       @RequestParam(value = "OP") String OP,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_STEP_UPDATE(A_DICID, A_STEPID, A_STEPNAME, A_PRE_STEPID, A_AFTER_STEPID, A_URL, A_REMARK, A_FINGER,A_ORDERID, OP);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE(@RequestParam(value = "A_STEPID") String A_STEPID,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE(A_STEPID);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE_POWER_USER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE_POWER_USER(@RequestParam(value = "A_ROLEID") String A_ROLEID,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE_POWER_USER(A_ROLEID);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE_UPDATE(@RequestParam(value = "A_STEPID") String A_STEPID,
                                       @RequestParam(value = "A_ROLEID") String A_ROLEID,
                                       @RequestParam(value = "A_ROLENAME") String A_ROLENAME,
                                       @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                       @RequestParam(value = "A_PLANTNAME") String A_PLANTNAME,
                                       @RequestParam(value = "OP") String OP,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE_UPDATE(A_STEPID, A_ROLEID, A_ROLENAME, A_PLANTCODE,A_PLANTNAME,OP);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_PERSON_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_PERSON_UPDATE(@RequestParam(value = "A_ROLEID") String A_ROLEID,
                                         @RequestParam(value = "A_USERID") String A_USERID,
                                         @RequestParam(value = "OP") String OP,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_PERSON_UPDATE(A_ROLEID, A_USERID,OP);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE_POWER_PLANT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE_POWER_PLANT(@RequestParam(value = "A_ROLEID") String A_ROLEID,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE_POWER_PLANT(A_ROLEID);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE_PLANT_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE_PLANT_UPDATE(@RequestParam(value = "A_ROLEID") String A_ROLEID,
                                             @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                             @RequestParam(value = "OP") String OP,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE_PLANT_UPDATE(A_ROLEID,A_PLANTCODE,OP);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE_POWER_DEPART", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE_POWER_DEPART(@RequestParam(value = "A_ROLEID") String A_ROLEID,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE_POWER_DEPART(A_ROLEID);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE_DEPART_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE_DEPART_UPDATE(@RequestParam(value = "A_ROLEID") String A_ROLEID,
                                              @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                              @RequestParam(value = "OP") String OP,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE_DEPART_UPDATE(A_ROLEID, A_DEPARTCODE, OP);
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE_POWER_DICT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE_POWER_DICT(@RequestParam(value = "A_ROLEID") String A_ROLEID,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE_POWER_DICT(A_ROLEID);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_ALL(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_ALL();
        return result;
    }
    @RequestMapping(value = "/PRO_MM_FLOW_ROLE_DICT_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_ROLE_DICT_UPDATE(@RequestParam(value = "A_ROLEID") String A_ROLEID,
                                            @RequestParam(value = "A_DICTID") String A_DICTID,
                                            @RequestParam(value = "OP") String OP,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_MM_FLOW_ROLE_DICT_UPDATE(A_ROLEID, A_DICTID, OP);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MENDTYPE_ALL1", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MENDTYPE_ALL1(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MENDTYPE_ALL1();
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MENDTYPE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MENDTYPE_ADD(@RequestParam(value = "A_MENDTYPE") String A_MENDTYPE,
                                   @RequestParam(value = "A_MENDTYPE_DESC") String A_MENDTYPE_DESC,
                                   @RequestParam(value = "A_USEFLAG") String A_USEFLAG,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MENDTYPE_ADD(A_MENDTYPE, A_MENDTYPE_DESC, A_USEFLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MENDTYPE_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MENDTYPE_UPDATE(@RequestParam(value = "A_MENDTYPE") String A_MENDTYPE,
                                      @RequestParam(value = "A_MENDTYPE_DESC") String A_MENDTYPE_DESC,
                                      @RequestParam(value = "A_USEFLAG") String A_USEFLAG,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MENDTYPE_UPDATE(A_MENDTYPE, A_MENDTYPE_DESC, A_USEFLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MEND_DEPART_PLANT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MEND_DEPART_PLANT(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                        @RequestParam(value = "A_MENDTYPE") String A_MENDTYPE,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MEND_DEPART_PLANT(A_PLANTCODE,A_MENDTYPE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MEND_DEPART_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MEND_DEPART_ABLE(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MEND_DEPART_ABLE();
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MEND_DEPART_PLANT_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MEND_DEPART_PLANT_ADD(@RequestParam(value = "A_MEND_DEPARTCODE") String A_MEND_DEPARTCODE,
                                            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MEND_DEPART_PLANT_ADD(A_MEND_DEPARTCODE, A_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MEND_DEPART_PLANT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MEND_DEPART_PLANT_DEL(@RequestParam(value = "A_MEND_DEPARTCODE") String A_MEND_DEPARTCODE,
                                            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MEND_DEPART_PLANT_DEL(A_MEND_DEPARTCODE, A_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MENDTYPE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MENDTYPE_ALL(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MENDTYPE_ALL();
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MEND_DEPART_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MEND_DEPART_ALL(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MEND_DEPART_ALL();
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MEND_DEPART_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MEND_DEPART_ADD(@RequestParam(value = "A_MEND_DEPARTCODE") String A_MEND_DEPARTCODE,
                                      @RequestParam(value = "A_MEND_DEPARTNAME") String A_MEND_DEPARTNAME,
                                      @RequestParam(value = "A_MENDTYPE") String A_MENDTYPE,
                                      @RequestParam(value = "A_USEFLAG") String A_USEFLAG,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MEND_DEPART_ADD(A_MEND_DEPARTCODE, A_MEND_DEPARTNAME,A_MENDTYPE,A_USEFLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MEND_DEPART_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MEND_DEPART_UPDATE(@RequestParam(value = "A_MEND_DEPARTCODE") String A_MEND_DEPARTCODE,
                                         @RequestParam(value = "A_MEND_DEPARTNAME") String A_MEND_DEPARTNAME,
                                         @RequestParam(value = "A_MENDTYPE") String A_MENDTYPE,
                                         @RequestParam(value = "A_USEFLAG") String A_USEFLAG,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MEND_DEPART_UPDATE(A_MEND_DEPARTCODE, A_MEND_DEPARTNAME, A_MENDTYPE, A_USEFLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_MEND_DEPART_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_MEND_DEPART_DELETE(@RequestParam(value = "A_MEND_DEPARTCODE") String A_MEND_DEPARTCODE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_MEND_DEPART_DELETE(A_MEND_DEPARTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_PLAN_PROJCODE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_PLAN_PROJCODE_ALL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                        @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_PLAN_PROJCODE_ALL(A_PLANTCODE,A_DEPARTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_PLAN_PROJCODE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_PLAN_PROJCODE_ADD(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                        @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                        @RequestParam(value = "A_PROJCODE") String A_PROJCODE,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_PLAN_PROJCODE_ADD(A_PLANTCODE, A_DEPARTCODE,A_PROJCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_PLAN_PROJCODE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_PLAN_PROJCODE_DEL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                        @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_PLAN_PROJCODE_DEL(A_PLANTCODE, A_DEPARTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_ALL1", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_ALL1(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_ALL1();
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_ADD(@RequestParam(value = "A_DICTID") String A_DICTID,
                               @RequestParam(value = "A_DICT_DESC") String A_DICT_DESC,
                               @RequestParam(value = "A_USEFLAG") String A_USEFLAG,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_ADD(A_DICTID, A_DICT_DESC, A_USEFLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_UPDATE(@RequestParam(value = "A_DICTID") String A_DICTID,
                                  @RequestParam(value = "A_DICT_DESC") String A_DICT_DESC,
                                  @RequestParam(value = "A_USEFLAG") String A_USEFLAG,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_UPDATE(A_DICTID, A_DICT_DESC, A_USEFLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_PLANT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_PLANT(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_PLANT(A_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_PLANT_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_PLANT_ADD(@RequestParam(value = "A_DICTID") String A_DICTID,
                                     @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_PLANT_ADD(A_DICTID,A_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_PLANT_MANAGER_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_PLANT_MANAGER_ADD(@RequestParam(value = "A_DICTID") String A_DICTID,
                                             @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                             @RequestParam(value = "A_USERID") String A_USERID,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_PLANT_MANAGER_ADD(A_DICTID, A_PLANTCODE,A_USERID);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_PLANT_MANAGER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_PLANT_MANAGER(@RequestParam(value = "A_DICTID") String A_DICTID,
                                         @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_PLANT_MANAGER(A_DICTID, A_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_PLANT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_PLANT_DEL(@RequestParam(value = "A_DICTID") String A_DICTID,
                                     @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_PLANT_DEL(A_DICTID, A_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_WP_DICT_PLANT_MANAGER_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WP_DICT_PLANT_MANAGER_DEL(@RequestParam(value = "A_ID") String A_ID,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_WP_DICT_PLANT_MANAGER_DEL(A_ID);
        return result;
    }
    @RequestMapping(value = "/OrgAndPersonTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> OrgAndPersonTree(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.OrgAndPersonTree(V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/DepartAndEquTypeTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> DepartAndEquTypeTree(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                          @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.DepartAndEquTypeTree(V_V_PERSONCODE,V_V_DEPTCODENEXT);
        return result;
    }
    @RequestMapping(value = "/PRO_GET_DEPTEQU_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_GET_DEPTEQU_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                   @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                   @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_GET_DEPTEQU_PER(V_V_PERSONCODE,V_V_DEPTCODENEXT,V_V_EQUTYPECODE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_PERSONTOEQU_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_PERSONTOEQU_VIEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                       @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_PM_PERSONTOEQU_VIEW(V_V_PERSONCODE,V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_PERSONTOEQU_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_PERSONTOEQU_SET(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                      @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_PM_PERSONTOEQU_SET(V_V_PERSONCODE, V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_PERSONTOEQU_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_PERSONTOEQU_DEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                      @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_PM_PERSONTOEQU_DEL(V_V_PERSONCODE, V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_BASE_DEPT_VIEW_ROLE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                             @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                             @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_YWFW_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_PM_YWFW_VIEW(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_PM_YWFW_VIEW(V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_CSAT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_SAP_PM_CSAT_VIEW(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_YWFW") String V_V_YWFW,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.PRO_SAP_PM_CSAT_VIEW(V_V_DEPTCODE,V_V_YWFW);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPTTOSAPCSAT_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DEPTTOSAPCSAT_SET(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_CBZX") String V_V_CBZX,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_BASE_DEPTTOSAPCSAT_SET(V_V_DEPTCODE,V_V_CBZX);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPTTOSAPCSAT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DEPTTOSAPCSAT_DEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_CBZX") String V_V_CBZX,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_BASE_DEPTTOSAPCSAT_DEL(V_V_DEPTCODE, V_V_CBZX);
        return result;
    }
    @RequestMapping(value = "/PersonTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PersonTree(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.PRO_BASE_SPECIALTY_TREE(V_V_PERSONCODE, V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_SPECIALTYTOPERSON_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_SPECIALTYTOPERSON_DEL(@RequestParam(value = "V_V_SPECIALTYCODE") String V_V_SPECIALTYCODE,
                                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                              @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_BASE_SPECIALTYTOPERSON_DEL(V_V_SPECIALTYCODE, V_V_DEPTCODE,V_V_PERSONCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_SPECIALTYTOPERSON_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_SPECIALTYTOPERSON_SET(@RequestParam(value = "V_V_SPECIALTYCODE") String V_V_SPECIALTYCODE,
                                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                              @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_BASE_SPECIALTYTOPERSON_SET(V_V_SPECIALTYCODE, V_V_DEPTCODE, V_V_PERSONCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TREE_BY_EQUNAME", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TREE_BY_EQUNAME(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                           @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TREE_BY_EQUNAME(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE,V_V_EQUCODE,V_V_EQUNAME);
        return result;
    }
    @RequestMapping(value = "/No950101Tree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> No950101Tree(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                  @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                  @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                  @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.PRO_SAP_EQU_TREE(V_V_PERSONCODE, V_V_DEPTCODE,V_V_DEPTNEXTCODE,V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_CAST_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_CAST_DROP(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_CAST_DROP(V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_LEV_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_LEV_DROP(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_LEV_DROP();
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_PM_EQU_P_SET(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                    @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                    @RequestParam(value = "V_V_EQULEV") String V_V_EQULEV,
                                    @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                    @RequestParam(value = "V_V_EQUSITE") String V_V_EQUSITE,
                                    @RequestParam(value = "V_V_ZZCH") String V_V_ZZCH,
                                    @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                    @RequestParam(value = "V_F_MONEY") String V_F_MONEY,
                                    @RequestParam(value = "V_V_MONEYTYPE") String V_V_MONEYTYPE,
                                    @RequestParam(value = "V_F_WEIGHT") String V_F_WEIGHT,
                                    @RequestParam(value = "V_V_WEIGHTTYPE") String V_V_WEIGHTTYPE,
                                    @RequestParam(value = "V_V_DATE_B") String V_V_DATE_B,
                                    @RequestParam(value = "V_V_DATE_E") String V_V_DATE_E,
                                    @RequestParam(value = "V_V_ZZS") String V_V_ZZS,
                                    @RequestParam(value = "V_V_GGXH") String V_V_GGXH,
                                    @RequestParam(value = "V_V_ABC") String V_V_ABC,
                                    @RequestParam(value = "V_V_SIZE") String V_V_SIZE,
                                    @RequestParam(value = "V_V_CBZX") String V_V_CBZX,
                                    @RequestParam(value = "V_V_EQUCODEUP") String V_V_EQUCODEUP,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_PM_EQU_P_SET(V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUCODE, V_V_EQULEV, V_V_EQUNAME, V_V_EQUSITE, V_V_ZZCH, V_V_EQUTYPECODE, V_F_MONEY, V_V_MONEYTYPE, V_F_WEIGHT, V_V_WEIGHTTYPE, V_V_DATE_B, V_V_DATE_E, V_V_ZZS, V_V_GGXH, V_V_ABC, V_V_SIZE, V_V_CBZX, V_V_EQUCODEUP);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_TXVAL_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_TXVAL_VIEW(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                           @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TYPE_TXVAL_VIEW(V_V_EQUCODE,V_V_EQUTYPECODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_VIEW(@RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TYPE_VIEW(V_V_EQUTYPENAME);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_SET(@RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                    @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TYPE_SET(V_V_EQUTYPECODE,V_V_EQUTYPENAME);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_TX_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_TX_VIEW(@RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TYPE_TX_VIEW(V_V_EQUTYPECODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_TX_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_TX_SET(@RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                       @RequestParam(value = "V_V_EQUTYPETXCODE") String V_V_EQUTYPETXCODE,
                                       @RequestParam(value = "V_V_EQUTYPETXNAME") String V_V_EQUTYPETXNAME,
                                       @RequestParam(value = "V_V_EQUTYPETXCHAR") String V_V_EQUTYPETXCHAR,
                                       @RequestParam(value = "V_V_EQUTYPETXLEN") String V_V_EQUTYPETXLEN,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TYPE_TX_SET(V_V_EQUTYPECODE,V_V_EQUTYPETXCODE,V_V_EQUTYPETXNAME,V_V_EQUTYPETXCHAR,V_V_EQUTYPETXLEN);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_TX_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_TX_DEL(@RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                       @RequestParam(value = "V_V_EQUTYPETXCODE") String V_V_EQUTYPETXCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TYPE_TX_DEL(V_V_EQUTYPECODE,V_V_EQUTYPETXCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_TXVAL_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_TXVAL_SET(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                          @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                          @RequestParam(value = "V_V_EQUTYPETXCODE") String V_V_EQUTYPETXCODE,
                                          @RequestParam(value = "V_V_EQUTYPETXVALUE") String V_V_EQUTYPETXVALUE,
                                          @RequestParam(value = "V_UPDATEALL") String V_UPDATEALL,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TYPE_TXVAL_SET(V_V_EQUCODE,V_V_EQUTYPECODE, V_V_EQUTYPETXCODE,V_V_EQUTYPETXVALUE,V_UPDATEALL);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_SITE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_SITE_VIEW(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     @RequestParam(value = "V_V_EQUSITENAME") String V_V_EQUSITENAME,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_SITE_VIEW(V_V_DEPTCODE,V_V_EQUSITENAME);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_SITE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_SITE_SET(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    @RequestParam(value = "V_V_EQUSITE") String V_V_EQUSITE,
                                    @RequestParam(value = "V_V_EQUSITENAME") String V_V_EQUSITENAME,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_SITE_SET(V_V_DEPTCODE,V_V_EQUSITE,V_V_EQUSITENAME);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_SITE_TOP_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_SITE_TOP_VIEW(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_SITE_TOP_VIEW(V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_COPY", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_PM_EQU_P_COPY(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_PM_EQU_P_COPY(V_V_DEPTCODE,V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_PM_EQU_P_GET(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_PM_EQU_P_GET(V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_BOM_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_BOM_VIEW(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_BOM_VIEW(V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_BOM_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_BOM_SET(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                   @RequestParam(value = "V_V_SPCODE") String V_V_SPCODE,
                                   @RequestParam(value = "V_V_SPNAME") String V_V_SPNAME,
                                   @RequestParam(value = "V_V_SPTYPE") String V_V_SPTYPE,
                                   @RequestParam(value = "V_V_SPCODE_OLD") String V_V_SPCODE_OLD,
                                   @RequestParam(value = "V_V_NUMBER") String V_V_NUMBER,
                                   @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_BOM_SET(V_V_EQUCODE,V_V_SPCODE,V_V_SPNAME,V_V_SPTYPE,V_V_SPCODE_OLD,V_V_NUMBER,V_V_MEMO);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_BOM_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_BOM_DEL(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                   @RequestParam(value = "V_V_SPCODE") String V_V_SPCODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_BOM_DEL(V_V_EQUCODE, V_V_SPCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_GET_DEPTEQUTYPE_ADMIN", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_GET_DEPTEQUTYPE_ADMIN(@RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_GET_DEPTEQUTYPE_ADMIN(V_V_DEPTCODENEXT);
        return result;
    }
    @RequestMapping(value = "/PRO_GET_DEPTEQU_ADMIN", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_GET_DEPTEQU_ADMIN(@RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                     @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_GET_DEPTEQU_ADMIN(V_V_DEPTCODENEXT,V_V_EQUTYPECODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_TXVAL_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_TXVAL_SELECT(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                             @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_EQU_TYPE_TXVAL_SELECT(V_V_EQUCODE,V_V_EQUTYPECODE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_DEFECT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_DEFECT_VIEW(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                  @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                  @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                  @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                  @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                  @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                  @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                  @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_PM_DEFECT_VIEW(V_D_DEFECTDATE_B,V_D_DEFECTDATE_E,V_V_DEPTCODE,V_V_EQUTYPECODE,V_V_EQUCODE,V_V_STATECODE,V_V_SOURCECODE,V_V_DEFECTLIST);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_WORKORDER_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_WORKORDER_SELECT(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                        @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                        @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                        @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                        @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                        @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                                        @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                        @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
                                        @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                        @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
                                        @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_SAP_WORKORDER_SELECT(V_D_ENTER_DATE_B,V_D_ENTER_DATE_E,V_V_ORGCODE,V_V_DEPTCODE,V_V_DEPTCODEREPARIR,V_V_STATECODE,V_EQUTYPE_CODE,V_EQU_CODE,V_DJ_PERCODE,V_V_SHORT_TXT,V_V_BJ_TXT,V_V_ORDER_TYP);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_EQU_BJ_ALERT_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_EQU_BJ_ALERT_ALL(@RequestParam(value = "A_EQUID") String A_EQUID,
                                        @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_RUN_EQU_BJ_ALERT_ALL(A_EQUID,A_CYCLE_ID);
        return result;
    }
    @RequestMapping(value = "/OrgAndWorkspaceTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> OrgAndWorkspaceTree(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.OrgAndWorkspaceTree(V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/OrgAndWorkspaceTreeCheck", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_BASE_DEPT_TREE(@RequestParam(value = "V_V_DEPTCODE_UP") String V_V_DEPTCODE_UP,
                                        @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.OrgAndWorkspaceTreeCheck(V_V_DEPTCODE_UP,V_V_DEPTTYPE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_REPAIRDEPT_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_REPAIRDEPT_SET(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     @RequestParam(value = "V_V_DEPTREPAIRCODE") String V_V_DEPTREPAIRCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_PM_REPAIRDEPT_SET(V_V_DEPTCODE, V_V_DEPTREPAIRCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_REPAIRDEPT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_REPAIRDEPT_DEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     @RequestParam(value = "V_V_DEPTREPAIRCODE") String V_V_DEPTREPAIRCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_PM_REPAIRDEPT_DEL(V_V_DEPTCODE, V_V_DEPTREPAIRCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_PERSONROLE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSONROLE_VIEW(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_BASE_PERSONROLE_VIEW();
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_PERSONROLE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSONROLE_SET(@RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                       @RequestParam(value = "V_V_ROLENAME") String V_V_ROLENAME,
                                       @RequestParam(value = "V_V_ROLEMEMO") String V_V_ROLEMEMO,
                                       @RequestParam(value = "V_V_ROLETYPE") String V_V_ROLETYPE,
                                       @RequestParam(value = "V_I_ORDERID") String V_I_ORDERID,
                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_BASE_PERSONROLE_SET(V_V_ROLECODE,V_V_ROLENAME,V_V_ROLEMEMO,V_V_ROLETYPE,V_I_ORDERID,V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_PERSONROLE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSONROLE_DEL(@RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_BASE_PERSONROLE_DEL(V_V_ROLECODE,V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/NewMenuTree", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> NewMenuTree(@RequestParam(value = "role") String role,
                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        List<HashMap> result = pm_19Service.NewMenuTree(role,V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/NewRoleTree", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> NewRoleTree(@RequestParam(value = "role") String role,
                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        List<HashMap> result = pm_19Service.NewRoleTree(role,V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_PERSON_PASS_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSON_PASS_EDIT(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                         @RequestParam(value = "V_V_PASSWORD") String V_V_PASSWORD,
                                         @RequestParam(value = "V_V_PASSWORD_NEW") String V_V_PASSWORD_NEW,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PRO_BASE_PERSON_PASS_EDIT(V_V_PERSONCODE, V_V_PASSWORD, V_V_PASSWORD_NEW);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_EQU_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_SAP_PM_EQU_TREE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                         @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                         @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        List<Map> result = pm_19Service.PRO_SAP_PM_EQU_TREE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUTYPECODE, V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_SAP_PM_CHILDEQU_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> PRO_SAP_PM_CHILDEQU_TREE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                  @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                  @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                                  @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                  @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        List<HashMap> result = pm_19Service.PRO_SAP_PM_CHILDEQU_TREE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUTYPECODE, V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_19_AQCS_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_AQCS_EDIT(@RequestParam(value = "V_V_AQCSCODE") String V_V_AQCSCODE,
                                   @RequestParam(value = "V_V_AQCSNAME") String V_V_AQCSNAME,
                                   @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                   @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                   @RequestParam(value = "V_V_EQUSITE") String V_V_EQUSITE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_AQCS_EDIT(V_V_AQCSCODE, V_V_AQCSNAME,V_V_EQUCODE, V_V_EQUNAME, V_V_EQUSITE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_19_AQCS_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_AQCS_DEL(@RequestParam(value = "V_V_AQCSCODE") String V_V_AQCSCODE,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = pm_19Service.PRO_PM_19_AQCS_DEL(V_V_AQCSCODE);
        test.put("list", result);
        return test;
    }
    @RequestMapping(value = "/PRO_PM_19_JSYQ_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_JSYQ_EDIT(@RequestParam(value = "V_V_JSYQ_CODE") String V_V_JSYQ_CODE,
                                   @RequestParam(value = "V_V_JSYQ_NAME") String V_V_JSYQ_NAME,
                                   @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                   @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                   @RequestParam(value = "V_V_EQUSITE") String V_V_EQUSITE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result= pm_19Service.PRO_PM_19_JSYQ_EDIT(V_V_JSYQ_CODE, V_V_JSYQ_NAME, V_V_EQUCODE, V_V_EQUNAME, V_V_EQUSITE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_JSYQ_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_JSYQ_DEL(@RequestParam(value = "V_V_JSYQ_CODE") String V_V_JSYQ_CODE,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        Map result= pm_19Service.PRO_PM_19_JSYQ_DEL(V_V_JSYQ_CODE);
        return result;
    }

    @RequestMapping(value = "/PRO_MM_FLOW_DIC_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_FLOW_DIC_DEL(@RequestParam(value = "V_V_DICID") String V_V_DICID,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        Map result= pm_19Service.PRO_MM_FLOW_DIC_DEL(V_V_DICID);
        return result;
    }

    @RequestMapping(value = "/PM_03_FLOW_STATE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_FLOW_STATE_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = pm_19Service.PM_03_FLOW_STATE_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_PLANTYPE);
        return result;
    }

    @RequestMapping(value = "/PM_03_FLOW_STATE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_FLOW_STATE_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                    @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                                    @RequestParam(value = "V_V_FLOWNAME") String V_V_FLOWNAME,
                                    @RequestParam(value = "V_V_FLOWNAME_NEXT") String V_V_FLOWNAME_NEXT,
                                    @RequestParam(value = "V_V_ORDER") String V_V_ORDER,
                                    @RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                    @RequestParam(value = "V_V_ROLENAME") String V_V_ROLENAME,
                                    @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result= pm_19Service.PM_03_FLOW_STATE_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_PLANTYPE, V_V_FLOWNAME,
                V_V_FLOWNAME_NEXT, V_V_ORDER, V_V_ROLECODE,V_V_ROLENAME, V_V_PERCODE);
        return result;
    }

    @RequestMapping(value = "/PM_03_FLOW_STATE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_FLOW_STATE_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                    @RequestParam(value = "V_V_ID") String V_V_ID,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result= pm_19Service.PM_03_FLOW_STATE_DEL(V_V_GUID, V_V_ID);
        return result;
    }

    @RequestMapping(value = "/PM_03_FLOW_STATE_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_FLOW_STATE_GET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result= pm_19Service.PM_03_FLOW_STATE_GET(V_V_GUID);
        return result;
    }

}
