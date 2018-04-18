package org.building.pm.controller;

import org.apache.commons.codec.binary.Base64;
import org.building.pm.service.WsyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.util.HashMap;

@Controller
@RequestMapping("/app/pm/Wsy")
public class WsyController {

    @Autowired
    private WsyService wsyService;

    //传入设备编码查询关联设备信息
    @RequestMapping(value = "/PM_1917_JXMX_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_1917_JXMX_DATA_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
            @RequestParam(value = "V_V_JXMX_NAME") String V_V_JXMX_NAME,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_1917_JXMX_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_JXMX_NAME, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PM_1917_JXGX_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_1917_JXGX_DATA_SEL(
            @RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_1917_JXGX_DATA_SEL(V_V_JXMX_CODE);
        return data;
    }

    //机具示意图
    @RequestMapping(value = "/BASE_FILE_IMAGE_SEL", method = RequestMethod.GET)
    @ResponseBody
    public HashMap BASE_FILE_IMAGE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        HashMap resultTemp = wsyService.BASE_FILE_IMAGE_SEL(V_V_GUID);
        HashMap result = new HashMap();
        if (resultTemp.get("O_FILE") != null) {
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
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_PERSON_DE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_BASE_PERSON_DE_SEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_BASE_PERSON_DE_SEL();
        return data;
    }

    @RequestMapping(value = "/PRO_PM_19_TOOL_BYCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_PM_19_TOOL_BYCODE_SEL(
            @RequestParam(value = "V_V_TOOLCODE") String V_V_TOOLCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_19_TOOL_BYCODE_SEL(V_V_TOOLCODE);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_19_TOOLTYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_PM_19_TOOLTYPE_SEL(
            @RequestParam(value = "V_V_TOOLNAME") String V_V_TOOLNAME,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_19_TOOLTYPE_SEL(V_V_TOOLNAME, V_V_EQUCODE);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_19_CARDE_GXSEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_PM_19_CARDE_GXSEL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_19_CARDE_GXSEL(V_V_JXGX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_JXMX_JJCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_JJCODE_SEL(
            @RequestParam(value = "V_V_CAR_CODE") String V_V_CAR_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_JJCODE_SEL(V_V_CAR_CODE);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_19_WORKDE_GXSEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PRO_PM_19_WORKDE_GXSEL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PRO_PM_19_WORKDE_GXSEL(V_V_JXGX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_BY_GXCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_BY_GXCODE_SEL(
            @RequestParam(value = "V_V_GX_CODE") String V_V_GX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_BY_GXCODE_SEL(V_V_GX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_AQYA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_AQYA_SEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_AQYA_SEL(V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_FAULT_ITEM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_FAULT_ITEM_SEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_FAULT_ITEM_SEL(V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_BYCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_BYCODE_SEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_BYCODE_SEL(V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_AQCS_ZG_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_AQCS_ZG_SEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_AQCS_ZG_SEL(V_V_AQCS_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_JXMX_GZ_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXMX_GZ_INS(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_PERCODE_DE") String V_V_PERCODE_DE,
            @RequestParam(value = "V_V_PERNAME_DE") String V_V_PERNAME_DE,
            @RequestParam(value = "V_V_TS") String V_V_TS,
            @RequestParam(value = "V_V_DE") String V_V_DE,
            @RequestParam(value = "V_V_PERTYPE_DE") String V_V_PERTYPE_DE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXMX_GZ_INS(V_V_JXGX_CODE, V_V_PERCODE_DE, V_V_PERNAME_DE, V_V_TS, V_V_DE, V_V_PERTYPE_DE);
        return data;
    }

    @RequestMapping(value = "/BASE_FILE_CHAKAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_FILE_CHAKAN_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_FILE_CHAKAN_SEL(V_V_GUID);
        return data;
    }

    //附件下载
    @RequestMapping(value = "/downloadAttachment", method = RequestMethod.GET)
    @ResponseBody
    public void downloadAttachment(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                   HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_FILE_IMAGE_SEL(V_V_GUID);
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

    @RequestMapping(value = "/BASE_JXBZ_BY_GXCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXBZ_BY_GXCODE_SEL(
            @RequestParam(value = "V_V_GX_CODE") String V_V_GX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXBZ_BY_GXCODE_SEL(V_V_GX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_JXBZ_GD_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXBZ_GD_SEL(
            @RequestParam(value = "V_V_JXBZ_GUID") String V_V_JXBZ_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXBZ_GD_SEL(V_V_JXBZ_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_JXBZ_QX_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXBZ_QX_SEL(
            @RequestParam(value = "V_V_GD_GUID") String V_V_GD_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXBZ_QX_SEL(V_V_GD_GUID);
        return data;
    }

    @RequestMapping(value = "/PM_REPAIR_JS_STANDARD_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_REPAIR_JS_STANDARD_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUCHILDCODE") String V_V_EQUCHILDCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_REPAIR_JS_STANDARD_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUCODE, V_V_EQUCHILDCODE);
        return data;
    }

    @RequestMapping(value = "/BASE_JJ_BYJXBZ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JJ_BYJXBZ_SEL(
            @RequestParam(value = "V_V_JXBZ_GUID") String V_V_JXBZ_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JJ_BYJXBZ_SEL(V_V_JXBZ_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GJ_BYJXBZ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GJ_BYJXBZ_SEL(
            @RequestParam(value = "V_V_JXBZ_GUID") String V_V_JXBZ_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GJ_BYJXBZ_SEL(V_V_JXBZ_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GZ_BYJXBZ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GZ_BYJXBZ_SEL(
            @RequestParam(value = "V_V_JXBZ_GUID") String V_V_JXBZ_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GZ_BYJXBZ_SEL(V_V_JXBZ_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GD_BY_GXGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GD_BY_GXGUID_SEL(
            @RequestParam(value = "V_V_GX_GUID") String V_V_GX_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GD_BY_GXGUID_SEL(V_V_GX_GUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GZ_BY_GDGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GZ_BY_GDGUID_SEL(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GZ_BY_GDGUID_SEL(V_V_ORDERGUID);
        return data;
    }

    @RequestMapping(value = "/BASE_GJ_BY_GDGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_GJ_BY_GDGUID_SEL(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_GJ_BY_GDGUID_SEL(V_V_ORDERGUID);
        return data;
    }

    @RequestMapping(value = "/BASE_JJ_BY_GDGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JJ_BY_GDGUID_SEL(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JJ_BY_GDGUID_SEL(V_V_ORDERGUID);
        return data;
    }

    @RequestMapping(value = "/PM_1917_JXGX_WL_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> PM_1917_JXGX_WL_DATA_SEL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.PM_1917_JXGX_WL_DATA_SEL(V_V_JXGX_CODE);
        return data;
    }

    @RequestMapping(value = "/BASE_WL_BY_GDGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_WL_BY_GDGUID_SEL(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_WL_BY_GDGUID_SEL(V_V_ORDERGUID);
        return data;
    }

    @RequestMapping(value = "/BASE_JXBZ_BY_GXCODE_INS", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> BASE_JXBZ_BY_GXCODE_INS(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_JSYQ_CODE") String V_V_JSYQ_CODE,
            @RequestParam(value = "V_V_JSYQ_NAME") String V_V_JSYQ_NAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = wsyService.BASE_JXBZ_BY_GXCODE_INS(V_V_JXGX_CODE, V_V_JSYQ_CODE, V_V_JSYQ_NAME);
        return data;
    }
}