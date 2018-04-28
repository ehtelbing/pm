package org.building.pm.controller;


import org.apache.commons.codec.binary.Base64;
import org.building.pm.service.ZsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zs on 2018/4/8.
 */
@Controller
@RequestMapping("/app/pm/zs")
public class ZsController {
    @Autowired
    private ZsService zsService;

    //安全措施模糊查询
    @RequestMapping(value = "/BASE_AQCS_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_MM_PLANT(
            @RequestParam(value = "V_V_AQCS_NAME") String V_V_AQCS_NAME,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zsService.BASE_AQCS_SEL(V_V_AQCS_NAME);
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

    //查询安全措施相关详情的方法
    @RequestMapping(value = "/BASE_AQCS_BYCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_BYCODE_SEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zsService.BASE_AQCS_BYCODE_SEL(V_V_AQCS_CODE);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //安全措施的新增和修改的方法
    @RequestMapping(value = "/BASE_AQCS_EDIT  ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_EDIT(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            @RequestParam(value = "V_V_AQCS_NAME") String V_V_AQCS_NAME,
            @RequestParam(value = "V_V_AQ_ZYSX") String V_V_AQ_ZYSX,
            @RequestParam(value = "V_V_AQCS_DETAIL") String V_V_AQCS_DETAIL,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        return zsService.BASE_AQCS_EDIT(V_V_AQCS_CODE, V_V_AQCS_NAME, V_V_AQ_ZYSX, V_V_AQCS_DETAIL);

    }

    //安全措施的删除
    @RequestMapping(value = "/BASE_AQCS_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_DEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_AQCS_DEL(V_V_AQCS_CODE);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //安全措施预案查询
    @RequestMapping(value = "/BASE_AQCS_AQYA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_AQYA_SEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_AQCS_AQYA_SEL(V_V_AQCS_CODE);
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

    //安全措施预案的新增和修改
    @RequestMapping(value = "/BASE_AQCS_AQYA_EDIT  ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_AQYA_EDIT(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            @RequestParam(value = "V_V_AQYA_CODE") String V_V_AQYA_CODE,
            @RequestParam(value = "V_V_AQYA_NAME") String V_V_AQYA_NAME,
            @RequestParam(value = "V_V_AQYA_DETAIL") String V_V_AQYA_DETAIL,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        return zsService.BASE_AQCS_AQYA_EDIT(V_V_AQCS_CODE, V_V_AQYA_CODE, V_V_AQYA_NAME, V_V_AQYA_DETAIL);

    }


    //安全措施预案的删除
    @RequestMapping(value = "/BASE_AQCS_AQYA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_AQYA_DEL(
            @RequestParam(value = "V_V_AQYA_CODE") String V_V_AQYA_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zsService.BASE_AQCS_AQYA_DEL(V_V_AQYA_CODE);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //安全措施预案附件上传过程
    @RequestMapping(value = "/BASE_FILE_IMAGE_INS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_FILE_IMAGE_INS(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                   @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                                                   @RequestParam(value = "V_V_FILEBLOB") MultipartFile V_V_FILE,
                                                   @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                                                   @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                                                   @RequestParam(value = "V_V_DEPT") String V_V_DEPT,
                                                   @RequestParam(value = "V_V_TIME") String V_V_TIME,
                                                   @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
                                                   @RequestParam(value = "V_V_REMARK") String V_V_REMARK,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zsService.BASE_FILE_IMAGE_INS(V_V_GUID, V_V_FILENAME, V_V_FILE.getInputStream(), V_V_FILETYPECODE, V_V_PLANT, V_V_DEPT, V_V_TIME, V_V_PERSON, V_V_REMARK);

        result.put("INFO",  (String) data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //查询安全措施预案附件列表
    @RequestMapping(value = "/BASE_FILE_CHAKAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_FILE_CHAKAN_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zsService.BASE_FILE_CHAKAN_SEL(V_V_GUID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //查询安全事故案例方法
    @RequestMapping(value = "/BASE_AQCS_FAULT_ITEM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_FAULT_ITEM_SEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zsService.BASE_AQCS_FAULT_ITEM_SEL(V_V_AQCS_CODE);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //附件下载
    @RequestMapping(value = "/downloadAttachment", method = RequestMethod.GET)
    @ResponseBody
    public void downloadAttachment(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                   HttpServletRequest request, HttpServletResponse response) throws Exception {
        HashMap data = zsService.BASE_FILE_IMAGE_DOWNLOAD(V_V_GUID);
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
        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        fos.flush();
        is.close();
        fos.close();
    }

    //安全措施整改的查看
    @RequestMapping(value = "/BASE_AQCS_ZG_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_ZG_SEL(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_AQCS_ZG_SEL(V_V_AQCS_CODE);
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

    //安全措施预案的新增和修改
    @RequestMapping(value = "/BASE_AQCS_ZG_EDIT  ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_ZG_EDIT(
            @RequestParam(value = "V_V_AQCS_CODE") String V_V_AQCS_CODE,
            @RequestParam(value = "V_V_ZG_GUID") String V_V_ZG_GUID,
            @RequestParam(value = "V_V_ZG_TIME") String V_V_ZG_TIME,
            @RequestParam(value = "V_V_ZG_PLACE") String V_V_ZG_PLACE,
            @RequestParam(value = "V_V_ZG_PERSON") String V_V_ZG_PERSON,
            @RequestParam(value = "V_V_ZG_DETAIL") String V_V_ZG_DETAIL,
            @RequestParam(value = "V_V_ZG_COST") String V_V_ZG_COST,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        return zsService.BASE_AQCS_ZG_EDIT( V_V_AQCS_CODE,V_V_ZG_GUID, V_V_ZG_TIME, V_V_ZG_PLACE, V_V_ZG_PERSON,V_V_ZG_DETAIL,V_V_ZG_COST);

    }


    //安全措施整改的删除
    @RequestMapping(value = "/BASE_AQCS_ZG_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_ZG_DEL(
            @RequestParam(value = "V_V_ZG_GUID") String V_V_ZG_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zsService.BASE_AQCS_ZG_DEL(V_V_ZG_GUID);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }

    //传入设备编码查询关联设备信息
    @RequestMapping(value = "/BASE_AQCS_BY_EQUCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_BY_EQUCODE_SEL(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_AQCS_BY_EQUCODE_SEL(V_V_EQUCODE);
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


    //查询整改工单
    @RequestMapping(value = "/BASE_GD_BY_ZGGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_GD_BY_ZGGUID_SEL(
            @RequestParam(value = "V_V_ZG_GUID") String V_V_ZG_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_GD_BY_ZGGUID_SEL(V_V_ZG_GUID);
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

    //删除附件
    @RequestMapping(value = "/BASE_FILE_IMAGE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_FILE_IMAGE_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_FILE_IMAGE_DEL(V_V_GUID);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }


    //查询人工
    @RequestMapping(value = "/BASE_GZ_BY_ZGGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_GZ_BY_ZGGUID_SEL(
            @RequestParam(value = "V_V_ZG_GUID") String V_V_ZG_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_GZ_BY_ZGGUID_SEL(V_V_ZG_GUID);
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

    //查询工具
    @RequestMapping(value = "/BASE_GJ_BY_ZGGUID_SEL", method = RequestMethod.POST)
     @ResponseBody
     public Map<String, Object> BASE_GJ_BY_ZGGUID_SEL(
            @RequestParam(value = "V_V_ZG_GUID") String V_V_ZG_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_GJ_BY_ZGGUID_SEL(V_V_ZG_GUID);
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


    //查询机具
    @RequestMapping(value = "/BASE_JJ_BY_ZGGUID_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_JJ_BY_ZGGUID_SEL(
            @RequestParam(value = "V_V_ZG_GUID") String V_V_ZG_GUID,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_JJ_BY_ZGGUID_SEL(V_V_ZG_GUID);
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

        //取消设备关联
    @RequestMapping(value = "/BASE_AQCS_EQU_LINKDEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_AQCS_EQU_LINKDEL(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.BASE_AQCS_EQU_LINKDEL(V_V_EQUCODE);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }


    //查询精密点检
    @RequestMapping(value = "/PM_06_JMDJ_BY_BUSINESSKEY_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_JMDJ_BY_BUSINESSKEY_SEL(
            @RequestParam(value = "V_V_BUSINESSKEY") String V_V_BUSINESSKEY,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.PM_06_JMDJ_BY_BUSINESSKEY_SEL(V_V_BUSINESSKEY);
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


    //新增精密点检录入信息
/*
    @RequestMapping(value = "/PM_06_JMDJ_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_JMDJ_EDIT (
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_BUSINESSKEY") String V_V_BUSINESSKEY,
            @RequestParam(value = "V_V_EQU_CODE") String V_V_EQU_CODE,
            @RequestParam(value = "V_V_EQU_NAME") String V_V_EQU_NAME,
            @RequestParam(value = "V_V_GNWZ") String V_V_GNWZ,
            @RequestParam(value = "V_V_JCFS") String V_V_JCFS,
            @RequestParam(value = "V_V_JCZQ") String V_V_JCZQ,
            @RequestParam(value = "V_V_ZD") String V_V_ZD,
            @RequestParam(value = "V_V_DJ") String V_V_DJ,
            @RequestParam(value = "V_V_TS") String V_V_TS,
            @RequestParam(value = "V_V_DL") String V_V_DL,
            @RequestParam(value = "V_V_RX") String V_V_RX,
            @RequestParam(value = "V_V_CSWZSL") String V_V_CSWZSL,
            @RequestParam(value = "V_V_CSDSL") String V_V_CSDSL,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        return zsService.PM_06_JMDJ_EDIT(V_V_GUID, V_V_BUSINESSKEY, V_V_EQU_CODE,V_V_EQU_NAME,V_V_GNWZ,V_V_JCFS,V_V_JCZQ,
                V_V_ZD,V_V_DJ,V_V_TS, V_V_DL,V_V_RX,V_V_CSWZSL,V_V_CSDSL);

    }
*/


    //查询录入的精密点检信息
    @RequestMapping(value = "/PM_06_JMDJ_BY_KEY_ANDCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_JMDJ_BY_KEY_ANDCODE_SEL(
            @RequestParam(value = "V_V_BUSINESSKEY") String V_V_BUSINESSKEY,
            @RequestParam(value = "V_V_EQU_CODE") String V_V_EQU_CODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.PM_06_JMDJ_BY_KEY_ANDCODE_SEL(V_V_BUSINESSKEY,V_V_EQU_CODE);
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

    //精密点检的
    @RequestMapping(value = "/PM_06_JMDJ_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_JMDJ_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.PM_06_JMDJ_DEL(V_V_GUID);
        result.put("INFO", data.get("INFO"));
        result.put("success", true);
        return result;
    }


    //获取模板的查询
    @RequestMapping(value = "/PM_06_JMDJ_BY_EQUCODE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_JMDJ_BY_EQUCODE_SEL(
            @RequestParam(value = "V_V_EQU_CODE") String V_V_EQU_CODE,
            @RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zsService.PM_06_JMDJ_BY_EQUCODE_SEL(V_V_EQU_CODE);
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


    @RequestMapping(value = "/PM_06_JMDJ_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_JMDJ_EDIT  (
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_BUSINESSKEY") String V_V_BUSINESSKEY,
            @RequestParam(value = "V_V_COLUMN") String V_V_COLUMN,
            @RequestParam(value = "V_V_EQU_CODE") String V_V_EQU_CODE,
            @RequestParam(value = "V_V_VALUE") String V_V_VALUE,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        return zsService.PM_06_JMDJ_EDIT (V_V_GUID, V_V_BUSINESSKEY,V_V_EQU_CODE, V_V_COLUMN,V_V_VALUE);

    }

    //获取模板的插入
    @RequestMapping(value = "/PM_06_JMDJ_INS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_JMDJ_INS (
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_BUSINESSKEY") String V_V_BUSINESSKEY,
            @RequestParam(value = "V_V_EQU_CODE") String V_V_EQU_CODE,
            @RequestParam(value = "V_V_EQU_NAME") String V_V_EQU_NAME,
            @RequestParam(value = "V_V_GNWZ") String V_V_GNWZ,
            @RequestParam(value = "V_V_JCFS") String V_V_JCFS,
            @RequestParam(value = "V_V_JCZQ") String V_V_JCZQ,
            @RequestParam(value = "V_V_ZD") String V_V_ZD,
            @RequestParam(value = "V_V_DJ") String V_V_DJ,
            @RequestParam(value = "V_V_TS") String V_V_TS,
            @RequestParam(value = "V_V_DL") String V_V_DL,
            @RequestParam(value = "V_V_RX") String V_V_RX,
            @RequestParam(value = "V_V_CSWZSL") String V_V_CSWZSL,
            @RequestParam(value = "V_V_CSDSL") String V_V_CSDSL,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        return zsService.PM_06_JMDJ_INS(V_V_GUID, V_V_BUSINESSKEY, V_V_EQU_CODE, V_V_EQU_NAME, V_V_GNWZ, V_V_JCFS, V_V_JCZQ,
                V_V_ZD, V_V_DJ, V_V_TS, V_V_DL, V_V_RX, V_V_CSWZSL,V_V_CSDSL);

    }
}
