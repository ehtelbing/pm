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
import java.sql.SQLException;
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

    //通过月计划的GUID查询对应周计划
    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_BY_MONTHGUID", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_BY_MONTHGUID(@RequestParam(value = "V_V_OTHERPLAN_GUID") String V_V_OTHERPLAN_GUID,

                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = cService.PRO_PM_03_PLAN_WEEK_BY_MONTHGUID(V_V_OTHERPLAN_GUID);
        return data;
    }

    @RequestMapping(value = "/PRO_BASE_FAULT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FAULT_SEL(HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.PRO_BASE_FAULT_SEL();
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
//        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "PRO_PM_STANDARD_GX_BOM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_STANDARD_GX_BOM_SEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                          @RequestParam(value = "V_V_REPAIR_CODE") String V_V_REPAIR_CODE,
                                                          @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                         HttpServletRequest request)
            throws SQLException {

        return cService.PRO_PM_STANDARD_GX_BOM_SEL(V_V_PERSONCODE,V_V_DEPTCODE,V_V_REPAIR_CODE,V_V_EQUTYPE);
    }

    @RequestMapping(value = "PM_STANDARD_GX_BOM_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_STANDARD_GX_BOM_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                      @RequestParam(value = "V_V_SPCODE") String V_V_SPCODE,
                                                          @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                          @RequestParam(value = "V_V_NUM") String V_V_NUM,
                                                      @RequestParam(value = "V_V_INPUTER") String V_V_INPUTER,
                                                      HttpServletRequest request)
            throws SQLException {

        return cService.PM_STANDARD_GX_BOM_SET(V_V_GUID,V_V_SPCODE,V_V_EQUCODE,V_V_NUM,V_V_INPUTER);
    }

    @RequestMapping(value = "SAP_PM_EQU_BOM_FOR_JX_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SAP_PM_EQU_BOM_FOR_JX_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                      HttpServletRequest request)
            throws SQLException {

        return cService.SAP_PM_EQU_BOM_FOR_JX_SEL(V_V_GUID);
    }

    @RequestMapping(value = "/PRO_STANDARD_DATA_BY_TYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_STANDARD_DATA_BY_TYPE_SEL(@RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                           @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                           @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                           HttpServletRequest request) throws SQLException {

        return cService.PRO_STANDARD_DATA_BY_TYPE_SEL(V_V_EQUTYPE,V_V_PAGE, V_V_PAGESIZE);
    }

    @RequestMapping(value = "PRO_WORKORDER_STANDARD_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WORKORDER_STANDARD_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                      @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                      @RequestParam(value = "V_V_INPUTER") String V_V_INPUTER,
                                                      HttpServletRequest request)
            throws SQLException {

        return cService.PRO_WORKORDER_STANDARD_SET(V_V_GUID,V_V_ORDERID,V_V_INPUTER);
    }

    @RequestMapping(value = "/PM_1405_FAULT_ITEM_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1405_FAULT_ITEM_DATA_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                         @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                         @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                                         @RequestParam(value = "V_V_FAULT_GUID") String V_V_FAULT_GUID,
                                                         @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                                         @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                                         @RequestParam(value = "V_V_FINDTIME") String V_V_FINDTIME,
                                                         @RequestParam(value = "V_V_FAULT_XX") String V_V_FAULT_XX,
                                                         @RequestParam(value = "V_V_JJBF") String V_V_JJBF,
                                                         @RequestParam(value = "V_V_FAULT_LEVEL") String V_V_FAULT_LEVEL,
                                                         @RequestParam(value = "V_V_FILE_GUID") String V_V_FILE_GUID,
                                                         @RequestParam(value = "V_V_INTIME") String V_V_INTIME,
                                                         @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                         @RequestParam(value = "V_V_IP") String V_V_IP,
                                                           @RequestParam(value = "V_V_FAULT_NAME") String V_V_FAULT_NAME,
                                                           @RequestParam(value = "V_V_FAULT_PART") String V_V_FAULT_PART,
                                                           @RequestParam(value = "V_V_FAULT_CLGC") String V_V_FAULT_CLGC,
                                                           @RequestParam(value = "V_V_FAULT_SS") String V_V_FAULT_SS,
                                                           @RequestParam(value = "V_V_FAULT_XZ") String V_V_FAULT_XZ,
                                                           @RequestParam(value = "V_V_FAULT_ZGCS") String V_V_FAULT_ZGCS,
                                                           @RequestParam(value = "V_V_FZR_CL") String V_V_FZR_CL,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.PM_1405_FAULT_ITEM_DATA_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE,
                V_V_EQUCHILD_CODE, V_V_FAULT_GUID, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME,V_V_FAULT_XX,V_V_JJBF, V_V_FAULT_LEVEL,
                V_V_FILE_GUID,V_V_INTIME,V_V_PERCODE,V_V_IP,V_V_FAULT_NAME,V_V_FAULT_PART,V_V_FAULT_CLGC,V_V_FAULT_SS,V_V_FAULT_XZ,V_V_FAULT_ZGCS,V_V_FZR_CL);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_SBGZ_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_SBGZ_CREATE(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.PRO_PM_WORKORDER_SBGZ_CREATE(V_V_PERCODE, V_V_PERNAME,V_V_GUID);

        List<Map<String, Object>> no4120list = (List) data.get("list");

        result.put("list", no4120list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/MM_USER_TRENDS_INS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> MM_USER_TRENDS_INS(@RequestParam(value = "V_V_USERID") String V_V_USERID,
                                               @RequestParam(value = "V_V_ACTIVE") String V_V_ACTIVE,
                                               @RequestParam(value = "V_V_REMARK") String V_V_REMARK,
                                               @RequestParam(value = "V_V_ACT_TYPE") String V_V_ACT_TYPE,
                                               @RequestParam(value = "V_V_IP") String V_V_IP,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.MM_USER_TRENDS_INS(V_V_USERID, V_V_ACTIVE, V_V_REMARK, V_V_ACT_TYPE, V_V_IP);

        String ss = (String) data.get("RET");

        result.put("RET", ss);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/MM_USER_TRENDS_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> MM_USER_TRENDS_SEL(@RequestParam(value = "V_V_USERID") String V_V_USERID,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.MM_USER_TRENDS_SEL(V_V_USERID);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_NEW_MENU_BYNAME_SEL", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_BASE_NEW_MENU_BYNAME_SEL(
            @RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
            @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_HOME_MENU") String V_V_HOME_MENU,
            @RequestParam(value = "V_V_MENUNAME") String V_V_MENUNAME)
            throws SQLException {
        List<Map> result = cService.PRO_BASE_NEW_MENU_BYNAME_SELTree(IS_V_ROLECODE, IS_V_SYSTYPE,V_V_DEPTCODE, V_V_HOME_MENU,V_V_MENUNAME);
        return result;
    }
    @RequestMapping(value = "/MM_USER_TRENDS_BYNAME_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> MM_USER_TRENDS_BYNAME_SEL(@RequestParam(value = "V_V_USERID") String V_V_USERID,
                                                  @RequestParam(value = "V_V_MENUNAME") String V_V_MENUNAME,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.MM_USER_TRENDS_BYNAME_SEL(V_V_USERID,V_V_MENUNAME);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/MM_USER_TRENDS_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> MM_USER_TRENDS_DEL(@RequestParam(value = "V_I_ID") String V_I_ID,

                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.MM_USER_TRENDS_DEL(V_I_ID);

        String ss = (String) data.get("RET");

        result.put("RET", ss);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_FAULT_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_FAULT_SAVE(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                         @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                         @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                         @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                         @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                         @RequestParam(value = "V_V_DEPTCODEREPAIR") String V_V_DEPTCODEREPAIR,
                                                         @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                         @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                         @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                         @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                         @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                         @RequestParam(value = "V_V_TECHNOLOGY") String V_V_TECHNOLOGY,
                                                         @RequestParam(value = "V_V_SAFE") String V_V_SAFE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.PRO_PM_WORKORDER_FAULT_SAVE(V_V_PERCODE,V_V_PERNAME,V_V_GUID,V_V_ORDERGUID,V_V_SHORT_TXT,
                V_V_DEPTCODEREPAIR,V_D_START_DATE,V_D_FINISH_DATE,V_V_WBS,V_V_WBS_TXT,V_V_TOOL,V_V_TECHNOLOGY,V_V_SAFE);

        String list =  data.get("list").toString();

        result.put("list", list);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_UP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_UP(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                        @RequestParam(value = "V_V_IP") String V_V_IP,
                                                        @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.PM_14_FAULT_ITEM_DATA_UP(V_V_PERCODE,V_V_IP,V_V_GUID);

        String ss = (String) data.get("RET");

        result.put("RET", ss);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/MM_USER_TRENDS_TABLE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> MM_USER_TRENDS_TABLE_SEL(@RequestParam(value = "V_V_USERID") String V_V_USERID,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cService.MM_USER_TRENDS_TABLE_SEL(V_V_USERID);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }
}

