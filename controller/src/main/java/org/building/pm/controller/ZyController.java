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

    //设备选择
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

    //厂矿STORE
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

   //获取可用运行周期类型
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

    @RequestMapping(value = "/PRO_RUN7132_ORDERMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7132_ORDERMATLIST(
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


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN7132_ORDERMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE,V_V_PLANT,V_V_DEPTCODE,V_V_EQUIP_NO,V_V_ORDERGUID,V_V_MATERIALCODE,V_V_MATERIALNAME);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_NO7132_DEPARTMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_NO7132_DEPARTMATLIST(
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


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_NO7132_DEPARTMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE,V_V_PLANT,V_V_DEPTCODE,V_V_EQUIP_NO,V_V_ORDERGUID,V_V_MATERIALCODE,V_V_MATERIALNAME);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //导出重点备件跟踪使用情况分析表
    @RequestMapping(value = "/EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void EXCEL(@RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                      @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                      @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                      @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
                      @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
                      @RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                      @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                      HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        /*V_V_EQUIP_NO = URLDecoder.decode(V_V_EQUIP_NO, "UTF-8");
        V_V_DEPTCODE = URLDecoder.decode(V_V_DEPTCODE, "UTF-8");
        V_V_ORDERGUID = URLDecoder.decode(V_V_ORDERGUID, "UTF-8");
        V_V_MATERIALCODE = URLDecoder.decode(V_V_MATERIALCODE, "UTF-8");
        V_V_MATERIALNAME = URLDecoder.decode(V_V_MATERIALNAME, "UTF-8");*/

        HashMap data1 = zyService.PRO_NO7132_DEPARTMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE,
                V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE, V_V_MATERIALNAME);


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
        cell.setCellValue("部门名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("实际使用备件数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("已更换备件数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("未更换备件数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备件更换执行率");
        cell.setCellStyle(style);

        if (data1.size() > 0) {
            list = (List) data1.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("ORDERAMOUNT") == null ? "" : map.get("ORDERAMOUNT").toString());

                row.createCell((short) 3).setCellValue(map.get("ORDERACTU") == null ? "" : map.get("ORDERACTU").toString());

                row.createCell((short) 4).setCellValue(map.get("I_ACTUALAMOUNT") == null ? "" : map.get("I_ACTUALAMOUNT").toString());

                row.createCell((short) 5).setCellValue(map.get("EXECUTERATE") == null ? "" : map.get("EXECUTERATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("备件跟踪部门情况统计Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
                response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
                //OutputStream out = response.getOutputStream();

                /*wb.write(out);
                out.flush();
                out.close();*/
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        //明细
        HashMap data2 = zyService.PRO_RUN7132_ORDERMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE,
                V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE, V_V_MATERIALNAME);
        HSSFSheet sheet2 = wb.createSheet();
        for (int i = 0; i <= 14; i++) {
            sheet2.setColumnWidth(i, 3000);
        }

        HSSFRow row2 = sheet2.createRow((int) 0);
        HSSFCellStyle style2 = wb.createCellStyle();
        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell2 = row2.createCell((short) 0);
        cell2.setCellValue("序号");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 1);
        cell2.setCellValue("工单号");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 2);
        cell2.setCellValue("物料编码");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 3);
        cell2.setCellValue("物料名称");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 4);
        cell2.setCellValue("计量单位");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 5);
        cell2.setCellValue("实际领用数量");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 6);
        cell2.setCellValue("已更换数量");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 7);
        cell2.setCellValue("未更换数量");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 8);
        cell2.setCellValue("工单结束日期");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 9);
        cell2.setCellValue("工单描述");
        cell2.setCellStyle(style2);

        cell2 = row2.createCell((short) 10);
        cell2.setCellValue("所属设备");
        cell2.setCellStyle(style2);

        if (data2.size() > 0) {
            list = (List) data2.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet2.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_ORDERID") == null ? "" : map.get("V_ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("V_MATERIALCODE") == null ? "" : map.get("V_MATERIALCODE").toString());

                row.createCell((short) 3).setCellValue(map.get("V_MATERIALNAME") == null ? "" : map.get("V_MATERIALNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_UNIT") == null ? "" : map.get("V_UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("ORDERAMOUNT") == null ? "" : map.get("ORDERAMOUNT").toString());

                row.createCell((short) 6).setCellValue(map.get("ORDERACTU") == null ? "" : map.get("ORDERACTU").toString());

                row.createCell((short) 7).setCellValue(map.get("I_ACTUALAMOUNT") == null ? "" : map.get("I_ACTUALAMOUNT").toString());

                row.createCell((short) 8).setCellValue(map.get("D_FACT_FINISH_DATE") == null ? "" : map.get("D_FACT_FINISH_DATE").toString());

                row.createCell((short) 9).setCellValue(map.get("V_SHORT_TXT") == null ? "" : map.get("V_SHORT_TXT").toString());

                row.createCell((short) 10).setCellValue(map.get("V_EQUIP_NAME") == null ? "" : map.get("V_EQUIP_NAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("重点备件跟踪使用情况分析表Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查询当前设备位置信息
    @RequestMapping(value = "/PRO_RUN_SITE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_ALL(
            @RequestParam(value = "A_EQU_ID") String A_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN_SITE_ALL(A_EQU_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //平均作业量
    @RequestMapping(value = "/PRO_RUN7131_SUPPLYBJAVG", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7131_SUPPLYBJAVG(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_CYCLE_ID") String V_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN7131_SUPPLYBJAVG(V_PLANTCODE, V_DEPARTCODE,V_EQU_ID,V_SITE_ID,V_CYCLE_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //在库备件监控
    @RequestMapping(value = "/PRO_RUN7127_SELECTKC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7127_SELECTKC(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {


        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = zyService.PRO_RUN7127_SELECTKC(V_PLANTCODE, V_DEPARTCODE,V_EQU_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //在库备件监控Excel
    @RequestMapping(value = "/PRO_RUN7127_SELECTKC_excel", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7127_SELECTKC_excel(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
//        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");
//        A_CYCLE_ID = URLDecoder.decode(A_CYCLE_ID, "UTF-8");

        Map<String, Object> data = zyService.PRO_RUN7127_SELECTKC(V_PLANTCODE, V_DEPARTCODE,V_EQU_ID);

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
        cell.setCellValue("物料号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物料描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("规格型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("库存数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("库存金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("作业区");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("库房名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("统计时间");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("ELATON") == null ? "" : map.get("ELATON").toString());

                row.createCell((short) 4).setCellValue(map.get("KCAMOUNT") == null ? "" : map.get("KCAMOUNT").toString());

                row.createCell((short) 5).setCellValue(map.get("KC_MONEY") == null ? "" : map.get("KC_MONEY").toString());

                row.createCell((short) 6).setCellValue(map.get("PLANTNAME") == null ? "" : map.get("PLANTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("STORENAME") == null ? "" : map.get("STORENAME").toString());

                row.createCell((short) 9).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());

            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("在库备件监控Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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
