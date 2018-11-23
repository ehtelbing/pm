package org.building.pm.controller;

/**
 * Created by lxm on 2017/10/31.
 */

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.MwdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/mwd")
public class MwdController {
    @Autowired
    private MwdService mwdService;

    @Autowired
    private org.building.pm.service.HpService hpService;

    @RequestMapping(value = "/SAP_PM_EQU_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SAP_PM_EQU_FILE_SEL(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mwdService.SAP_PM_EQU_FILE_SEL(V_V_EQUCODE);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/GET_PROJECT_CLASS_LIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_PROJECT_CLASS_LIST(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_PROJECT_CLASS_LIST();
    }

    @RequestMapping(value = "/GET_PROJECT_LIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_PROJECT_LIST(
            @RequestParam(value = "V_CLASS_CODE") String V_CLASS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_PROJECT_LIST(V_CLASS_CODE);
    }

    @RequestMapping(value = "/GET_PROJECT_BUDGET_ITEM_MESSAGE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_PROJECT_BUDGET_ITEM_MESSAGE(
            @RequestParam(value = "V_DINGE_ID") String V_DINGE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_PROJECT_BUDGET_ITEM_MESSAGE(V_DINGE_ID);
    }

    @RequestMapping(value = "/GET_PROJECT_BUDGET_ITEM_PER_TABLE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_PROJECT_BUDGET_ITEM_PER_TABLE(
            @RequestParam(value = "V_DINGE_ID") String V_DINGE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_PROJECT_BUDGET_ITEM_PER_TABLE(V_DINGE_ID);
    }

    @RequestMapping(value = "/GET_PROJECT_BUDGET_ITEM_JX_TABLE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_PROJECT_BUDGET_ITEM_JX_TABLE(
            @RequestParam(value = "V_DINGE_ID") String V_DINGE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_PROJECT_BUDGET_ITEM_JX_TABLE(V_DINGE_ID);
    }

    @RequestMapping(value = "/GET_PROJECT_BUDGET_ITEM_MAT_TABLE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_PROJECT_BUDGET_ITEM_MAT_TABLE(
            @RequestParam(value = "V_DINGE_ID") String V_DINGE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_PROJECT_BUDGET_ITEM_MAT_TABLE(V_DINGE_ID);
    }

    @RequestMapping(value = "/GET_PROJ_BUDGET_ITEM_TABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_PROJ_BUDGET_ITEM_TABLE(
            @RequestParam(value = "V_CLASS_CODE") String V_CLASS_CODE,
            @RequestParam(value = "V_PROJ_CODE") String V_PROJ_CODE,
            @RequestParam(value = "V_ITEM_CODE") String V_ITEM_CODE,
            @RequestParam(value = "V_ITEM_DESC") String V_ITEM_DESC,
            @RequestParam(value = "V_DINGE_CODE") String V_DINGE_CODE,
            @RequestParam(value = "V_MACHINE_TYPE") String V_MACHINE_TYPE,
            @RequestParam(value = "V_MACHINE_CODE") String V_MACHINE_CODE,
            @RequestParam(value = "V_MACHINE_DESC") String V_MACHINE_DESC,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.GET_PROJ_BUDGET_ITEM_TABLE(V_CLASS_CODE, V_PROJ_CODE, V_ITEM_CODE, V_ITEM_DESC, V_DINGE_CODE, V_MACHINE_TYPE, V_MACHINE_CODE, V_MACHINE_DESC);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PM_REPAIR_JS_STANDARD_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_REPAIR_JS_STANDARD_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUCHILDCODE") String V_V_EQUCHILDCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PM_REPAIR_JS_STANDARD_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE, V_V_EQUCHILDCODE,V_V_EQUTYPECODE);
    }

    @RequestMapping(value = "/PM_REPAIR_JS_STANDARD_GET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_REPAIR_JS_STANDARD_GET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PM_REPAIR_JS_STANDARD_GET(V_V_GUID);
    }

    @RequestMapping(value = "/PM_REAPIR_STANDARD_DATA_GET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_REAPIR_STANDARD_DATA_GET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PM_REAPIR_STANDARD_DATA_GET(V_V_GUID);
    }

    @RequestMapping(value = "/GET_EQU_TYPE_LIST_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_EQU_TYPE_LIST_ABLE(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_EQU_TYPE_LIST_ABLE();
    }

    @RequestMapping(value = "/GET_EQU_LIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_EQU_LIST(
            @RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_EQU_LIST(A_EQUTYPE);
    }

    @RequestMapping(value = "/GET_PART_LIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_PART_LIST(
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.GET_PART_LIST(A_EQUIP_NO, A_MAT_NO);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/GET_EQU_PART_DRAW", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_EQU_PART_DRAW(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_EQU_PART_DRAW(A_PLANTCODE, A_DEPARTCODE, A_EQUTYPE, A_EQUIP_NO, A_PART_NO, A_BEGINDATE, A_ENDDATE);
    }

    @RequestMapping(value = "/GET_OIL_PRICE_DRAW", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_OIL_PRICE_DRAW(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_OIL_PRICE_DRAW(A_PLANTCODE, A_DEPARTCODE, A_BEGINDATE, A_ENDDATE);
    }

    @RequestMapping(value = "/GET_EQU_DETAIL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_EQU_DETAIL(
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_EQU_DETAIL(A_EQUIP_NO);
    }

    @RequestMapping(value = "/GET_DEPART_DRAW", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_DEPART_DRAW(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_DEPART_DRAW(A_PLANTCODE, A_BEGINDATE, A_ENDDATE);
    }

    @RequestMapping(value = "/GET_PART_DETAIL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_PART_DETAIL(
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_PART_DETAIL(A_PART_NO);
    }

    @RequestMapping(value = "/GET_MATH_TYPE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_MATH_TYPE(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_MATH_TYPE();
    }

    @RequestMapping(value = "/GET_MATH_UNIT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_MATH_UNIT(
            @RequestParam(value = "A_CYCLE_TYPE") String A_CYCLE_TYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_MATH_UNIT(A_CYCLE_TYPE);
    }

    @RequestMapping(value = "/GET_UNIT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_UNIT(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_UNIT();
    }

    @RequestMapping(value = "/GET_PART_OIL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap GET_PART_OIL(
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.GET_PART_OIL(A_PART_NO);
    }

    @RequestMapping(value = "/GET_PART_LIST_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_PART_LIST_SELECT(
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
            @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
            @RequestParam(value = "A_PART_DESC") String A_PART_DESC,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.GET_PART_LIST_SELECT(A_EQUIP_NO, A_MAT_NO, A_MAT_DESC, A_PART_DESC);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN_SITE_BJ_CHANGE_LOG_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_BJ_CHANGE_LOG_ALL(
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_BEGINDATE") String V_BEGINDATE,
            @RequestParam(value = "V_ENDDATE") String V_ENDDATE,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.PRO_RUN_SITE_BJ_CHANGE_LOG_ALL(V_SITE_ID, V_BEGINDATE, V_ENDDATE);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_DJ501_MENDDEPT_USER", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ501_MENDDEPT_USER(
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ501_MENDDEPT_USER(USERCODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ501_MENDDEPT_DEPT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ501_MENDDEPT_DEPT(
            @RequestParam(value = "JXPLANTCODE_IN") String JXPLANTCODE_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ501_MENDDEPT_DEPT(JXPLANTCODE_IN, USERCODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ501_SELECTAPPLYLIST_USER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ501_SELECTAPPLYLIST_USER(
            @RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
            @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
            @RequestParam(value = "DJCODE_IN") String DJCODE_IN,
            @RequestParam(value = "DJNAME_IN") String DJNAME_IN,
            @RequestParam(value = "JXPLANTCODE_IN") String JXPLANTCODE_IN,
            @RequestParam(value = "RECFLAG_IN") String RECFLAG_IN,
            @RequestParam(value = "BEGINDATE_IN") String BEGINDATE_IN,
            @RequestParam(value = "ENDDATE_IN") String ENDDATE_IN,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.PRO_DJ501_SELECTAPPLYLIST_USER(PLANTCODE_IN, DEPARTCODE_IN, DJCODE_IN, DJNAME_IN, JXPLANTCODE_IN, RECFLAG_IN, BEGINDATE_IN, ENDDATE_IN);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_DJ401_APPLYMES", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ401_APPLYMES(
            @RequestParam(value = "APPLYID_IN") String APPLYID_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ401_APPLYMES(APPLYID_IN);
    }

    @RequestMapping(value = "/PRO_DJ401_APPLYMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ401_APPLYMATLIST(
            @RequestParam(value = "APPLYID_IN") String APPLYID_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ401_APPLYMATLIST(APPLYID_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_MENDDEPT_DEPT_USER", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_MENDDEPT_DEPT_USER(
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_MENDDEPT_DEPT_USER(USERCODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_WAITAPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ601_WAITAPPLYLIST(
            @RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
            @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
            @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.PRO_DJ601_WAITAPPLYLIST(PLANTCODE_IN, DJ_UQ_CODE_IN, DJ_NAME_IN, ORDERID_IN, USERCODE_IN);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_DJ601_ORDERLIST_WAIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ601_ORDERLIST_WAIT(
            @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
            @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
            @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.PRO_DJ601_ORDERLIST_WAIT(MENDDEPT_CODE_IN, DJ_UQ_CODE_IN, DJ_NAME_IN, USERCODE_IN);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PM_REAPIR_STANDARD_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REAPIR_STANDARD_DATA_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                           @RequestParam(value = "V_V_REPAIR_NAME") String V_V_REPAIR_NAME,
                                                           @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                           @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                           HttpServletRequest request) throws SQLException {

        return mwdService.PM_REAPIR_STANDARD_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE, V_V_REPAIR_NAME, V_V_PAGE, V_V_PAGESIZE);
    }

    @RequestMapping(value = "/PM_REAPIR_STANDARD_GX_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REAPIR_STANDARD_GX_SET(
            @RequestParam(value = "V_V_GXCODE") String V_V_GXCODE,
            @RequestParam(value = "V_V_GXNAME") String V_V_GXNAME,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_TIEM") String V_V_TIEM,
            @RequestParam(value = "V_V_WORKTYPE") String V_V_WORKTYPE,
            @RequestParam(value = "V_V_WORKPER_NUM") String V_V_WORKPER_NUM,
            @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
            @RequestParam(value = "V_V_AQ") String V_V_AQ,
            @RequestParam(value = "V_V_XZ_DEPT") String V_V_XZ_DEPT,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_INTIME") String V_V_INTIME,
            @RequestParam(value = "V_V_ORDER") int V_V_ORDER,
            @RequestParam(value = "V_V_WORKWAY") String V_V_WORKWAY,
            @RequestParam(value = "V_V_JSYQ") String V_V_JSYQ,
            @RequestParam(value = "V_V_REPAIR_CODE") String V_V_REPAIR_CODE,
            HttpServletRequest request) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mwdService.PM_REAPIR_STANDARD_GX_SET(V_V_GXCODE,V_V_GXNAME,V_V_CONTENT,V_V_TIEM,V_V_WORKTYPE,V_V_WORKPER_NUM,
                V_V_TOOL,V_V_AQ,V_V_XZ_DEPT,V_V_INPER,V_V_INTIME,V_V_ORDER,V_V_WORKWAY,V_V_JSYQ,V_V_REPAIR_CODE);

        String V_INFO = (String) data.get("V_INFO");
        result.put("V_INFO", V_INFO);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "PM_REAPIR_STANDARD_GX_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REAPIR_STANDARD_GX_SEL(@RequestParam(value = "V_V_REPAIR_GUID") String V_V_REPAIR_GUID,
                                                         HttpServletRequest request)
            throws SQLException {

        return mwdService.PM_REAPIR_STANDARD_GX_SEL(V_V_REPAIR_GUID);
    }

    @RequestMapping(value = "/PRO_DJ601_ORDERET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ601_ORDERET(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.PRO_DJ601_ORDERET(ORDERID_IN);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_DJ601_ORDERMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ601_ORDERMAT(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.PRO_DJ601_ORDERMAT(ORDERID_IN);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_DJ601_MENDDEPT_GROUP", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_MENDDEPT_GROUP(
            @RequestParam(value = "DEPTCODE_IN") String DEPTCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_MENDDEPT_GROUP(DEPTCODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_PERSON", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_PERSON(
            @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_PERSON(MENDDEPT_CODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_PREORDERET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_PREORDERET(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_PREORDERET(ORDERID_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_MODELDROPLIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_MODELDROPLIST(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_MODELDROPLIST();
    }

    @RequestMapping(value = "/PRO_DJ601_MODELET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_MODELET(
            @RequestParam(value = "V_MODELCODE") String V_MODELCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_MODELET(V_MODELCODE);
    }

    @RequestMapping(value = "/GETMATKC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETMATKC(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_ITYPE") String A_ITYPE,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
            @RequestParam(value = "A_ETALON") String A_ETALON,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.GETMATKC(A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_MATERIALCODE, A_MATERIALNAME, A_ETALON);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_DJ601_ORDERMESSAGE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_ORDERMESSAGE(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_ORDERMESSAGE(ORDERID_IN);
    }

    @RequestMapping(value = "/PRO_DJ602_ORDERSTATUSLIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ602_ORDERSTATUSLIST(
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ602_ORDERSTATUSLIST(USERCODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ602_MENDDEPT_POWER", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ602_MENDDEPT_POWER(
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "ORDER_STATUS_IN") String ORDER_STATUS_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ602_MENDDEPT_POWER(USERCODE_IN, ORDER_STATUS_IN);
    }

    @RequestMapping(value = "/PRO_DJ602_ORDERLIST_POWER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ602_ORDERLIST_POWER(
            @RequestParam(value = "ORDER_STATUS_IN") String ORDER_STATUS_IN,
            @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "CSY_RESULT_IN") String CSY_RESULT_IN,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.PRO_DJ602_ORDERLIST_POWER(ORDER_STATUS_IN, MENDDEPT_CODE_IN, ORDERID_IN, CSY_RESULT_IN);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_DJ602_ETLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ602_ETLIST(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.PRO_DJ602_ETLIST(ORDERID_IN);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/GETORDERSY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETORDERSY(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_MENDDEPT") String A_MENDDEPT,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mwdService.GETORDERSY(A_PLANTCODE, A_MENDDEPT, A_ORDERID);
        List<Map<String, Object>> list = (List) data.get("RET");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/ORDERSYDETAIL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap ORDERSYDETAIL(
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.ORDERSYDETAIL(A_ORDERID);
    }

    @RequestMapping(value = "/PM_REPAIR_JS_STANDARD_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REPAIR_JS_STANDARD_EDIT(
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCHILDCODE") String V_V_EQUCHILDCODE,
            @RequestParam(value = "V_V_BJ_IMG") String V_V_BJ_IMG,
            @RequestParam(value = "V_V_PART_NUMBER") String V_V_PART_NUMBER,
            @RequestParam(value = "V_V_PART_NAME") String V_V_PART_NAME,
            @RequestParam(value = "V_V_PART_CODE") String V_V_PART_CODE,
            @RequestParam(value = "V_V_MATERIAL") String V_V_MATERIAL,
            @RequestParam(value = "V_V_IMGSIZE") String V_V_IMGSIZE,
            @RequestParam(value = "V_V_IMGGAP") String V_V_IMGGAP,
            @RequestParam(value = "V_V_VALUE_DOWN") String V_V_VALUE_DOWN,
            @RequestParam(value = "V_V_VALUE_UP") String V_V_VALUE_UP,
            @RequestParam(value = "V_V_REPLACE_CYC") String V_V_REPLACE_CYC,
            @RequestParam(value = "V_V_WEIGHT") String V_V_WEIGHT,
            @RequestParam(value = "V_V_IMGCODE") String V_V_IMGCODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = mwdService.PM_REPAIR_JS_STANDARD_EDIT(V_V_FLAG,V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE, V_V_EQUTYPECODE,
                V_V_EQUCHILDCODE, V_V_BJ_IMG, V_V_PART_NUMBER, V_V_PART_NAME, V_V_PART_CODE, V_V_MATERIAL, V_V_IMGSIZE,
                V_V_IMGGAP, V_V_VALUE_DOWN,V_V_VALUE_UP, V_V_REPLACE_CYC, V_V_WEIGHT, V_V_IMGCODE, V_V_CONTENT);

        String V_INFO = (String) data.get("V_INFO");

        result.put("V_INFO", V_INFO);
        result.put("success", true);
        return result;
    }


    @RequestMapping(value = "/PM_REAPIR_STANDARD_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REAPIR_STANDARD_DATA_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
            @RequestParam(value = "V_V_PROJECT_IMG") String V_V_PROJECT_IMG,
            @RequestParam(value = "V_V_WORK_BEFORE") String V_V_WORK_BEFORE,
            @RequestParam(value = "V_V_WORK_PER") String V_V_WORK_PER,
            @RequestParam(value = "V_V_WORK_CRAFT") String V_V_WORK_CRAFT,
            @RequestParam(value = "V_V_WORK_TOOL") String V_V_WORK_TOOL,
            @RequestParam(value = "V_V_WORK_TIME") String V_V_WORK_TIME,
            @RequestParam(value = "V_V_SUM_TIME") String V_V_SUM_TIME,
            @RequestParam(value = "V_V_WORK_AQ") String V_V_WORK_AQ,
            @RequestParam(value = "V_V_WORK_DEPT") String V_V_WORK_DEPT,
            @RequestParam(value = "V_V_REPAIR_NAME") String V_V_REPAIR_NAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mwdService.PM_REAPIR_STANDARD_DATA_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE,V_V_EQUNAME, V_V_PROJECT_IMG,V_V_WORK_BEFORE,
                V_V_WORK_PER,V_V_WORK_CRAFT,V_V_WORK_TOOL,   V_V_WORK_TIME, V_V_SUM_TIME, V_V_WORK_AQ, V_V_WORK_DEPT, V_V_REPAIR_NAME);

        String V_INFO = (String) data.get("V_INFO");

        result.put("V_INFO", V_INFO);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_04_PROJECT_DATA_ITEM_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_04_PROJECT_DATA_ITEM_SET(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_TYPE_CODE") String V_V_TYPE_CODE,
            @RequestParam(value = "V_V_MAJOR_CODE") String V_V_MAJOR_CODE,
            @RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,
            @RequestParam(value = "V_V_PROJECT_NAME") String V_V_PROJECT_NAME,
            @RequestParam(value = "V_V_WBS_CODE") String V_V_WBS_CODE,
            @RequestParam(value = "V_V_WBS_NAME") String V_V_WBS_NAME,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_BUDGET_MONEY") double V_V_BUDGET_MONEY,
            @RequestParam(value = "V_V_REPAIR_DEPT") String V_V_REPAIR_DEPT,
            @RequestParam(value = "V_V_FZR") String V_V_FZR,
            @RequestParam(value = "V_V_DATE_B") String V_V_DATE_B,
            @RequestParam(value = "V_V_DATE_E") String V_V_DATE_E,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_FLOW_STATE") String V_V_FLOW_STATE,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_INTIEM") String V_V_INTIEM,
            @RequestParam(value = "V_V_FALG") String V_V_FALG,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = mwdService.PM_04_PROJECT_DATA_ITEM_SET(V_V_ORGCODE, V_V_DEPTCODE, V_V_TYPE_CODE, V_V_MAJOR_CODE,V_V_PROJECT_CODE, V_V_PROJECT_NAME,V_V_WBS_CODE,
                V_V_WBS_NAME,V_V_CONTENT,V_V_BUDGET_MONEY,V_V_REPAIR_DEPT, V_V_FZR, V_V_DATE_B, V_V_DATE_E, V_V_BZ,V_V_FLOW_STATE,V_V_INPER, V_V_INTIEM,V_V_FALG,V_V_YEAR,
                V_V_MONTH,V_V_GUID);

        String V_INFO = (String) data.get("V_INFO");

        result.put("V_INFO", V_INFO);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/SAP_PM_EQU_FILE_SET", method = RequestMethod.POST)
    @ResponseBody
    public String SAP_PM_EQU_FILE_SET(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EDIT_GUID") String V_V_EDIT_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        //上传到数据库之后 开始上传到服务器
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        //  获得第1张图片（根据前台的name名称得到上传的文件）
        MultipartFile imgFile1 = multipartRequest.getFile("V_V_FILE");
        UploadUtil uploadutil = new UploadUtil();
        String fileName = imgFile1.getOriginalFilename();

        //String path = "ui/src/main/webapp/WEB-INF/images/pm_dxgc_wwjx/" + V_V_EQUCODE + "";
        String imagePath = "/WEB-INF/images/pm_dxgc_wwjx/" + V_V_EQUCODE + "";// 配置图片路径
        String getImagePath = request.getSession().getServletContext().getRealPath(imagePath);
        String path = StringUtils.substringBefore(getImagePath, "web");

        HashMap data = mwdService.SAP_PM_EQU_FILE_SET(V_V_EQUCODE, fileName, path, V_V_EDIT_GUID);
        String V_INFO = (String) data.get("V_INFO");

        try {
            uploadutil.uploadImage1(request, imgFile1, imgFile1.getContentType(), fileName, V_V_EQUCODE, V_V_EDIT_GUID);
        } catch (IOException e) {
            e.printStackTrace();
        }

        result.put("v_info", V_INFO);
        result.put("success", true);

        try {
            ObjectMapper mapper = new ObjectMapper();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            dateFormat.setLenient(false);
            mapper.setDateFormat(dateFormat);
            return mapper.writeValueAsString(result);
        } catch (JsonProcessingException e) {
            return "{success:false}";
        }
    }

    //附件上传过程
    @RequestMapping(value = "/PM_REPAIRT_IMG_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REPAIRT_IMG_INSERT(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                     @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                                     @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                                                     @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
                                                     @RequestParam(value = "V_V_FILE") MultipartFile V_V_FILE,
                                                     @RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        String filename = V_V_FILE.getOriginalFilename();

        HashMap data = mwdService.PM_REPAIRT_IMG_INSERT(V_V_GUID, V_V_FILEGUID, filename, V_V_FILETYPE, V_V_FILE.getInputStream(), V_V_INPER);

        String RET = (String) data.get("RET");

        result.put("RET", RET);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_REPAIRT_IMG_SEL_DATA", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map PM_REPAIRT_IMG_SEL_DATA(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                  @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                  @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
                                  @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                                  HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        V_V_FILETYPE = URLDecoder.decode(V_V_FILETYPE, "UTF-8");
        HashMap data = mwdService.PM_REPAIRT_IMG_SEL(V_V_GUID, V_V_FILEGUID, V_V_FILETYPE);

        Blob fileblob = (Blob) data.get("V_FILEBLOB");
        InputStream is = fileblob.getBinaryStream();

        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");
        try {
            V_V_FILENAME = URLDecoder.decode(V_V_FILENAME, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        response.setHeader("Content-Disposition", "attachment; filename=" + V_V_FILENAME);
        OutputStream fos = response.getOutputStream();
        byte[] b = new byte[2048];
        int length = 0;
        while (( length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        is.close();
        fos.close();
        result.put("success", true);
        return result;
    }

    //获取图片过程
    @RequestMapping(value = "/PM_REPAIRT_IMG_SEL", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map PM_REPAIRT_IMG_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                  @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                  @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
                                  @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                                  HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        V_V_FILETYPE = URLDecoder.decode(V_V_FILETYPE, "UTF-8");
        HashMap data = mwdService.PM_REPAIRT_IMG_SEL(V_V_GUID, V_V_FILEGUID, V_V_FILETYPE);

        Blob fileblob = (Blob) data.get("V_FILEBLOB");
        InputStream is = fileblob.getBinaryStream();

        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");
        try {
            //V_V_FILENAME = URLEncoder.encode(V_V_FILENAME, "UTF-8");
            V_V_FILENAME = URLDecoder.decode(V_V_FILENAME, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        response.setHeader("Content-Disposition", "attachment; filename=" + V_V_FILENAME);
        OutputStream fos = response.getOutputStream();
        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        is.close();
        fos.close();
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_REPAIRT_IMG_TABLE_DATA", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map PM_REPAIRT_IMG_TABLE_DATA(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                    @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                    @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
                                    HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = mwdService.PM_REPAIRT_IMG_SEL(V_V_GUID, V_V_FILEGUID, V_V_FILETYPE);

        result.put("RET", data.get("RET"));
        result.put("success", true);
        return result;
    }

    //查询图片列表过程
    @RequestMapping(value = "/PM_REPAIRT_IMG_TABLE", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map PM_REPAIRT_IMG_TABLE(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                    @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                    @RequestParam(value = "V_V_FILETYPE") String V_V_FILETYPE,
                                    HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = mwdService.PM_REPAIRT_IMG_SEL(V_V_GUID, V_V_FILEGUID, V_V_FILETYPE);

        result.put("RET", data.get("RET"));
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/ADD_EQU", method = RequestMethod.POST)
    @ResponseBody
    public HashMap ADD_EQU(
            @RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            @RequestParam(value = "A_EQUIP_NAME") String A_EQUIP_NAME,
            @RequestParam(value = "A_REMARK") String A_REMARK,
            @RequestParam(value = "A_EQU_LEVEL") String A_EQU_LEVEL,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.ADD_EQU(A_EQUTYPE, A_EQUIP_NO, A_EQUIP_NAME, A_REMARK, A_EQU_LEVEL);
    }

    @RequestMapping(value = "/ADD_PART", method = RequestMethod.POST)
    @ResponseBody
    public HashMap ADD_PART(
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            @RequestParam(value = "A_PART_DESC") String A_PART_DESC,
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            @RequestParam(value = "A_WORK_DESC") String A_WORK_DESC,
            @RequestParam(value = "A_OIL_TYPE") String A_OIL_TYPE,
            @RequestParam(value = "A_OIL_ETALON") String A_OIL_ETALON,
            @RequestParam(value = "A_OIL_QS") String A_OIL_QS,
            @RequestParam(value = "A_PART_REMARK") String A_PART_REMARK,
            @RequestParam(value = "A_DESIGN_OIL_CODE") String A_DESIGN_OIL_CODE,
            @RequestParam(value = "A_SUMMER_OIL_CODE") String A_SUMMER_OIL_CODE,
            @RequestParam(value = "A_WINTER_OIL_CODE") String A_WINTER_OIL_CODE,
            @RequestParam(value = "A_CURRENT_OIL_CODE") String A_CURRENT_OIL_CODE,
            @RequestParam(value = "A_USERID") String A_USERID,
            @RequestParam(value = "A_PART_LEVEL") String A_PART_LEVEL,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        String A_IP = request.getRemoteAddr();

        return mwdService.ADD_PART(A_PART_NO, A_PART_DESC, A_EQUIP_NO, A_WORK_DESC, A_OIL_TYPE, A_OIL_ETALON, A_OIL_QS,
                A_PART_REMARK, A_DESIGN_OIL_CODE, A_SUMMER_OIL_CODE, A_WINTER_OIL_CODE, A_CURRENT_OIL_CODE, A_USERID, A_IP, A_PART_LEVEL);
    }

    @RequestMapping(value = "/PRO_DJ601_SAVEORDER", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_SAVEORDER(
            @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
            @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
            @RequestParam(value = "APPLY_ID_IN") String APPLY_ID_IN,
            @RequestParam(value = "MEND_CONTEXT_IN") String MEND_CONTEXT_IN,
            @RequestParam(value = "PLAN_BEGINDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") java.util.Date PLAN_BEGINDATE_IN,
            @RequestParam(value = "PLAN_ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") java.util.Date PLAN_ENDDATE_IN,
            @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
            @RequestParam(value = "MEND_USERID_IN") String MEND_USERID_IN,
            @RequestParam(value = "MEND_USERNAME_IN") String MEND_USERNAME_IN,
            @RequestParam(value = "INSERT_USERID_IN") String INSERT_USERID_IN,
            @RequestParam(value = "INSERT_USERNAME_IN") String INSERT_USERNAME_IN,
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "PLAN_TIME_IN") String PLAN_TIME_IN,
            @RequestParam(value = "DJ_TYPE_IN") String DJ_TYPE_IN,
            @RequestParam(value = "PICCODE_IN") String PICCODE_IN,
            @RequestParam(value = "OP_PERSON_IN") String OP_PERSON_IN,
            @RequestParam(value = "PHONE_NUMBER_IN") String PHONE_NUMBER_IN,
            @RequestParam(value = "USE_LOC_IN") String USE_LOC_IN,
            @RequestParam(value = "REQ_TIME_IN") String REQ_TIME_IN,
            @RequestParam(value = "BUILD_REMARK_IN") String BUILD_REMARK_IN,
            @RequestParam(value = "CHECK_LOG_IN") String CHECK_LOG_IN,
            @RequestParam(value = "DJ_VOL_IN") String DJ_VOL_IN,
            @RequestParam(value = "DJ_V_IN") String DJ_V_IN,
            @RequestParam(value = "MEND_TYPE_IN") String MEND_TYPE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        String A_IP = request.getRemoteAddr();

        return mwdService.PRO_DJ601_SAVEORDER(DJ_UQ_CODE_IN, DJ_NAME_IN, APPLY_ID_IN, MEND_CONTEXT_IN, PLAN_BEGINDATE_IN,
                PLAN_ENDDATE_IN, MENDDEPT_CODE_IN, MEND_USERID_IN, MEND_USERNAME_IN, INSERT_USERID_IN, INSERT_USERNAME_IN,
                ORDERID_IN, PLAN_TIME_IN, DJ_TYPE_IN, PICCODE_IN, OP_PERSON_IN, PHONE_NUMBER_IN, USE_LOC_IN, REQ_TIME_IN,
                BUILD_REMARK_IN, CHECK_LOG_IN, DJ_VOL_IN, DJ_V_IN, MEND_TYPE_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_SAVEORDERET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_SAVEORDERET(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "PLAN_WORKTIME_IN") Double PLAN_WORKTIME_IN,
            @RequestParam(value = "PLAN_PERSON_IN") Double PLAN_PERSON_IN,
            @RequestParam(value = "ET_CONTEXT_IN") String ET_CONTEXT_IN,
            @RequestParam(value = "PRE_ET_IN") String PRE_ET_IN,
            @RequestParam(value = "INSERT_USERID_IN") String INSERT_USERID_IN,
            @RequestParam(value = "INSERT_USERNAME_IN") String INSERT_USERNAME_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_SAVEORDERET(ORDERID_IN, PLAN_WORKTIME_IN, PLAN_PERSON_IN, ET_CONTEXT_IN, PRE_ET_IN, INSERT_USERID_IN, INSERT_USERNAME_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_SAVEORDERMAT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_SAVEORDERMAT(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "MATERIALCODE_IN") String MATERIALCODE_IN,
            @RequestParam(value = "MATERIALNAME_IN") String MATERIALNAME_IN,
            @RequestParam(value = "ETALON_IN") String ETALON_IN,
            @RequestParam(value = "MAT_CL_IN") String MAT_CL_IN,
            @RequestParam(value = "F_PRICE_IN") Double F_PRICE_IN,
            @RequestParam(value = "PLAN_AMOUNT_IN") Double PLAN_AMOUNT_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
            @RequestParam(value = "KCID_IN") String KCID_IN,
            @RequestParam(value = "UNIT_IN") String UNIT_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_SAVEORDERMAT(ORDERID_IN, MATERIALCODE_IN, MATERIALNAME_IN, ETALON_IN, MAT_CL_IN, F_PRICE_IN, PLAN_AMOUNT_IN, USERCODE_IN, USERNAME_IN, KCID_IN, UNIT_IN);
    }

    @RequestMapping(value = "/PRO_DJ602_ADDMAT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ602_ADDMAT(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "MATERIALCODE_IN") String MATERIALCODE_IN,
            @RequestParam(value = "MATERIALNAME_IN") String MATERIALNAME_IN,
            @RequestParam(value = "ETALON_IN") String ETALON_IN,
            @RequestParam(value = "MAT_CL_IN") String MAT_CL_IN,
            @RequestParam(value = "F_PRICE_IN") Double F_PRICE_IN,
            @RequestParam(value = "ACT_AMOUNT_IN") Double ACT_AMOUNT_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ602_ADDMAT(ORDERID_IN, MATERIALCODE_IN, MATERIALNAME_IN, ETALON_IN, MAT_CL_IN, F_PRICE_IN, ACT_AMOUNT_IN);
    }

    @RequestMapping(value = "/PRO_DJ602_CONFIRMMAT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ602_CONFIRMMAT(
            @RequestParam(value = "ID_IN") String ID_IN,
            @RequestParam(value = "ACT_AMOUNT_IN") Double ACT_AMOUNT_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ602_CONFIRMMAT(ID_IN, ACT_AMOUNT_IN);
    }

    @RequestMapping(value = "/SAVEORDERSY", method = RequestMethod.POST)
    @ResponseBody
    public HashMap SAVEORDERSY(
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_BCSY_RESULT") String A_BCSY_RESULT,
            @RequestParam(value = "A_BCSY_RESULT_DESC") String A_BCSY_RESULT_DESC,
            @RequestParam(value = "A_ZBCSY_RESULT") String A_ZBCSY_RESULT,
            @RequestParam(value = "A_ZBCSY_RESULT_DESC") String A_ZBCSY_RESULT_DESC,
            @RequestParam(value = "A_DBCSY_RESULT") String A_DBCSY_RESULT,
            @RequestParam(value = "A_DBCSY_RESULT_DESC") String A_DBCSY_RESULT_DESC,
            @RequestParam(value = "A_CSY_RESULT") String A_CSY_RESULT,
            @RequestParam(value = "A_CSY_RESULT_DESC") String A_CSY_RESULT_DESC,
            @RequestParam(value = "A_USERID") String A_USERID,
            @RequestParam(value = "A_USERNAME") String A_USERNAME,
            @RequestParam(value = "A_SY_DATE") @DateTimeFormat(pattern = "yyyy-MM-dd") java.util.Date A_SY_DATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.SAVEORDERSY(A_ORDERID, A_BCSY_RESULT, A_BCSY_RESULT_DESC, A_ZBCSY_RESULT, A_ZBCSY_RESULT_DESC,
                A_DBCSY_RESULT, A_DBCSY_RESULT_DESC, A_CSY_RESULT, A_CSY_RESULT_DESC, A_USERID, A_USERNAME, A_SY_DATE);
    }

    //附件上传过程
    @RequestMapping(value = "/FILEUPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> FILEUPDATE(@RequestParam(value = "A_ORDERID") String A_ORDERID,
                                          @RequestParam(value = "A_FILENAME") String A_FILENAME,
                                          @RequestParam(value = "A_FILE_EXTEND") String A_FILE_EXTEND,
                                          @RequestParam(value = "A_FILE") MultipartFile A_FILE,
                                          @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = mwdService.FILEUPDATE(A_ORDERID, A_FILENAME, A_FILE_EXTEND, A_FILE.getInputStream(), A_USERNAME);

        String RET = (String) data.get("RET");

        result.put("RET", RET);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_DJ601_SAVEORDERET_LIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ601_SAVEORDERET_LIST(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "PLAN_WORKTIME_IN_LIST", required = false) List<String> PLAN_WORKTIME_IN_LIST,
            @RequestParam(value = "PLAN_PERSON_IN_LIST", required = false) List<String> PLAN_PERSON_IN_LIST,
            @RequestParam(value = "ET_CONTEXT_IN_LIST", required = false) List<String> ET_CONTEXT_IN_LIST,
            @RequestParam(value = "PRE_ET_IN_LIST", required = false) List<String> PRE_ET_IN_LIST,
            @RequestParam(value = "INSERT_USERID_IN") String INSERT_USERID_IN,
            @RequestParam(value = "INSERT_USERNAME_IN") String INSERT_USERNAME_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < PLAN_WORKTIME_IN_LIST.size(); i++) {
            HashMap data = mwdService.PRO_DJ601_SAVEORDERET(ORDERID_IN, Double.parseDouble(PLAN_WORKTIME_IN_LIST.get(i)), Double.parseDouble(PLAN_PERSON_IN_LIST.get(i)), ET_CONTEXT_IN_LIST.get(i), PRE_ET_IN_LIST.get(i), INSERT_USERID_IN, INSERT_USERNAME_IN);
            result.put("RET", data.get("RET"));
        }
        return result;
    }

    @RequestMapping(value = "/UPDATE_EQU", method = RequestMethod.POST)
    @ResponseBody
    public HashMap UPDATE_EQU(
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            @RequestParam(value = "A_EQUIP_NAME") String A_EQUIP_NAME,
            @RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
            @RequestParam(value = "A_REMARK") String A_REMARK,
            @RequestParam(value = "A_EQU_LEVEL") String A_EQU_LEVEL,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.UPDATE_EQU(A_EQUIP_NO, A_EQUIP_NAME, A_EQUTYPE, A_REMARK, A_EQU_LEVEL);
    }

    @RequestMapping(value = "/UPDATE_PART", method = RequestMethod.POST)
    @ResponseBody
    public HashMap UPDATE_PART(
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            @RequestParam(value = "A_PART_DESC") String A_PART_DESC,
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            @RequestParam(value = "A_WORK_DESC") String A_WORK_DESC,
            @RequestParam(value = "A_OIL_TYPE") String A_OIL_TYPE,
            @RequestParam(value = "A_OIL_ETALON") String A_OIL_ETALON,
            @RequestParam(value = "A_OIL_QS") String A_OIL_QS,
            @RequestParam(value = "A_PART_REMARK") String A_PART_REMARK,
            @RequestParam(value = "A_DESIGN_OIL_CODE") String A_DESIGN_OIL_CODE,
            @RequestParam(value = "A_SUMMER_OIL_CODE") String A_SUMMER_OIL_CODE,
            @RequestParam(value = "A_WINTER_OIL_CODE") String A_WINTER_OIL_CODE,
            @RequestParam(value = "A_CURRENT_OIL_CODE") String A_CURRENT_OIL_CODE,
            @RequestParam(value = "A_USERID") String A_USERID,
            @RequestParam(value = "A_PART_LEVEL") String A_PART_LEVEL,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        String A_IP = request.getRemoteAddr();

        return mwdService.UPDATE_PART(A_PART_NO, A_PART_DESC, A_EQUIP_NO, A_WORK_DESC, A_OIL_TYPE, A_OIL_ETALON, A_OIL_QS,
                A_PART_REMARK, A_DESIGN_OIL_CODE, A_SUMMER_OIL_CODE, A_WINTER_OIL_CODE, A_CURRENT_OIL_CODE, A_USERID, A_IP, A_PART_LEVEL);
    }

    @RequestMapping(value = "/SET_PART_OIL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap SET_PART_OIL(
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            @RequestParam(value = "A_CYCLE_TYPE") String A_CYCLE_TYPE,
            @RequestParam(value = "A_CYCLE_UNIT") String A_CYCLE_UNIT,
            @RequestParam(value = "A_CYCLE_VALUE") Double A_CYCLE_VALUE,
            @RequestParam(value = "A_INSERT_AMOUNT") Double A_INSERT_AMOUNT,
            @RequestParam(value = "A_INSERT_UNIT") String A_INSERT_UNIT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.SET_PART_OIL(A_EQUIP_NO, A_PART_NO, A_CYCLE_TYPE, A_CYCLE_UNIT, A_CYCLE_VALUE, A_INSERT_AMOUNT, A_INSERT_UNIT);
    }

    @RequestMapping(value = "/PRO_DJ501_RECAPPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ501_RECAPPLY(
            @RequestParam(value = "APPLYID_IN_LIST", required = false) List<String> APPLYID_IN_LIST,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
            @RequestParam(value = "JXCLASSCODE_IN") String JXCLASSCODE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < APPLYID_IN_LIST.size(); i++) {
            HashMap data = mwdService.PRO_DJ501_RECAPPLY(APPLYID_IN_LIST.get(i), USERCODE_IN, USERNAME_IN, JXCLASSCODE_IN);
            result.put("RET", data.get("RET"));
        }
        return result;
    }

    @RequestMapping(value = "/SAVEMENDCODE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap SAVEMENDCODE(
            @RequestParam(value = "A_APPLYID") String A_APPLYID,
            @RequestParam(value = "A_MENDCODE") String A_MENDCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.SAVEMENDCODE(A_APPLYID, A_MENDCODE);
    }

    @RequestMapping(value = "/PRO_DJ601_ORDER_DOWNLOAD", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_ORDER_DOWNLOAD(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
            @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_ORDER_DOWNLOAD(ORDERID_IN, USERCODE_IN, USERNAME_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_UPDATEORDER", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ601_UPDATEORDER(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "MEND_CONTEXT_IN") String MEND_CONTEXT_IN,
            @RequestParam(value = "PLAN_BEGINDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") java.util.Date PLAN_BEGINDATE_IN,
            @RequestParam(value = "PLAN_ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") java.util.Date PLAN_ENDDATE_IN,
            @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
            @RequestParam(value = "INSERT_USERID_IN") String INSERT_USERID_IN,
            @RequestParam(value = "INSERT_USERNAME_IN") String INSERT_USERNAME_IN,
            @RequestParam(value = "PLAN_TIME_IN") String PLAN_TIME_IN,
            @RequestParam(value = "DJ_TYPE_IN") String DJ_TYPE_IN,
            @RequestParam(value = "PICCODE_IN") String PICCODE_IN,
            @RequestParam(value = "OP_PERSON_IN") String OP_PERSON_IN,
            @RequestParam(value = "PHONE_NUMBER_IN") String PHONE_NUMBER_IN,
            @RequestParam(value = "USE_LOC_IN") String USE_LOC_IN,
            @RequestParam(value = "REQ_TIME_IN") String REQ_TIME_IN,
            @RequestParam(value = "BUILD_REMARK_IN") String BUILD_REMARK_IN,
            @RequestParam(value = "CHECK_LOG_IN") String CHECK_LOG_IN,
            @RequestParam(value = "DJ_VOL_IN") String DJ_VOL_IN,
            @RequestParam(value = "DJ_V_IN") String DJ_V_IN,
            @RequestParam(value = "MEND_TYPE_IN") String MEND_TYPE_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ601_UPDATEORDER(ORDERID_IN, MEND_CONTEXT_IN, PLAN_BEGINDATE_IN, PLAN_ENDDATE_IN,
                MENDDEPT_CODE_IN, INSERT_USERID_IN, INSERT_USERNAME_IN, PLAN_TIME_IN, DJ_TYPE_IN, PICCODE_IN, OP_PERSON_IN,
                PHONE_NUMBER_IN, USE_LOC_IN, REQ_TIME_IN, BUILD_REMARK_IN, CHECK_LOG_IN, DJ_VOL_IN, DJ_V_IN, MEND_TYPE_IN);
    }

    @RequestMapping(value = "/PRO_DJ602_FINISHET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ602_FINISHET(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "ET_ID_IN") String ET_ID_IN,
            @RequestParam(value = "ACT_PERSON_IN") String ACT_PERSON_IN,
            @RequestParam(value = "ACT_WORKTIME_IN") String ACT_WORKTIME_IN,
            @RequestParam(value = "INSERT_USERID_IN") String INSERT_USERID_IN,
            @RequestParam(value = "INSERT_USERNAME_IN") String INSERT_USERNAME_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ602_FINISHET(ORDERID_IN, ET_ID_IN, ACT_PERSON_IN, ACT_WORKTIME_IN, INSERT_USERID_IN, INSERT_USERNAME_IN);
    }

    @RequestMapping(value = "/PRO_DJ602_OVER", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_DJ602_OVER(
            @RequestParam(value = "ORDERID_IN") String ORDERID_IN,
            @RequestParam(value = "USERID_IN") String USERID_IN,
            @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
            @RequestParam(value = "REMARK_IN") String REMARK_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PRO_DJ602_OVER(ORDERID_IN, USERID_IN, USERNAME_IN, REMARK_IN);
    }

    @RequestMapping(value = "/ROLLBACKTOPRESTEP", method = RequestMethod.POST)
    @ResponseBody
    public HashMap ROLLBACKTOPRESTEP(
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_USERID") String A_USERID,
            @RequestParam(value = "A_USERNAME") String A_USERNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.ROLLBACKTOPRESTEP(A_ORDERID, A_USERID, A_USERNAME);
    }

    @RequestMapping(value = "/SAP_PM_EQU_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SAP_PM_EQU_FILE_DEL(
            @RequestParam(value = "V_V_EDIT_GUID") String V_V_EDIT_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mwdService.SAP_PM_EQU_FILE_DEL(V_V_EDIT_GUID);
        String V_INFO = (String) data.get("V_INFO");
        result.put("v_info", V_INFO);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_REAPIR_STANDARD_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REAPIR_STANDARD_DATA_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return mwdService.PM_REAPIR_STANDARD_DATA_DEL(V_V_GUID);
    }

    @RequestMapping(value = "/PM_REPAIR_JS_STANDARD_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REPAIR_JS_STANDARD_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return mwdService.PM_REPAIR_JS_STANDARD_DEL(V_V_GUID);
    }

    @RequestMapping(value = "/PM_REPAIRT_IMG_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REPAIRT_IMG_DEL(
            @RequestParam(value = "V_V_FIELGUID") String V_V_FIELGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return mwdService.PM_REPAIRT_IMG_DEL(V_V_FIELGUID);
    }

    @RequestMapping(value = "/PM_REPAIRT_IMG_GUID_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REPAIRT_IMG_GUID_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return mwdService.PM_REPAIRT_IMG_GUID_DEL(V_V_GUID);
    }

    @RequestMapping(value = "/DELETE_EQU", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DELETE_EQU(
            @RequestParam(value = "A_EQUIP_NO") String A_EQUIP_NO,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return mwdService.DELETE_EQU(A_EQUIP_NO);
    }

    @RequestMapping(value = "/DELETE_PART", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DELETE_PART(
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            @RequestParam(value = "A_USERID") String A_USERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        String A_IP = request.getRemoteAddr();
        return mwdService.DELETE_PART(A_PART_NO, A_USERID, A_IP);
    }

    @RequestMapping(value = "/PRO_DJ601_DELETEET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ601_DELETEET(
            @RequestParam(value = "ET_ID_IN") String ET_ID_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return mwdService.PRO_DJ601_DELETEET(ET_ID_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_DELETEMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ601_DELETEMAT(
            @RequestParam(value = "ID_IN") String ID_IN,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return mwdService.PRO_DJ601_DELETEMAT(ID_IN);
    }

    @RequestMapping(value = "/FILEDELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> FILEDELETE(
            @RequestParam(value = "A_FILEID") String A_FILEID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return mwdService.FILEDELETE(A_FILEID);
    }

    /*设备检查（公司）导出EXCEL*/
    @RequestMapping(value = "/PM_13_EXAMINED_SEL_COM_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_13_EXAMINED_SEL_COM_EXCEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                             @RequestParam(value = "V_V_STATE") String V_V_STATE,
                                             @RequestParam(value = "V_V_DATE") String V_V_DATE,
                                             @RequestParam(value = "V_V_BEEXAMINED_TYPE") String V_V_BEEXAMINED_TYPE,
                                             HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = hpService.PM_13_EXAMINED_SEL(V_V_ORGCODE, V_V_STATE, V_V_DATE, V_V_BEEXAMINED_TYPE, "1", "9999");

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 7; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("检查部门");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("检查时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("被检单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("检查部位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("考核分数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("扣款金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("存在问题");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_DATE") == null ? "" : map.get("V_DATE").toString());

                row.createCell((short) 3).setCellValue(map.get("V_BEEXAMINED_DEPTNAME") == null ? "" : map.get("V_BEEXAMINED_DEPTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_JCBW") == null ? "" : map.get("V_JCBW").toString());

                row.createCell((short) 5).setCellValue(map.get("V_KHFS") == null ? "" : map.get("V_KHFS").toString());

                row.createCell((short) 6).setCellValue(map.get("V_KKJE") == null ? "" : map.get("V_KKJE").toString());

                row.createCell((short) 7).setCellValue(map.get("V_CZWT") == null ? "" : map.get("V_CZWT").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备检查（公司）.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //导出EXCEL
    @RequestMapping(value = "/GET_PROJ_BUDGET_ITEM_TABLE_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GET_PROJ_BUDGET_ITEM_TABLE_EXCEL(@RequestParam(value = "V_CLASS_CODE") String V_CLASS_CODE,
                                                 @RequestParam(value = "V_PROJ_CODE") String V_PROJ_CODE,
                                                 @RequestParam(value = "V_ITEM_CODE") String V_ITEM_CODE,
                                                 @RequestParam(value = "V_ITEM_DESC") String V_ITEM_DESC,
                                                 @RequestParam(value = "V_DINGE_CODE") String V_DINGE_CODE,
                                                 @RequestParam(value = "V_MACHINE_TYPE") String V_MACHINE_TYPE,
                                                 @RequestParam(value = "V_MACHINE_CODE") String V_MACHINE_CODE,
                                                 @RequestParam(value = "V_MACHINE_DESC") String V_MACHINE_DESC,
                                                 HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        V_ITEM_CODE = URLDecoder.decode(V_ITEM_CODE, "UTF-8");
        V_ITEM_DESC = URLDecoder.decode(V_ITEM_DESC, "UTF-8");
        V_DINGE_CODE = URLDecoder.decode(V_DINGE_CODE, "UTF-8");
        V_MACHINE_TYPE = URLDecoder.decode(V_MACHINE_TYPE, "UTF-8");
        V_MACHINE_CODE = URLDecoder.decode(V_MACHINE_CODE, "UTF-8");
        V_MACHINE_DESC = URLDecoder.decode(V_MACHINE_DESC, "UTF-8");

        Map<String, Object> data = mwdService.GET_PROJ_BUDGET_ITEM_TABLE(V_CLASS_CODE, V_PROJ_CODE, V_ITEM_CODE, V_ITEM_DESC, V_DINGE_CODE, V_MACHINE_TYPE, V_MACHINE_CODE, V_MACHINE_DESC);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 14; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("工程大类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("工程代码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("工程描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("项目描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("定额代码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("主机规格型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("主机名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("材料备件费");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("人工费");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("机械费");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("总金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("备注说明");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("版本号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 14);
        cell.setCellValue("版本状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("RET");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("CLASS_DESC") == null ? "" : map.get("CLASS_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("PROJ_CODE") == null ? "" : map.get("PROJ_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("PROJ_DESC") == null ? "" : map.get("PROJ_DESC").toString());

                row.createCell((short) 4).setCellValue(map.get("ITEM_DESC") == null ? "" : map.get("ITEM_DESC").toString());

                row.createCell((short) 5).setCellValue(map.get("MAIN_CODE") == null ? "" : map.get("MAIN_CODE").toString());

                row.createCell((short) 6).setCellValue(map.get("MACHINE_DESC") == null ? "" : map.get("MACHINE_DESC").toString());

                row.createCell((short) 7).setCellValue(map.get("MACHINE_TYPE") == null ? "" : map.get("MACHINE_TYPE").toString());

                row.createCell((short) 8).setCellValue(map.get("MAT_MONEY") == null ? "" : map.get("MAT_MONEY").toString());

                row.createCell((short) 9).setCellValue(map.get("PERSON_MONEY") == null ? "" : map.get("PERSON_MONEY").toString());

                row.createCell((short) 10).setCellValue(map.get("JX_MONEY") == null ? "" : map.get("JX_MONEY").toString());

                row.createCell((short) 11).setCellValue(map.get("F_MONEY") == null ? "" : map.get("F_MONEY").toString());

                row.createCell((short) 12).setCellValue(map.get("MAIN_REMARK") == null ? "" : map.get("MAIN_REMARK").toString());

                row.createCell((short) 13).setCellValue(map.get("VERSION_NUM") == null ? "" : map.get("VERSION_NUM").toString());

                row.createCell((short) 14).setCellValue(map.get("VERSION_STATUS_DESC") == null ? "" : map.get("VERSION_STATUS_DESC").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("定额预算.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //导出EXCEL
    @RequestMapping(value = "/PRO_DJ501_SELECTAPPLYLIST_USER_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_DJ501_SELECTAPPLYLIST_USER_EXCEL(@RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                                     @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
                                                     @RequestParam(value = "DJCODE_IN") String DJCODE_IN,
                                                     @RequestParam(value = "DJNAME_IN") String DJNAME_IN,
                                                     @RequestParam(value = "JXPLANTCODE_IN") String JXPLANTCODE_IN,
                                                     @RequestParam(value = "RECFLAG_IN") String RECFLAG_IN,
                                                     @RequestParam(value = "BEGINDATE_IN") String BEGINDATE_IN,
                                                     @RequestParam(value = "ENDDATE_IN") String ENDDATE_IN,
                                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        DJCODE_IN = URLDecoder.decode(DJCODE_IN, "UTF-8");
        DJNAME_IN = URLDecoder.decode(DJNAME_IN, "UTF-8");

        Map<String, Object> data = mwdService.PRO_DJ501_SELECTAPPLYLIST_USER(PLANTCODE_IN, DEPARTCODE_IN, DJCODE_IN, DJNAME_IN, JXPLANTCODE_IN, RECFLAG_IN, BEGINDATE_IN, ENDDATE_IN);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 10; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("申请工单号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("检修编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("电机编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("电机名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("维修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("申请厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("申请部门");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("RET");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("MEND_CODE") == null ? "" : map.get("MEND_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("DJ_UQ_CODE") == null ? "" : map.get("DJ_UQ_CODE").toString());

                row.createCell((short) 4).setCellValue(map.get("DJ_NAME") == null ? "" : map.get("DJ_NAME").toString());

                row.createCell((short) 5).setCellValue(map.get("MEND_CONTEXT") == null ? "" : map.get("MEND_CONTEXT").toString());

                row.createCell((short) 6).setCellValue(map.get("APPLY_PLANTNAME") == null ? "" : map.get("APPLY_PLANTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("APPLY_DEPARTNAME") == null ? "" : map.get("APPLY_DEPARTNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());

                row.createCell((short) 9).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("接收检修申请.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}

