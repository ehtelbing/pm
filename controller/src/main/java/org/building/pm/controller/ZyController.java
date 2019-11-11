package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.HpService;
import org.building.pm.service.ZyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import java.net.URLDecoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/zy")
public class ZyController {
    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private ZyService zyService;

    public String getFileName(String filePath) {
        String filePaths[] = filePath.split("[\\\\|/]");
        return filePaths[filePaths.length - 1];
    }

    @RequestMapping(value = "/PRO_RUN7111_EQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7111_EQULIST(
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN7111_EQULIST(V_V_PLANTCODE, V_V_DEPTCODE);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW(
            @RequestParam(value = "IS_V_DEPTCODE") String IS_V_DEPTCODE,
            @RequestParam(value = "IS_V_DEPTTYPE") String IS_V_DEPTTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_BASE_DEPT_VIEW(IS_V_DEPTCODE, IS_V_DEPTTYPE);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_SITE_BJ_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_BJ_ALL(
            @RequestParam(value = "IN_EQUID") String IN_EQUID,
            @RequestParam(value = "IN_PLANT") String IN_PLANT,
            @RequestParam(value = "IN_DEPART") String IN_DEPART,
            @RequestParam(value = "IN_STATUS") String IN_STATUS,
            @RequestParam(value = "IN_BJCODE") String IN_BJCODE,
            @RequestParam(value = "IN_BJDESC") String IN_BJDESC,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN_SITE_BJ_ALL(IN_EQUID, IN_PLANT,IN_DEPART,IN_STATUS,IN_BJCODE,IN_BJDESC);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7110_SITESUPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7110_SITESUPPLYLIST(
            @RequestParam(value = "A_ID") String A_ID,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN7110_SITESUPPLYLIST(A_ID, A_MATERIALCODE,A_ORDERID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7113_ORDERMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7113_ORDERMATLIST(
            @RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
            @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
            @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN7113_ORDERMATLIST(V_DEPT_CODE, V_EQUIP_CODE,V_MATERIALCODE,V_MATERIALNAME);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PG_RUN7113_GETORDERMATBARCODE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PG_RUN7113_GETORDERMATBARCODE(
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PG_RUN7113_GETORDERMATBARCODE(A_ORDERID, A_MATERIALCODE);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public Map uploadFile(
            @RequestParam(value = "bjcode") String bjcode,
            @RequestParam(value = "checktime") String checktime,
            @RequestParam(value = "checkcount") String checkcount,
            @RequestParam(value = "upload") MultipartFile upload,
            @RequestParam(value = "usercode") String usercode,
            @RequestParam(value = "uesrname") String uesrname,
            @RequestParam(value = "tagid") String tagid,
            @RequestParam(value = "siteid") String siteid,
            @RequestParam(value = "tagvalue") String tagvalue,
            HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
//        String filename = upload.getOriginalFilename();
//
//        String path = request.getSession().getServletContext().getRealPath("upload");
//
//        File targetFile = new File(path, filename);
//        if (!targetFile.exists()) {
//            targetFile.mkdirs();
//        }
//        //保存
//        try {
//            upload.transferTo(targetFile);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        //model.addAttribute("fileUrl", request.getContextPath() + "/upload/" + filename);
        InputStream filedata = upload.getInputStream();
        String filename = getFileName(upload.getOriginalFilename());
        //filedata = new FileInputStream(path + "/" + filename);

        Map test = new HashMap();

        List<Map> result = null;
        result = zyService.pro_run7111_addlog(bjcode, checktime, checkcount, filedata, filename,
                usercode, uesrname, tagid, siteid, tagvalue);
        test.put("list", result);
        test.put("success", true);
        return test;
    }

    @RequestMapping(value = "/PRO_RUN7113_CHANGEORDERMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7113_CHANGEORDERMAT(@RequestParam(value = "A_ID") String A_ID,
                                                          @RequestParam(value = "SITE_ID") String SITE_ID,
                                                          @RequestParam(value = "a_change_amount") String a_change_amount,
                                                          @RequestParam(value = "V_EQUIP_NO") String V_EQUIP_NO,
                                                          @RequestParam(value = "USERID") String USERID,

                                                          @RequestParam(value = "USERNAME") String USERNAME,
                                                          @RequestParam(value = "PLANTCODE") String PLANTCODE,
                                                          @RequestParam(value = "WORKAREA") String WORKAREA,
                                                         // @RequestParam(value = "CHANGEDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date CHANGEDATE,
                                                          @RequestParam(value = "CHANGEDATE") String CHANGEDATE,
                                                          @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,

                                                          @RequestParam(value = "a_supplycode") String a_supplycode,
                                                          @RequestParam(value = "a_supplyname") String a_supplyname,
                                                          @RequestParam(value = "a_uniquecode") String a_uniquecode,
                                                          //@RequestParam(value = "a_replacedate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date a_replacedate,
                                                          @RequestParam(value = "a_replacedate") String a_replacedate,
                                                          @RequestParam(value = "a_faultreason") String a_faultreason,

                                                          @RequestParam(value = "A_REASON_REMARK") String A_REASON_REMARK,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
       /* Map result = zyService.PRO_RUN7113_CHANGEORDERMAT(A_ID, SITE_ID, a_change_amount, V_EQUIP_NO, USERID,
                USERNAME, PLANTCODE, WORKAREA, CHANGEDATE, V_MATERIALCODE,
                a_supplycode, a_supplyname, a_uniquecode, a_replacedate, a_faultreason,
                A_REASON_REMARK);
        return result;*/

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN7113_CHANGEORDERMAT(A_ID, SITE_ID, a_change_amount, V_EQUIP_NO, USERID,
                USERNAME, PLANTCODE, WORKAREA, CHANGEDATE, V_MATERIALCODE,
                a_supplycode, a_supplyname, a_uniquecode, a_replacedate, a_faultreason,
                A_REASON_REMARK);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7113_ORDERMATLIST_excel", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7113_ORDERMATLIST_excel(
            @RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
            @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
            @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
//        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");
//        A_CYCLE_ID = URLDecoder.decode(A_CYCLE_ID, "UTF-8");

        Map<String, Object> data = zyService.PRO_RUN7113_ORDERMATLIST(V_DEPT_CODE, V_EQUIP_CODE,V_MATERIALCODE,V_MATERIALNAME);

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
                String fileName = new String("工单备件更换Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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

    @RequestMapping(value = "/PRO_RUN_CYCLE_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_ABLE(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN_CYCLE_ABLE();
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7130_SELECTBJTIME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7130_SELECTBJTIME(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
            @RequestParam(value = "D_END_DATE") String D_END_DATE,
            @RequestParam(value = "V_CYCLE_ID") String V_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN7130_SELECTBJTIME(V_PLANTCODE, V_DEPARTCODE,V_SUPPLY_CODE,V_MATERIALNAME,D_BEGIN_DATE,D_END_DATE,V_CYCLE_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7130_SELECTBJTIME_excel", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7130_SELECTBJTIME_excel(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
            @RequestParam(value = "D_END_DATE") String D_END_DATE,
            @RequestParam(value = "V_CYCLE_ID") String V_CYCLE_ID,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        V_PLANTCODE = URLDecoder.decode(V_PLANTCODE, "UTF-8");
        V_DEPARTCODE = URLDecoder.decode(V_DEPARTCODE, "UTF-8");
        V_SUPPLY_CODE = URLDecoder.decode(V_SUPPLY_CODE, "UTF-8");
        V_MATERIALNAME = URLDecoder.decode(V_MATERIALNAME, "UTF-8");
        D_BEGIN_DATE = URLDecoder.decode(D_BEGIN_DATE, "UTF-8");
        D_END_DATE = URLDecoder.decode(D_END_DATE, "UTF-8");
        V_CYCLE_ID = URLDecoder.decode(V_CYCLE_ID, "UTF-8");

        Map<String, Object> data = zyService.PRO_RUN7130_SELECTBJTIME(V_PLANTCODE, V_DEPARTCODE,V_SUPPLY_CODE,V_MATERIALNAME,D_BEGIN_DATE,D_END_DATE,V_CYCLE_ID);

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
        cell.setCellValue("安装工单");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("换下工单");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("安装日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("更换数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("换下日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("安装天数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("备件安装位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("设备");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("供应商");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("物资编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("物资描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("累计作业量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        cell = row.createCell((short) 14);
        cell.setCellValue("唯一码");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("ORDERID_S") == null ? "" : map.get("ORDERID_S").toString());

                row.createCell((short) 2).setCellValue(map.get("ORDERID_D") == null ? "" : map.get("ORDERID_D").toString());

                row.createCell((short) 3).setCellValue(map.get("CHANGEDATE_S") == null ? "" : map.get("CHANGEDATE_S").toString());

                row.createCell((short) 4).setCellValue(map.get("CHANGE_AMOUNT") == null ? "" : map.get("CHANGE_AMOUNT").toString());

                row.createCell((short) 5).setCellValue(map.get("CHANGEDATE_D") == null ? "" : map.get("CHANGEDATE_D").toString());

                row.createCell((short) 6).setCellValue(map.get("S_DAY") == null ? "" : map.get("S_DAY").toString());

                row.createCell((short) 7).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 8).setCellValue(map.get("EQU_DESC") == null ? "" : map.get("EQU_DESC").toString());

                row.createCell((short) 9).setCellValue(map.get("SUPPLY_NAME") == null ? "" : map.get("SUPPLY_NAME").toString());

                row.createCell((short) 10).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 11).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 12).setCellValue(map.get("WORK_TIEM") == null ? "" : map.get("WORK_TIEM").toString());

                row.createCell((short) 13).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

                row.createCell((short) 14).setCellValue(map.get("BJ_UNIQUE_CODE") == null ? "" : map.get("BJ_UNIQUE_CODE").toString());
            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("备件寿命统计Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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
