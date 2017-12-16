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
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.Date;
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
    private org.building.pm.service.hpService hpService;

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
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PM_REPAIR_JS_STANDARD_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE, V_V_EQUCHILDCODE);
    }

    @RequestMapping(value = "/PM_REPAIR_JS_STANDARD_GET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_REPAIR_JS_STANDARD_GET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return mwdService.PM_REPAIR_JS_STANDARD_GET(V_V_GUID);
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

    @RequestMapping(value = "PM_REAPIR_STANDARD_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REAPIR_STANDARD_DATA_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                         @RequestParam(value = "V_V_REPAIR_NAME") String V_V_REPAIR_NAME,
                                                         @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                         @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                         HttpServletRequest request)
            throws SQLException {

        return mwdService.PM_REAPIR_STANDARD_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE, V_V_REPAIR_NAME, V_V_PAGE, V_V_PAGESIZE);
    }

    @RequestMapping(value = "PM_REAPIR_STANDARD_GX_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REAPIR_STANDARD_GX_SEL(@RequestParam(value = "V_V_REPAIR_GUID") String V_V_REPAIR_GUID,
                                                           HttpServletRequest request)
            throws SQLException {

        return mwdService.PM_REAPIR_STANDARD_GX_SEL(V_V_REPAIR_GUID);
    }

    @RequestMapping(value = "/PM_REPAIR_JS_STANDARD_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_REPAIR_JS_STANDARD_EDIT(
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
            @RequestParam(value = "V_V_VALUE") String V_V_VALUE,
            @RequestParam(value = "V_V_REPLACE_CYC") String V_V_REPLACE_CYC,
            @RequestParam(value = "V_V_WEIGHT") String V_V_WEIGHT,
            @RequestParam(value = "V_V_IMGCODE") String V_V_IMGCODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = mwdService.PM_REPAIR_JS_STANDARD_EDIT(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE, V_V_EQUTYPECODE,
                V_V_EQUCHILDCODE, V_V_BJ_IMG, V_V_PART_NUMBER, V_V_PART_NAME, V_V_PART_CODE, V_V_MATERIAL, V_V_IMGSIZE,
                V_V_IMGGAP, V_V_VALUE, V_V_REPLACE_CYC, V_V_WEIGHT, V_V_IMGCODE, V_V_CONTENT);

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


        HashMap data = mwdService.PM_REPAIRT_IMG_INSERT(V_V_GUID, V_V_FILEGUID, V_V_FILENAME, V_V_FILETYPE, V_V_FILE.getInputStream(), V_V_INPER);

        String RET = (String) data.get("RET");

        result.put("RET", RET);
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
        String A_IP = request.getRemoteAddr();

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

