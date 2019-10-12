package org.building.pm.controller;

import org.building.pm.service.DefectService;
import org.building.pm.service.Dx_fileService;
import org.building.pm.service.PM_07Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Blob;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/defect/")
public class DefectController {
    @Autowired
    private DefectService defectService;

    @Autowired
    private PM_07Service pm_07Service;

    @Autowired
    private Dx_fileService dx_fileService;

    //根据人员查询厂矿缺陷
    @RequestMapping(value = "PM_07_DEFECT_STAT_N", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_07_DEFECT_STAT_N(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE) throws Exception {
        Map data = defectService.PM_07_DEFECT_STAT_N(V_V_YEAR, V_V_PERCODE);
        return data;
    }

    //根据人员查询厂矿缺陷
    @RequestMapping(value = "DEFECT_FILE_DOWN", method = RequestMethod.GET)
    @ResponseBody
    public Map DEFECT_FILE_DOWN(
            @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
            HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        Map data = pm_07Service.DEFECT_UPFILE_DOWN_NTKO(V_V_FILEGUID);
        String V_V_FILENAME = "";
        try {
            List<Map> result = null;
            Blob fileblob = (Blob) data.get("V_V_BLOB");
            InputStream is = fileblob.getBinaryStream();

            response.setContentType("application/octet-stream");
            response.setCharacterEncoding("UTF-8");

            V_V_FILENAME = URLDecoder.decode(data.get("V_V_FILENAME").toString(), "UTF-8");

            String fileName = new String(V_V_FILENAME.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            OutputStream fos = response.getOutputStream();
            byte[] b = new byte[2048];
            int length;
            while ((length = is.read(b)) > 0) {
                fos.write(b, 0, length);
            }
            is.close();
            fos.close();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Map test = new HashMap();
        test.put("success", true);
        return test;
    }

    //工单下载
    @RequestMapping(value = "WORK_FILE_DOWN", method = RequestMethod.GET)
    @ResponseBody
    public Map WORK_FILE_DOWN(
            @RequestParam(value = "V_FILEGUID") String V_FILEGUID,
            HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        Map data = dx_fileService.WORK_FILE_DOWN(V_FILEGUID);
        String V_FILENAME = "";
        try {
            List<Map> result = null;
            Blob fileblob = (Blob) data.get("V_FILEBLOB");
            InputStream is = fileblob.getBinaryStream();

            response.setContentType("application/octet-stream");
            response.setCharacterEncoding("UTF-8");

            V_FILENAME = URLDecoder.decode(data.get("V_FILENAME").toString(), "UTF-8");

            String fileName = new String(V_FILENAME.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            OutputStream fos = response.getOutputStream();
            byte[] b = new byte[2048];
            int length;
            while ((length = is.read(b)) > 0) {
                fos.write(b, 0, length);
            }
            is.close();
            fos.close();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Map test = new HashMap();
        test.put("success", true);
        return test;
    }

}


