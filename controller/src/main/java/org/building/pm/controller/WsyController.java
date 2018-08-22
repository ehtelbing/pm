package org.building.pm.controller;

import org.apache.commons.codec.binary.Base64;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.building.pm.service.WsyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/Wsy")
public class WsyController {
    @Autowired
    private WsyService wsyService;

    //传入设备编码查询关联设备信息
    @RequestMapping(value = "/PM_1917_JXMX_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_1917_JXMX_DATA_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE, @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE, @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE, @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE, @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE, @RequestParam(value = "V_V_JXMX_NAME") String V_V_JXMX_NAME, @RequestParam(value = "V_V_PAGE") String V_V_PAGE, @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_1917_JXMX_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_JXMX_NAME, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PM_1917_JXGX_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_1917_JXGX_DATA_SEL(@RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_1917_JXGX_DATA_SEL(V_V_JXMX_CODE);
        return data;
    }

    @RequestMapping(value = "/PRO_BASE_PERSON_DE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_BASE_PERSON_DE_SEL(@RequestParam(value = "start") Integer start,
                                                          @RequestParam(value = "limit") Integer limit, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_BASE_PERSON_DE_SEL();
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_TOOL_BYCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_PM_19_TOOL_BYCODE_SEL(@RequestParam(value = "V_V_TOOLCODE") String V_V_TOOLCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_19_TOOL_BYCODE_SEL(V_V_TOOLCODE);
        return data;
    }

    @RequestMapping(value = "/BASE_GJ_BYGX_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GJ_BYGX_SEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GJ_BYGX_SEL(V_V_JXGX_CODE);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_19_CARDE_GXSEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_PM_19_CARDE_GXSEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_19_CARDE_GXSEL(V_V_JXGX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_JXMX_JJCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_JJCODE_SEL(@RequestParam(value = "V_V_CAR_CODE") String V_V_CAR_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_JJCODE_SEL(V_V_CAR_CODE);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_19_WORKDE_GXSEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_PM_19_WORKDE_GXSEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_19_WORKDE_GXSEL(V_V_JXGX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_BY_GXCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_BY_GXCODE_SEL(@RequestParam(value = "V_V_GX_CODE") String V_V_GX_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_BY_GXCODE_SEL(V_V_GX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_AQYA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_AQYA_SEL(@RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_AQYA_SEL(V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_FAULT_ITEM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_FAULT_ITEM_SEL(@RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_FAULT_ITEM_SEL(V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_BYCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_BYCODE_SEL(@RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_BYCODE_SEL(V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_ZG_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_ZG_SEL(@RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_ZG_SEL(V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_JXMX_GZ_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_GZ_INS(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_PERCODE_DE") String V_V_PERCODE_DE, @RequestParam(value = "V_V_PERNAME_DE") String V_V_PERNAME_DE, @RequestParam(value = "V_V_TS") String V_V_TS, @RequestParam(value = "V_V_DE") String V_V_DE, @RequestParam(value = "V_V_PERTYPE_DE") String V_V_PERTYPE_DE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_GZ_INS(V_V_JXGX_CODE, V_V_PERCODE_DE, V_V_PERNAME_DE, V_V_TS, V_V_DE, V_V_PERTYPE_DE);
        return data;
    }

    @RequestMapping(value = "/BASE_FILE_CHAKAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_FILE_CHAKAN_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_FILE_CHAKAN_SEL(V_V_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_JXBZ_BY_GXCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXBZ_BY_GXCODE_SEL(@RequestParam(value = "V_V_GX_CODE") String V_V_GX_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXBZ_BY_GXCODE_SEL(V_V_GX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_JXBZ_GD_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXBZ_GD_SEL(@RequestParam(value = "V_V_JXBZ_GUID") String V_V_JXBZ_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXBZ_GD_SEL(V_V_JXBZ_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_JXBZ_QX_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXBZ_QX_SEL(@RequestParam(value = "V_V_GD_GUID") String V_V_GD_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXBZ_QX_SEL(V_V_GD_GUID);
        return data;
    }

    @RequestMapping(value = "/PM_REPAIR_JS_STANDARD_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_REPAIR_JS_STANDARD_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE, @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE, @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE, @RequestParam(value = "V_V_EQUCHILDCODE") String V_V_EQUCHILDCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_REPAIR_JS_STANDARD_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE, V_V_EQUCHILDCODE);
        return data;
    }

    @RequestMapping(value = "/BASE_JJ_BYJXBZ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JJ_BYJXBZ_SEL(@RequestParam(value = "V_V_JXBZ_GUID") String V_V_JXBZ_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JJ_BYJXBZ_SEL(V_V_JXBZ_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GJ_BYJXBZ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GJ_BYJXBZ_SEL(@RequestParam(value = "V_V_JXBZ_GUID") String V_V_JXBZ_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GJ_BYJXBZ_SEL(V_V_JXBZ_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GZ_BYJXBZ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GZ_BYJXBZ_SEL(@RequestParam(value = "V_V_JXBZ_GUID") String V_V_JXBZ_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GZ_BYJXBZ_SEL(V_V_JXBZ_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GD_BY_GXGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GD_BY_GXGUID_SEL(@RequestParam(value = "V_V_GX_GUID") String V_V_GX_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GD_BY_GXGUID_SEL(V_V_GX_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GZ_BY_GDGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GZ_BY_GDGUID_SEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GZ_BY_GDGUID_SEL(V_V_ORDERGUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GJ_BY_GDGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GJ_BY_GDGUID_SEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GJ_BY_GDGUID_SEL(V_V_ORDERGUID);
        return data;
    }

    @RequestMapping(value = "/BASE_JJ_BY_GDGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JJ_BY_GDGUID_SEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JJ_BY_GDGUID_SEL(V_V_ORDERGUID);
        return data;
    }

    @RequestMapping(value = "/PM_1917_JXGX_WL_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_1917_JXGX_WL_DATA_SEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_1917_JXGX_WL_DATA_SEL(V_V_JXGX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_WL_BY_GDGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_WL_BY_GDGUID_SEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_WL_BY_GDGUID_SEL(V_V_ORDERGUID);
        return data;
    }

    @RequestMapping(value = "/BASE_JXBZ_BY_GXCODE_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXBZ_BY_GXCODE_INS(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_JSYQ_CODE") String V_V_JSYQ_CODE, @RequestParam(value = "V_V_JSYQ_NAME") String V_V_JSYQ_NAME, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXBZ_BY_GXCODE_INS(V_V_JXGX_CODE, V_V_JSYQ_CODE, V_V_JSYQ_NAME);
        return data;
    }

    @RequestMapping(value = "/PRO_SAP_PM_EQU_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> PRO_SAP_PM_EQU_TREE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE, @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE, @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE, @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<HashMap> result = wsyService.PRO_SAP_PM_EQU_TREE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUTYPECODE, V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/BASE_JXMX_DATA_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_DATA_EDIT(@RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE, @RequestParam(value = "V_V_JXMX_NAME") String V_V_JXMX_NAME, @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE, @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE, @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE, @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE, @RequestParam(value = "V_V_EQUCODE_CHILD") String V_V_EQUCODE_CHILD, @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE, @RequestParam(value = "V_V_BZ") String V_V_BZ, @RequestParam(value = "V_V_HOUR") String V_V_HOUR, @RequestParam(value = "V_V_IN_PER") String V_V_IN_PER, @RequestParam(value = "V_V_IN_DATE") String V_V_IN_DATE, @RequestParam(value = "V_V_MXBB_NUM") String V_V_MXBB_NUM, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_DATA_EDIT(V_V_JXMX_CODE, V_V_JXMX_NAME, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_EQUCODE_CHILD, V_V_REPAIRMAJOR_CODE, V_V_BZ, V_V_HOUR, V_V_IN_PER, V_V_IN_DATE, V_V_MXBB_NUM);
        return data;
    }

    @RequestMapping(value = "/BASE_JXMX_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_DATA_DEL(@RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_DATA_DEL(V_V_JXMX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_GX_GZ_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_GZ_DEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_PERCODE_DE") String V_V_PERCODE_DE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_GZ_DEL(V_V_JXGX_CODE, V_V_PERCODE_DE);
        return data;
    }

    @RequestMapping(value = "/BASE_GX_WL_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_WL_DEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_WLCODE") String V_V_WLCODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_WL_DEL(V_V_JXGX_CODE, V_V_WLCODE);
        return data;
    }

    @RequestMapping(value = "/BASE_GX_JXBZ_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_JXBZ_DEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_JSYQ_CODE") String V_V_JSYQ_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_JXBZ_DEL(V_V_JXGX_CODE, V_V_JSYQ_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_GX_AQCS_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_AQCS_DEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_AQCS_DEL(V_V_JXGX_CODE, V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_EXAMINE_CAR_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_EXAMINE_CAR_SEL(@RequestParam(value = "V_V_CARCODE") String V_V_CARCODE, @RequestParam(value = "V_V_CARNAME") String V_V_CARNAME, @RequestParam(value = "start") Integer start,
                                                        @RequestParam(value = "limit") Integer limit, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_EXAMINE_CAR_SEL(V_V_CARCODE, V_V_CARNAME);
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/BASE_JXMX_JJ_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_JJ_INS(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_JJ_CODE") String V_V_JJ_CODE, @RequestParam(value = "V_V_JJ_NAME") String V_V_JJ_NAME, @RequestParam(value = "V_V_JJ_TYPE") String V_V_JJ_TYPE, @RequestParam(value = "V_V_JJ_TS") String V_V_JJ_TS, @RequestParam(value = "V_V_JJ_DE") String V_V_JJ_DE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_JJ_INS(V_V_JXGX_CODE, V_V_JJ_CODE, V_V_JJ_NAME, V_V_JJ_TYPE, V_V_JJ_TS, V_V_JJ_DE);
        return data;
    }

    @RequestMapping(value = "/BASE_JXMX_GJ_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_GJ_INS(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_GJ_CODE") String V_V_GJ_CODE, @RequestParam(value = "V_V_GJ_NAME") String V_V_GJ_NAME, @RequestParam(value = "V_V_GJ_TYPE") String V_V_GJ_TYPE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_GJ_INS(V_V_JXGX_CODE, V_V_GJ_CODE, V_V_GJ_NAME, V_V_GJ_TYPE);
        return data;
    }

    @RequestMapping(value = "/BASE_JXMX_WL_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_WL_INS(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_WLCODE") String V_V_WLCODE, @RequestParam(value = "V_V_KFNAME") String V_V_KFNAME, @RequestParam(value = "V_V_WLSM") String V_V_WLSM, @RequestParam(value = "V_V_GGXH") String V_V_GGXH, @RequestParam(value = "V_V_JLDW") String V_V_JLDW, @RequestParam(value = "V_V_PRICE") String V_V_PRICE, @RequestParam(value = "V_V_USE_NUM") String V_V_USE_NUM, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_WL_INS(V_V_JXGX_CODE, V_V_WLCODE, V_V_KFNAME, V_V_WLSM, V_V_GGXH, V_V_JLDW, V_V_PRICE, V_V_USE_NUM);
        return data;
    }

    @RequestMapping(value = "/BASE_WORK_TOOL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_WORK_TOOL_SEL(@RequestParam(value = "start") Integer start,
                                                      @RequestParam(value = "limit") Integer limit, HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_WORK_TOOL_SEL();
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/BASE_GX_JJ_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_JJ_DEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_JJ_CODE") String V_V_JJ_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_JJ_DEL(V_V_JXGX_CODE, V_V_JJ_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_GX_GJ_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_GJ_DEL(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_GJ_CODE") String V_V_GJ_CODE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_GJ_DEL(V_V_JXGX_CODE, V_V_GJ_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_WL_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_WL_SEL(@RequestParam(value = "start") Integer start,
                                               @RequestParam(value = "limit") Integer limit, HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_WL_SEL();
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/BASE_GX_GZ_UPD", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_GZ_UPD(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_PERCODE_DE") String V_V_PERCODE_DE, @RequestParam(value = "V_V_TS") String V_V_TS, @RequestParam(value = "V_V_DE") String V_V_DE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_GZ_UPD(V_V_JXGX_CODE, V_V_PERCODE_DE, V_V_TS, V_V_DE);
        return data;
    }

    @RequestMapping(value = "/BASE_GX_JJ_UPD", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_JJ_UPD(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_JJ_CODE") String V_V_JJ_CODE, @RequestParam(value = "V_V_JJ_TS") String V_V_JJ_TS, @RequestParam(value = "V_V_JJ_DE") String V_V_JJ_DE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_JJ_UPD(V_V_JXGX_CODE, V_V_JJ_CODE, V_V_JJ_TS, V_V_JJ_DE);
        return data;
    }

    @RequestMapping(value = "/BASE_GX_GJ_UPD", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_GJ_UPD(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_TOOLCODE") String V_V_TOOLCODE, @RequestParam(value = "V_V_TOOLTYPE") String V_V_TOOLTYPE, @RequestParam(value = "V_V_TOOLPLACE") String V_V_TOOLPLACE, @RequestParam(value = "V_V_TOOLINDATE") String V_V_TOOLINDATE, @RequestParam(value = "V_V_TOOLSTATUS") String V_V_TOOLSTATUS, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_GJ_UPD(V_V_JXGX_CODE, V_V_TOOLCODE, V_V_TOOLTYPE, V_V_TOOLPLACE, V_V_TOOLINDATE, V_V_TOOLSTATUS);
        return data;
    }

    @RequestMapping(value = "/BASE_GX_WL_UPD", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GX_WL_UPD(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_WLCODE") String V_V_WLCODE, @RequestParam(value = "V_V_WLSM") String V_V_WLSM, @RequestParam(value = "V_V_GGXH") String V_V_GGXH, @RequestParam(value = "V_V_JLDW") String V_V_JLDW, @RequestParam(value = "V_V_PRICE") String V_V_PRICE, @RequestParam(value = "V_V_USE_NUM") String V_V_USE_NUM, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GX_WL_UPD(V_V_JXGX_CODE, V_V_WLCODE, V_V_WLSM, V_V_GGXH, V_V_JLDW, V_V_PRICE, V_V_USE_NUM);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_SEL(@RequestParam(value = "V_V_AQCS_NAME") String V_V_AQCS_NAME, @RequestParam(value = "start") Integer start,
                                                 @RequestParam(value = "limit") Integer limit, HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_SEL(V_V_AQCS_NAME);
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }
        result.put("total", total);
        result.put("list", pageList);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/BASE_JXMX_AQCS_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_AQCS_INS(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE, @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE, @RequestParam(value = "V_V_AQCS_NAME") String V_V_AQCS_NAME, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_AQCS_INS(V_V_JXGX_CODE, V_V_AQCS_CODE, V_V_AQCS_NAME);
        return data;
    }

    //附件下载
    @RequestMapping(value = "/downloadAttachment", method = RequestMethod.GET)
    @ResponseBody
    public void downloadAttachment(@RequestParam(value = "V_V_GUID") String V_V_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_FILE_IMAGE_DOWNLOAD(V_V_GUID);
        String fileName = (String) data.get("O_FILENAME");
        Blob fileblob = (Blob) data.get("O_FILE");
        InputStream is = fileblob.getBinaryStream();
        String agent = (String) request.getHeader("USER-AGENT");
        if (agent != null && agent.toLowerCase().indexOf("firefox") > 0) {// 兼容火狐中文文件名下载
            fileName = "=?UTF-8?B?" + (new String(Base64.encodeBase64(fileName.getBytes("UTF-8")))) + "?=";
        } else {
            fileName = java.net.URLEncoder.encode(fileName, "UTF-8");
        }
        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        ServletOutputStream fos = response.getOutputStream();
        byte[] b = new byte[65535];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        fos.flush();
        is.close();
        fos.close();
    }

    // 图片上传
    @RequestMapping(value = "/BASE_FILE_IMAGE_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_FILE_IMAGE_INS(@RequestParam(value = "V_V_GUID") String V_V_GUID, @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME, @RequestParam(value = "V_V_FILEBLOB") MultipartFile V_V_FILE, @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE, @RequestParam(value = "V_V_PLANT") String V_V_PLANT, @RequestParam(value = "V_V_DEPT") String V_V_DEPT, @RequestParam(value = "V_V_TIME") String V_V_TIME, @RequestParam(value = "V_V_PERSON") String V_V_PERSON, @RequestParam(value = "V_V_REMARK") String V_V_REMARK, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap<String, Object> result = new HashMap<String, Object>();
        HashMap data = wsyService.BASE_FILE_IMAGE_INS(V_V_GUID, V_V_FILENAME, V_V_FILE.getInputStream(), V_V_FILETYPECODE, V_V_PLANT, V_V_DEPT, V_V_TIME, V_V_PERSON, V_V_REMARK);
        result.put("INFO", (String) data.get("INFO"));
        result.put("FILE_GUID", (String) data.get("FILE_GUID"));
        result.put("success", true);
        return result;
    }

    // 图片删除
    @RequestMapping(value = "/BASE_FILE_IMAGE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_FILE_IMAGE_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_FILE_IMAGE_DEL(V_V_GUID);
        return data;
    }

    // 查询图片
    @RequestMapping(value = "/BASE_FILE_IMAGE_SEL", method = RequestMethod.GET)
    @ResponseBody
    public HashMap BASE_FILE_IMAGE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID, @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap resultTemp = wsyService.BASE_FILE_IMAGE_SEL(V_V_GUID, V_V_FILEGUID);
        HashMap result = new HashMap();
        if (resultTemp.get("O_FILE") != null) {
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
        result.put("success", true);
        return result;
    }

    // 查询imageStore
    @RequestMapping(value = "/BASE_FILE_IMAGE_TABLE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap BASE_FILE_IMAGE_TABLE(@RequestParam(value = "V_V_GUID") String V_V_GUID, @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_FILE_IMAGE_SEL(V_V_GUID, V_V_FILEGUID);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_BASEDIC_LIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PM_BASEDIC_LIST(@RequestParam(value = "IS_V_BASETYPE") String IS_V_BASETYPE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_BASEDIC_LIST(IS_V_BASETYPE);
        return data;
    }

    @RequestMapping(value = "/PM_REALINFOTL_QUERY", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_REALINFOTL_QUERY(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_REALINFOTL_QUERY();
        return data;
    }

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_BASE_DEPT_VIEW(@RequestParam(value = "IS_V_DEPTCODE") String IS_V_DEPTCODE, @RequestParam(value = "IS_V_DEPTTYPE") String IS_V_DEPTTYPE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_BASE_DEPT_VIEW(IS_V_DEPTCODE, IS_V_DEPTTYPE);
        return data;
    }

    @RequestMapping(value = "/PRO_PP_INFORMATION_SET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PP_INFORMATION_SET(@RequestParam(value = "V_V_I_ID") String V_V_I_ID, @RequestParam(value = "V_V_DEPT") String[] V_V_DEPT, @RequestParam(value = "V_V_INFORMATION") String V_V_INFORMATION, @RequestParam(value = "V_V_D_DATE") String V_V_D_DATE, @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_PERSONNAME") String V_V_PERSONNAME, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASS") String V_V_CLASS, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, @RequestParam(value = "V_V_NOTIFICATION") String V_V_NOTIFICATION, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data;
        int sum = 0;
        for (int i = 0; i < V_V_DEPT.length; i++) {
            data = wsyService.PRO_PP_INFORMATION_SET(V_V_I_ID, V_V_DEPT[i], V_V_INFORMATION, V_V_D_DATE, V_V_PERSONCODE, V_V_PERSONNAME, V_V_TYPE, V_V_CLASS, V_V_CLASSTYPE, V_V_NOTIFICATION);
            if (!"success".equals(data.get("V_INFO"))) {
                sum = sum + 1;
                System.out.println(data.get("V_INFO"));
            }
        }
        HashMap result = new HashMap();
        if (sum == 0) {
            result.put("V_INFO", "Success");
        } else {
            result.put("V_INFO", "Fail");
        }
        return result;
    }

    @RequestMapping(value = "/PM_REALINFOTL_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_REALINFOTL_EDIT(@RequestParam(value = "V_V_CODE") String V_V_CODE, @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_REALINFOTL_EDIT(V_V_CODE, V_V_CONTENT);
        return data;
    }

    @RequestMapping(value = "/PM_REALINFOTL_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_REALINFOTL_DEL(@RequestParam(value = "V_ID") String V_ID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_REALINFOTL_DEL(V_ID);
        return data;
    }

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_DEPTTYPE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_BASE_DEPT_VIEW_DEPTTYPE(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE, @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE, @RequestParam(value = "V_V_PERSON") String V_V_PERSON, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_BASE_DEPT_VIEW_DEPTTYPE(V_V_DEPTCODE, V_V_DEPTTYPE, V_V_PERSON);
        return data;
    }

    @RequestMapping(value = "/PRO_PP_INFORMATION_LIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PP_INFORMATION_LIST(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_DEPT") String V_V_DEPT, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, @RequestParam(value = "V_D_FROMDATE") String V_D_FROMDATE, @RequestParam(value = "V_D_TODATE") String V_D_TODATE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PP_INFORMATION_LIST(V_V_PERSONCODE, V_V_DEPT, V_V_TYPE, V_V_CLASSTYPE, V_D_FROMDATE, V_D_TODATE);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_STATE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PM_DEFECT_STATE_VIEW(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_DEFECT_STATE_VIEW();
        return data;
    }

    @RequestMapping(value = "/PRO_PP_INFORMATION_WITHD_LIST3", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PP_INFORMATION_WITHD_LIST3(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_DEPT") String V_V_DEPT, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, @RequestParam(value = "V_V_TYPE_STATE") String V_V_TYPE_STATE, @RequestParam(value = "V_D_FROMDATE") String V_D_FROMDATE, @RequestParam(value = "V_D_TODATE") String V_D_TODATE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PP_INFORMATION_WITHD_LIST3(V_V_PERSONCODE, V_V_DEPT, V_V_TYPE, V_V_CLASSTYPE, V_V_TYPE_STATE, V_D_FROMDATE, V_D_TODATE);
        return data;
    }

    @RequestMapping(value = "/PRO_PP_INFORMATION_WITHD_LIST2", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PP_INFORMATION_WITHD_LIST2(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_DEPT") String V_V_DEPT, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, @RequestParam(value = "V_D_FROMDATE") String V_D_FROMDATE, @RequestParam(value = "V_D_TODATE") String V_D_TODATE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PP_INFORMATION_WITHD_LIST2(V_V_PERSONCODE, V_V_DEPT, V_V_TYPE, V_V_CLASSTYPE, V_D_FROMDATE, V_D_TODATE);
        return data;
    }

    @RequestMapping(value = "/PRO_PP_INFORMATION_LIST_PER", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PP_INFORMATION_LIST_PER(@RequestParam(value = "V_D_DATE") String V_D_DATE, @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PP_INFORMATION_LIST_PER(V_D_DATE, V_V_PERSONCODE, V_V_TYPE, V_V_CLASSTYPE);
        return data;
    }

    @RequestMapping(value = "/PRO_PP_INFORMATION_WITHDW_LIST", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PP_INFORMATION_WITHDW_LIST(
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            @RequestParam(value = "V_V_DEPT") String V_V_DEPT,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE,
            @RequestParam(value = "V_D_FROMDATE") String V_D_FROMDATE,
            @RequestParam(value = "V_D_TODATE") String V_D_TODATE,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PP_INFORMATION_WITHDW_LIST(V_V_PERSONCODE, V_V_DEPT, V_V_TYPE, V_V_CLASSTYPE, V_D_FROMDATE, V_D_TODATE);
        return data;
    }

    @RequestMapping(value = "PRO_PP_INFORMATION_LIST_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_PP_INFORMATION_LIST_EXCEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_DEPT") String V_V_DEPT, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, @RequestParam(value = "V_D_FROMDATE") String V_D_FROMDATE, @RequestParam(value = "V_D_TODATE") String V_D_TODATE, HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list;
//        V_V_PERSONCODE = URLDecoder.decode(V_V_PERSONCODE, "UTF-8");
//        V_V_DEPT = URLDecoder.decode(V_V_DEPT, "UTF-8");
//        V_V_TYPE = URLDecoder.decode(V_V_TYPE, "UTF-8");
//        V_V_CLASSTYPE = URLDecoder.decode(V_V_CLASSTYPE, "UTF-8");
//        V_D_FROMDATE = URLDecoder.decode(V_D_FROMDATE, "UTF-8");
//        V_D_TODATE = URLDecoder.decode(V_D_TODATE, "UTF-8");
        HashMap data = wsyService.PRO_PP_INFORMATION_LIST(V_V_PERSONCODE, V_V_DEPT, V_V_TYPE, V_V_CLASSTYPE, V_D_FROMDATE, V_D_TODATE);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 6; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();// 生成一个样式
        // 背景色
        style.setFillForegroundColor(HSSFColor.GREEN.index);//设置图案颜色
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);//设置图案样式
        style.setFillBackgroundColor(HSSFColor.GREEN.index);//设置图案背景色
        //字体
        HSSFFont font = wb.createFont();// 生成一个字体
        font.setFontHeightInPoints((short) 10);//设置字号
        font.setColor(HSSFColor.WHITE.index);//设置字体颜色
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        font.setFontName("宋体");//设置字体名称
        style.setFont(font);// 把字体 应用到当前样式
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 设置这些样式,水平居中
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellStyle(style);
        cell = row.createCell((short) 0);
        cell.setCellValue("日期");
        cell.setCellStyle(style);
        cell = row.createCell((short) 1);
        cell.setCellValue("班型");
        cell.setCellStyle(style);
        cell = row.createCell((short) 2);
        cell.setCellValue("班组");
        cell.setCellStyle(style);
        cell = row.createCell((short) 3);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);
        cell = row.createCell((short) 4);
        cell.setCellValue("内容");
        cell.setCellStyle(style);
        cell = row.createCell((short) 5);
        cell.setCellValue("信息类型");
        cell.setCellStyle(style);
        cell = row.createCell((short) 6);
        cell.setCellValue("所属部门");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                HashMap map = (HashMap) list.get(i);
                row.createCell((short) 0).setCellValue(map.get("D_DATE") == null ? "" : map.get("D_DATE").toString());
                row.createCell((short) 1).setCellValue(map.get("V_CLASS") == null ? "" : map.get("V_CLASS").toString());
                row.createCell((short) 2).setCellValue(map.get("V_CLASSTYPE") == null ? "" : map.get("V_CLASSTYPE").toString());
                row.createCell((short) 3).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());
                row.createCell((short) 4).setCellValue(map.get("V_INFORMATION") == null ? "" : map.get("V_INFORMATION").toString());
                row.createCell((short) 5).setCellValue(map.get("V_TYPE") == null ? "" : map.get("V_TYPE").toString());
                row.createCell((short) 6).setCellValue(map.get("V_DEPT") == null ? "" : map.get("V_DEPT").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("信息查询.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();// 操作结束，关闭文件
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "PRO_PP_INFORMATION_WITHD_LIST3_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_PP_INFORMATION_WITHD_LIST3_EXCEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_DEPT") String V_V_DEPT, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, @RequestParam(value = "V_V_TYPE_STATE") String V_V_TYPE_STATE, @RequestParam(value = "V_D_FROMDATE") String V_D_FROMDATE, @RequestParam(value = "V_D_TODATE") String V_D_TODATE, HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list;
        HashMap data = wsyService.PRO_PP_INFORMATION_WITHD_LIST3(V_V_PERSONCODE, V_V_DEPT, V_V_TYPE, V_V_CLASSTYPE, V_V_TYPE_STATE, V_D_FROMDATE, V_D_TODATE);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 6; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();// 生成一个样式
        // 背景色
        style.setFillForegroundColor(HSSFColor.GREEN.index);//设置图案颜色
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);//设置图案样式
        style.setFillBackgroundColor(HSSFColor.GREEN.index);//设置图案背景色
        //字体
        HSSFFont font = wb.createFont();// 生成一个字体
        font.setFontHeightInPoints((short) 10);//设置字号
        font.setColor(HSSFColor.WHITE.index);//设置字体颜色
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        font.setFontName("宋体");//设置字体名称
        style.setFont(font);// 把字体 应用到当前样式
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 设置这些样式,水平居中
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellStyle(style);
        cell = row.createCell((short) 0);
        cell.setCellValue("日期时间");
        cell.setCellStyle(style);
        cell = row.createCell((short) 1);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);
        cell = row.createCell((short) 2);
        cell.setCellValue("内容");
        cell.setCellStyle(style);
        cell = row.createCell((short) 3);
        cell.setCellValue("上报人");
        cell.setCellStyle(style);
        cell = row.createCell((short) 4);
        cell.setCellValue("状态");
        cell.setCellStyle(style);
        cell = row.createCell((short) 5);
        cell.setCellValue("类型");
        cell.setCellStyle(style);
        cell = row.createCell((short) 6);
        cell.setCellValue("班型");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                HashMap map = (HashMap) list.get(i);
                row.createCell((short) 0).setCellValue(map.get("D_DATE") == null ? "" : map.get("D_DATE").toString());
                row.createCell((short) 1).setCellValue(map.get("V_EQUIP") == null ? "" : map.get("V_EQUIP").toString());
                row.createCell((short) 2).setCellValue(map.get("V_INFORMATION") == null ? "" : map.get("V_INFORMATION").toString());
                row.createCell((short) 3).setCellValue(map.get("V_PERSON") == null ? "" : map.get("V_PERSON").toString());
                row.createCell((short) 4).setCellValue(map.get("V_STATE") == null ? "" : map.get("V_STATE").toString());
                row.createCell((short) 5).setCellValue(map.get("V_TYPE") == null ? "" : map.get("V_TYPE").toString());
                row.createCell((short) 6).setCellValue(map.get("V_CLASSTYPE") == null ? "" : map.get("V_CLASSTYPE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("信息缺陷作业票查询.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();// 操作结束，关闭文件
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "PRO_PP_INFORMATION_WITHD_LIST2_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_PP_INFORMATION_WITHD_LIST2_EXCEL(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_DEPT") String V_V_DEPT, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, @RequestParam(value = "V_D_FROMDATE") String V_D_FROMDATE, @RequestParam(value = "V_D_TODATE") String V_D_TODATE, HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list;
        HashMap data = wsyService.PRO_PP_INFORMATION_WITHD_LIST2(V_V_PERSONCODE, V_V_DEPT, V_V_TYPE, V_V_CLASSTYPE, V_D_FROMDATE, V_D_TODATE);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 6; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();// 生成一个样式
        // 背景色
        style.setFillForegroundColor(HSSFColor.GREEN.index);//设置图案颜色
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);//设置图案样式
        style.setFillBackgroundColor(HSSFColor.GREEN.index);//设置图案背景色
        //字体
        HSSFFont font = wb.createFont();// 生成一个字体
        font.setFontHeightInPoints((short) 10);//设置字号
        font.setColor(HSSFColor.WHITE.index);//设置字体颜色
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        font.setFontName("宋体");//设置字体名称
        style.setFont(font);// 把字体 应用到当前样式
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 设置这些样式,水平居中
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellStyle(style);
        cell = row.createCell((short) 0);
        cell.setCellValue("日期时间");
        cell.setCellStyle(style);
        cell = row.createCell((short) 1);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);
        cell = row.createCell((short) 2);
        cell.setCellValue("内容");
        cell.setCellStyle(style);
        cell = row.createCell((short) 3);
        cell.setCellValue("上报人");
        cell.setCellStyle(style);
        cell = row.createCell((short) 4);
        cell.setCellValue("状态");
        cell.setCellStyle(style);
        cell = row.createCell((short) 5);
        cell.setCellValue("类型");
        cell.setCellStyle(style);
        cell = row.createCell((short) 6);
        cell.setCellValue("班型");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                HashMap map = (HashMap) list.get(i);
                row.createCell((short) 0).setCellValue(map.get("D_DATE") == null ? "" : map.get("D_DATE").toString());
                row.createCell((short) 1).setCellValue(map.get("V_EQUIP") == null ? "" : map.get("V_EQUIP").toString());
                row.createCell((short) 2).setCellValue(map.get("V_INFORMATION") == null ? "" : map.get("V_INFORMATION").toString());
                row.createCell((short) 3).setCellValue(map.get("V_PERSON") == null ? "" : map.get("V_PERSON").toString());
                row.createCell((short) 4).setCellValue(map.get("V_STATE") == null ? "" : map.get("V_STATE").toString());
                row.createCell((short) 5).setCellValue(map.get("V_TYPE") == null ? "" : map.get("V_TYPE").toString());
                row.createCell((short) 6).setCellValue(map.get("V_CLASSTYPE") == null ? "" : map.get("V_CLASSTYPE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("信息缺陷作业票查询.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();// 操作结束，关闭文件
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "PRO_PP_INFORMATION_LIST_PER_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_PP_INFORMATION_LIST_PER_EXCEL(@RequestParam(value = "V_D_DATE") String V_D_DATE, @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE, @RequestParam(value = "V_V_TYPE") String V_V_TYPE, @RequestParam(value = "V_V_CLASSTYPE") String V_V_CLASSTYPE, HttpServletRequest request, HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list;
        HashMap data = wsyService.PRO_PP_INFORMATION_LIST_PER(V_D_DATE, V_V_PERSONCODE, V_V_TYPE, V_V_CLASSTYPE);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 6; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();// 生成一个样式
        // 背景色
        style.setFillForegroundColor(HSSFColor.GREEN.index);//设置图案颜色
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);//设置图案样式
        style.setFillBackgroundColor(HSSFColor.GREEN.index);//设置图案背景色
        //字体
        HSSFFont font = wb.createFont();// 生成一个字体
        font.setFontHeightInPoints((short) 10);//设置字号
        font.setColor(HSSFColor.WHITE.index);//设置字体颜色
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        font.setFontName("宋体");//设置字体名称
        style.setFont(font);// 把字体 应用到当前样式
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 设置这些样式,水平居中
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellStyle(style);
        cell = row.createCell((short) 0);
        cell.setCellValue("日期");
        cell.setCellStyle(style);
        cell = row.createCell((short) 1);
        cell.setCellValue("班型");
        cell.setCellStyle(style);
        cell = row.createCell((short) 2);
        cell.setCellValue("班组");
        cell.setCellStyle(style);
        cell = row.createCell((short) 3);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);
        cell = row.createCell((short) 4);
        cell.setCellValue("内容");
        cell.setCellStyle(style);
        cell = row.createCell((short) 5);
        cell.setCellValue("信息类型");
        cell.setCellStyle(style);
        cell = row.createCell((short) 6);
        cell.setCellValue("所属部门");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                HashMap map = (HashMap) list.get(i);
                row.createCell((short) 0).setCellValue(map.get("D_DATE") == null ? "" : map.get("D_DATE").toString());
                row.createCell((short) 1).setCellValue(map.get("V_CLASSTYPE") == null ? "" : map.get("V_CLASSTYPE").toString());
                row.createCell((short) 2).setCellValue(map.get("V_CLASS") == null ? "" : map.get("V_CLASS").toString());
                row.createCell((short) 3).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());
                row.createCell((short) 4).setCellValue(map.get("V_INFORMATION") == null ? "" : map.get("V_INFORMATION").toString());
                row.createCell((short) 5).setCellValue(map.get("V_TYPE") == null ? "" : map.get("V_TYPE").toString());
                row.createCell((short) 6).setCellValue(map.get("V_DEPT") == null ? "" : map.get("V_DEPT").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("信息查询.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();// 操作结束，关闭文件
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/PRO_PP_INFORMATION_GET", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PP_INFORMATION_GET(@RequestParam(value = "V_I_ID") String V_I_ID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PP_INFORMATION_GET(V_I_ID);
        return data;
    }

    // 首页公告查询
    @RequestMapping(value = "/PM_HOME_NOTICE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_HOME_NOTICE_SEL(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_HOME_NOTICE_SEL();
        return data;
    }

    // 首页公告上传
    @RequestMapping(value = "/PM_HOME_NOTICE_INS_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_HOME_NOTICE_INS(@RequestParam(value = "FLAG") String FLAG, @RequestParam(value = "V_ID") String V_ID, @RequestParam(value = "V_FILENAME") String V_FILENAME, @RequestParam(value = "V_FILETYPE") String V_FILETYPE, @RequestParam(value = "V_PERSONNAME") String V_PERSONNAME, @RequestParam(value = "V_TITLE") String V_TITLE, @RequestParam(value = "V_CONTENT") String V_CONTENT, @RequestParam(value = "V_DISPLAY") String V_DISPLAY, @RequestParam(value = "V_FILEBLOB") MultipartFile V_FILEBLOB, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap<String, Object> result = new HashMap();
        if ("EDIT".equals(FLAG) && V_FILEBLOB.isEmpty()) {
            HashMap data = wsyService.PM_HOME_NOTICE_INS2(V_ID, V_PERSONNAME, V_TITLE, V_CONTENT, V_DISPLAY);
            result.put("V_INFO", (String) data.get("V_INFO"));
            System.out.println("edit");
        } else {
            HashMap data = wsyService.PM_HOME_NOTICE_INS(V_ID, V_FILENAME, V_FILETYPE, V_PERSONNAME, V_TITLE, V_CONTENT, V_DISPLAY, V_FILEBLOB.getInputStream());
            result.put("V_INFO", (String) data.get("V_INFO"));
            System.out.println("insert");
        }
        result.put("success", true);
        return result;
    }

    // 首页公告附件下载
    @RequestMapping(value = "/PM_HOME_NOTICE_DOWNLOAD", method = RequestMethod.GET)
    @ResponseBody
    public void PM_HOME_NOTICE_DOWNLOAD(@RequestParam(value = "V_ID") String V_ID, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_HOME_NOTICE_DOWNLOAD(V_ID);
        String fileName = (String) data.get("O_FILENAME");
        Blob fileblob = (Blob) data.get("O_FILE");
        InputStream is = fileblob.getBinaryStream();
        String agent = (String) request.getHeader("USER-AGENT");
        if (agent != null && agent.toLowerCase().indexOf("firefox") > 0) {// 兼容火狐中文文件名下载
            fileName = "=?UTF-8?B?" + (new String(Base64.encodeBase64(fileName.getBytes("UTF-8")))) + "?=";
        } else {
            fileName = java.net.URLEncoder.encode(fileName, "UTF-8");
        }
        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        ServletOutputStream fos = response.getOutputStream();
        byte[] b = new byte[65535];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        fos.flush();
        is.close();
        fos.close();
    }

    // 首页公告删除
    @RequestMapping(value = "/PM_HOME_NOTICE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PM_HOME_NOTICE_DEL(@RequestParam(value = "idList") String[] idList, HttpServletRequest request, HttpServletResponse response) throws Exception {
        int sum = 0;
        for (int i = 0; i < idList.length; i++) {
            HashMap data = wsyService.PM_HOME_NOTICE_DEL(idList[i]);
            if (!"SUCCESS".equals(data.get("V_INFO"))) {
                sum = sum + 1;
                System.out.println(data.get("V_INFO"));
            }
        }
        HashMap result = new HashMap();
        if (sum == 0) {
            result.put("V_INFO", "SUCCESS");
        } else {
            result.put("V_INFO", "Fail");
        }
        return result;
    }
}