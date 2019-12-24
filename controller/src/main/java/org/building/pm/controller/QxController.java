package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.QxService;
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
@RequestMapping("/app/pm/qx")
public class QxController {

    @Autowired
    private QxService qxService;

    @RequestMapping(value = "PRO_PM_07_DEPTEQUTYPE_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEPTEQUTYPE_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                         @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEPTEQUTYPE_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEPTEQU_PER_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEPTEQU_PER_DROP(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                          @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                          @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                          HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEPTEQU_PER_DROP(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_STATE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_STATE_VIEW(
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_STATE_VIEW();
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_SOURCE_COUNT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_SOURCE_COUNT(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                                             @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                             @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                             @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                             @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                             @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                                             @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_SOURCE_COUNT(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE,
                V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE, V_V_DEFECTLIST, X_PERSONCODE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_VIEW_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_VIEW_PER(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                                         @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                         @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                         @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                                         @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                                         @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                         @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                         @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_VIEW_PER(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE,
                V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE, V_V_SOURCECODE, V_V_DEFECTLIST, X_PERSONCODE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_GET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                    HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_GET(V_V_GUID);
        return result;
    }


    @RequestMapping(value = "/PRO_PM_07_DEFECT_SET_XQ", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_DEFECT_SET_XQ(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                       @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                       @RequestParam(value = "V_V_XQYY") String V_V_XQYY,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = qxService.PRO_PM_07_DEFECT_SET_XQ(V_V_GUID, V_V_PERCODE, V_V_XQYY);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_07_DEFECT_LOG_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_LOG_VIEW(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {

        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_LOG_VIEW(V_V_GUID);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_TJ_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_TJ_VIEW(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                                        @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                                        @RequestParam(value = "V_V_DEPTCODE2") String V_V_DEPTCODE2,
                                                        @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                        @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                        @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                        @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                                        HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_TJ_VIEW(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE2,
                V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_SOURCECODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_07_DEFECT_SOURCE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_SOURCE_VIEW(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_SOURCE_VIEW();
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_GET_DEPTEQU_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_GET_DEPTEQU_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                         @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                         @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_GET_DEPTEQU_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        return result;
    }


    @RequestMapping(value = "PRO_PM_07_BASEDIC_LIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_BASEDIC_LIST(@RequestParam(value = "IS_V_BASETYPE") String IS_V_BASETYPE,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_BASEDIC_LIST(IS_V_BASETYPE);
        return result;
    }


    @RequestMapping(value = "PRO_PM_07_SAP_EQU_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_SAP_EQU_GET(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                     @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                                     @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                     HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_SAP_EQU_GET(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE,
                V_V_EQUTYPECODE, V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_07_PP_DEFECT_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_PP_DEFECT_SET(@RequestParam(value = "V_I_ID") String V_I_ID,
                                       @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                       @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                       @RequestParam(value = "V_V_CHILDEQUCODE") String V_V_CHILDEQUCODE,
                                       @RequestParam(value = "V_V_CLASS") String V_V_CLASS,
                                       @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE,
                                       @RequestParam(value = "V_D_DEFECTDATE") String V_D_DEFECTDATE,
                                       @RequestParam(value = "V_D_INDATE") String V_D_INDATE,
                                       @RequestParam(value = "V_V_DESCRIPTION") String V_V_DESCRIPTION,
                                       @RequestParam(value = "V_V_SUGGESTION") String V_V_SUGGESTION,
                                       @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                       @RequestParam(value = "V_V_PERSONNAME") String V_V_PERSONNAME,
                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = qxService.PRO_PM_07_PP_DEFECT_SET(V_I_ID, V_V_EQUCODE, V_V_EQUTYPE, V_V_CHILDEQUCODE, V_V_CLASS,
                V_V_CLASSTYPE, V_D_DEFECTDATE, V_D_INDATE, V_V_DESCRIPTION, V_V_SUGGESTION, V_V_PERSONCODE, V_V_PERSONNAME,
                V_V_DEPTCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_07_DEFECTDESCRIBE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_DEFECTDESCRIBE_SET(@RequestParam(value = "V_I_ID") String V_I_ID,
                                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                            @RequestParam(value = "V_V_DESCRIPTION") String V_V_DESCRIPTION,
                                            @RequestParam(value = "V_V_SUGGESTION") String V_V_SUGGESTION,
                                            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                            @RequestParam(value = "V_V_PERSONNAME") String V_V_PERSONNAME,
                                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = qxService.PRO_PM_07_DEFECTDESCRIBE_SET(V_I_ID, V_V_EQUCODE, V_V_DESCRIPTION, V_V_SUGGESTION, V_V_PERSONCODE, V_V_PERSONNAME,
                V_V_DEPTCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECTDESCRIPTION_L", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECTDESCRIPTION_L(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEFECTDESCRIPTION_L(V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_07_DEFECT_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_DEFECT_EDIT(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                     @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                     @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = qxService.PRO_PM_07_DEFECT_EDIT(V_V_GUID, V_V_PERCODE, V_V_DEFECTLIST);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_07_WORKORDER_DEFECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_WORKORDER_DEFECT(
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = qxService.PRO_PM_07_WORKORDER_DEFECT(V_V_PERNAME, V_V_DEFECT_GUID);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    /*预装件，小机修，修旧类型查询*/
    @RequestMapping(value = "PRO_DEFECT_PART_TYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DEFECT_PART_TYPE_SEL()
            throws SQLException {
        Map<String, Object> result = qxService.PRO_DEFECT_PART_TYPE_SEL();
        return result;
    }

    /*预装件，小机修，修旧数据查询*/
    @RequestMapping(value = "PRO_DEFECT_PART_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DEFECT_PART_DATA_SEL(@RequestParam(value = "V_V_TYPE") String V_V_TYPE,
                                                        @RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                        @RequestParam(value = "V_V_STATE") String V_V_STATE,
                                                        @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                        @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_DEFECT_PART_DATA_SEL(V_V_TYPE, V_V_INPER, V_V_STATE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    /*预装件，小机修，修旧工单创建*/
    @RequestMapping(value = "PRO_DEFECT_PART_WORKORDER_C", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DEFECT_PART_WORKORDER_C(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_GUID") String V_V_GUID)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_DEFECT_PART_WORKORDER_C(V_V_PERCODE, V_V_GUID);
        return result;
    }

    /*预装件，小机修，修旧工单保存*/
    @RequestMapping(value = "PRO_DEFECT_PART_WORKORDER_S", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_DEFECT_PART_WORKORDER_S(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
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
                                                 @RequestParam(value = "V_V_SAFE") String V_V_SAFE)
            throws SQLException {
        List<Map> result = qxService.PRO_DEFECT_PART_WORKORDER_S(V_V_PERCODE, V_V_PERNAME, V_V_GUID, V_V_ORDERGUID, V_V_SHORT_TXT, V_V_DEPTCODEREPAIR, V_D_START_DATE, V_D_FINISH_DATE, V_V_WBS, V_V_WBS_TXT, V_V_TOOL, V_V_TECHNOLOGY, V_V_SAFE);
        return result;
    }

    /*
     * 通过预装件设置生成多次缺陷
     * */
    @RequestMapping(value = "PRO_DEFECT_YZJ_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_DEFECT_YZJ_CREATE(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                           @RequestParam(value = "V_V_MODEL_GUID") String V_V_MODEL_GUID)
            throws SQLException {
        List<Map> result = qxService.PRO_DEFECT_YZJ_CREATE(V_V_PERCODE, V_V_MODEL_GUID);
        return result;
    }


    @RequestMapping(value = "PRO_PM_07_DEFECT_PART_COUNT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_DEFECT_PART_COUNT(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                           @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                           @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE)
            throws SQLException {
        Map result = qxService.PRO_PM_07_DEFECT_PART_COUNT(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE, V_V_DEFECTLIST, X_PERSONCODE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_PART_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_07_DEFECT_PART_PER(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                         @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                         @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                         @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                         @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                         @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                         @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE)
            throws SQLException {
        Map result = qxService.PRO_PM_07_DEFECT_PART_PER(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE, V_V_SOURCECODE, V_V_DEFECTLIST, X_PERSONCODE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_VIEW_QXGZSEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_VIEW_QXGZSEL(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                                             @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                             @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                             @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                             @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                             @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                                             @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                                             @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                             @RequestParam(value = "V_V_FZPERCODE") String V_V_FZPERCODE,
                                                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_VIEW_QXGZSEL(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE,
                V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE, V_V_SOURCECODE, V_V_DEFECTLIST, X_PERSONCODE, V_V_FZPERCODE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/Defect_TypQ", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void Defect_TypQ(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                            @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                            @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                            @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                            @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                            @RequestParam(value = "V_V_FZPERCODE") String V_V_FZPERCODE,
                            HttpServletResponse response) throws SQLException {

        List list = new ArrayList();
        Map<String, Object> data = qxService.PRO_PM_07_DEFECT_VIEW_TYPQ(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE.equals("all") ? "%" : V_V_DEPTCODE,
                V_V_EQUTYPECODE.equals("all") ? "%" : V_V_EQUTYPECODE, V_V_EQUCODE.equals("all") ? "%" : V_V_EQUCODE, V_V_STATECODE.equals("all") ? "%" : V_V_STATECODE,
                V_V_SOURCECODE.equals("all") ? "%" : V_V_SOURCECODE, V_V_DEFECTLIST, X_PERSONCODE, V_V_FZPERCODE, "1", "1000000");

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("WBS编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("维修工程项目名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("缺陷明细");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("处理意见");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("缺陷日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("负责人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("缺陷状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("缺陷来源");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("WEBCODE") == null ? "" : map.get("WEBCODE").toString());

                row.createCell((short) 2).setCellValue(map.get("WBSNAME") == null ? "" : map.get("WBSNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_DEFECTLIST") == null ? "" : map.get("V_DEFECTLIST").toString());

                row.createCell((short) 5).setCellValue(map.get("V_IDEA") == null ? "" : map.get("V_IDEA").toString());

                row.createCell((short) 6).setCellValue(map.get("D_DEFECTDATE") == null ? "" : map.get("D_DEFECTDATE").toString());

                row.createCell((short) 7).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_PERNAME") == null ? "" : map.get("V_PERNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_SOURCENAME") == null ? "" : map.get("V_SOURCENAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("缺陷来源.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_VIEW_TYPQ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_VIEW_TYPQ(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                                          @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                          @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                          @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                          @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                          @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                                          @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                                          @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                          @RequestParam(value = "V_V_FZPERCODE") String V_V_FZPERCODE,
                                                          @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                          @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                          HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_PM_07_DEFECT_VIEW_TYPQ(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE,
                V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE, V_V_SOURCECODE, V_V_DEFECTLIST, X_PERSONCODE, V_V_FZPERCODE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }


    @RequestMapping(value = "PRO_DEFECT_SOURCE_COUNT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DEFECT_SOURCE_COUNT_SEL(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                                           @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                           @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                           @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                                           @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                           @RequestParam(value = "V_V_FZPERCODE") String V_V_FZPERCODE,
                                                           HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = qxService.PRO_DEFECT_SOURCE_COUNT_SEL(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE,
                V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE, V_V_DEFECTLIST, X_PERSONCODE, V_V_FZPERCODE);
        return result;
    }
}
