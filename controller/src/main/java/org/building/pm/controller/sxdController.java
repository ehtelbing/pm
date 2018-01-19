package org.building.pm.controller;

import oracle.jdbc.OracleTypes;
import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.sxdService;
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
import java.security.NoSuchAlgorithmException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2017/10/31.
 */
@Controller
@RequestMapping("/app/pm/sxd")
public class sxdController {
    @Autowired
    private sxdService sxdService;

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW(@RequestParam(value = "IS_V_DEPTCODE") String IS_V_DEPTCODE,
                                                  @RequestParam(value = "IS_V_DEPTTYPE") String IS_V_DEPTTYPE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = sxdService.PRO_BASE_DEPT_VIEW(IS_V_DEPTCODE, IS_V_DEPTTYPE);
        List<Map<String, Object>> pm_06list = (List) data.get("list");
        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7111_EQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7111_EQULIST(@RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                                   @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_RUN7111_EQULIST(V_V_PLANTCODE, V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7127_SELECTKC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7127_SELECTKC(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap data = sxdService.PRO_RUN7127_SELECTKC(V_PLANTCODE, V_DEPARTCODE, V_EQU_ID);
        return data;
    }

    @RequestMapping(value = "/NO_7127_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void NO_7127_EXCEL(@RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                              @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                              @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        Map<String, Object> data = sxdService.PRO_RUN7127_SELECTKC(V_PLANTCODE.equals("0") ? "%" : V_PLANTCODE, V_DEPARTCODE.equals("0") ? "%" : V_DEPARTCODE,
                V_EQU_ID.equals("0") ? "%" : V_EQU_ID);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 9; i++) {
            sheet.setColumnWidth(i, 5000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("物料号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("物料描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("规格型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("库存数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("库存金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("作业区");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("库房名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("统计时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 1).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("ELATON") == null ? "" : map.get("ELATON").toString());

                row.createCell((short) 3).setCellValue(map.get("KCAMOUNT") == null ? "" : map.get("KCAMOUNT").toString());

                row.createCell((short) 4).setCellValue(map.get("KC_MONEY") == null ? "" : map.get("KC_MONEY").toString());

                row.createCell((short) 5).setCellValue(map.get("PLANTNAME") == null ? "" : map.get("PLANTNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("STORENAME") == null ? "" : map.get("STORENAME").toString());

                row.createCell((short) 8).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("在库备件监控表.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    @RequestMapping(value = "/PRO_RUN7128_JUNKMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7128_JUNKMATLIST(
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
        HashMap data = sxdService.PRO_RUN7128_JUNKMATLIST(D_BEGIN_DATE, D_END_DATE, V_PLANTCODE, V_DEPARTCODE, V_EQU_ID, V_MATERIALCODE, V_MATERIALNAME, V_STATUS);
        return data;
    }

    @RequestMapping(value = "/NO_7128_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void NO_7128_EXCEL(@RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
                              @RequestParam(value = "D_END_DATE") String D_END_DATE,
                              @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                              @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                              @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                              @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                              @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                              @RequestParam(value = "V_STATUS") String V_STATUS,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        Map<String, Object> data = null;
        try {
            data = sxdService.PRO_RUN7128_JUNKMATLIST(D_BEGIN_DATE.equals(null) ? "%" : D_BEGIN_DATE,D_END_DATE.equals(null) ? "%" : D_END_DATE,V_PLANTCODE.equals(null) ? "%" : V_PLANTCODE,V_DEPARTCODE.equals(null) ? "%" : V_DEPARTCODE,
                    V_EQU_ID.equals(null) ? "%" : V_EQU_ID, V_MATERIALCODE.equals(null) ? "%" : V_MATERIALCODE,V_MATERIALNAME.equals(null) ? "%" : V_MATERIALNAME,V_STATUS.equals(null) ? "%" : V_STATUS);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 7; i++) {
            sheet.setColumnWidth(i, 5000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("备件唯一编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("物料号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物料描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("规格型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("处理方式");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("处理说明");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(map.get("UNIQUE_CODE") == null ? "" : map.get("UNIQUE_CODE").toString());
                row.createCell((short) 1).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());
                row.createCell((short) 2).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());
                row.createCell((short) 3).setCellValue(map.get("ETALON") == null ? "" : map.get("ETALON").toString());
                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());
                row.createCell((short) 5).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());
                row.createCell((short) 6).setCellValue(map.get("HANDLE_TYPE") == null ? "" : map.get("HANDLE_TYPE").toString());
                row.createCell((short) 7).setCellValue(map.get("HANDLE_REMARK") == null ? "" : map.get("HANDLE_REMARK").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("换下备件处理表.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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
        Map<String,Object> result = sxdService.PRO_RUN7129_JUNKMAT(V_ID,V_HANDLE_TYPE,V_HANDLE_REMARK,V_HANDLE_USERID,V_HANDLE_USERNAME);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7115_PERSONLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7115_PERSONLIST(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                                                      @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                                      @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = sxdService.PRO_RUN7115_PERSONLIST(V_V_DEPARTCODE, V_V_PLANTCODE,V_V_BJ_ID);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7115_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7115_SELECT(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                                                  @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                                  @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                                                  @RequestParam(value = "V_V_USERID") String V_V_USERID,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        HashMap data = sxdService.PRO_RUN7115_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID, V_V_USERID);
        return data;
    }

    @RequestMapping(value = "/NO_7115_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void NO_7115_EXCEL(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                              @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                              @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                              @RequestParam(value = "V_V_USERID") String V_V_USERID,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        Map<String, Object> data = null;
        if(V_V_BJ_ID.equals("all")){
            V_V_BJ_ID="%";
        }
        data = sxdService.PRO_RUN7115_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID, V_V_USERID);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 8; i++) {
            sheet.setColumnWidth(i, 5000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("处理结果");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("备件唯一编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("备件描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("报警内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("报警时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("设备负责人");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(map.get("HANDLE_CONTEXT") == null ? "" : map.get("HANDLE_CONTEXT").toString());
                row.createCell((short) 1).setCellValue(map.get("EQU_DESC") == null ? "" : map.get("EQU_DESC").toString());
                row.createCell((short) 2).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());
                row.createCell((short) 3).setCellValue(map.get("BJ_UNIQUECODE") == null ? "" : map.get("BJ_UNIQUECODE").toString());
                row.createCell((short) 4).setCellValue(map.get("BJ_DESC") == null ? "" : map.get("BJ_DESC").toString());
                row.createCell((short) 5).setCellValue(map.get("ALERT_CONTEXT") == null ? "" : map.get("ALERT_CONTEXT").toString());
                row.createCell((short) 6).setCellValue(map.get("HANDLE_DATE") == null ? "" : map.get("HANDLE_DATE").toString());
                row.createCell((short) 7).setCellValue(map.get("USERNAME") == null ? "" : map.get("USERNAME").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("报警信息处理.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    @RequestMapping(value = "/PRO_RUN7115_HANDLEALERT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7115_HANDLEALERT(
            @RequestParam(value = "V_V_ID") String V_V_ID,
            @RequestParam(value = "V_V_ALERT_CONTEXT") String V_V_ALERT_CONTEXT,
            @RequestParam(value = "V_V_HANDLE_USERID") String V_V_HANDLE_USERID,
            @RequestParam(value = "V_V_HANDLE_USERNAME") String V_V_HANDLE_USERNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String,Object> result = sxdService.PRO_RUN7115_HANDLEALERT(V_V_ID, V_V_ALERT_CONTEXT, V_V_HANDLE_USERID, V_V_HANDLE_USERNAME);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7111_TAGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7111_TAGLIST(@RequestParam(value = "PID") String PID,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_RUN7111_TAGLIST(PID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7111_USEBJLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7111_USEBJLIST(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_RUN7111_USEBJLIST(V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7111_ADDLOG", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN7111_ADDLOG(
            @RequestParam(value = "upload") MultipartFile upload,
            @RequestParam(value = "V_V_BJCODE") String V_V_BJCODE,
            @RequestParam(value = "V_V_CHECKTIME") String V_V_CHECKTIME,
            @RequestParam(value = "V_V_CHECKCOUNT") String V_V_CHECKCOUNT,
            @RequestParam(value = "V_V_USERCODE") String V_V_USERCODE,
            @RequestParam(value = "V_V_USERNAME") String V_V_USERNAME,
            @RequestParam(value = "V_V_TAGID") String V_V_TAGID,
            @RequestParam(value = "V_V_SITEID") String V_V_SITEID,
            @RequestParam(value = "V_V_TAGVALUE") float V_V_TAGVALUE,
            HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date CHECKTIME_UTIL = sdf.parse(V_V_CHECKTIME);
        java.sql.Date CHECKTIME_SQL = new java.sql.Date(CHECKTIME_UTIL.getTime());
        String path = request.getSession().getServletContext().getRealPath("upload");
        String V_V_FILENAME = upload.getOriginalFilename();
        File targetFile = new File(path, V_V_FILENAME);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        //保存
        try {
            upload.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("fileUrl", request.getContextPath() + "/upload/" + V_V_FILENAME);
        FileInputStream FILEDATA = null;
        FILEDATA = new FileInputStream(path+"/"+V_V_FILENAME);
        Map test = new HashMap();
        List<Map> result = null;
        result = sxdService.PRO_RUN7111_ADDLOG(V_V_BJCODE,CHECKTIME_SQL,V_V_CHECKCOUNT,FILEDATA,V_V_FILENAME,V_V_USERCODE,V_V_USERNAME,V_V_TAGID,V_V_SITEID,V_V_TAGVALUE);
        FILEDATA.close();
        test.put("list", result);
        test.put("success", true);
        return test;
    }

    @RequestMapping(value = "/PRO_RUN7113_ORDERMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7113_ORDERMATLIST(@RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
                                                        @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
                                                        @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                                        @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        HashMap data = sxdService.PRO_RUN7113_ORDERMATLIST(V_DEPT_CODE, V_EQUIP_CODE, V_MATERIALCODE, V_MATERIALNAME);
        return data;
    }

    @RequestMapping(value = "/NO_7113_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void NO_7113_EXCEL(@RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
                              @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
                              @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                              @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        Map<String, Object> data = null;
        data = sxdService.PRO_RUN7113_ORDERMATLIST(V_DEPT_CODE, V_EQUIP_CODE, V_MATERIALCODE, V_MATERIALNAME);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 7; i++) {
            sheet.setColumnWidth(i, 5000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("工单号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("物料编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物料名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("使用数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("工单结束日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("工单描述");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(map.get("V_ORDERID") == null ? "" : map.get("V_ORDERID").toString());
                row.createCell((short) 1).setCellValue(map.get("V_MATERIALCODE") == null ? "" : map.get("V_MATERIALCODE").toString());
                row.createCell((short) 2).setCellValue(map.get("V_MATERIALNAME") == null ? "" : map.get("V_MATERIALNAME").toString());
                row.createCell((short) 3).setCellValue(map.get("V_UNIT") == null ? "" : map.get("V_UNIT").toString());
                row.createCell((short) 4).setCellValue(map.get("I_ACTUALAMOUNT") == null ? "" : map.get("I_ACTUALAMOUNT").toString());
                row.createCell((short) 5).setCellValue(map.get("D_FACT_FINISH_DATE") == null ? "" : map.get("D_FACT_FINISH_DATE").toString());
                row.createCell((short) 6).setCellValue(map.get("V_SHORT_TXT") == null ? "" : map.get("V_SHORT_TXT").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("工单备件更换管理.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    @RequestMapping(value = "/PRO_RUN_SITE_BJ_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_BJ_ALL(@RequestParam(value = "IN_EQUID") String IN_EQUID,
                                                   @RequestParam(value = "IN_PLANT") String IN_PLANT,
                                                   @RequestParam(value = "IN_DEPART") String IN_DEPART,
                                                   @RequestParam(value = "IN_STATUS") String IN_STATUS,
                                                   @RequestParam(value = "IN_BJCODE") String IN_BJCODE,
                                                   @RequestParam(value = "IN_BJDESC") String IN_BJDESC,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_RUN_SITE_BJ_ALL(IN_EQUID, IN_PLANT, IN_DEPART, IN_STATUS, IN_BJCODE, IN_BJDESC);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7113_CHANGEORDERMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7113_CHANGEORDERMAT(@RequestParam(value = "A_ID") String A_ID,
                                                          @RequestParam(value = "SITE_ID") String SITE_ID,
                                                          @RequestParam(value = "A_CHANGE_AMOUNT") String A_CHANGE_AMOUNT,
                                                          @RequestParam(value = "V_EQUIP_NO") String V_EQUIP_NO,
                                                          @RequestParam(value = "USERID") String USERID,

                                                          @RequestParam(value = "USERNAME") String USERNAME,
                                                          @RequestParam(value = "PLANTCODE") String PLANTCODE,
                                                          @RequestParam(value = "WORKAREA") String WORKAREA,
                                                          @RequestParam(value = "CHANGEDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date CHANGEDATE,
                                                          @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,

                                                          @RequestParam(value = "A_SUPPLYCODE") String A_SUPPLYCODE,
                                                          @RequestParam(value = "A_SUPPLYNAME") String A_SUPPLYNAME,
                                                          @RequestParam(value = "A_UNIQUECODE") String A_UNIQUECODE,
                                                          @RequestParam(value = "A_REPLACEDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_REPLACEDATE,
                                                          @RequestParam(value = "A_FAULTREASON") String A_FAULTREASON,

                                                          @RequestParam(value = "A_REASON_REMARK") String A_REASON_REMARK,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_RUN7113_CHANGEORDERMAT(A_ID, SITE_ID, A_CHANGE_AMOUNT, V_EQUIP_NO, USERID,
                USERNAME, PLANTCODE, WORKAREA, CHANGEDATE, V_MATERIALCODE,
                A_SUPPLYCODE, A_SUPPLYNAME, A_UNIQUECODE, A_REPLACEDATE, A_FAULTREASON,
                A_REASON_REMARK);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7113_CHANGECANCEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7113_CHANGECANCEL(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                        @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                        @RequestParam(value = "V_EQUIP_NO") String V_EQUIP_NO,
                                                        @RequestParam(value = "V_USERID") String V_USERID,
                                                        @RequestParam(value = "V_USERNAME") String V_USERNAME,

                                                        @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                        @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                        @RequestParam(value = "V_CHANGETIME") @DateTimeFormat(pattern = "yyyy-MM-dd") Date V_CHANGETIME,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_RUN7113_CHANGECANCEL(V_I_ID, V_SITE_ID, V_EQUIP_NO, V_USERID, V_USERNAME,
                V_PLANTCODE, V_DEPARTCODE, V_CHANGETIME);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7110_SITESUPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7110_SITESUPPLYLIST(@RequestParam(value = "A_ID") String A_ID,
                                                          @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                                          @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_RUN7110_SITESUPPLYLIST(A_ID, A_MATERIALCODE, A_ORDERID);
        return result;
    }

    @RequestMapping(value = "/PG_RUN7113_GETORDERMATBARCODE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PG_RUN7113_GETORDERMATBARCODE(@RequestParam(value = "A_ORDERID") String A_ORDERID,
                                                             @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = sxdService.PG_RUN7113_GETORDERMATBARCODE(A_ORDERID, A_MATERIALCODE);
        return result;
    }

    @RequestMapping(value = "/No7113EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void No7113EXCEL(
            @RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
            @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
            @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            HttpServletResponse response)
            throws
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = sxdService.PRO_RUN7113_ORDERMATLIST(V_DEPT_CODE, V_EQUIP_CODE, V_MATERIALCODE, V_MATERIALNAME);

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
        cell.setCellValue("工单号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物料编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物料名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("使用数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("工单结束日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("工单描述");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_ORDERID") == null ? "" : map.get("V_ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("V_MATERIALCODE") == null ? "" : map.get("V_MATERIALCODE").toString());

                row.createCell((short) 3).setCellValue(map.get("V_MATERIALNAME") == null ? "" : map.get("V_MATERIALNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_UNIT") == null ? "" : map.get("V_UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("I_ACTUALAMOUNT") == null ? "" : map.get("I_ACTUALAMOUNT").toString());

                row.createCell((short) 6).setCellValue(map.get("D_FACT_FINISH_DATE") == null ? "" : map.get("D_FACT_FINISH_DATE").toString());

                row.createCell((short) 7).setCellValue(map.get("V_SHORT_TXT") == null ? "" : map.get("V_SHORT_TXT").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("工单备件更换管理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/UPLOAD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> UPLOAD(
            @RequestParam(value = "upload") MultipartFile upload,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_D_ALTERTIME") String V_D_ALTERTIME,
            @RequestParam(value = "V_N_IS_MAINPHOTO") int V_N_IS_MAINPHOTO,
            @RequestParam(value = "V_FILETYPE") String V_FILETYPE,
            HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        //int N_IS_MAINPHOTO=Integer.parseInt(V_N_IS_MAINPHOTO);
        String V_V_FILEURL = request.getSession().getServletContext().getRealPath("upload");
        String V_V_FILENAME = upload.getOriginalFilename();
        File targetFile = new File(V_V_FILEURL, V_V_FILENAME);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        //保存
        try {
            upload.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("fileUrl", request.getContextPath() + "/upload/" + V_V_FILENAME);
        Map result = null;
        result = sxdService.PRO_SAP_PM_EQU_FILE(V_V_EQUCODE, V_V_FILENAME, V_V_FILEURL, V_D_ALTERTIME, V_N_IS_MAINPHOTO, V_FILETYPE);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/SEL_SAP_PM_EQU_FILE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SEL_SAP_PM_EQU_FILE(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = sxdService.SEL_SAP_PM_EQU_FILE(V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/DEL_SAP_PM_EQU_FILE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DEL_SAP_PM_EQU_FILE(
            @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
            @RequestParam(value = "V_FILEURL") String V_FILEURL,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        File file=new File(V_FILEURL+"\\"+V_V_FILENAME);
        if (file.exists()){
            file.delete();
        }
        Map result = null;
        result = sxdService.DEL_SAP_PM_EQU_FILE(V_V_FILENAME);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_COPY", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_PM_EQU_P_COPY(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_SAP_PM_EQU_P_COPY(V_V_DEPTCODE,V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE_TREE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE_TREE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                            @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                            @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = sxdService.PRO_BASE_DEPT_VIEW_ROLE_TREE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_DEPT_WORKORDER_DEFECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_WORKORDER_DEFECT(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                              HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_BASE_DEPT_WORKORDER_DEFECT(V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_SEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                    @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_PM_WORKORDER_SEL(V_V_DEPTCODE,V_V_STATECODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_DEFECT_SEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                 @RequestParam(value = "V_V_STATENAME") String V_V_STATENAME,
                                                 @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                 @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_PM_DEFECT_SEL(V_V_DEPTCODE,V_V_STATENAME,V_V_PAGE,V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                       @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);
        return result;
    }

    @RequestMapping(value = "/PRO_GET_DEPTEQUTYPE_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_GET_DEPTEQUTYPE_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_GET_DEPTEQUTYPE_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT);
        return result;
    }

    @RequestMapping(value = "/PRO_GET_DEPTEQU_PER_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_GET_DEPTEQU_PER_DROP(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                        @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                        @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_GET_DEPTEQU_PER_DROP(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_EQU_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SAP_EQU_VIEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                                @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_SAP_EQU_VIEW(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE,V_V_EQUTYPECODE,V_V_EQUCODE);
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_TYPE_ITEM_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_TYPE_ITEM_SEL(HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = sxdService.PM_14_FAULT_TYPE_ITEM_SEL();
        return result;
    }

    @RequestMapping(value = "/PM_14_FAULT_ITEM_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_14_FAULT_ITEM_DATA_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                         @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                         @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                                         @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                                         @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                                         @RequestParam(value = "V_V_FINDTIME_B") String V_V_FINDTIME_B,
                                                         @RequestParam(value = "V_V_FINDTIME_E") String V_V_FINDTIME_E,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = sxdService.PM_14_FAULT_ITEM_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME_B, V_V_FINDTIME_E);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_FILE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_ADD(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                 @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                                                 @RequestParam(value = "V_V_FILEBLOB2") MultipartFile V_V_FILEBLOB,
                                                 @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                                                 @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                                                 @RequestParam(value = "V_V_DEPT") String V_V_DEPT,
                                                 @RequestParam(value = "V_V_PERSON") String V_V_PERSON,
                                                 @RequestParam(value = "V_V_REMARK") String V_V_REMARK,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = sxdService.PRO_BASE_FILE_ADD(V_V_GUID, V_V_FILENAME, V_V_FILEBLOB.getInputStream(), V_V_FILETYPECODE, V_V_PLANT, V_V_DEPT, V_V_PERSON, V_V_REMARK);
        String pm_1012 = (String) data.get("RET");
        result.put("RET", pm_1012);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_FILE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                 @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_BASE_FILE_SEL(V_V_GUID, V_V_FILETYPECODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_FILE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_FILE_DEL(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_BASE_FILE_DEL(V_V_FILEGUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_LOG_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_DEFECT_LOG_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                     @RequestParam(value = "V_V_LOGREMARK") String V_V_LOGREMARK,
                                                     @RequestParam(value = "V_V_FINISHCODE") String V_V_FINISHCODE,
                                                     @RequestParam(value = "V_V_KEY") String V_V_KEY,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = sxdService.PRO_PM_DEFECT_LOG_SET(V_V_GUID,V_V_LOGREMARK,V_V_FINISHCODE,V_V_KEY);
        return result;
    }
}