package org.building.pm.controller;

import org.building.pm.service.PM_07Service;
import org.building.pm.service.QkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import java.net.URLEncoder;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/qk")
public class QkController {

    @Autowired
    private QkService qkService;

    @RequestMapping(value = "/PM_EQU_REPAIR_FLOW_PERSEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_EQU_REPAIR_FLOW_PERSEL(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ZYCODE") String V_V_ZYCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = qkService.PM_EQU_REPAIR_FLOW_PERSEL(V_V_DEPTCODE, V_V_ZYCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_EQU_REPAIR_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_EQU_REPAIR_DATA_SET(@RequestParam(value = "V_V_FLOWGUID") String V_V_FLOWGUID,
                                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_ITEMCODE") String V_V_ITEMCODE,
                                                           @RequestParam(value = "V_V_ITEMNAME") String V_V_ITEMNAME,
                                                           @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                           @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                           @RequestParam(value = "V_V_TIME_B") @DateTimeFormat(pattern = "yyyy-MM-dd") Date V_V_TIME_B,
                                                           @RequestParam(value = "V_V_TIME_E") @DateTimeFormat(pattern = "yyyy-MM-dd") Date V_V_TIME_E,
                                                           @RequestParam(value = "V_V_MAJOR") String V_V_MAJOR,
                                                           @RequestParam(value = "V_V_BUDGET_MONEY") String V_V_BUDGET_MONEY,
                                                           @RequestParam(value = "V_V_MONEY") String V_V_MONEY,
                                                           @RequestParam(value = "V_V_REPAIR_TYPE") String V_V_REPAIR_TYPE,
                                                           @RequestParam(value = "V_V_REPAIR_DEPT") String V_V_REPAIR_DEPT,
                                                           @RequestParam(value = "V_V_REPAIR_STATUS") String V_V_REPAIR_STATUS,
                                                           @RequestParam(value = "V_V_FILE_GUID") String V_V_FILE_GUID,
                                                           @RequestParam(value = "V_V_EXPLAIN") String V_V_EXPLAIN,
                                                           @RequestParam(value = "V_V_SCHEME") String V_V_SCHEME,
                                                           @RequestParam(value = "V_V_FLOW_STATUS") String V_V_FLOW_STATUS,
                                                           @RequestParam(value = "V_V_FLOW_STEPCODE") String V_V_FLOW_STEPCODE,
                                                           @RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                           @RequestParam(value = "V_V_INTIME") String V_V_INTIME,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = qkService.PM_EQU_REPAIR_DATA_SET(V_V_FLOWGUID, V_V_ORGCODE, V_V_DEPTCODE,V_V_ITEMCODE,V_V_ITEMNAME,
                V_V_YEAR,V_V_MONTH,V_V_TIME_B,V_V_TIME_E,V_V_MAJOR,V_V_BUDGET_MONEY,V_V_MONEY,V_V_REPAIR_TYPE,
                V_V_REPAIR_DEPT,V_V_REPAIR_STATUS,V_V_FILE_GUID,V_V_EXPLAIN,V_V_SCHEME,V_V_FLOW_STATUS,V_V_FLOW_STEPCODE,
                V_V_INPER,V_V_INTIME);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public  Map uploadFile(@RequestParam(value = "upload") MultipartFile upload,
                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                           @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                           @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                           @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                           @RequestParam(value = "V_V_DEPT") String V_V_DEPT,
                           @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
                           HttpServletRequest request,HttpServletResponse response, ModelMap model) throws Exception {
        String filename = upload.getOriginalFilename();

        String path = request.getSession().getServletContext().getRealPath("upload");

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
        FileInputStream filedata = null;
        filedata = new FileInputStream(path+"/"+filename);

        Map test = new HashMap();

        List<Map> result = null;
        result = qkService.PRO_BASE_FILE_ADD( V_V_GUID, V_V_FILENAME,filedata,
                V_V_FILETYPECODE, V_V_PLANT, V_V_DEPT,
                 V_V_PERSON, "");
        test.put("list", result);
        test.put("success", true);
        return test;
    }



    @RequestMapping(value = "/PM_EQU_REPAIR_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_EQU_REPAIR_DATA_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ITEMNAME") String V_V_ITEMNAME,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_FLOW_STATUS") String V_V_FLOW_STATUS,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = qkService.PM_EQU_REPAIR_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE,V_V_ITEMNAME,V_V_YEAR,
                V_V_MONTH,V_V_FLOW_STATUS,V_V_ZY);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/downloadFile", method = RequestMethod.GET)
    @ResponseBody
    public  void downloadFile(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                              @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                              HttpServletRequest request,HttpServletResponse response, ModelMap model) throws Exception {

        List<Map> result = null;
        result = qkService.PRO_BASE_FILE_DOWNLOAD(V_V_FILEGUID);
        Blob fileblob = (Blob) result.get(0).get("V_BLOB");
        InputStream is = fileblob.getBinaryStream();

        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");
        /*try {
            V_V_FILENAME = URLEncoder.encode(V_V_FILENAME, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }*/
        response.setHeader("Content-Disposition", "attachment; filename=" + V_V_FILENAME);
        OutputStream fos = response.getOutputStream();
        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        is.close();
        fos.close();

    }
}
