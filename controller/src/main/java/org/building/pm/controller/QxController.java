package org.building.pm.controller;

import org.building.pm.service.QxService;
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
@RequestMapping("/app/pm/qx")
public class QxController {

    @Autowired
    private QxService qxService;

    @RequestMapping(value = "PRO_PM_07_DEPTEQUTYPE_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEPTEQUTYPE_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                            HttpServletRequest request)
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
                V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE, V_V_SOURCECODE, V_V_DEFECTLIST, X_PERSONCODE,V_V_PAGE,V_V_PAGESIZE);
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
        Map<String, Object> result = qxService.PRO_PM_07_SAP_EQU_GET(V_V_PERSONCODE,V_V_DEPTCODE,V_V_DEPTNEXTCODE,
                V_V_EQUTYPECODE,V_V_EQUCODE);
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
        result = qxService.PRO_PM_07_PP_DEFECT_SET(V_I_ID, V_V_EQUCODE, V_V_EQUTYPE,V_V_CHILDEQUCODE,V_V_CLASS,
                V_V_CLASSTYPE,V_D_DEFECTDATE,V_D_INDATE,V_V_DESCRIPTION,V_V_SUGGESTION,V_V_PERSONCODE,V_V_PERSONNAME,
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
        result = qxService.PRO_PM_07_DEFECTDESCRIBE_SET(V_I_ID, V_V_EQUCODE, V_V_DESCRIPTION, V_V_SUGGESTION,V_V_PERSONCODE,V_V_PERSONNAME,
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

        HashMap data = qxService.PRO_PM_07_WORKORDER_DEFECT(V_V_PERNAME,V_V_DEFECT_GUID);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }
}
