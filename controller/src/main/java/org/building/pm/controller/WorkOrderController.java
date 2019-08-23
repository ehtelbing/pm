package org.building.pm.controller;

import org.building.pm.service.WorkOrderService;
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
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/WorkOrder")
public class WorkOrderController {

    @Autowired
    private WorkOrderService workOrderService;

    @RequestMapping(value = "/PM_WORKORDER_TYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_WORKORDER_TYPE_SEL(@RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = workOrderService.PM_WORKORDER_TYPE_SEL(V_V_SOURCECODE);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_DEFECT_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DEFECT_SAVE(@RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                            @RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
                                                            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                            @RequestParam(value = "V_V_WORKORDER_TYPE") String V_V_WORKORDER_TYPE,
                                                            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                            @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                            @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                            @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                            @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = workOrderService.PRO_PM_WORKORDER_DEFECT_SAVE(V_V_PERNAME, V_V_DEFECT_GUID, V_V_ORDERGUID, V_V_EQUCODE,
                V_V_WORKORDER_TYPE,V_V_DEPTCODEREPARIR,V_V_SHORT_TXT,V_V_WBS,V_V_WBS_TXT,V_D_START_DATE,V_D_FINISH_DATE);

        String ret = (String) data.get("V_INFO");

        result.put("RET", ret);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_DEFECT_SA_XJ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DEFECT_SA_XJ(@RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                            @RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
                                                            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                            @RequestParam(value = "V_V_WORKORDER_TYPE") String V_V_WORKORDER_TYPE,
                                                            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                            @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                            @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                            @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                            @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = workOrderService.PRO_PM_WORKORDER_DEFECT_SA_XJ(V_V_PERNAME, V_V_DEFECT_GUID, V_V_ORDERGUID, V_V_EQUCODE,
                V_V_WORKORDER_TYPE,V_V_DEPTCODEREPARIR,V_V_SHORT_TXT,V_V_WBS,V_V_WBS_TXT,V_D_START_DATE,V_D_FINISH_DATE);

        String ret = (String) data.get("V_INFO");

        result.put("RET", ret);
        result.put("success", true);
        return result;
    }
    @RequestMapping(value = "/PRO_GET_DEPTEQUTYPE_ADMIN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_GET_DEPTEQUTYPE_ADMIN(@RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_GET_DEPTEQUTYPE_ADMIN(V_V_DEPTCODENEXT);
        return result;
    }
    @RequestMapping(value = "/PM_WORKORDER_FLOW_PER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_WORKORDER_FLOW_PER_SEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                         @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                         @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        HashMap data = workOrderService.PM_WORKORDER_FLOW_PER_SEL(V_V_DEPTCODE, V_V_DEPTCODEREPARIR,V_V_GUID, V_V_FLOWTYPE);

        return data;
    }
    @RequestMapping(value = "/PRO_WO_FLOW_DB_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WO_FLOW_DB_INSERT(@RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                     @RequestParam(value = "V_V_FLOWSTEP") String V_V_FLOWSTEP,
                                                     @RequestParam(value = "V_V_STATUS") String V_V_STATUS,
                                                     @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                     @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                                     @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
                                                     @RequestParam(value = "V_V_FLOWNAME") String V_V_FLOWNAME,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = workOrderService.PRO_WO_FLOW_DB_INSERT(V_V_ORDERID, V_V_FLOWSTEP, V_V_STATUS, V_V_PERCODE, V_V_FLOWTYPE, V_V_FLOWCODE, V_V_FLOWNAME);
        String ret = (String) data.get("V_INFO");
        result.put("RET", ret);
        return result;
    }
    @RequestMapping(value = "/PRO_GET_DEPTEQU_ADMIN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_GET_DEPTEQU_ADMIN(@RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                     @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_GET_DEPTEQU_ADMIN(V_V_DEPTCODENEXT,V_V_EQUTYPECODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_PERSON_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_PERSON_VIEW_ROLE(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                        @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                        @RequestParam(value = "V_V_ROLE") String V_V_ROLE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_BASE_PERSON_VIEW_ROLE(V_V_DEPTCODE, V_V_PERSONCODE,V_V_ROLE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_STATE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_STATE_VIEW(HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_STATE_VIEW();
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKTYPCOUNT_ADMIN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKTYPCOUNT_ADMIN(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
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
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKTYPCOUNT_ADMIN(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_DEPTCODEREPARIR, V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT, V_V_BJ_TXT);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_SELECT_ADMIN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_SELECT_ADMIN(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
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
                                                         @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                         @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = workOrderService.PRO_PM_WORKORDER_SELECT_ADMIN(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_DEPTCODEREPARIR, V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT, V_V_BJ_TXT,V_V_ORDER_TYP,V_V_PAGE,V_V_PAGESIZE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_LIST_VIEW2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_LIST_VIEW2(@RequestParam(value = "V_V_ENTERED_BY") String V_V_ENTERED_BY,
                                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                           @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                           @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                            HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_LIST_VIEW2(V_V_ENTERED_BY,V_V_ORGCODE,V_V_DEPTCODE,V_V_DEPTCODEREPARIR,V_V_STATECODE,V_V_SHORT_TXT);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7111_EQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7111_EQULIST(@RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_RUN7111_EQULIST(V_V_PLANTCODE,V_V_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_CHANGE_LOG_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_CHANGE_LOG_ALL(@RequestParam(value = "A_BJ_UNIQUE_CODE") String A_BJ_UNIQUE_CODE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_RUN_BJ_CHANGE_LOG_ALL(A_BJ_UNIQUE_CODE);
        return result;
    }
    @RequestMapping(value = "/pro_run7113_ordermatlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7113_ordermatlist(@RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
                                                   @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
                                                   @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                                   @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.pro_run7113_ordermatlist(V_DEPT_CODE, V_EQUIP_CODE,V_MATERIALCODE,V_MATERIALNAME);
        return result;
    }
    @RequestMapping(value = "/pro_run7110_sitesupplylist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7110_sitesupplylist(@RequestParam(value = "a_id") String a_id,
                                                        @RequestParam(value = "a_materialcode") String a_materialcode,
                                                        @RequestParam(value = "a_orderid") String a_orderid,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.pro_run7110_sitesupplylist(a_id, a_materialcode,a_orderid);
        return result;
    }
    @RequestMapping(value = "/pro_run7113_changecancel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7113_changecancel(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                          @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                          @RequestParam(value = "V_EQUIP_NO") String V_EQUIP_NO,
                                                          @RequestParam(value = "V_USERID") String V_USERID,
                                                          @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                          @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                          @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                          @RequestParam(value = "V_CHANGETIME") String V_CHANGETIME,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.pro_run7113_changecancel(V_I_ID, V_SITE_ID, V_EQUIP_NO,V_USERID,V_USERNAME,V_PLANTCODE,V_DEPARTCODE,V_CHANGETIME);
        return result;
    }
    @RequestMapping(value = "/pg_run7113_getordermatbarcode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pg_run7113_getordermatbarcode(@RequestParam(value = "a_orderid") String a_orderid,
                                                        @RequestParam(value = "a_materialcode") String a_materialcode,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.pg_run7113_getordermatbarcode(a_orderid, a_materialcode);
        return result;
    }
    @RequestMapping(value = "/pro_run7113_changeordermat", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7113_changeordermat(@RequestParam(value = "A_ID") String A_ID,
                                                             @RequestParam(value = "SITE_ID") String SITE_ID,
                                                             @RequestParam(value = "a_change_amount") String a_change_amount,
                                                             @RequestParam(value = "V_EQUIP_NO") String V_EQUIP_NO,
                                                             @RequestParam(value = "USERID") String USERID,
                                                             @RequestParam(value = "USERNAME") String USERNAME,
                                                             @RequestParam(value = "PLANTCODE") String PLANTCODE,
                                                             @RequestParam(value = "WORKAREA") String WORKAREA,
                                                             @RequestParam(value = "CHANGEDATE") String CHANGEDATE,
                                                             @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                                             @RequestParam(value = "a_supplycode") String a_supplycode,
                                                             @RequestParam(value = "a_supplyname") String a_supplyname,
                                                             @RequestParam(value = "a_uniquecode") String a_uniquecode,
                                                             @RequestParam(value = "a_replacedate") String a_replacedate,
                                                             @RequestParam(value = "a_faultreason") String a_faultreason,
                                                             @RequestParam(value = "A_REASON_REMARK") String A_REASON_REMARK,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.pro_run7113_changeordermat(A_ID, SITE_ID,a_change_amount,V_EQUIP_NO,USERID,USERNAME,PLANTCODE,
                WORKAREA,CHANGEDATE,V_MATERIALCODE,a_supplycode,a_supplyname,a_uniquecode,a_replacedate,a_faultreason,A_REASON_REMARK);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_ET_DEFAULE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_ET_DEFAULE(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_ET_DEFAULE(V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_GET(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_GET(V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_EDIT(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                     @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                     @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                     @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                     @RequestParam(value = "V_V_FUNC_LOC") String V_V_FUNC_LOC,
                                                     @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                                                     @RequestParam(value = "V_V_EQUIP_NAME") String V_V_EQUIP_NAME,
                                                     @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                                                     @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                                                     @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                     @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                     @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                     @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                     @RequestParam(value = "V_V_TECHNOLOGY") String V_V_TECHNOLOGY,
                                                     @RequestParam(value = "V_V_SAFE") String V_V_SAFE,
                                                     @RequestParam(value = "V_D_DATE_ACP") String V_D_DATE_ACP,
                                                     @RequestParam(value = "V_I_OTHERHOUR") String V_I_OTHERHOUR,
                                                     @RequestParam(value = "V_V_OTHERREASON") String V_V_OTHERREASON,
                                                     @RequestParam(value = "V_V_REPAIRCONTENT") String V_V_REPAIRCONTENT,
                                                     @RequestParam(value = "V_V_REPAIRSIGN") String V_V_REPAIRSIGN,
                                                     @RequestParam(value = "V_V_REPAIRPERSON") String V_V_REPAIRPERSON,
                                                     @RequestParam(value = "V_V_POSTMANSIGN") String V_V_POSTMANSIGN,
                                                     @RequestParam(value = "V_V_CHECKMANCONTENT") String V_V_CHECKMANCONTENT,
                                                     @RequestParam(value = "V_V_CHECKMANSIGN") String V_V_CHECKMANSIGN,
                                                     @RequestParam(value = "V_V_WORKSHOPCONTENT") String V_V_WORKSHOPCONTENT,
                                                     @RequestParam(value = "V_V_WORKSHOPSIGN") String V_V_WORKSHOPSIGN,
                                                     @RequestParam(value = "V_V_DEPTSIGN") String V_V_DEPTSIGN,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_EDIT(V_V_PERCODE,V_V_PERNAME,V_V_ORDERGUID,V_V_SHORT_TXT,
                 V_V_FUNC_LOC, V_V_EQUIP_NO, V_V_EQUIP_NAME, V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_WBS, V_V_WBS_TXT,
               V_V_DEPTCODEREPARIR, V_V_TOOL, V_V_TECHNOLOGY, V_V_SAFE, V_D_DATE_ACP, V_I_OTHERHOUR, V_V_OTHERREASON, V_V_REPAIRCONTENT,
               V_V_REPAIRSIGN, V_V_REPAIRPERSON, V_V_POSTMANSIGN, V_V_CHECKMANCONTENT, V_V_CHECKMANSIGN, V_V_WORKSHOPCONTENT, V_V_WORKSHOPSIGN, V_V_DEPTSIGN);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_YS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_YS(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                   @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                   @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                   @RequestParam(value = "V_V_POSTMANSIGN") String V_V_POSTMANSIGN,
                                                   @RequestParam(value = "V_V_CHECKMANCONTENT") String V_V_CHECKMANCONTENT,
                                                   @RequestParam(value = "V_V_CHECKMANSIGN") String V_V_CHECKMANSIGN,
                                                   @RequestParam(value = "V_V_WORKSHOPCONTENT") String V_V_WORKSHOPCONTENT,
                                                   @RequestParam(value = "V_V_WORKSHOPSIGN") String V_V_WORKSHOPSIGN,
                                                   @RequestParam(value = "V_V_DEPTSIGN") String V_V_DEPTSIGN,
                                                   @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_YS(V_V_PERCODE,V_V_PERNAME,V_V_ORDERGUID,V_V_POSTMANSIGN,V_V_CHECKMANCONTENT,V_V_CHECKMANSIGN,V_V_WORKSHOPCONTENT,V_V_WORKSHOPSIGN,V_V_DEPTSIGN,V_V_EQUIP_NO);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_MOD_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_MOD_CREATE(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                   @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                   @RequestParam(value = "V_V_PERSONNAME") String V_V_PERSONNAME,
                                                   @RequestParam(value = "V_V_MOD_NAME") String V_V_MOD_NAME,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_MOD_CREATE(V_V_ORDERGUID, V_V_PERSONCODE, V_V_PERSONNAME, V_V_MOD_NAME);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_MODEL_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_MODEL_CREATE(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                           @RequestParam(value = "V_V_PERSONNAME") String V_V_PERSONNAME,
                                                           @RequestParam(value = "V_V_MOD_NAME") String V_V_MOD_NAME,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_MODEL_CREATE(V_V_ORDERGUID, V_V_PERSONCODE, V_V_PERSONNAME, V_V_MOD_NAME);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_FK", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_FK(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                           @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                                                           @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                                                           @RequestParam(value = "V_I_OTHERHOUR") String V_I_OTHERHOUR,
                                                           @RequestParam(value = "V_V_OTHERREASON") String V_V_OTHERREASON,
                                                           @RequestParam(value = "V_V_REPAIRCONTENT") String V_V_REPAIRCONTENT,
                                                           @RequestParam(value = "V_V_REPAIRSIGN") String V_V_REPAIRSIGN,
                                                           @RequestParam(value = "V_V_REPAIRPERSON") String V_V_REPAIRPERSON,
                                                           @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_FK(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_D_FACT_START_DATE,V_D_FACT_FINISH_DATE,
                V_I_OTHERHOUR,V_V_OTHERREASON,V_V_REPAIRCONTENT,V_V_REPAIRSIGN,V_V_REPAIRPERSON,V_V_TOOL);
        return result;
    }


    @RequestMapping(value = "/PRO_PM_WORKORDER_DY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DY(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                   @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                   @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                   @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                                                   @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                                                   @RequestParam(value = "V_I_OTHERHOUR") String V_I_OTHERHOUR,
                                                   @RequestParam(value = "V_V_OTHERREASON") String V_V_OTHERREASON,
                                                   @RequestParam(value = "V_V_REPAIRCONTENT") String V_V_REPAIRCONTENT,
                                                   @RequestParam(value = "V_V_REPAIRSIGN") String V_V_REPAIRSIGN,
                                                   @RequestParam(value = "V_V_REPAIRPERSON") String V_V_REPAIRPERSON,
                                                   @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_DY(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_D_FACT_START_DATE,V_D_FACT_FINISH_DATE,
                V_I_OTHERHOUR,V_V_OTHERREASON,V_V_REPAIRCONTENT,V_V_REPAIRSIGN,V_V_REPAIRPERSON,V_V_TOOL);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_JS_N", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_JS_N(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                   @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                   @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                   @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                                                   @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                                                   @RequestParam(value = "V_I_OTHERHOUR") String V_I_OTHERHOUR,
                                                   @RequestParam(value = "V_V_OTHERREASON") String V_V_OTHERREASON,
                                                   @RequestParam(value = "V_V_REPAIRCONTENT") String V_V_REPAIRCONTENT,
                                                   @RequestParam(value = "V_V_REPAIRSIGN") String V_V_REPAIRSIGN,
                                                   @RequestParam(value = "V_V_REPAIRPERSON") String V_V_REPAIRPERSON,
                                                   @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_JS_N(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_D_FACT_START_DATE,V_D_FACT_FINISH_DATE,
                V_I_OTHERHOUR,V_V_OTHERREASON,V_V_REPAIRCONTENT,V_V_REPAIRSIGN,V_V_REPAIRPERSON,V_V_TOOL);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_JS_F", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_JS_F(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                     @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                     @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                     @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                                                     @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                                                     @RequestParam(value = "V_I_OTHERHOUR") String V_I_OTHERHOUR,
                                                     @RequestParam(value = "V_V_OTHERREASON") String V_V_OTHERREASON,
                                                     @RequestParam(value = "V_V_REPAIRCONTENT") String V_V_REPAIRCONTENT,
                                                     @RequestParam(value = "V_V_REPAIRSIGN") String V_V_REPAIRSIGN,
                                                     @RequestParam(value = "V_V_REPAIRPERSON") String V_V_REPAIRPERSON,
                                                     @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_JS_F(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_D_FACT_START_DATE,V_D_FACT_FINISH_DATE,
                V_I_OTHERHOUR,V_V_OTHERREASON,V_V_REPAIRCONTENT,V_V_REPAIRSIGN,V_V_REPAIRPERSON,V_V_TOOL);
        return result;
    }


    @RequestMapping(value = "/PRO_PM_WORKORDER_DYJS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DYJS(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                   @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                   @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                   @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                                                   @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                                                   @RequestParam(value = "V_I_OTHERHOUR") String V_I_OTHERHOUR,
                                                   @RequestParam(value = "V_V_OTHERREASON") String V_V_OTHERREASON,
                                                   @RequestParam(value = "V_V_REPAIRCONTENT") String V_V_REPAIRCONTENT,
                                                   @RequestParam(value = "V_V_REPAIRSIGN") String V_V_REPAIRSIGN,
                                                   @RequestParam(value = "V_V_REPAIRPERSON") String V_V_REPAIRPERSON,
                                                   @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_DYJS(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_D_FACT_START_DATE,V_D_FACT_FINISH_DATE,
                V_I_OTHERHOUR,V_V_OTHERREASON,V_V_REPAIRCONTENT,V_V_REPAIRSIGN,V_V_REPAIRPERSON,V_V_TOOL);
        return result;
    }



    @RequestMapping(value = "/PRO_PM_WORKORDER_HOURS_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_HOURS_VIEW(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_HOURS_VIEW(V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_ORDER_PERSON_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List PRO_ORDER_PERSON_TREE(@RequestParam(value = "IN_ORDER_ID") String IN_ORDER_ID,
                                      @RequestParam(value = "IN_WORK_ID") String IN_WORK_ID,
                                      @RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        List list = workOrderService.PRO_ORDER_PERSON_TREE(IN_ORDER_ID,IN_WORK_ID,IN_DEPARTCODE);
        return list;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_HOURS_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_HOURS_SET(@RequestParam(value = "V_I_ID") String V_I_ID,
                                      @RequestParam(value = "V_ORDERGUID") String V_ORDERGUID,
                                      @RequestParam(value = "V_V_PERSONTYPECODE") String V_V_PERSONTYPECODE,
                                      @RequestParam(value = "V_V_PERSONTYPENAME") String V_V_PERSONTYPENAME,
                                      @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                      @RequestParam(value = "V_V_PERSONNAME") String V_V_PERSONNAME,
                                      @RequestParam(value = "V_I_WORKHOUR") String V_I_WORKHOUR,
                                      @RequestParam(value = "V_V_ACTIVITY") String V_V_ACTIVITY,
                                      @RequestParam(value = "V_D_BEGINTIME") String V_D_BEGINTIME,
                                      @RequestParam(value = "V_D_ENDTIME") String V_D_ENDTIME,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map<String, Object> result = workOrderService.PRO_PM_WORKORDER_HOURS_SET(V_I_ID, V_ORDERGUID, V_V_PERSONTYPECODE,
                V_V_PERSONTYPENAME,V_V_PERSONCODE,V_V_PERSONNAME,V_I_WORKHOUR,V_V_ACTIVITY,V_D_BEGINTIME,V_D_ENDTIME);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_HOURS_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_HOURS_DEL(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = workOrderService.PRO_PM_WORKORDER_HOURS_DEL(V_I_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_HOURS_RETURN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_HOURS_RETURN(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = workOrderService.PRO_PM_WORKORDER_HOURS_RETURN(V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_TOOLLVEHICLE_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List PRO_TOOLLVEHICLE_TREE(@RequestParam(value = "V_TYPE") String V_TYPE,
                                      @RequestParam(value = "V_NAME") String V_NAME,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        List list = workOrderService.PRO_TOOLLVEHICLE_TREE(V_TYPE,V_NAME);
        return list;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_TOOL_CY", method = RequestMethod.POST)
    @ResponseBody
    public List PRO_PM_WORKORDER_TOOL_CY(@RequestParam(value = "V_PERCODE") String V_PERCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        List list = workOrderService.PRO_PM_WORKORDER_TOOL_CY(V_PERCODE);
        return list;
    }
    @RequestMapping(value = "/PRO_CL_DIC_CAR_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CL_DIC_CAR_VIEW(@RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = workOrderService.PRO_CL_DIC_CAR_VIEW(V_V_FLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_CL_WORKORDER_DATA_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CL_WORKORDER_DATA_DROP(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                          @RequestParam(value = "V_V_CLOUMSNAME") String V_V_CLOUMSNAME,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = workOrderService.PRO_CL_WORKORDER_DATA_DROP(V_V_PERCODE,V_V_CLOUMSNAME);
        return result;
    }
    @RequestMapping(value = "/PRO_CL_WORKORDER_DATA_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CL_WORKORDER_DATA_VIEW(@RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = workOrderService.PRO_CL_WORKORDER_DATA_VIEW(V_V_ORDERID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_TOOL_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_TOOL_VIEW(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = workOrderService.PRO_PM_WORKORDER_TOOL_VIEW(V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_CL_WORKORDER_DATA_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CL_WORKORDER_DATA_GET(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = workOrderService.PRO_CL_WORKORDER_DATA_GET(V_I_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_CL_WORKORDER_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CL_WORKORDER_DATA_SET(@RequestParam(value = "V_V_IP") String V_V_IP,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
                                                           @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
                                                           @RequestParam(value = "V_D_DATETIME_WITE") String V_D_DATETIME_WITE,
                                                           @RequestParam(value = "V_V_DD_WITE") String V_V_DD_WITE,
                                                           @RequestParam(value = "V_V_WP_WITE") String V_V_WP_WITE,
                                                           @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                           @RequestParam(value = "V_V_LXRDH") String V_V_LXRDH,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_CL_WORKORDER_DATA_SET(V_V_IP, V_V_PERCODE, V_V_ORDERID, V_V_CARCODE, V_D_DATETIME_WITE, V_V_DD_WITE, V_V_WP_WITE, V_V_MEMO, V_V_LXRDH);
        return result;
    }
    @RequestMapping(value = "/PRO_CL_WORKORDER_DATA_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CL_WORKORDER_DATA_EDIT(@RequestParam(value = "V_V_IP") String V_V_IP,
                                                         @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                         @RequestParam(value = "V_I_ID") String V_I_ID,
                                                         @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
                                                         @RequestParam(value = "V_D_DATETIME_WITE") String V_D_DATETIME_WITE,
                                                         @RequestParam(value = "V_V_DD_WITE") String V_V_DD_WITE,
                                                         @RequestParam(value = "V_V_WP_WITE") String V_V_WP_WITE,
                                                         @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                         @RequestParam(value = "V_V_LXRDH") String V_V_LXRDH,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_CL_WORKORDER_DATA_EDIT(V_V_IP, V_V_PERCODE, V_I_ID, V_V_CARCODE, V_D_DATETIME_WITE, V_V_DD_WITE, V_V_WP_WITE, V_V_MEMO, V_V_LXRDH);
        return result;
    }
    @RequestMapping(value = "/PRO_CL_WORKORDER_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CL_WORKORDER_DATA_DEL(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_CL_WORKORDER_DATA_DEL(V_I_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_TOOL_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_TOOL_DEL(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_TOOL_DEL(V_I_ID);
        return result;
    }
    //确定
    @RequestMapping(value = "/PRO_PM_WORKORDER_TOOL_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_TOOL_SET(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                        @RequestParam(value = "V_ORDERGUID") String V_ORDERGUID,
                                                        @RequestParam(value = "V_V_TOOLCODE") String V_V_TOOLCODE,
                                                        @RequestParam(value = "V_V_TOOLNAME") String V_V_TOOLNAME,
                                                        @RequestParam(value = "V_V_USEMAN") String V_V_USEMAN,
                                                        @RequestParam(value = "V_D_USETIME") String V_D_USETIME,
                                                        @RequestParam(value = "V_I_HOUR") String V_I_HOUR,
                                                        @RequestParam(value = "V_I_NUMBER") String V_I_NUMBER,
                                                        @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                        @RequestParam(value = "V_V_RETURNMAN") String V_V_RETURNMAN,
                                                        @RequestParam(value = "V_D_RETURNTIME") String V_D_RETURNTIME,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_TOOL_SET(V_I_ID, V_ORDERGUID, V_V_TOOLCODE, V_V_TOOLNAME, V_V_USEMAN, V_D_USETIME, V_I_HOUR, V_I_NUMBER, V_V_MEMO, V_V_RETURNMAN, V_D_RETURNTIME);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_TOOL_RETSTR", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_TOOL_RETSTR(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_TOOL_RETSTR(V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_CL_WORKORDER_DATA_FKSAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_CL_WORKORDER_DATA_FKSAVE(@RequestParam(value = "V_V_IP") String V_V_IP,
                                                            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                            @RequestParam(value = "V_I_ID") String V_I_ID,
                                                            @RequestParam(value = "V_D_DATE_CF") String V_D_DATE_CF,
                                                            @RequestParam(value = "V_D_DD_CF") String V_D_DD_CF,
                                                            @RequestParam(value = "V_D_DATE_LK") String V_D_DATE_LK,
                                                            @RequestParam(value = "V_D_DATE_NEXT_MDD") String V_D_DATE_NEXT_MDD,
                                                            @RequestParam(value = "V_V_PERCODE_SJ") String V_V_PERCODE_SJ,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_CL_WORKORDER_DATA_FKSAVE(V_V_IP,V_V_PERCODE,V_I_ID,V_D_DATE_CF,V_D_DD_CF,V_D_DATE_LK,V_D_DATE_NEXT_MDD,V_V_PERCODE_SJ);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_FK_JIP_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_FK_JIP_VIEW(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_FK_JIP_VIEW(V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_FK_JIP_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_FK_JIP_SET(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           @RequestParam(value = "V_I_SPAREID") Integer V_I_SPAREID,
                                                           @RequestParam(value = "V_I_NUMBER_JIP") Integer V_I_NUMBER_JIP,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_FK_JIP_SET(V_V_ORDERGUID,V_I_SPAREID,V_I_NUMBER_JIP);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_LIST_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_LIST_VIEW(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                           @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                           @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_LIST_VIEW(V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR,V_V_STATECODE,V_V_SHORT_TXT);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_SP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_SP(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                          @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                          @RequestParam(value = "V_V_STEPNAME") String V_V_STEPNAME,
                                                          @RequestParam(value = "V_V_MEMO") String V_V_MEMO,
                                                          @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_SP(V_V_PERSONCODE, V_V_ORDERGUID, V_V_STEPNAME, V_V_MEMO, V_V_STATECODE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_YS_BACK", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_YS_BACK(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                   @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                   @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_YS_BACK(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_DEFECT_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DEFECT_CREATE(@RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                        @RequestParam(value = "V_DEFECT_GUID") String V_DEFECT_GUID,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_DEFECT_CREATE(V_V_PERNAME, V_DEFECT_GUID);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_EDIT_XD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_EDIT_XD(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                        @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                        @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                        @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                        @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                        @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                        @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                        @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                        @RequestParam(value = "V_V_TECHNOLOGY") String V_V_TECHNOLOGY,
                                                        @RequestParam(value = "V_V_SAFE") String V_V_SAFE,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_EDIT_XD(V_V_PERCODE,V_V_PERNAME,V_V_ORDERGUID,V_V_SHORT_TXT,V_D_START_DATE,V_D_FINISH_DATE,V_V_DEPTCODEREPARIR,V_V_TOOL,V_V_TECHNOLOGY,V_V_SAFE);
        return result;
    }
    @RequestMapping(value = "/PRO_GET_SAP_PM_EQU_P", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_GET_SAP_PM_EQU_P(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_GET_SAP_PM_EQU_P(V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PM_14_FAULT_MODEL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_MODEL_SEL(@RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PM_14_FAULT_MODEL_SEL(V_V_EQUTYPECODE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_LIST_PRINT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_LIST_PRINT(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                           @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                           @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
                                                           @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_LIST_PRINT(V_V_ORGCODE,V_V_DEPTCODE,V_V_DEPTCODEREPARIR,V_V_STATECODE,V_DJ_PERCODE,V_V_SHORT_TXT);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_JS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_JS(@RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                           @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_JS(V_V_PERNAME, V_V_ORDERGUID);
        return result;
    }
    @RequestMapping(value = "/PRO_BASE_DEPT_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List PRO_BASE_DEPT_TREE(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        List list = workOrderService.PRO_BASE_DEPT_TREE(V_V_DEPTCODE);
        return list;
    }
    @RequestMapping(value = "/PRO_GET_DEPTEQUTYPE_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_GET_DEPTEQUTYPE_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map map = workOrderService.PRO_GET_DEPTEQUTYPE_PER(V_V_PERSONCODE,V_V_DEPTCODENEXT);
        return map;
    }
    @RequestMapping(value = "/PRO_SAP_EQU_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_VIEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                       @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                       @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                       @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map map = workOrderService.PRO_SAP_EQU_VIEW(V_V_PERSONCODE, V_V_DEPTCODE,V_V_DEPTNEXTCODE,V_V_EQUTYPECODE,V_V_EQUCODE);
        return map;
    }
    @RequestMapping(value = "/PRO_PM_07_DEPTEQU_PER_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_VIEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        Map map = workOrderService.PRO_PM_07_DEPTEQU_PER_DROP(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        return map;
    }
    @RequestMapping(value = "/PRO_PM_WORKORDER_ET_SETWORK", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_ET_SETWORK(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                           @RequestParam(value = "V_NAME") String V_NAME,
                                                           @RequestParam(value = "V_VALUE") Integer V_VALUE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_ET_SETWORK(V_I_ID, V_NAME, V_VALUE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_LISHI", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_LISHI(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        HashMap data = workOrderService.PRO_PM_WORKORDER_LISHI(V_V_ORDERGUID);

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_CHILD_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_CHILD_SEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = workOrderService.PRO_PM_WORKORDER_CHILD_SEL(V_V_ORDERGUID);
        return result;
    }

    @RequestMapping(value = "/PM_WORKREPAIRPER_HISTORY_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_WORKREPAIRPER_HISTORY_SET(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                            @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                                            @RequestParam(value = "V_V_ROLECODE") String V_V_ROLECODE,
                                                            @RequestParam(value = "V_V_ROLENAME") String V_V_ROLENAME,
                                                            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                            @RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = workOrderService.PM_WORKREPAIRPER_HISTORY_SET(V_V_DEPTCODE, V_V_DEPTNAME, V_V_ROLECODE, V_V_ROLENAME,V_V_PERCODE,
                V_V_PERNAME,V_V_INPER);
        return result;
    }
    //工单驳回修改-99
    @RequestMapping(value = "/PRO_PM_WORKORDER_BH_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_BH_EDIT(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                     @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                     @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                     @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                     @RequestParam(value = "V_V_FUNC_LOC") String V_V_FUNC_LOC,
                                                     @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                                                     @RequestParam(value = "V_V_EQUIP_NAME") String V_V_EQUIP_NAME,
                                                     @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                     @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                        @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
                                                        @RequestParam(value = "V_V_ORDER_TYP_TXT") String V_V_ORDER_TYP_TXT,
                                                     @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                     @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                     @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                     @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                     @RequestParam(value = "V_V_TECHNOLOGY") String V_V_TECHNOLOGY,
                                                     @RequestParam(value = "V_V_SAFE") String V_V_SAFE,
                                                     @RequestParam(value = "V_D_DATE_ACP") String V_D_DATE_ACP,
                                                     @RequestParam(value = "V_I_OTHERHOUR") String V_I_OTHERHOUR,
                                                     @RequestParam(value = "V_V_OTHERREASON") String V_V_OTHERREASON,
                                                     @RequestParam(value = "V_V_REPAIRCONTENT") String V_V_REPAIRCONTENT,
                                                     @RequestParam(value = "V_V_REPAIRSIGN") String V_V_REPAIRSIGN,
                                                     @RequestParam(value = "V_V_REPAIRPERSON") String V_V_REPAIRPERSON,
                                                     @RequestParam(value = "V_V_POSTMANSIGN") String V_V_POSTMANSIGN,
                                                     @RequestParam(value = "V_V_CHECKMANCONTENT") String V_V_CHECKMANCONTENT,
                                                     @RequestParam(value = "V_V_CHECKMANSIGN") String V_V_CHECKMANSIGN,
                                                     @RequestParam(value = "V_V_WORKSHOPCONTENT") String V_V_WORKSHOPCONTENT,
                                                     @RequestParam(value = "V_V_WORKSHOPSIGN") String V_V_WORKSHOPSIGN,
                                                     @RequestParam(value = "V_V_DEPTSIGN") String V_V_DEPTSIGN,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKORDER_BH_EDIT(V_V_PERCODE,V_V_PERNAME,V_V_ORDERGUID,V_V_SHORT_TXT,
                V_V_FUNC_LOC, V_V_EQUIP_NO, V_V_EQUIP_NAME, V_D_START_DATE, V_D_FINISH_DATE,V_V_ORDER_TYP,V_V_ORDER_TYP_TXT, V_V_WBS, V_V_WBS_TXT,
                V_V_DEPTCODEREPARIR, V_V_TOOL, V_V_TECHNOLOGY, V_V_SAFE, V_D_DATE_ACP, V_I_OTHERHOUR, V_V_OTHERREASON, V_V_REPAIRCONTENT,
                V_V_REPAIRSIGN, V_V_REPAIRPERSON, V_V_POSTMANSIGN, V_V_CHECKMANCONTENT, V_V_CHECKMANSIGN, V_V_WORKSHOPCONTENT, V_V_WORKSHOPSIGN, V_V_DEPTSIGN);
        return result;
    }
    /**
     * 周计划生成工单保存
     */
    @RequestMapping(value = "/PRO_PM_WORK_FWEEK_DEFECT_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORK_FWEEK_DEFECT_SAVE(@RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                            @RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
                                                            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                            @RequestParam(value = "V_V_WORKORDER_TYPE") String V_V_WORKORDER_TYPE,
                                                            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                            @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                            @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                            @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                            @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = workOrderService.PRO_PM_WORK_FWEEK_DEFECT_SAVE(V_V_PERNAME, V_V_DEFECT_GUID, V_V_ORDERGUID, V_V_EQUCODE,
                V_V_WORKORDER_TYPE,V_V_DEPTCODEREPARIR,V_V_SHORT_TXT,V_V_WBS,V_V_WBS_TXT,V_D_START_DATE,V_D_FINISH_DATE);

        String ret = (String) data.get("V_INFO");

        result.put("RET", ret);
        result.put("success", true);
        return result;
    }
    /**
     * 缺陷guid查找工单guid create by hrb 2019/6/24
     */
    @RequestMapping(value = "/PRO_WORKDET_BY_DEFEECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_WORKDET_BY_DEFEECT(@RequestParam(value = "DEFGUID") String DEFGUID,

                                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = workOrderService.PRO_WORKDET_BY_DEFEECT(DEFGUID);
        return result;
    }
    /**
     * 工单查找 new
     */
    @RequestMapping(value = "/PRO_PM_WORKORDER_SELECT_N", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_SELECT_N(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
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
                                                             @RequestParam(value="V_V_WORKID") String V_V_WORKID,
                                                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = workOrderService.PRO_PM_WORKORDER_SELECT_N(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_DEPTCODEREPARIR, V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT, V_V_BJ_TXT,V_V_ORDER_TYP,V_V_WORKID,V_V_PAGE,V_V_PAGESIZE);
        return result;
    }
    @RequestMapping(value = "/PRO_PM_WORKTYPCOUNT_N", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKTYPCOUNT_N(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
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
                                                         @RequestParam(value="V_V_WORKID") String V_V_WORKID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        HashMap result = workOrderService.PRO_PM_WORKTYPCOUNT_N(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_DEPTCODEREPARIR, V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT, V_V_BJ_TXT,V_V_WORKID);
        return result;
    }
}
