package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.LxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
@RequestMapping("/app/pm/lx")
public class LxController {

    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private LxService lxService;

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW(
            @RequestParam(value = "IS_V_DEPTCODE") String IS_V_DEPTCODE,
            @RequestParam(value = "IS_V_DEPTTYPE") String IS_V_DEPTTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = lxService.PRO_BASE_DEPT_VIEW(IS_V_DEPTCODE, IS_V_DEPTTYPE);
        List<Map<String,Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_CYCLE_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_ABLE(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = lxService.PRO_RUN_CYCLE_ABLE();
        List<Map<String,Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN7111_EQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7111_EQULIST(
            @RequestParam(value = "v_v_plantcode") String v_v_plantcode,
            @RequestParam(value = "v_v_deptcode") String v_v_deptcode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = lxService.PRO_RUN7111_EQULIST(v_v_plantcode, v_v_deptcode);
        List<Map<String,Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/GET_WORK_YEILD_table", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_WORK_YEILD_table(
            @RequestParam(value = "a_plantcode") String a_plantcode,
            @RequestParam(value = "a_departcode") String a_departcode,
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

            Map result = lxService.GET_WORK_YEILD_table(a_plantcode,a_departcode,A_EQUID,A_BEGINDATE,A_ENDDATE,A_CYCLE_ID);

        return result;
    }

    //设备作业量台账导出Excel
    @RequestMapping(value = "/PG_RUN_YEILD_GET_WORK_YEILD_table", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PG_RUN_YEILD_GET_WORK_YEILD_table(
                                    @RequestParam(value = "a_plantcode") String a_plantcode,
                                    @RequestParam(value = "a_departcode") String a_departcode,
                                    @RequestParam(value = "A_EQUID") String A_EQUID,
                                     @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                    @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                     @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");
        A_CYCLE_ID = URLDecoder.decode(A_CYCLE_ID, "UTF-8");

        Map<String, Object> data = lxService.GET_WORK_YEILD_table(a_plantcode,a_departcode,A_EQUID, A_BEGINDATE, A_ENDDATE, A_CYCLE_ID);

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
        cell.setCellValue("周期类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("计算单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("作业日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("作业量");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("CYCLE_DESC") == null ? "" : map.get("CYCLE_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("CYCLE_UNIT") == null ? "" : map.get("CYCLE_UNIT").toString());

                row.createCell((short) 3).setCellValue(map.get("EQUNAME") == null ? "" : map.get("EQUNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("WORKDATE") == null ? "" : map.get("WORKDATE").toString());

                row.createCell((short) 5).setCellValue(map.get("INSERT_VALUE") == null ? "" : map.get("INSERT_VALUE").toString());
            }
            row = sheet.createRow( list.size() + 1);
            row.createCell((short) 0).setCellValue("作业量合计：");
            row.createCell((short) 1).setCellValue(data.get("RET_SUM") == null ? "" : data.get("RET_SUM").toString());

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备作业量台账Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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

    @RequestMapping(value = "/PRO_RUN_EQU_BJ_ALERT_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_EQU_BJ_ALERT_ALL(
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.PRO_RUN_EQU_BJ_ALERT_ALL(A_EQUID,A_CYCLE_ID);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL(
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");
        A_CYCLE_ID = URLDecoder.decode(A_CYCLE_ID, "UTF-8");

        Map<String, Object> data = lxService.PRO_RUN_EQU_BJ_ALERT_ALL(A_EQUID, A_CYCLE_ID);

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
        cell.setCellValue("备件安装位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("当前备件唯一  标识");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物资编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("物资描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("更换时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("作业量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("周期类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("报警值");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("预警偏移量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("备件状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("BJ_UNIQUE_CODE") == null ? "" : map.get("BJ_UNIQUE_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 4).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 6).setCellValue(map.get("CHANGEDATE") == null ? "" : map.get("CHANGEDATE").toString());

                row.createCell((short) 7).setCellValue(map.get("SUM_YEILD") == null ? "" : map.get("SUM_YEILD").toString());

                row.createCell((short) 8).setCellValue(map.get("CYCLE_DESC") == null ? "" : map.get("CYCLE_DESC").toString());

                row.createCell((short) 9).setCellValue(map.get("ALERT_VALUE") == null ? "" : map.get("ALERT_VALUE").toString());

                row.createCell((short) 10).setCellValue(map.get("OFFSET") == null ? "" : map.get("OFFSET").toString());

                row.createCell((short) 11).setCellValue(map.get("BJ_STATUS") == null ? "" : map.get("BJ_STATUS").toString());
            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备运行台账Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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

    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE(
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
            @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE,V_V_DEPTCODE,V_V_DEPTCODENEXT,V_V_DEPTTYPE);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_USE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_USE_ALL(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_BJ_UNIQUE_CODE") String A_BJ_UNIQUE_CODE,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.PRO_RUN_BJ_USE_ALL(A_PLANTCODE,A_DEPARTCODE,A_EQUID,A_BJ_UNIQUE_CODE,A_BEGINDATE,A_ENDDATE);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_USE_ALL_EXCLE", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN_BJ_USE_ALL_EXCLE(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_EQUID") String A_EQUID,
            @RequestParam(value = "A_BJ_UNIQUE_CODE") String A_BJ_UNIQUE_CODE,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        A_PLANTCODE = URLDecoder.decode(A_PLANTCODE, "UTF-8");
        A_DEPARTCODE = URLDecoder.decode(A_DEPARTCODE, "UTF-8");
        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");
        A_BJ_UNIQUE_CODE = URLDecoder.decode(A_BJ_UNIQUE_CODE, "UTF-8");


        Map<String, Object> data = lxService.PRO_RUN_BJ_USE_ALL(A_PLANTCODE,A_DEPARTCODE,A_EQUID,A_BJ_UNIQUE_CODE,A_BEGINDATE,A_ENDDATE);

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
        cell.setCellValue("最近更换日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("当前备件唯一标识");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物资编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("物资描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("备件状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("当前设备");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("当前备件设备位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("供应商");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("作业区");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("CHANGEDATE") == null ? "" : map.get("CHANGEDATE").toString());

                row.createCell((short) 2).setCellValue(map.get("BJ_UNIQUE_CODE") == null ? "" : map.get("BJ_UNIQUE_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 4).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 6).setCellValue(map.get("BJ_STATUS") == null ? "" : map.get("BJ_STATUS").toString());

                row.createCell((short) 7).setCellValue(map.get("EQU_NAME") == null ? "" : map.get("EQU_NAME").toString());

                row.createCell((short) 8).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 9).setCellValue(map.get("SUPPLY_NAME") == null ? "" : map.get("SUPPLY_NAME").toString());

                row.createCell((short) 10).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备备件历史更换台账Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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

    @RequestMapping(value = "/PRO_RUN_BJ_CHANGE_LOG_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_CHANGE_LOG_ALL(
            @RequestParam(value = "A_BJ_UNIQUE_CODE") String A_BJ_UNIQUE_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.PRO_RUN_BJ_CHANGE_LOG_ALL(A_BJ_UNIQUE_CODE);

        return result;
    }

    @RequestMapping(value = "/pro_run7112_checkloglist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7112_checkloglist(
            @RequestParam(value = "v_v_equcode") String v_v_equcode,
            @RequestParam(value = "v_v_deptcode") String v_v_deptcode,
            @RequestParam(value = "v_v_plantcode") String v_v_plantcode,
            @RequestParam(value = "v_v_id") String v_v_id,
            @RequestParam(value = "v_v_btime") String v_v_btime,
            @RequestParam(value = "v_v_etime") String v_v_etime,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.pro_run7112_checkloglist(v_v_equcode,v_v_deptcode,v_v_plantcode,v_v_id,v_v_btime,v_v_etime);

        return result;
    }

    @RequestMapping(value = "/pro_run7112_logpic", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> pro_run7112_logpic(
            @RequestParam(value = "v_v_id") String v_v_id,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map data= lxService.pro_run7112_logpic(v_v_id);
        Map result = new HashMap();
        if(data.get("O_FILE")!=null) {
            String fileName = (String) data.get("O_FILENAME");
            InputStream fileStream = ((Blob) data.get("O_FILE")).getBinaryStream();
            BufferedInputStream reader = new BufferedInputStream(fileStream);
            //response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
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
        result.put("success",true);
        return result;
    }

    @RequestMapping(value = "/pro_run7116_select", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7116_select(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            @RequestParam(value = "V_V_BEGIN_DATE") String V_V_BEGIN_DATE,
            @RequestParam(value = "V_V_END_DATE") String V_V_END_DATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.pro_run7116_select(V_V_DEPARTCODE,V_V_PLANTCODE,V_V_BJ_ID,V_V_BEGIN_DATE,V_V_END_DATE);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN7116_SELECT_EXCLE", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7116_SELECT_EXCLE(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            @RequestParam(value = "V_V_BEGIN_DATE") String V_V_BEGIN_DATE,
            @RequestParam(value = "V_V_END_DATE") String V_V_END_DATE,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        V_V_DEPARTCODE = URLDecoder.decode(V_V_DEPARTCODE, "UTF-8");
        V_V_PLANTCODE = URLDecoder.decode(V_V_PLANTCODE, "UTF-8");
        V_V_BJ_ID = URLDecoder.decode(V_V_BJ_ID, "UTF-8");
        V_V_BEGIN_DATE = URLDecoder.decode(V_V_BEGIN_DATE, "UTF-8");
        V_V_END_DATE = URLDecoder.decode(V_V_END_DATE, "UTF-8");


        Map<String, Object> data = lxService.pro_run7116_select(V_V_DEPARTCODE,V_V_PLANTCODE,V_V_BJ_ID,V_V_BEGIN_DATE,V_V_END_DATE);

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
        cell.setCellValue("状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("备件安装位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("备件唯一编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备件描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("报警内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("报警时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("设备负责人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("处理人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("处理结果");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("处理时间");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("STATUS_VALUE") == null ? "" : map.get("STATUS_VALUE").toString());

                row.createCell((short) 2).setCellValue(map.get("EQU_DESC") == null ? "" : map.get("EQU_DESC").toString());

                row.createCell((short) 3).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 4).setCellValue(map.get("BJ_UNIQUECODE") == null ? "" : map.get("BJ_UNIQUECODE").toString());

                row.createCell((short) 5).setCellValue(map.get("BJ_DESC") == null ? "" : map.get("BJ_DESC").toString());

                row.createCell((short) 6).setCellValue(map.get("HANDLE_CONTEXT") == null ? "" : map.get("HANDLE_CONTEXT").toString());

                row.createCell((short) 7).setCellValue(map.get("HANDLE_DATE") == null ? "" : map.get("HANDLE_DATE").toString());

                row.createCell((short) 8).setCellValue(map.get("USERNAME") == null ? "" : map.get("USERNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("HANDLE_USERNAME") == null ? "" : map.get("HANDLE_USERNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("HANDLE_CONTEXT") == null ? "" : map.get("HANDLE_CONTEXT").toString());

                row.createCell((short) 11).setCellValue(map.get("HANDLE_DATE") == null ? "" : map.get("HANDLE_DATE").toString());

            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("报警信息查询Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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

    @RequestMapping(value = "/pro_run7117_bjlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7117_bjlist(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.pro_run7117_bjlist(V_V_DEPARTCODE,V_V_PLANTCODE);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN7117_BJWORKLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7117_BJWORKLIST(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.pro_run7117_bjworklist(V_V_DEPARTCODE,V_V_PLANTCODE,V_V_BJ_ID);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN7117_BJWORKLIST_EXCLE", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7117_BJWORKLIST_EXCLE(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        V_V_DEPARTCODE = URLDecoder.decode(V_V_DEPARTCODE, "UTF-8");
        V_V_PLANTCODE = URLDecoder.decode(V_V_PLANTCODE, "UTF-8");
        V_V_BJ_ID = URLDecoder.decode(V_V_BJ_ID, "UTF-8");

        Map<String, Object> data = lxService.pro_run7117_bjworklist(V_V_DEPARTCODE,V_V_PLANTCODE,V_V_BJ_ID);

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
        cell.setCellValue("备件编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("备件唯一编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物料编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("物资名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("备件安装位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("作业时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("报警值");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("预警值");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("周期计算单位");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("BJ_ID") == null ? "" : map.get("BJ_ID").toString());

                row.createCell((short) 2).setCellValue(map.get("BJ_UNIQUE_CODE") == null ? "" : map.get("BJ_UNIQUE_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 4).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("EQU_DESC") == null ? "" : map.get("EQU_DESC").toString());

                row.createCell((short) 6).setCellValue(map.get("SITE_ID") == null ? "" : map.get("SITE_ID").toString());

                row.createCell((short) 7).setCellValue(map.get("CHANGEDATE") == null ? "" : map.get("CHANGEDATE").toString());

                row.createCell((short) 8).setCellValue(map.get("ALERT_VALUE") == null ? "" : map.get("ALERT_VALUE").toString());

                row.createCell((short) 9).setCellValue(map.get("CYCLE_DESC") == null ? "" : map.get("CYCLE_DESC").toString());

                row.createCell((short) 10).setCellValue(map.get("CYCLE_UNIT") == null ? "" : map.get("CYCLE_UNIT").toString());

            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("备件运行统计Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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

    @RequestMapping(value = "/PRO_RUN_SITE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_ALL(
            @RequestParam(value = "A_EQU_ID") String A_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.PRO_RUN_SITE_ALL(A_EQU_ID);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN7118_WORKTIMELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7118_WORKTIMELIST(
            @RequestParam(value = "V_V_SITE_ID") String V_V_SITE_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.PRO_RUN7118_WORKTIMELIST(V_V_SITE_ID);

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

        Map result = lxService.PRO_RUN_SITE_BJ_ALL(IN_EQUID,IN_PLANT,IN_DEPART,IN_STATUS,IN_BJCODE,IN_BJDESC);

        return result;
    }

    @RequestMapping(value = "/pro_run7119_sitevgurl", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7119_sitevgurl(
            @RequestParam(value = "V_SITE_id") String V_SITE_id,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.pro_run7119_sitevgurl(V_SITE_id);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN_SITE_BJ_ALL_EXCLE", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN_SITE_BJ_ALL_EXCLE(
            @RequestParam(value = "IN_EQUID") String IN_EQUID,
            @RequestParam(value = "IN_PLANT") String IN_PLANT,
            @RequestParam(value = "IN_DEPART") String IN_DEPART,
            @RequestParam(value = "IN_STATUS") String IN_STATUS,
            @RequestParam(value = "IN_BJCODE") String IN_BJCODE,
            @RequestParam(value = "IN_BJDESC") String IN_BJDESC,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        IN_EQUID = URLDecoder.decode(IN_EQUID, "UTF-8");
        IN_PLANT = URLDecoder.decode(IN_PLANT, "UTF-8");
        IN_DEPART = URLDecoder.decode(IN_DEPART, "UTF-8");
        IN_STATUS = URLDecoder.decode(IN_STATUS, "UTF-8");
        IN_BJCODE = URLDecoder.decode(IN_BJCODE, "UTF-8");
        IN_BJDESC = URLDecoder.decode(IN_BJDESC, "UTF-8");

        Map<String, Object> data = lxService.PRO_RUN_SITE_BJ_ALL(IN_EQUID,IN_PLANT,IN_DEPART,IN_STATUS,IN_BJCODE,IN_BJDESC);

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
        cell.setCellValue("备件安装位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("当前备件唯一标识");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物资编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("物资描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("最近更换时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("供应商");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("备件状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("BJ_UNIQUE_CODE") == null ? "" : map.get("BJ_UNIQUE_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 4).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 6).setCellValue(map.get("CHANGEDATE") == null ? "" : map.get("CHANGEDATE").toString());

                row.createCell((short) 7).setCellValue(map.get("SUPPLY_NAME") == null ? "" : map.get("SUPPLY_NAME").toString());

                row.createCell((short) 8).setCellValue(map.get("BJ_STATUS") == null ? "" : map.get("BJ_STATUS").toString());

            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("备件安装位置台帐Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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

    @RequestMapping(value = "/PRO_RUN7127_SELECTKC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7127_SELECTKC(
            @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
            @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.PRO_RUN7127_SELECTKC(V_PLANTCODE,V_DEPARTCODE,V_EQU_ID);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN7115_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7115_SELECT(
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
            @RequestParam(value = "V_V_USERID") String V_V_USERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.PRO_RUN7115_SELECT(V_V_DEPARTCODE,V_V_PLANTCODE,V_V_BJ_ID,V_V_USERID);

        return result;
    }

    @RequestMapping(value = "/pro_run7129_equvgurl", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7129_equvgurl(
            @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.pro_run7129_equvgurl(V_EQU_ID);

        return result;
    }

    @RequestMapping(value = "/pro_run7128_junkmatlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7128_junkmatlist(
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

        Map result = lxService.pro_run7128_junkmatlist(D_BEGIN_DATE,D_END_DATE,V_PLANTCODE,V_DEPARTCODE,V_EQU_ID,V_MATERIALCODE,V_MATERIALNAME,V_STATUS);

        return result;
    }

    @RequestMapping(value = "/pro_run7129_junkmat", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7129_junkmat(
            @RequestParam(value = "V_ID") String V_ID,
            @RequestParam(value = "V_HANDLE_TYPE") String V_HANDLE_TYPE,
            @RequestParam(value = "V_HANDLE_REMARK") String V_HANDLE_REMARK,
            @RequestParam(value = "V_HANDLE_USERID") String V_HANDLE_USERID,
            @RequestParam(value = "V_HANDLE_USERNAME") String V_HANDLE_USERNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map result = lxService.pro_run7129_junkmat(V_ID,V_HANDLE_TYPE,V_HANDLE_REMARK,V_HANDLE_USERID,V_HANDLE_USERNAME);

        return result;
    }

    @RequestMapping(value = "/PRO_RUN7128_JUNKMATLIST_EXCLE", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7128_JUNKMATLIST_EXCLE(
            @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
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
        V_PLANTCODE = URLDecoder.decode(V_PLANTCODE, "UTF-8");
        V_DEPARTCODE = URLDecoder.decode(V_DEPARTCODE, "UTF-8");
        V_EQU_ID = URLDecoder.decode(V_EQU_ID, "UTF-8");
        V_MATERIALCODE = URLDecoder.decode(V_MATERIALCODE, "UTF-8");
        V_MATERIALNAME = URLDecoder.decode(V_MATERIALNAME, "UTF-8");
        V_STATUS = URLDecoder.decode(V_STATUS, "UTF-8");

        Map<String, Object> data = lxService.pro_run7128_junkmatlist(D_BEGIN_DATE,D_END_DATE,V_PLANTCODE,V_DEPARTCODE,V_EQU_ID,V_MATERIALCODE,V_MATERIALNAME,V_STATUS);

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
        cell.setCellValue("备件唯一编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物料号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物料描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("规格型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("处理方式");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("处理说明");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("UNIQUE_CODE") == null ? "" : map.get("UNIQUE_CODE").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("ETALON") == null ? "" : map.get("ETALON").toString());

                row.createCell((short) 5).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 6).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 7).setCellValue(map.get("HANDLE_TYPE") == null ? "" : map.get("HANDLE_TYPE").toString());

                row.createCell((short) 8).setCellValue(map.get("HANDLE_REMARK") == null ? "" : map.get("HANDLE_REMARK").toString());

            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("换下备件处理Excel.xls".getBytes("UTF-8"), "ISO-8859-1");
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

