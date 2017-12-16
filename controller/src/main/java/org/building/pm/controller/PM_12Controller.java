package org.building.pm.controller;

import org.building.pm.service.PM_12Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Blob;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/PM_12")
public class PM_12Controller {

    @Autowired
    private PM_12Service pm_12Service;

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_DEPT_VIEW(
            @RequestParam(value = "IS_V_DEPTCODE") String IS_V_DEPTCODE,
            @RequestParam(value = "IS_V_DEPTTYPE") String IS_V_DEPTTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_BASE_DEPT_VIEW(IS_V_DEPTCODE,IS_V_DEPTTYPE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_ALL(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_EQUID") String A_EQUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_ALL(A_PLANTCODE,A_DEPARTCODE,A_EQUID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_ALL(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            @RequestParam(value = "A_BJ_DESC") String A_BJ_DESC,
            @RequestParam(value = "A_BJ_TYPE") String A_BJ_TYPE,
            @RequestParam(value = "A_BJ_UNIT") String A_BJ_UNIT,
            @RequestParam(value = "A_BJ_REMARK") String A_BJ_REMARK,
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_PRE_FLAG") String A_PRE_FLAG,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_ADD(A_BJ_ID, A_BJ_DESC, A_BJ_TYPE,A_BJ_UNIT,A_BJ_REMARK,A_PLANTCODE,A_DEPARTCODE,A_EQUID,A_PRE_FLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_ALL(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            @RequestParam(value = "A_BJ_DESC") String A_BJ_DESC,
            @RequestParam(value = "A_BJ_TYPE") String A_BJ_TYPE,
            @RequestParam(value = "A_BJ_UNIT") String A_BJ_UNIT,
            @RequestParam(value = "A_BJ_REMARK") String A_BJ_REMARK,
            @RequestParam(value = "A_PRE_FLAG") String A_PRE_FLAG,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_UPDATE(A_BJ_ID, A_BJ_DESC, A_BJ_TYPE, A_BJ_UNIT, A_BJ_REMARK, A_PRE_FLAG);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_DELETE(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_DELETE(A_BJ_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_CYCLE_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_CYCLE_ABLE(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_CYCLE_ABLE();
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_CYCLE_BASIC_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_CYCLE_BASIC_ALL(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_CYCLE_BASIC_ALL(A_BJ_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_CYCLE_BASIC_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_CYCLE_BASIC_ADD(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            @RequestParam(value = "A_CYCLE_VALUE") String A_CYCLE_VALUE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_CYCLE_BASIC_ADD(A_BJ_ID,A_CYCLE_ID,A_CYCLE_VALUE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_CYCLE_BASIC_DEL", method = RequestMethod.POST)
      @ResponseBody
      public Map PRO_RUN_BJ_CYCLE_BASIC_DEL(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_CYCLE_BASIC_DEL(A_BJ_ID,A_CYCLE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_GETDESC", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_GETDESC(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_GETDESC(A_BJ_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_MAT_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_MAT_ALL(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_MAT_ALL(A_BJ_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_MAT_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_MAT_ADD(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
            @RequestParam(value = "A_MATERIALETALON") String A_MATERIALETALON,
            @RequestParam(value = "A_UNIT") String A_UNIT,
            @RequestParam(value = "A_PRICE") String A_PRICE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_MAT_ADD(A_BJ_ID,A_MATERIALCODE,A_MATERIALNAME,A_MATERIALETALON,A_UNIT,A_PRICE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_MAT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_MAT_DEL(
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_MAT_DEL(A_BJ_ID, A_MATERIALCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_SITE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_SITE_ALL(
            @RequestParam(value = "A_EQU_ID") String A_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_SITE_ALL(A_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_SITE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_SITE_ADD(
            @RequestParam(value = "A_SITE_DESC") String A_SITE_DESC,
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_REMARK") String A_REMARK,
            @RequestParam(value = "A_USERNAME") String A_USERNAME,
            @RequestParam(value = "A_MEND_DEPART") String A_MEND_DEPART,
            @RequestParam(value = "A_MEND_USERNAME") String A_MEND_USERNAME,
            @RequestParam(value = "A_MEND_USERNAMEID") String A_MEND_USERNAMEID,
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            @RequestParam(value = "A_BJ_AMOUNT") String A_BJ_AMOUNT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_SITE_ADD(A_SITE_DESC,A_EQUID,A_REMARK,A_USERNAME,A_MEND_DEPART,A_MEND_USERNAME,A_MEND_USERNAMEID,A_BJ_ID,A_BJ_AMOUNT);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_SITE_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_SITE_UPDATE(
            @RequestParam(value = "A_SITE_ID") String A_SITE_ID,
            @RequestParam(value = "A_SITE_DESC") String A_SITE_DESC,
            @RequestParam(value = "A_REMARK") String A_REMARK,
            @RequestParam(value = "A_USERNAME") String A_USERNAME,
            @RequestParam(value = "A_MEND_DEPART") String A_MEND_DEPART,
            @RequestParam(value = "A_MEND_USERNAME") String A_MEND_USERNAME,
            @RequestParam(value = "A_MEND_USERNAMEID") String A_MEND_USERNAMEID,
            @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
            @RequestParam(value = "A_BJ_AMOUNT") String A_BJ_AMOUNT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_SITE_UPDATE(A_SITE_ID,A_SITE_DESC,A_REMARK,A_USERNAME,A_MEND_DEPART,A_MEND_USERNAME,A_MEND_USERNAMEID,A_BJ_ID,A_BJ_AMOUNT);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_SITE_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_SITE_DELETE(
            @RequestParam(value = "A_SITE_ID") String A_SITE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_SITE_DELETE(A_SITE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_EQU_VGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_EQU_VGURL(
            @RequestParam(value = "A_EQUID") String A_EQUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_EQU_VGURL(A_EQUID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_CYCLE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_CYCLE_ALL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_CYCLE_ALL();
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_CYCLE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_CYCLE_ADD(
            @RequestParam(value = "A_CYCLE_DESC") String A_CYCLE_DESC,
            @RequestParam(value = "A_CYCLE_UNIT") String A_CYCLE_UNIT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_CYCLE_ADD(A_CYCLE_DESC,A_CYCLE_UNIT);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_CYCLE_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_CYCLE_UPDATE(
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            @RequestParam(value = "A_CYCLE_DESC") String A_CYCLE_DESC,
            @RequestParam(value = "A_CYCLE_UNIT") String A_CYCLE_UNIT,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_CYCLE_UPDATE(A_CYCLE_ID,A_CYCLE_DESC, A_CYCLE_UNIT);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_CYCLE_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_CYCLE_DELETE(
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_CYCLE_DELETE(A_CYCLE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7121_SELECTEQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7121_SELECTEQULIST(
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7121_SELECTEQULIST(V_DEPARTCODE,V_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7121_GETEQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7121_GETEQULIST(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7121_GETEQULIST(V_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7121_ADDEQU", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7121_ADDEQU(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            @RequestParam(value = "V_EQU_DESC") String V_EQU_DESC,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_USERID") String V_USERID,
            @RequestParam(value = "V_USERNAME") String V_USERNAME,
            @RequestParam(value = "V_STATUS") String V_STATUS,
            @RequestParam(value = "V_PP_CODE") String V_PP_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7121_ADDEQU(V_EQU_ID,V_EQU_DESC,V_DEPARTCODE,V_PLANTCODE,V_USERID,V_USERNAME,V_STATUS,V_PP_CODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7121_UPDATEEQU", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7121_UPDATEEQU(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            @RequestParam(value = "V_EQU_DESC") String V_EQU_DESC,
            @RequestParam(value = "V_USERID") String V_USERID,
            @RequestParam(value = "V_USERNAME") String V_USERNAME,
            @RequestParam(value = "V_STATUS") String V_STATUS,
            @RequestParam(value = "V_PP_CODE") String V_PP_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7121_UPDATEEQU(V_EQU_ID, V_EQU_DESC, V_USERID, V_USERNAME, V_STATUS, V_PP_CODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7121_STOP", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7121_STOP(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7121_STOP(V_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7121_STARTEQU", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7121_STARTEQU(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7121_STARTEQU(V_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7122_SELECTVGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7122_SELECTVGLIST(
            @RequestParam(value = "V_VG_DESC") String V_VG_DESC,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7122_SELECTVGLIST(V_VG_DESC);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7122_ADDVGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7122_ADDVGURL(
            @RequestParam(value = "V_VG_DESC") String V_VG_DESC,
            @RequestParam(value = "V_URL") String V_URL,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7122_ADDVGURL(V_VG_DESC,V_URL);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7122_DELETEVGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7122_DELETEVGURL(
            @RequestParam(value = "V_ID") String V_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7122_DELETEVGURL(V_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7123_SELECTSTLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7123_SELECTSTLIST(
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7123_SELECTSTLIST(V_SITE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7123_ADDST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7123_ADDST(
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_TAG_DESC") String V_TAG_DESC,
            @RequestParam(value = "V_TAG_UNIT") String V_TAG_UNIT,
            @RequestParam(value = "V_STATUS") String V_STATUS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7123_ADDST(V_SITE_ID,V_TAG_DESC,V_TAG_UNIT,V_STATUS);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7123_UPDATEST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7123_UPDATEST(
            @RequestParam(value = "V_TAG_ID") String V_TAG_ID,
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_TAG_DESC") String V_TAG_DESC,
            @RequestParam(value = "V_TAG_UNIT") String V_TAG_UNIT,
            @RequestParam(value = "V_STATUS") String V_STATUS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7123_UPDATEST(V_TAG_ID,V_SITE_ID, V_TAG_DESC, V_TAG_UNIT, V_STATUS);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7123_STOPST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7123_STOPST(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7123_STOPST(V_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7123_STARTST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7123_STARTST(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7123_STARTST(V_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7124_SUPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7124_SUPPLYLIST(
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
            @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7124_SUPPLYLIST(V_SUPPLY_CODE,V_SUPPLY_NAME,V_SUPPLY_STATUS);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7124_ADDSUPPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7124_ADDSUPPLY(
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
            @RequestParam(value = "V_SUPPLY_DESC") String V_SUPPLY_DESC,
            @RequestParam(value = "V_SUPPLY_RENAGE") String V_SUPPLY_RENAGE,
            @RequestParam(value = "V_SUPPLY_MANAGER") String V_SUPPLY_MANAGER,
            @RequestParam(value = "V_LINK_PERSON") String V_LINK_PERSON,
            @RequestParam(value = "V_LINK_TYPE") String V_LINK_TYPE,
            @RequestParam(value = "V_LINK_PHONECODE") String V_LINK_PHONECODE,
            @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7124_ADDSUPPLY(V_SUPPLY_CODE, V_SUPPLY_NAME,V_SUPPLY_DESC,V_SUPPLY_RENAGE,V_SUPPLY_MANAGER,V_LINK_PERSON,V_LINK_TYPE,V_LINK_PHONECODE,V_SUPPLY_STATUS);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7124_UPDATESUPPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7124_UPDATESUPPLY(
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
            @RequestParam(value = "V_SUPPLY_DESC") String V_SUPPLY_DESC,
            @RequestParam(value = "V_SUPPLY_RENAGE") String V_SUPPLY_RENAGE,
            @RequestParam(value = "V_SUPPLY_MANAGER") String V_SUPPLY_MANAGER,
            @RequestParam(value = "V_LINK_PERSON") String V_LINK_PERSON,
            @RequestParam(value = "V_LINK_TYPE") String V_LINK_TYPE,
            @RequestParam(value = "V_LINK_PHONECODE") String V_LINK_PHONECODE,
            @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7124_UPDATESUPPLY(V_SUPPLY_CODE, V_SUPPLY_NAME,V_SUPPLY_DESC,V_SUPPLY_RENAGE,V_SUPPLY_MANAGER,V_LINK_PERSON,V_LINK_TYPE,V_LINK_PHONECODE,V_SUPPLY_STATUS);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7124_SUPPLYMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7124_SUPPLYMATLIST(
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7124_SUPPLYMATLIST(V_SUPPLY_CODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7124_ADDSUPPLYMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7124_ADDSUPPLYMAT(
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7124_ADDSUPPLYMAT(V_SUPPLY_CODE,V_MATERIALCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7124_DELSUPPLYMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7124_DELSUPPLYMAT(
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7124_DELSUPPLYMAT(V_SUPPLY_CODE,V_MATERIALCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7125_EQUVGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7125_EQUVGLIST(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7125_EQUVGLIST(V_PLANTCODE, V_DEPARTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7125_ADDEQUVG", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7125_ADDEQUVG(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            @RequestParam(value = "V_VG_IDL") String V_VG_IDL,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7125_ADDEQUVG(V_EQU_ID, V_VG_IDL);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7125_DELEQUVG", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7125_DELEQUVG(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            @RequestParam(value = "V_VG_ID") String V_VG_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7125_DELEQUVG(V_EQU_ID, V_VG_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7126_SITEVGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7126_SITEVGLIST(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7126_SITEVGLIST(V_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7126_ADDSITEVG", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7126_ADDSITEVG(
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_VG_ID") String V_VG_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7126_ADDSITEVG(V_SITE_ID, V_VG_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7126_DELSITEVG", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7126_DELSITEVG(
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_VG_ID") String V_VG_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7126_DELSITEVG(V_SITE_ID, V_VG_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_YEILD_SELECT_MANAGE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_YEILD_SELECT_MANAGE(
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_WORKDATE") String A_WORKDATE,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_YEILD_SELECT_MANAGE(A_EQUID,A_WORKDATE,A_CYCLE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_YEILD_INPUT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_YEILD_INPUT(
            @RequestParam(value = "A_EQU_ID") String A_EQU_ID,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            @RequestParam(value = "A_WORKDATE") String A_WORKDATE,
            @RequestParam(value = "A_INSERTVALUE") String A_INSERTVALUE,
            @RequestParam(value = "A_INSRTPERSON") String A_INSRTPERSON,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_YEILD_INPUT(A_EQU_ID, A_CYCLE_ID, A_WORKDATE,A_INSERTVALUE,A_INSRTPERSON);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_TEILD_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_TEILD_DELETE(
            @RequestParam(value = "A_ID") String A_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_TEILD_DELETE(A_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7111_EQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7111_EQULIST(
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7111_EQULIST(V_V_PLANTCODE,V_V_DEPTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7111_USEBJLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7111_USEBJLIST(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7111_USEBJLIST(V_V_EQUCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7111_TAGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7111_TAGLIST(
            @RequestParam(value = "PID") String PID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7111_TAGLIST(PID);
        return result;
    }
    @RequestMapping(value = "/uploadImageFile", method = RequestMethod.POST)
    @ResponseBody
    public Map uploadImageFile(@RequestParam(value = "upload") MultipartFile upload,
                               @RequestParam(value = "checktime") String checktime,
                               @RequestParam(value = "checkcount") String checkcount,
                               @RequestParam(value = "bjcode") String bjcode,
                               @RequestParam(value = "usercode") String usercode,
                               @RequestParam(value = "uesrname") String uesrname,
                               @RequestParam(value = "tagid") String tagid,
                               @RequestParam(value = "siteid") String siteid,
                               @RequestParam(value = "tagdesc") String tagdesc,
                               @RequestParam(value = "tagunit") String tagunit,
                               HttpServletRequest request,
                               HttpServletResponse response, ModelMap model) throws Exception {

        String filename = upload.getOriginalFilename();
        String path = request.getSession().getServletContext().getRealPath("upload");
        int length=(int)upload.getSize();
        File targetFile = new File(path, filename);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        //保存
        try {
            upload.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("fileUrl", request.getContextPath()+"/upload/"+filename);
        FileInputStream fis =  new FileInputStream(path+"/"+filename);
        Map result=pm_12Service.pro_run7111_addlog(bjcode, checktime, checkcount, fis,filename, usercode, uesrname,tagid,siteid,tagdesc);
        result.put("success",true);
        return result;
    }
    @RequestMapping(value = "/uploadNullImageFile", method = RequestMethod.POST)
    @ResponseBody
    public Map uploadNullImageFile(@RequestParam(value = "checktime") String checktime,
                               @RequestParam(value = "checkcount") String checkcount,
                               @RequestParam(value = "bjcode") String bjcode,
                               @RequestParam(value = "usercode") String usercode,
                               @RequestParam(value = "uesrname") String uesrname,
                               @RequestParam(value = "tagid") String tagid,
                               @RequestParam(value = "siteid") String siteid,
                               @RequestParam(value = "tagdesc") String tagdesc,
                               @RequestParam(value = "tagunit") String tagunit,
                               HttpServletRequest request,
                               HttpServletResponse response, ModelMap model) throws Exception {
        String filename =null;
        FileInputStream fis =null;
        Map result=pm_12Service.pro_run7111_addlog(bjcode, checktime, checkcount, fis,filename, usercode, uesrname,tagid,siteid,tagdesc);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7113_ORDERMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7113_ORDERMATLIST(
            @RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
            @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
            @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7113_ORDERMATLIST(V_DEPT_CODE,V_EQUIP_CODE,V_MATERIALCODE,V_MATERIALNAME);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7110_SITESUPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7110_SITESUPPLYLIST(
            @RequestParam(value = "A_ID") String A_ID,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7110_SITESUPPLYLIST(A_ID,A_MATERIALCODE,A_ORDERID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_SITE_BJ_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_SITE_BJ_ALL(
            @RequestParam(value = "IN_EQUID") String IN_EQUID,
            @RequestParam(value = "IN_PLANT") String IN_PLANT,
            @RequestParam(value = "IN_DEPART") String IN_DEPART,
            @RequestParam(value = "IN_STATUS") String IN_STATUS,
            @RequestParam(value = "IN_BJCODE") String IN_BJCODE,
            @RequestParam(value = "IN_BJDESC") String IN_BJDESC,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_SITE_BJ_ALL(IN_EQUID, IN_PLANT, IN_DEPART,IN_STATUS,IN_BJCODE,IN_BJDESC);
        return result;
    }
    @RequestMapping(value = "/pg_run7113_getordermatbarcode", method = RequestMethod.POST)
    @ResponseBody
    public Map pg_run7113_getordermatbarcode(
            @RequestParam(value = "a_orderid") String a_orderid,
            @RequestParam(value = "a_materialcode") String a_materialcode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.pg_run7113_getordermatbarcode(a_orderid,a_materialcode);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7113_CHANGEORDERMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7113_CHANGEORDERMAT(@RequestParam(value = "A_ID") String A_ID,
                                                          @RequestParam(value = "SITE_ID") String SITE_ID,
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
        HashMap result = pm_12Service.PRO_RUN7113_CHANGEORDERMAT(A_ID, SITE_ID, V_EQUIP_NO, USERID, USERNAME, PLANTCODE,
                WORKAREA, CHANGEDATE, V_MATERIALCODE, a_supplycode, a_supplyname, a_uniquecode, a_replacedate, a_faultreason, A_REASON_REMARK);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7113_CHANGECANCEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7113_CHANGECANCEL(
            @RequestParam(value = "V_I_ID") String V_I_ID,
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_EQUIP_NO") String V_EQUIP_NO,
            @RequestParam(value = "V_USERID") String V_USERID,
            @RequestParam(value = "V_USERNAME") String V_USERNAME,
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_CHANGETIME") String V_CHANGETIME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7113_CHANGECANCEL(V_I_ID, V_SITE_ID,V_EQUIP_NO,V_USERID,V_USERNAME,V_PLANTCODE,V_DEPARTCODE,V_CHANGETIME);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7132_ORDERMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7132_ORDERMATLIST(
            @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
            @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
            @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
            @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7132_ORDERMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE, V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE,V_V_MATERIALNAME);
        return result;
    }
    @RequestMapping(value = "/PRO_NO7132_DEPARTMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_NO7132_DEPARTMATLIST(
            @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
            @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
            @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
            @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_NO7132_DEPARTMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE, V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE, V_V_MATERIALNAME);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7114_EQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7114_EQULIST(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7114_EQULIST(V_V_DEPARTCODE,V_V_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7115_PERSONLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7115_PERSONLIST(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7115_PERSONLIST(V_V_DEPARTCODE, V_V_PLANTCODE,V_V_BJ_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7115_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7115_SELECT(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            @RequestParam(value = "V_V_USERID") String V_V_USERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7115_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID,V_V_USERID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7115_HANDLEALERT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7115_HANDLEALERT(
            @RequestParam(value = "V_V_ID") String V_V_ID,
            @RequestParam(value = "V_V_ALERT_CONTEXT") String V_V_ALERT_CONTEXT,
            @RequestParam(value = "V_V_HANDLE_USERID") String V_V_HANDLE_USERID,
            @RequestParam(value = "V_V_HANDLE_USERNAME") String V_V_HANDLE_USERNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7115_HANDLEALERT(V_V_ID, V_V_ALERT_CONTEXT, V_V_HANDLE_USERID, V_V_HANDLE_USERNAME);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7127_SELECTKC", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7127_SELECTKC(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7127_SELECTKC(V_PLANTCODE,V_DEPARTCODE,V_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7128_JUNKMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7128_JUNKMATLIST(
            @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
            @RequestParam(value = "D_END_DATE") String D_END_DATE,
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            @RequestParam(value = "V_STATUS") String V_STATUS,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7128_JUNKMATLIST(D_BEGIN_DATE, D_END_DATE, V_PLANTCODE, V_DEPARTCODE, V_EQU_ID, V_MATERIALCODE, V_MATERIALNAME, V_STATUS);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7129_JUNKMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7129_JUNKMAT(
            @RequestParam(value = "V_ID") String V_ID,
            @RequestParam(value = "V_HANDLE_TYPE") String V_HANDLE_TYPE,
            @RequestParam(value = "V_HANDLE_REMARK") String V_HANDLE_REMARK,
            @RequestParam(value = "V_HANDLE_USERID") String V_HANDLE_USERID,
            @RequestParam(value = "V_HANDLE_USERNAME") String V_HANDLE_USERNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7129_JUNKMAT(V_ID, V_HANDLE_TYPE, V_HANDLE_REMARK, V_HANDLE_USERID,V_HANDLE_USERNAME);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_YEILD_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_YEILD_SELECT(
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_YEILD_SELECT(A_EQUID, A_BEGINDATE, A_ENDDATE, A_CYCLE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_EQU_BJ_ALERT_ALL", method = RequestMethod.POST)
      @ResponseBody
      public Map PRO_RUN_EQU_BJ_ALERT_ALL(
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_EQU_BJ_ALERT_ALL(A_EQUID,A_CYCLE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_USE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_USE_ALL(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_BJ_UNIQUE_CODE") String A_BJ_UNIQUE_CODE,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_USE_ALL(A_PLANTCODE, A_DEPARTCODE,A_EQUID,A_BJ_UNIQUE_CODE,A_BEGINDATE,A_ENDDATE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN_BJ_CHANGE_LOG_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_BJ_CHANGE_LOG_ALL(
            @RequestParam(value = "A_BJ_UNIQUE_CODE") String A_BJ_UNIQUE_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN_BJ_CHANGE_LOG_ALL(A_BJ_UNIQUE_CODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7112_CHECKLOGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7112_CHECKLOGLIST(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_ID") String V_V_ID,
            @RequestParam(value = "V_V_BTIME") String V_V_BTIME,
            @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7112_CHECKLOGLIST(V_V_EQUCODE,V_V_DEPTCODE,V_V_PLANTCODE,V_V_ID,V_V_BTIME,V_V_ETIME);
        return result;
    }
    @RequestMapping(value = "/ImgDownLoad", method = RequestMethod.GET)
    @ResponseBody
    public Map ImgDownLoad(@RequestParam(value = "V_V_ID") String V_V_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map resultTemp= pm_12Service.PRO_RUN7112_LOGPIC(V_V_ID);
        Map result = new HashMap();
        if(resultTemp.get("O_FILE")!=null) {
            String fileName = (String) resultTemp.get("O_FILENAME");
            InputStream fileStream = ((Blob) resultTemp.get("O_FILE")).getBinaryStream();
            BufferedInputStream reader = new BufferedInputStream(fileStream);
            BufferedOutputStream writer = new BufferedOutputStream(response.getOutputStream());
            byte[] bytes = new byte[1024 * 1024];
            int length = reader.read(bytes);
            while ((length > 0)) {
                writer.write(bytes, 0, length);
                length = reader.read(bytes);
            }
            reader.close();
            writer.close();
        }
        result.put("success",true);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7116_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7116_SELECT(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            @RequestParam(value = "V_V_BEGIN_DATE") String V_V_BEGIN_DATE,
            @RequestParam(value = "V_V_END_DATE") String V_V_END_DATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7116_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID, V_V_BEGIN_DATE, V_V_END_DATE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7117_BJLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7117_BJLIST(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7117_BJLIST(V_V_DEPARTCODE, V_V_PLANTCODE);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7117_BJWORKLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7117_BJWORKLIST(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7117_BJWORKLIST(V_V_DEPARTCODE, V_V_PLANTCODE,V_V_BJ_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7118_WORKTIMELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7118_WORKTIMELIST(
            @RequestParam(value = "V_V_SITE_ID") String V_V_SITE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7118_WORKTIMELIST(V_V_SITE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7119_SITEVGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7119_SITEVGURL(
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7119_SITEVGURL(V_SITE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7129_EQUVGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7129_EQUVGURL(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7129_EQUVGURL(V_EQU_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7130_SELECTBJTIME", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7130_SELECTBJTIME(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
            @RequestParam(value = "D_END_DATE") String D_END_DATE,
            @RequestParam(value = "V_CYCLE_ID") String V_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7130_SELECTBJTIME(V_PLANTCODE,V_DEPARTCODE,V_SUPPLY_CODE,V_MATERIALNAME,D_BEGIN_DATE,D_END_DATE,V_CYCLE_ID);
        return result;
    }
    @RequestMapping(value = "/PRO_RUN7131_SUPPLYBJAVG", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7131_SUPPLYBJAVG(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_CYCLE_ID") String V_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = pm_12Service.PRO_RUN7131_SUPPLYBJAVG(V_PLANTCODE,V_DEPARTCODE,V_EQU_ID,V_SITE_ID,V_CYCLE_ID);
        return result;
    }
}
