package org.building.pm.controller;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.building.pm.service.MlService;
import org.building.pm.service.MwdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

/**
 * Created by ml on 2017/1/8.
 * <p>
 * 大修controller
 */
@Controller
@RequestMapping("/app/pm/ml")
public class MlController {
    @Autowired
    private MlService mlService;

    @RequestMapping(value = "GET_PROJECT_CLASS_LIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_PROJECT_CLASS_LIST(HttpServletRequest request) throws SQLException {
        return mlService.GET_PROJECT_CLASS_LIST();
    }

    @RequestMapping(value = "GET_PROJECT_LIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_PROJECT_LIST(String V_CLASS_CODE, HttpServletRequest request) throws SQLException {
        return mlService.GET_PROJECT_LIST(V_CLASS_CODE);
    }

    //按供应商统计使用情况（查找供应商）
    @RequestMapping(value = "GETOILSUPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETOILSUPPLYLIST(@RequestParam(value = "A_COUNTRY_CODE") String A_COUNTRY_CODE,
                                                @RequestParam(value = "A_PROVINCE_CODE") String A_PROVINCE_CODE,
                                                @RequestParam(value = "A_CITY_CODE") String A_CITY_CODE,
                                                @RequestParam(value = "A_SUPPLY_CODE") String A_SUPPLY_CODE,
                                                @RequestParam(value = "A_SUPPLY_NAME") String A_SUPPLY_NAME,
                                                HttpServletRequest request,
                                                HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.GETOILSUPPLYLIST(A_COUNTRY_CODE, A_PROVINCE_CODE, A_CITY_CODE, A_SUPPLY_CODE, A_SUPPLY_NAME);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //按供应商统计使用情况（查找全部）
    @RequestMapping(value = "GET_SUPPLYOILUSE_TABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_SUPPLYOILUSE_TABLE(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                                      @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                                      @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                                      @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                                      @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                                      @RequestParam(value = "A_SUPPLY_CODE") String A_SUPPLY_CODE,
                                                      Integer start, Integer limit,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GET_SUPPLYOILUSE_TABLE(A_PLANTCODE, A_DEPARTCODE, A_BEGINDATE, A_ENDDATE, A_MAT_DESC, A_SUPPLY_CODE);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 10) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //按供应商统计使用情况导出EXCEL
    @RequestMapping(value = "/GET_SUPPLYOILUSE_TABLE_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GET_SUPPLYOILUSE_TABLE_EXCEL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                             @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                             @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                             @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                             @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                             @RequestParam(value = "A_SUPPLY_CODE") String A_SUPPLY_CODE,
                                             HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        A_MAT_DESC = URLDecoder.decode(A_MAT_DESC, "UTF-8");
        A_SUPPLY_CODE = URLDecoder.decode(A_SUPPLY_CODE, "UTF-8");

        Map<String, Object> data = mlService.GET_SUPPLYOILUSE_TABLE(A_PLANTCODE, A_DEPARTCODE, A_BEGINDATE, A_ENDDATE, A_MAT_DESC, A_SUPPLY_CODE);

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
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("供应商");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("部门");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("物料号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("物料名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("消耗数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("消耗时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("INST_EQUIP_NAME") == null ? "" : map.get("INST_EQUIP_NAME").toString());

                row.createCell((short) 2).setCellValue(map.get("SUPPLIER_NAME") == null ? "" : map.get("SUPPLIER_NAME").toString());

                row.createCell((short) 3).setCellValue(map.get("PLANTNAME") == null ? "" : map.get("PLANTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("OIL_MAT_NO") == null ? "" : map.get("OIL_MAT_NO").toString());

                row.createCell((short) 6).setCellValue(map.get("OIL_MAT_DESC") == null ? "" : map.get("OIL_MAT_DESC").toString());

                row.createCell((short) 7).setCellValue(map.get("OIL_UNIT") == null ? "" : map.get("OIL_UNIT").toString());

                row.createCell((short) 8).setCellValue(map.get("OIL_PRICE") == null ? "" : map.get("OIL_PRICE").toString());

                row.createCell((short) 9).setCellValue(map.get("OIL_AMOUNT") == null ? "" : map.get("OIL_AMOUNT").toString());

                row.createCell((short) 10).setCellValue(map.get("OIL_MONEY") == null ? "" : map.get("OIL_MONEY").toString());

                row.createCell((short) 11).setCellValue(map.get("OUT_DATE") == null ? "" : map.get("OUT_DATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("按供应商统计使用情况.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //按油品统计使用情况(查询)
    @RequestMapping(value = "GET_OILMAT_TABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_OILMAT_TABLE(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                                @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                                @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                                @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                                @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                                Integer start, Integer limit,
                                                HttpServletRequest request,
                                                HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GET_OILMAT_TABLE(A_PLANTCODE, A_DEPARTCODE, A_BEGINDATE, A_ENDDATE, A_MAT_NO, A_MAT_DESC);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //油品统计和导出EXCEL
    @RequestMapping(value = "/GET_OILMAT_TABLE_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GET_OILMAT_TABLE_EXCEL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                       @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                       @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                       @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                       @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                       @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                       HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        A_MAT_NO = URLDecoder.decode(A_MAT_NO, "UTF-8");
        A_MAT_DESC = URLDecoder.decode(A_MAT_DESC, "UTF-8");

        Map<String, Object> data = mlService.GET_OILMAT_TABLE(A_PLANTCODE, A_DEPARTCODE, A_BEGINDATE, A_ENDDATE, A_MAT_NO, A_MAT_DESC);

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
        cell.setCellValue("物料名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("消耗数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("部门");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("部位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("消耗时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("OIL_MAT_NO") == null ? "" : map.get("OIL_MAT_NO").toString());

                row.createCell((short) 2).setCellValue(map.get("OIL_MAT_DESC") == null ? "" : map.get("OIL_MAT_DESC").toString());

                row.createCell((short) 3).setCellValue(map.get("OIL_UNIT") == null ? "" : map.get("OIL_UNIT").toString());

                row.createCell((short) 4).setCellValue(map.get("OIL_PRICE") == null ? "" : map.get("OIL_PRICE").toString());

                row.createCell((short) 5).setCellValue(map.get("USE_AMOUNT") == null ? "" : map.get("USE_AMOUNT").toString());

                row.createCell((short) 6).setCellValue(map.get("OIL_MONEY") == null ? "" : map.get("OIL_MONEY").toString());

                row.createCell((short) 7).setCellValue(map.get("PLANTNAME") == null ? "" : map.get("PLANTNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("INST_EQUIP_NAME") == null ? "" : map.get("INST_EQUIP_NAME").toString());

                row.createCell((short) 10).setCellValue(map.get("PART_DESC") == null ? "" : map.get("PART_DESC").toString());

                row.createCell((short) 11).setCellValue(map.get("OILED_DATE") == null ? "" : map.get("OILED_DATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("按油品统计使用情况.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //主设备润滑油脂使用情况
    @RequestMapping(value = "GET_EQUOILCONSUME_TABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_EQUOILCONSUME_TABLE(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                                       @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                                       @RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
                                                       @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
                                                       @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                                       @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                                       @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                                       @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                                       Integer start, Integer limit,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GET_EQUOILCONSUME_TABLE(A_PLANTCODE, A_DEPARTCODE, A_EQUTYPE, A_EQUIP_ID, A_BEGINDATE, A_ENDDATE, A_MAT_NO, A_MAT_DESC);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //按主机设备统计油品使用情况（设备类型表）
    @RequestMapping(value = "GETEQUTYPELIST_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETEQUTYPELIST_ABLE(HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETEQUTYPELIST_ABLE();
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //按主机设备统计油品使用情况（设备名称表）
    @RequestMapping(value = "GETINSTEQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETINSTEQULIST(@RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
                                              @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                              @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                              @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
                                              @RequestParam(value = "A_EQUIP_NAME") String A_EQUIP_NAME,
                                              Integer start, Integer limit,
                                              HttpServletRequest request,
                                              HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETINSTEQULIST(A_EQUTYPE, A_PLANTCODE, A_DEPARTCODE, A_EQUIP_ID, A_EQUIP_NAME);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //主机设备统计油品使用情况导出Excel
    @RequestMapping(value = "/GET_EQUOILCONSUME_TABLE_Excel", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GET_EQUOILCONSUME_TABLE_Excel(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                              @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                              @RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
                                              @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
                                              @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                              @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                              @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                              @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                              HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        A_EQUTYPE = URLDecoder.decode(A_EQUTYPE, "UTF-8");
        A_EQUIP_ID = URLDecoder.decode(A_EQUIP_ID, "UTF-8");
        A_MAT_NO = URLDecoder.decode(A_MAT_NO, "UTF-8");
        A_MAT_DESC = URLDecoder.decode(A_MAT_DESC, "UTF-8");

        Map<String, Object> data = mlService.GET_EQUOILCONSUME_TABLE(A_PLANTCODE, A_DEPARTCODE, A_EQUTYPE, A_EQUIP_ID, A_BEGINDATE, A_ENDDATE, A_MAT_NO, A_MAT_DESC);
        System.out.println("----" + data);
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
        cell.setCellValue("设备编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("部门");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("物料号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("物料名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("消耗数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("消耗时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("INST_EQUIP_CODE") == null ? "" : map.get("INST_EQUIP_CODE").toString());

                row.createCell((short) 2).setCellValue(map.get("INST_EQUIP_NAME") == null ? "" : map.get("INST_EQUIP_NAME").toString());

                row.createCell((short) 3).setCellValue(map.get("PLANTNAME") == null ? "" : map.get("PLANTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("OIL_MAT_NO") == null ? "" : map.get("OIL_MAT_NO").toString());

                row.createCell((short) 6).setCellValue(map.get("OIL_MAT_DESC") == null ? "" : map.get("OIL_MAT_DESC").toString());

                row.createCell((short) 7).setCellValue(map.get("OIL_UNIT") == null ? "" : map.get("OIL_UNIT").toString());

                row.createCell((short) 8).setCellValue(map.get("OIL_PRICE") == null ? "" : map.get("OIL_PRICE").toString());

                row.createCell((short) 9).setCellValue(map.get("OIL_AMOUNT") == null ? "" : map.get("OIL_AMOUNT").toString());

                row.createCell((short) 10).setCellValue(map.get("OIL_MONEY") == null ? "" : map.get("OIL_MONEY").toString());

                row.createCell((short) 11).setCellValue(map.get("OUT_DATE") == null ? "" : map.get("OUT_DATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("按主机设备统计油品使用情况.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //润滑油脂物料设置
    @RequestMapping(value = "GETMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETMATLIST(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                          @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                          Integer start, Integer limit,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETMATLIST(A_MAT_NO, A_MAT_DESC);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //润滑油脂物料导出
    @RequestMapping(value = "/GETMATLIST_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GETMATLIST_EXCEL(@RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                 @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                 HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        A_MAT_DESC = URLDecoder.decode(A_MAT_DESC, "UTF-8");

        Map<String, Object> data = mlService.GETMATLIST(A_MAT_NO, A_MAT_DESC);
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
        cell.setCellValue("物料编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物料名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("供应商编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("供应商名称");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("MAT_NO") == null ? "" : map.get("MAT_NO").toString());

                row.createCell((short) 2).setCellValue(map.get("MAT_DESC") == null ? "" : map.get("MAT_DESC").toString());

                row.createCell((short) 3).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 4).setCellValue(map.get("SUPPLY_CODE") == null ? "" : map.get("SUPPLY_CODE").toString());

                row.createCell((short) 5).setCellValue(map.get("SUPPLY_NAME") == null ? "" : map.get("SUPPLY_NAME").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("润滑油脂物料设置.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //删除润滑油脂物料
    @RequestMapping(value = "/DELETEMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DELETEMAT(@RequestParam(value = "MAT_NO", required = false) List<String> MAT_NO_LIST,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        for (int i = 0; i < MAT_NO_LIST.size(); i++) {
            HashMap data = mlService.DELETEMAT(MAT_NO_LIST.get(i));
            result.put("RET_MSG", data.get("RET_MSG"));
            result.put("RET", data.get("RET"));
        }
        return result;
    }


    //导入润滑油脂物料
    @RequestMapping(value = "SELECTMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SELECTMAT(@RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
                                         HttpServletRequest request,
                                         HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        HashMap data = mlService.SELECTMAT(A_MAT_DESC);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //导入物料数据
    @RequestMapping(value = "IMPORTMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> IMPORTMAT(@RequestParam(value = "A_MAT_NO_LIST", required = false) List<String> A_MAT_NO_LIST,
                                         @RequestParam(value = "A_MAT_DESC_LIST", required = false) List<String> A_MAT_DESC_LIST,
                                         HttpServletRequest request,
                                         HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < A_MAT_NO_LIST.size(); i++) {
            HashMap data = mlService.IMPORTMAT(A_MAT_NO_LIST.get(i), A_MAT_DESC_LIST.get(i));
            result.put("RET_MSG", data.get("RET_MSG"));
            result.put("RET", data.get("RET"));
        }
        return result;
    }

    //设备类型设置模块
    @RequestMapping(value = "GETEQUTYPELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETEQUTYPELIST(Integer start, Integer limit, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETEQUTYPELIST();
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //新增设备类型设备类型
    @RequestMapping(value = "ADDEQUTYPE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> ADDEQUTYPE(@RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
                                          @RequestParam(value = "A_EQUTYPE_NAME") String A_EQUTYPE_NAME,
                                          @RequestParam(value = "A_EQUTYPE_REMARK") String A_EQUTYPE_REMARK,
                                          HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.ADDEQUTYPE(A_EQUTYPE, A_EQUTYPE_NAME, A_EQUTYPE_REMARK);
    }

    //设备状态修改
    @RequestMapping(value = "SETEQUTYPESTATUS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SETEQUTYPESTATUS(@RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.SETEQUTYPESTATUS(A_EQUTYPE);
    }

    //修改设备类型
    @RequestMapping(value = "UPDATEEQUTYPE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> UPDATEEQUTYPE(String A_EQUTYPE, String A_EQUTYPE_NAME, String A_EQUTYPE_REMARK, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        return mlService.UPDATEEQUTYPE(A_EQUTYPE, A_EQUTYPE_NAME, A_EQUTYPE_REMARK);
    }

    //设备润滑部位管理导出Excel
    @RequestMapping(value = "/GETINSTEQULIST_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GETINSTEQULIST_EXCEL(@RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
                                     @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                     @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                     @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
                                     @RequestParam(value = "A_EQUIP_NAME") String A_EQUIP_NAME,
                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        A_EQUTYPE = URLDecoder.decode(A_EQUTYPE, "UTF-8");
        A_DEPARTCODE = URLDecoder.decode(A_DEPARTCODE, "UTF-8");
        A_EQUIP_ID = URLDecoder.decode(A_EQUIP_ID, "UTF-8");
        A_EQUIP_NAME = URLDecoder.decode(A_EQUIP_NAME, "UTF-8");

        Map<String, Object> data = mlService.GETINSTEQULIST(A_EQUTYPE, A_PLANTCODE, A_DEPARTCODE, A_EQUIP_ID, A_EQUIP_NAME);

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
        cell.setCellValue("设备编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);
        cell = row.createCell((short) 3);
        cell.setCellValue("润滑规范型号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("所属厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("所属部门");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("INST_EQUIP_ID") == null ? "" : map.get("INST_EQUIP_ID").toString());

                row.createCell((short) 2).setCellValue(map.get("INST_EQUIP_NAME") == null ? "" : map.get("INST_EQUIP_NAME").toString());

                row.createCell((short) 3).setCellValue(map.get("EQUIP_DESC") == null ? "" : map.get("EQUIP_DESC").toString());

                row.createCell((short) 4).setCellValue(map.get("PLANTNAME") == null ? "" : map.get("PLANTNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("DEPARTNAME") == null ? "" : map.get("DEPARTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("INST_EQUIP_REMARK") == null ? "" : map.get("INST_EQUIP_REMARK").toString());


            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备润滑部位管理.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //获取主机规范
    @RequestMapping(value = "GET_EQULIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_EQULIST(String A_EQUTYPE, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.GET_EQULIST(A_EQUTYPE);
        List<Map<String, Object>> list = (List) data.get("list");
        System.out.println("----" + list);
        result.put("list", list);
        result.put("success", true);

        return result;
    }


    //设置设备润滑规范
    @RequestMapping(value = "SETEQU_NO", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SETEQU_NO(@RequestParam(value = "A_EQUIP_ID", required = false) List<String> A_EQUIP_ID_LIST,
                                         String A_EQUIP_NO,
                                         HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        for (int i = 0; i < A_EQUIP_ID_LIST.size(); i++) {
            HashMap data = mlService.SETEQU_NO(A_EQUIP_ID_LIST.get(i), A_EQUIP_NO);
            result.put("RET_MSG", data.get("RET_MSG"));
            result.put("RET", data.get("RET"));
        }
        return result;
    }


    //查找点检员
    @RequestMapping(value = "BASE_PERSON_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_PERSON_SEL(HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = mlService.BASE_PERSON_SEL();

        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //下方点检员表格显示
    @RequestMapping(value = "GETEQUPERSON", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETEQUPERSON(String A_EQUIP_ID, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = mlService.GETEQUPERSON(A_EQUIP_ID);

        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //保存点检员
    @RequestMapping(value = "ADDEQUPERSON", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> ADDEQUPERSON(String A_EQUIP_ID, String A_USERID, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.ADDEQUPERSON(A_EQUIP_ID, A_USERID);
    }

    //删除点检员
    @RequestMapping(value = "DELETEEQUPERSON", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DELETEEQUPERSON(String A_EQUIP_ID, @RequestParam(value = "A_USERID", required = false) List<String> A_USERID_LIST, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < A_USERID_LIST.size(); i++) {
            HashMap data = mlService.DELETEEQUPERSON(A_EQUIP_ID, A_USERID_LIST.get(i));

            result.put("RET_MSG", data.get("RET_MSG"));
            result.put("RET", data.get("RET"));

        }
        return result;
    }

    //查找部位信息
    @RequestMapping(value = "GETPARTLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETPARTLIST(String A_EQUIP_NO, String A_MAT_NO, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = mlService.GETPARTLIST(A_EQUIP_NO, A_MAT_NO);

        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //获得周期类型
    @RequestMapping(value = "PRO_RUN_CYCLE_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_ABLE(HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_RUN_CYCLE_ABLE();
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);


        return result;
    }

    //获取作业量列表
    @RequestMapping(value = "PRO_RUN_YEILD_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_YEILD_SELECT(String A_EQUID, String A_BEGINDATE, String A_ENDDATE, String A_CYCLE_ID,
                                                    Integer start, Integer limit, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN_YEILD_SELECT(A_EQUID, A_BEGINDATE, A_ENDDATE, A_CYCLE_ID);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("RET_SUM", data.get("RET_SUM"));
        result.put("total", total);
        result.put("success", true);

        return result;
    }


    //设备作业量台账导出Excel
    @RequestMapping(value = "/YEILD_SELECT_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GETINSTEQULIST_EXCEL(@RequestParam(value = "A_EQUID") String A_EQUID,
                                     @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                     @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                     @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");
        A_CYCLE_ID = URLDecoder.decode(A_CYCLE_ID, "UTF-8");

        Map<String, Object> data = mlService.PRO_RUN_YEILD_SELECT(A_EQUID, A_BEGINDATE, A_ENDDATE, A_CYCLE_ID);

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
        cell.setCellValue("作业量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("作业日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("CYCLE_DESC") == null ? "" : map.get("CYCLE_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("CYCLE_UNIT") == null ? "" : map.get("CYCLE_UNIT").toString());

                row.createCell((short) 3).setCellValue(map.get("INSERT_VALUE") == null ? "" : map.get("INSERT_VALUE").toString());

                row.createCell((short) 4).setCellValue(map.get("WORKDATE") == null ? "" : map.get("WORKDATE").toString());

                row.createCell((short) 5).setCellValue(map.get("INSERT_PERSON") == null ? "" : map.get("INSERT_PERSON").toString());

                row.createCell((short) 6).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());


            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备作业量台账Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //设备运行台账
    @RequestMapping(value = "PRO_RUN_EQU_BJ_ALERT_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_EQU_BJ_ALERT_ALL(String A_EQUID, String A_BEGINDATE, String A_ENDDATE, String A_CYCLE_ID,
                                                        Integer start, Integer limit, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN_EQU_BJ_ALERT_ALL(A_EQUID, A_CYCLE_ID);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //设备运行台账导出Excel
    @RequestMapping(value = "/PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN_EQU_BJ_ALERT_ALL_EXCEL(@RequestParam(value = "A_EQUID") String A_EQUID,
                                               @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                               HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");
        A_CYCLE_ID = URLDecoder.decode(A_CYCLE_ID, "UTF-8");

        Map<String, Object> data = mlService.PRO_RUN_EQU_BJ_ALERT_ALL(A_EQUID, A_CYCLE_ID);

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
        cell.setCellValue("设备位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("当前设备唯标识");
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
                String fileName = new String("设备运行台账Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查询设备备件历史更换台账
    @RequestMapping(value = "PRO_RUN_BJ_USE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_USE_ALL(String A_PLANTCODE, String A_DEPARTCODE, String A_EQUID, String A_BJ_UNIQUE_CODE, String A_BEGINDATE, String A_ENDDATE,
                                                  Integer start, Integer limit, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN_BJ_USE_ALL(A_PLANTCODE, A_DEPARTCODE, A_EQUID, A_BJ_UNIQUE_CODE, A_BEGINDATE, A_ENDDATE);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //查看设备更换历史
    @RequestMapping(value = "PRO_RUN_BJ_CHANGE_LOG_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_CHANGE_LOG_ALL(String A_BJ_UNIQUE_CODE, Integer start, Integer limit,
                                                         HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN_BJ_CHANGE_LOG_ALL(A_BJ_UNIQUE_CODE);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //查看详细更换历史
    @RequestMapping(value = "/PRO_RUN_SITE_BJ_CHANGE_LOG_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_BJ_CHANGE_LOG_ALL(
            @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
            @RequestParam(value = "V_BEGINDATE") String V_BEGINDATE,
            @RequestParam(value = "V_ENDDATE") String V_ENDDATE,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN_SITE_BJ_CHANGE_LOG_ALL(V_SITE_ID, V_BEGINDATE, V_ENDDATE);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //导出设备备件Excel
    @RequestMapping(value = "/PRO_RUN_BJ_USE_ALL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN_BJ_USE_ALL_EXCEL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                         @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                         @RequestParam(value = "A_BJ_UNIQUE_CODE") String A_BJ_UNIQUE_CODE,
                                         @RequestParam(value = "A_EQUID") String A_EQUID,
                                         @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                         @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                         HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        A_PLANTCODE = URLDecoder.decode(A_PLANTCODE, "UTF-8");
        A_DEPARTCODE = URLDecoder.decode(A_DEPARTCODE, "UTF-8");
        A_BJ_UNIQUE_CODE = URLDecoder.decode(A_BJ_UNIQUE_CODE, "UTF-8");
        A_EQUID = URLDecoder.decode(A_EQUID, "UTF-8");

        HashMap data = mlService.PRO_RUN_BJ_USE_ALL(A_PLANTCODE, A_DEPARTCODE, A_EQUID, A_BJ_UNIQUE_CODE, A_BEGINDATE, A_ENDDATE);
        // System.out.println("---"+data);
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
        cell.setCellValue("唯一标识");
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
        cell.setCellValue("设备位置");
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
                String fileName = new String("设备备件历史更换台账Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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
    //导出详细更换历史Excel
    @RequestMapping(value = "/PRO_RUN_BJ_CHANGE_LOG_ALL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN_BJ_CHANGE_LOG_ALL_EXCEL(String V_BJ_UNIQUE_CODE,
                                                HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        V_BJ_UNIQUE_CODE = URLDecoder.decode(V_BJ_UNIQUE_CODE, "UTF-8");
        Map<String, Object> data = mlService.PRO_RUN_BJ_CHANGE_LOG_ALL(V_BJ_UNIQUE_CODE);

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
        cell.setCellValue("更换日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("唯一标识");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物资描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("设备");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("设备位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("更换方向");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("供应商");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("CHANGEDATE") == null ? "" : map.get("CHANGEDATE").toString());

                row.createCell((short) 2).setCellValue(map.get("BJ_UNIQUE_CODE") == null ? "" : map.get("BJ_UNIQUE_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("CHANGE_EQUNAME") == null ? "" : map.get("CHANGE_EQUNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("CHANGE_SITE_DESC") == null ? "" : map.get("CHANGE_SITE_DESC").toString());

                row.createCell((short) 7).setCellValue(map.get("DIRECTION") == null ? "" : map.get("DIRECTION").toString());

                row.createCell((short) 8).setCellValue(map.get("SUPPLY_NAME") == null ? "" : map.get("SUPPLY_NAME").toString());

                row.createCell((short) 9).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备备件详细更换历史Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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
    //导出更换历史Excel
    @RequestMapping(value = "/PRO_RUN_SITE_BJ_CHANGE_LOG_ALL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN_SITE_BJ_CHANGE_LOG_ALL_EXCEL(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                     @RequestParam(value = "V_BEGINDATE") String V_BEGINDATE,
                                                     @RequestParam(value = "V_ENDDATE") String V_ENDDATE,
                                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        V_SITE_ID = URLDecoder.decode(V_SITE_ID, "UTF-8");
        Map<String, Object> data = mlService.PRO_RUN_SITE_BJ_CHANGE_LOG_ALL(V_SITE_ID, V_BEGINDATE, V_ENDDATE);

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
        cell.setCellValue("更换日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("唯一标识");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物资描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("设备");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("设备位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("更换方向");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("供应商");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("CHANGEDATE") == null ? "" : map.get("CHANGEDATE").toString());

                row.createCell((short) 2).setCellValue(map.get("BJ_UNIQUE_CODE") == null ? "" : map.get("BJ_UNIQUE_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("CHANGE_EQUNAME") == null ? "" : map.get("CHANGE_EQUNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("CHANGE_SITE_DESC") == null ? "" : map.get("CHANGE_SITE_DESC").toString());

                row.createCell((short) 7).setCellValue(map.get("DIRECTION") == null ? "" : map.get("DIRECTION").toString());

                row.createCell((short) 8).setCellValue(map.get("SUPPLY_NAME") == null ? "" : map.get("SUPPLY_NAME").toString());

                row.createCell((short) 9).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("设备备件详细更换历史Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查询报警信息
    @RequestMapping(value = "PRO_RUN7116_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7116_SELECT(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                                                  @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                                  @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                                                  @RequestParam(value = "V_V_BEGIN_DATE") String V_V_BEGIN_DATE,
                                                  @RequestParam(value = "V_V_END_DATE") String V_V_END_DATE,
                                                  Integer start, Integer limit,
                                                  HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN7116_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID, V_V_BEGIN_DATE, V_V_END_DATE);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //导出报警信息
    @RequestMapping(value = "/PRO_RUN7116_SELECT_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7116_SELECT_EXCEL(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
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

        Map<String, Object> data = mlService.PRO_RUN7116_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID, V_V_BEGIN_DATE, V_V_END_DATE);

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
        cell.setCellValue("位置");
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

                row.createCell((short) 6).setCellValue(map.get("ALERT_CONTEXT") == null ? "" : map.get("ALERT_CONTEXT").toString());

                row.createCell((short) 7).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());

                row.createCell((short) 8).setCellValue(map.get("USERNAME") == null ? "" : map.get("USERNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("HANDLE_USERNAME") == null ? "" : map.get("HANDLE_USERNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("HANDLE_CONTEXT") == null ? "" : map.get("HANDLE_CONTEXT").toString());

                row.createCell((short) 11).setCellValue(map.get("HANDLE_DATE") == null ? "" : map.get("HANDLE_DATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("报警信息查询Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查找备件
    @RequestMapping(value = "PRO_RUN7117_BJLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7117_BJLIST(String V_V_PLANTCODE, String V_V_DEPTCODE, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_RUN7117_BJLIST(V_V_PLANTCODE, V_V_DEPTCODE);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //查找备件运行统计信息
    @RequestMapping(value = "PRO_RUN7117_BJWORKLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7117_BJWORKLIST(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                                                      @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                                      @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                                                      Integer start, Integer limit,
                                                      HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN7117_BJWORKLIST(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //导出备件运行统计信息
    @RequestMapping(value = "/PRO_RUN7117_BJWORKLIST_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7117_BJWORKLIST_EXCEL(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                                             @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                             @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID, HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        V_V_DEPARTCODE = URLDecoder.decode(V_V_DEPARTCODE, "UTF-8");
        V_V_PLANTCODE = URLDecoder.decode(V_V_PLANTCODE, "UTF-8");
        V_V_BJ_ID = URLDecoder.decode(V_V_BJ_ID, "UTF-8");

        Map<String, Object> data = mlService.PRO_RUN7117_BJWORKLIST(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID);

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
        cell.setCellValue("设备位置");
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

                row.createCell((short) 6).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 7).setCellValue(map.get("CHANGEDATE") == null ? "" : map.get("CHANGEDATE").toString());

                row.createCell((short) 8).setCellValue(map.get("ALERT_VALUE") == null ? "" : map.get("ALERT_VALUE").toString());

                row.createCell((short) 9).setCellValue(map.get("CYCLE_DESC") == null ? "" : map.get("CYCLE_DESC").toString());

                row.createCell((short) 10).setCellValue(map.get("CYCLE_UNIT") == null ? "" : map.get("CYCLE_UNIT").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("备件运行统计Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //------NO7119设备位置台账
    //查找设备位置信息
    @RequestMapping(value = "PRO_RUN_SITE_BJ_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_BJ_ALL(@RequestParam(value = "IN_EQUID") String IN_EQUID,
                                                   @RequestParam(value = "IN_PLANT") String IN_PLANT,
                                                   @RequestParam(value = "IN_DEPART") String IN_DEPART,
                                                   @RequestParam(value = "IN_STATUS") String IN_STATUS,
                                                   @RequestParam(value = "IN_BJCODE") String IN_BJCODE,
                                                   @RequestParam(value = "IN_BJDESC") String IN_BJDESC,
                                                   Integer start, Integer limit,
                                                   HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN_SITE_BJ_ALL(IN_EQUID, IN_PLANT, IN_DEPART, IN_STATUS, IN_BJCODE, IN_BJDESC);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //导出设备信息位置

    @RequestMapping(value = "/PRO_RUN_SITE_BJ_ALL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN_SITE_BJ_ALL_EXCEL(@RequestParam(value = "IN_EQUID") String IN_EQUID,
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

        Map<String, Object> data = mlService.PRO_RUN_SITE_BJ_ALL(IN_EQUID, IN_PLANT, IN_DEPART, IN_STATUS, IN_BJCODE, IN_BJDESC);

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
        cell.setCellValue("设备安装位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("备件唯一标识");
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
                String fileName = new String("设备位置台账Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查看VG图
    @RequestMapping(value = "PRO_RUN7119_SITEVGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7119_SITEVGURL(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                     HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = mlService.PRO_RUN7119_SITEVGURL(V_SITE_ID);
        result.put("RET", data.get("RET"));
        result.put("success", true);

        return result;
    }

    //----No7130备件寿命统计
    //查询供应商
    @RequestMapping(value = "/PRO_RUN7110_SITESUPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7110_SITESUPPLYLIST(@RequestParam(value = "A_ID") String A_ID,
                                                          @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                                          @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                                          HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_RUN7110_SITESUPPLYLIST(A_ID, A_MATERIALCODE, A_ORDERID);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //查询备件寿命信息
    @RequestMapping(value = "/PRO_RUN7130_SELECTBJTIME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7130_SELECTBJTIME(@RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                        @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                        @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                        @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                                                        @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
                                                        @RequestParam(value = "D_END_DATE") String D_END_DATE,
                                                        @RequestParam(value = "V_CYCLE_ID") String V_CYCLE_ID,
                                                        Integer start, Integer limit,
                                                        HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_RUN7130_SELECTBJTIME(V_PLANTCODE, V_DEPARTCODE, V_SUPPLY_CODE, V_MATERIALNAME, D_BEGIN_DATE, D_END_DATE, V_CYCLE_ID);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);
        return result;
    }

    //导出备件寿命信息
    @RequestMapping(value = "/PRO_RUN7130_SELECTBJTIME_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_RUN7130_SELECTBJTIME_EXCEL(@RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
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
        V_CYCLE_ID = URLDecoder.decode(V_CYCLE_ID, "UTF-8");

        HashMap data = mlService.PRO_RUN7130_SELECTBJTIME(V_PLANTCODE, V_DEPARTCODE, V_SUPPLY_CODE, V_MATERIALNAME, D_BEGIN_DATE, D_END_DATE, V_CYCLE_ID);

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
        cell.setCellValue("安装日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("换下日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("安装天数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("设备");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("供应商");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("物资编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("物资描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("累计作业量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("备注");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("CHANGEDATE_S") == null ? "" : map.get("CHANGEDATE_S").toString());

                row.createCell((short) 2).setCellValue(map.get("CHANGEDATE_D") == null ? "" : map.get("CHANGEDATE_D").toString());

                row.createCell((short) 3).setCellValue(map.get("S_DAY") == null ? "" : map.get("S_DAY").toString());

                row.createCell((short) 4).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 5).setCellValue(map.get("EQU_DESC") == null ? "" : map.get("EQU_DESC").toString());

                row.createCell((short) 6).setCellValue(map.get("SUPPLY_NAME") == null ? "" : map.get("SUPPLY_NAME").toString());

                row.createCell((short) 7).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 8).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("WORK_TIEM") == null ? "" : map.get("WORK_TIEM").toString());

                row.createCell((short) 10).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("备件寿命统计Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //----No7132重点备件跟踪使用情况分析表
    //备件跟踪部门情况统计
    @RequestMapping(value = "/PRO_NO7132_DEPARTMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_NO7132_DEPARTMATLIST(@RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                                                        @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                                                        @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                        @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                                                        @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                        @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
                                                        @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
                                                        Integer start, Integer limit,
                                                        HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_NO7132_DEPARTMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE,
                V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE, V_V_MATERIALNAME);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //备件跟踪使用明细表
    @RequestMapping(value = "/PRO_RUN7132_ORDERMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7132_ORDERMATLIST(@RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                                                        @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                                                        @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                        @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                                                        @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                        @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
                                                        @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
                                                        Integer start, Integer limit,
                                                        HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN7132_ORDERMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE,
                V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE, V_V_MATERIALNAME);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }


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
        V_V_EQUIP_NO = URLDecoder.decode(V_V_EQUIP_NO, "UTF-8");
        V_V_DEPTCODE = URLDecoder.decode(V_V_DEPTCODE, "UTF-8");
        V_V_ORDERGUID = URLDecoder.decode(V_V_ORDERGUID, "UTF-8");
        V_V_MATERIALCODE = URLDecoder.decode(V_V_MATERIALCODE, "UTF-8");
        V_V_MATERIALNAME = URLDecoder.decode(V_V_MATERIALNAME, "UTF-8");

        HashMap data1 = mlService.PRO_NO7132_DEPARTMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE,
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
        HashMap data2 = mlService.PRO_RUN7132_ORDERMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE,
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

    //No7112备件检查记录查询
    //查找备件记录
    @RequestMapping(value = "/PRO_RUN7112_CHECKLOGLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN7112_CHECKLOGLIST(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                        @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                                        @RequestParam(value = "V_V_ID") String V_V_ID,
                                                        @RequestParam(value = "V_V_BTIME") String V_V_BTIME,
                                                        @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
                                                        Integer start, Integer limit,
                                                        HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_RUN7112_CHECKLOGLIST(V_V_EQUCODE, V_V_DEPTCODE, V_V_PLANTCODE,
                V_V_ID, V_V_BTIME, V_V_ETIME);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //PM_15010401 工单申请页面
    //查询申请工单
    @RequestMapping(value = "/PRO_DJ401_APPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_APPLYLIST(@RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                                   @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
                                                   @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
                                                   Integer start, Integer limit,
                                                   HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_DJ401_APPLYLIST(PLANTCODE_IN, DEPARTCODE_IN, USERCODE_IN);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //提交申请工单
    @RequestMapping(value = "/PRO_DJ401_SUBMITAPPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_SUBMITAPPLY(@RequestParam(value = "APPLYID_IN") String APPLYID_IN,
                                                     HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        return mlService.PRO_DJ401_SUBMITAPPLY(APPLYID_IN);
    }

    //删除工单
    @RequestMapping(value = "/PRO_DJ401_DELETEAPPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_DELETEAPPLY(@RequestParam(value = "APPLYID_IN") String APPLYID_IN,
                                                     HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        return mlService.PRO_DJ401_DELETEAPPLY(APPLYID_IN);
    }

    //PM_1501040101
    //查询接收厂矿

    @RequestMapping(value = "/PRO_DJ401_MENDPLANT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_MENDPLANT(HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ401_MENDPLANT();

        result.put("list", data.get("list"));
        result.put("success", true);

        return result;
    }

    //查询电机
    @RequestMapping(value = "/PRO_DJ201_DJMAINLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ201_DJMAINLIST(@RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                                    @RequestParam(value = "LOC_PLANTCODE_IN") String LOC_PLANTCODE_IN,
                                                    @RequestParam(value = "DJ_SERIES_CLASS_IN") String DJ_SERIES_CLASS_IN,
                                                    @RequestParam(value = "DJ_LOC_IN") String DJ_LOC_IN,
                                                    @RequestParam(value = "WORK_STATUS_IN") String WORK_STATUS_IN,
                                                    @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
                                                    @RequestParam(value = "DJ_UNIQUE_CODE_IN") String DJ_UNIQUE_CODE_IN,
                                                    @RequestParam(value = "DJ_TYPE_IN") String DJ_TYPE_IN,
                                                    @RequestParam(value = "DJ_VOL_IN") String DJ_VOL_IN,
                                                    HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ201_DJMAINLIST(PLANTCODE_IN, LOC_PLANTCODE_IN, DJ_SERIES_CLASS_IN, DJ_LOC_IN, WORK_STATUS_IN,
                DJ_NAME_IN, DJ_UNIQUE_CODE_IN, DJ_TYPE_IN, DJ_VOL_IN);

        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //维修类别
    @RequestMapping(value = "/PRO_DJ102_MENDTYPE_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ102_MENDTYPE_ABLE(HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ102_MENDTYPE_ABLE();

        result.put("list", data.get("list"));
        result.put("success", true);

        return result;
    }

    //查询附带物料列表
    @RequestMapping(value = "/PRO_DJ401_APPLYMATLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_APPLYMATLIST(@RequestParam(value = "APPLYID_IN") String APPLYID_IN,
                                                      Integer limit, Integer start,
                                                      HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();


        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_DJ401_APPLYMATLIST(APPLYID_IN);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //删除附带物料列表
    @RequestMapping(value = "/PRO_DJ401_DELETEAPPLYMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_DELETEAPPLYMAT(@RequestParam(value = "ID_IN") String ID_IN,
                                                        HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        return mlService.PRO_DJ401_DELETEAPPLYMAT(ID_IN);
    }

    //生成工单号
    @RequestMapping(value = "/GETAPPLYORDERID", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETAPPLYORDERID(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                               HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        return mlService.GETAPPLYORDERID(A_PLANTCODE);
    }

    //物资分类
    @RequestMapping(value = "/PRO_MM_ITYPE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_MM_ITYPE(HttpServletRequest request, HttpServletResponse response) throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_MM_ITYPE();

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //保存工单
    @RequestMapping(value = "/PRO_DJ401_APPLYSAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_APPLYSAVE(@RequestParam(value = "APPLYID_IN") String APPLYID_IN,
                                                   @RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                                   @RequestParam(value = "PLANTNAME_IN") String PLANTNAME_IN,
                                                   @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
                                                   @RequestParam(value = "DEPARTNAME_IN") String DEPARTNAME_IN,
                                                   @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
                                                   @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
                                                   @RequestParam(value = "BILLCODE_IN") String BILLCODE_IN,
                                                   @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                                   @RequestParam(value = "DJNAME_IN") String DJNAME_IN,
                                                   @RequestParam(value = "CONTEXT_IN") String CONTEXT_IN,
                                                   @RequestParam(value = "BEGINDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date BEGINDATE_IN,
                                                   @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date ENDDATE_IN,
                                                   @RequestParam(value = "V_PLANTCODEJS") String V_PLANTCODEJS,
                                                   @RequestParam(value = "REMARK_IN") String REMARK_IN,
                                                   @RequestParam(value = "DJCODE_IN") String DJCODE_IN,
                                                   @RequestParam(value = "CONFIRM_FLAG_IN") String CONFIRM_FLAG_IN,
                                                   @RequestParam(value = "MEND_TYPE_IN") String MEND_TYPE_IN,
                                                   HttpServletRequest request, HttpServletResponse response)
            throws SQLException, ParseException {

        return mlService.PRO_DJ401_APPLYSAVE(APPLYID_IN, PLANTCODE_IN, PLANTNAME_IN, DEPARTCODE_IN, DEPARTNAME_IN, USERCODE_IN, USERNAME_IN,
                BILLCODE_IN, DJ_UQ_CODE_IN, DJNAME_IN, CONTEXT_IN, BEGINDATE_IN, ENDDATE_IN, V_PLANTCODEJS, REMARK_IN, DJCODE_IN, CONFIRM_FLAG_IN, MEND_TYPE_IN);

    }

    //PM_1501040102
    //工单申请修改
    @RequestMapping(value = "/PRO_DJ401_APPLYMES", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_APPLYMES(@RequestParam(value = "APPLYID_IN") String APPLYID_IN,
                                                  HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ401_APPLYMES(APPLYID_IN);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //工单修改保存
    @RequestMapping(value = "/PRO_DJ401_APPLYUPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ401_APPLYUPDATE(@RequestParam(value = "APPLYID_IN") String APPLYID_IN,
                                                     @RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                                     @RequestParam(value = "PLANTNAME_IN") String PLANTNAME_IN,
                                                     @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
                                                     @RequestParam(value = "DEPARTNAME_IN") String DEPARTNAME_IN,
                                                     @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
                                                     @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
                                                     @RequestParam(value = "BILLCODE_IN") String BILLCODE_IN,
                                                     @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                                     @RequestParam(value = "DJNAME_IN") String DJNAME_IN,
                                                     @RequestParam(value = "CONTEXT_IN") String CONTEXT_IN,
                                                     @RequestParam(value = "BEGINDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date BEGINDATE_IN,
                                                     @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date ENDDATE_IN,
                                                     @RequestParam(value = "REMARK_IN") String REMARK_IN,
                                                     @RequestParam(value = "DJCODE_IN") String DJCODE_IN,
                                                     @RequestParam(value = "MEND_TYPE_IN") String MEND_TYPE_IN,
                                                     HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();

        return mlService.PRO_DJ401_APPLYUPDATE(APPLYID_IN, PLANTCODE_IN, PLANTNAME_IN, DEPARTCODE_IN, DEPARTNAME_IN, USERCODE_IN, USERNAME_IN,
                BILLCODE_IN, DJ_UQ_CODE_IN, DJNAME_IN, CONTEXT_IN, BEGINDATE_IN, ENDDATE_IN, REMARK_IN, DJCODE_IN, MEND_TYPE_IN);

    }

    //PM_15010402
    //厂矿工单申请查询
    @RequestMapping(value = "/PRO_DJ402_APPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ402_APPLYLIST(@RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                                   @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
                                                   @RequestParam(value = "DJCODE_IN") String DJCODE_IN,
                                                   @RequestParam(value = "DJNAME_IN") String DJNAME_IN,
                                                   @RequestParam(value = "CONTEXT_IN") String CONTEXT_IN,
                                                   @RequestParam(value = "BEGINDATE_IN") String BEGINDATE_IN,
                                                   @RequestParam(value = "ENDDATE_IN") String ENDDATE_IN,
                                                   @RequestParam(value = "TOPLANTCODE_IN") String TOPLANTCODE_IN,
                                                   @RequestParam(value = "CONFIRM_FLAG_IN") String CONFIRM_FLAG_IN,
                                                   Integer limit, Integer start,
                                                   HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_DJ402_APPLYLIST(PLANTCODE_IN, DEPARTCODE_IN, DJCODE_IN, DJNAME_IN, CONTEXT_IN, BEGINDATE_IN,
                ENDDATE_IN, TOPLANTCODE_IN, CONFIRM_FLAG_IN);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //导出申请工单查询
    @RequestMapping(value = "/PRO_DJ402_APPLYLIST_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_DJ402_APPLYLIST_EXCEL(@RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                          @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
                                          @RequestParam(value = "DJCODE_IN") String DJCODE_IN,
                                          @RequestParam(value = "DJNAME_IN") String DJNAME_IN,
                                          @RequestParam(value = "CONTEXT_IN") String CONTEXT_IN,
                                          @RequestParam(value = "BEGINDATE_IN") String BEGINDATE_IN,
                                          @RequestParam(value = "ENDDATE_IN") String ENDDATE_IN,
                                          @RequestParam(value = "TOPLANTCODE_IN") String TOPLANTCODE_IN,
                                          @RequestParam(value = "CONFIRM_FLAG_IN") String CONFIRM_FLAG_IN,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        PLANTCODE_IN = URLDecoder.decode(PLANTCODE_IN, "UTF-8");
        DEPARTCODE_IN = URLDecoder.decode(DEPARTCODE_IN, "UTF-8");
        TOPLANTCODE_IN = URLDecoder.decode(TOPLANTCODE_IN, "UTF-8");

        HashMap data = mlService.PRO_DJ402_APPLYLIST(PLANTCODE_IN, DEPARTCODE_IN, DJCODE_IN, DJNAME_IN, CONTEXT_IN, BEGINDATE_IN,
                ENDDATE_IN, TOPLANTCODE_IN, CONFIRM_FLAG_IN);

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
        cell.setCellValue("电机编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("电机名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划开始时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划完成时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("接收厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("接收状态");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("DJ_UQ_CODE") == null ? "" : map.get("DJ_UQ_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("DJ_NAME") == null ? "" : map.get("DJ_NAME").toString());

                row.createCell((short) 4).setCellValue(map.get("MEND_CONTEXT") == null ? "" : map.get("MEND_CONTEXT").toString());

                row.createCell((short) 5).setCellValue(map.get("INSERT_USERNAME") == null ? "" : map.get("INSERT_USERNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("PLAN_BEGINDATE") == null ? "" : map.get("PLAN_BEGINDATE").toString());

                row.createCell((short) 7).setCellValue(map.get("PLAN_ENDDATE") == null ? "" : map.get("PLAN_ENDDATE").toString());

                row.createCell((short) 8).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

                row.createCell((short) 9).setCellValue(map.get("REC_PLANT") == null ? "" : map.get("REC_PLANT").toString());

                row.createCell((short) 10).setCellValue(map.get("REC_FLAG") == null ? "" : map.get("REC_FLAG").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("厂矿工单申请查询Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //检修工单申请查询
    @RequestMapping(value = "/GET_WAITAPPLYLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_WAITAPPLYLIST(@RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                                 @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
                                                 @RequestParam(value = "USERCODE_IN") String USERCODE_IN,
                                                 Integer limit, Integer start,
                                                 HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GET_WAITAPPLYLIST(PLANTCODE_IN, DEPARTCODE_IN, USERCODE_IN);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //导出检修厂矿工单申请查询
    @RequestMapping(value = "/PRO_DJ402_APPLYLIST1_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_DJ402_APPLYLIST1_EXCEL(@RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                           @RequestParam(value = "DEPARTCODE_IN") String DEPARTCODE_IN,
                                           @RequestParam(value = "DJCODE_IN") String DJCODE_IN,
                                           @RequestParam(value = "DJNAME_IN") String DJNAME_IN,
                                           @RequestParam(value = "CONTEXT_IN") String CONTEXT_IN,
                                           @RequestParam(value = "BEGINDATE_IN") String BEGINDATE_IN,
                                           @RequestParam(value = "ENDDATE_IN") String ENDDATE_IN,
                                           @RequestParam(value = "TOPLANTCODE_IN") String TOPLANTCODE_IN,
                                           @RequestParam(value = "CONFIRM_FLAG_IN") String CONFIRM_FLAG_IN,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        PLANTCODE_IN = URLDecoder.decode(PLANTCODE_IN, "UTF-8");
        DEPARTCODE_IN = URLDecoder.decode(DEPARTCODE_IN, "UTF-8");
        TOPLANTCODE_IN = URLDecoder.decode(TOPLANTCODE_IN, "UTF-8");

        HashMap data = mlService.PRO_DJ402_APPLYLIST(PLANTCODE_IN, DEPARTCODE_IN, DJCODE_IN, DJNAME_IN, CONTEXT_IN, BEGINDATE_IN,
                ENDDATE_IN, TOPLANTCODE_IN, CONFIRM_FLAG_IN);

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
        cell.setCellValue("电机编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("电机名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划开始时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划完成时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("接收厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("接收状态");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("DJ_UQ_CODE") == null ? "" : map.get("DJ_UQ_CODE").toString());

                row.createCell((short) 3).setCellValue(map.get("DJ_NAME") == null ? "" : map.get("DJ_NAME").toString());

                row.createCell((short) 4).setCellValue(map.get("MEND_CONTEXT") == null ? "" : map.get("MEND_CONTEXT").toString());

                row.createCell((short) 5).setCellValue(map.get("INSERT_USERNAME") == null ? "" : map.get("INSERT_USERNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("PLAN_BEGINDATE") == null ? "" : map.get("PLAN_BEGINDATE").toString());

                row.createCell((short) 7).setCellValue(map.get("PLAN_ENDDATE") == null ? "" : map.get("PLAN_ENDDATE").toString());

                row.createCell((short) 8).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

                row.createCell((short) 9).setCellValue(map.get("REC_PLANT") == null ? "" : map.get("REC_PLANT").toString());

                row.createCell((short) 10).setCellValue(map.get("REC_FLAG") == null ? "" : map.get("REC_FLAG").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("检修厂矿工单申请查询Excel.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //确认并送达检修单位
    @RequestMapping(value = "/CONFIRM_APPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> CONFIRM_APPLY(@RequestParam(value = "APPLYID_IN") String APPLYID_IN,
                                             @RequestParam(value = "A_USERID") String A_USERID,
                                             HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.CONFIRM_APPLY(APPLYID_IN, A_USERID);
    }

    //退回到申请部门
    @RequestMapping(value = "/BACK_APPLY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BACK_APPLY(@RequestParam(value = "APPLYID_IN") String APPLYID_IN,
                                          @RequestParam(value = "A_USERID") String A_USERID,
                                          HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.BACK_APPLY(APPLYID_IN, A_USERID);
    }

    //查询检修单位
    @RequestMapping(value = "/PRO_DJ701_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ701_SELECT(@RequestParam(value = "MENDDEPT_NAME_IN") String MENDDEPT_NAME_IN,
                                                @RequestParam(value = "USERNAME_IN") String USERNAME_IN,
                                                Integer start, Integer limit,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_DJ701_SELECT(MENDDEPT_NAME_IN, USERNAME_IN);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //修改检修单位
    @RequestMapping(value = "/PRO_DJ701_UPDATE1", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ701_UPDATE1(@RequestParam(value = "V_MENDDEPTCODE") String V_MENDDEPTCODE,
                                                 @RequestParam(value = "V_MENDDEPTNAME") String V_MENDDEPTNAME,
                                                 @RequestParam(value = "V_USERID") String V_USERID,
                                                 @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                 HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        return mlService.PRO_DJ701_UPDATE1(V_MENDDEPTCODE, V_MENDDEPTNAME, V_USERID, V_USERNAME);
    }

    //润滑油脂查询
    @RequestMapping(value = "/PM_OIL_STANDARD_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_OIL_STANDARD_SEL(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                   Integer start, Integer limit,
                                                   HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PM_OIL_STANDARD_SEL(V_V_EQUCODE);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //检修单位配置
    //删除检修单位
    @RequestMapping(value = "/PRO_DJ701_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ701_DELETE(@RequestParam(value = "V_MENDDEPTCODE") String V_MENDDEPTCODE,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ701_DELETE(V_MENDDEPTCODE);
    }

    //新增检修单位
    @RequestMapping(value = "/PRO_DJ701_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ701_INSERT(@RequestParam(value = "V_MENDDEPTNAME") String V_MENDDEPTNAME,
                                                @RequestParam(value = "V_MENDDEPTCODE") String V_MENDDEPTCODE,
                                                @RequestParam(value = "V_MENDDEPTTYPE") String V_MENDDEPTTYPE,
                                                @RequestParam(value = "V_SUPERCODE") String V_SUPERCODE,
                                                @RequestParam(value = "V_USERID") String V_USERID,
                                                @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ701_INSERT(V_MENDDEPTNAME, V_MENDDEPTCODE, V_MENDDEPTTYPE, V_SUPERCODE, V_USERID, V_USERNAME);

    }

    //查询检修单位人员
    @RequestMapping(value = "/PRO_DJ701_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ701_VIEW(@RequestParam(value = "V_MENDDEPTCODE") String V_MENDDEPTCODE,
                                              HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ701_VIEW(V_MENDDEPTCODE);

        List<Map<String, Object>> list = (List) data.get("list");


        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //删除检修人员
    @RequestMapping(value = "/PRO_DJ701_PERSONDEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ701_PERSONDEL(@RequestParam(value = "V_USERID") String V_USERID,
                                                   HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ701_PERSONDEL(V_USERID);
    }

    //新增检修人员
    @RequestMapping(value = "/PRO_DJ701_PERINSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ701_PERINSERT(@RequestParam(value = "V_MENDDEPTCODE") String V_MENDDEPTCODE,
                                                   @RequestParam(value = "V_USERID") String V_USERID,
                                                   @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                   HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ701_PERINSERT(V_MENDDEPTCODE, V_USERID, V_USERNAME);
    }

    //检修状态
    @RequestMapping(value = "/PRO_DJ702_DROPLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ702_DROPLIST(HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ702_DROPLIST();

        List<Map<String, Object>> list = (List) data.get("list");


        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //检修单位查询
    @RequestMapping(value = "/PRO_DJ702_JXDWDROPLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ702_JXDWDROPLIST(@RequestParam(value = "V_USERID") String V_USERID,
                                                      HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ702_JXDWDROPLIST(V_USERID);


        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //查询工单状态
    @RequestMapping(value = "/PRO_DJ702_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ702_SELECT(@RequestParam(value = "V_ORDERSTS") String V_ORDERSTS,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ702_SELECT(V_ORDERSTS);


        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);

        return result;
    }

    //删除工单状态
    @RequestMapping(value = "/PRO_DJ702_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ702_DELETE(@RequestParam(value = "V_POWERID") String V_POWERID,
                                                @RequestParam(value = "V_ID") String V_ID,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ702_DELETE(V_POWERID, V_ID);
    }

    //新增检修状态人员
    @RequestMapping(value = "/PRO_DJ702_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ702_INSERT(@RequestParam(value = "V_ORDERSTS") String V_ORDERSTS,
                                                @RequestParam(value = "V_USERID") String V_USERID,
                                                @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                @RequestParam(value = "V_STS") String V_STS,
                                                @RequestParam(value = "V_MENDDEPTCODE") String V_MENDDEPTCODE,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ702_INSERT(V_ORDERSTS, V_USERID, V_USERNAME, V_STS, V_MENDDEPTCODE);
    }

    //查询工单状态
    @RequestMapping(value = "/PRO_DJ703_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ703_SELECT(@RequestParam(value = "V_ORDERDESC") String V_ORDERDESC,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.PRO_DJ703_SELECT(V_ORDERDESC);

        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        //result.put("success", true);

        return result;
    }

    //删除检修状态
    @RequestMapping(value = "/PRO_DJ703_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ703_DELETE(@RequestParam(value = "V_ORDERSTS") String V_ORDERSTS,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ703_DELETE(V_ORDERSTS);
    }

    //选择状态
    @RequestMapping(value = "/PRO_DJ703_UPDATEFLAG", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ703_UPDATEFLAG(@RequestParam(value = "V_ORDERSTS") String V_ORDERSTS,
                                                    @RequestParam(value = "V_FLAG") Integer V_FLAG,
                                                    HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ703_UPDATEFLAG(V_ORDERSTS, V_FLAG);
    }

    //新增状态
    @RequestMapping(value = "/PRO_DJ703_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ703_INSERT(@RequestParam(value = "V_ORDERSTS") String V_ORDERSTS,
                                                @RequestParam(value = "V_ORDERDESC") String V_ORDERDESC,
                                                @RequestParam(value = "V_USERFLAG") String V_USERFLAG,
                                                @RequestParam(value = "V_NEXTSTS") String V_NEXTSTS,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.PRO_DJ703_INSERT(V_ORDERSTS, V_ORDERDESC, V_USERFLAG, V_NEXTSTS);
    }

    //查询物资分类
    @RequestMapping(value = "/GETITYPELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETITYPELIST(Integer start, Integer limit, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETITYPELIST();

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //删除物资分类
    @RequestMapping(value = "/DELETEITYPE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DELETEITYPE(@RequestParam(value = "A_TYPECODE") String A_TYPECODE,
                                           @RequestParam(value = "A_USERID") String A_USERID,
                                           @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                           HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.DELETEITYPE(A_TYPECODE, A_USERID, A_USERNAME);
    }

    //新增物资分类
    @RequestMapping(value = "/ADDITYPE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> ADDITYPE(@RequestParam(value = "A_TYPECODE") String A_TYPECODE,
                                        @RequestParam(value = "A_TYPENAME") String A_TYPENAME,
                                        @RequestParam(value = "A_STATUS") String A_STATUS,
                                        @RequestParam(value = "A_TYPE_PREFIX") String A_TYPE_PREFIX,
                                        @RequestParam(value = "A_TYPE_UNIT") String A_TYPE_UNIT,
                                        @RequestParam(value = "A_REC_STATUS") String A_REC_STATUS,
                                        @RequestParam(value = "A_USERID") String A_USERID,
                                        @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                        @RequestParam(value = "A_INDEX") Integer A_INDEX,
                                        HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.ADDITYPE(A_TYPECODE, A_TYPENAME, A_STATUS, A_TYPE_PREFIX, A_TYPE_UNIT, A_REC_STATUS, A_USERID, A_USERNAME, A_INDEX);
    }

    //修改物资分类
    @RequestMapping(value = "/UPDTEITYPE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> UPDTEITYPE(@RequestParam(value = "A_TYPECODE") String A_TYPECODE,
                                          @RequestParam(value = "A_TYPENAME") String A_TYPENAME,
                                          @RequestParam(value = "A_STATUS") String A_STATUS,
                                          @RequestParam(value = "A_TYPE_PREFIX") String A_TYPE_PREFIX,
                                          @RequestParam(value = "A_TYPE_UNIT") String A_TYPE_UNIT,
                                          @RequestParam(value = "A_REC_STATUS") String A_REC_STATUS,
                                          @RequestParam(value = "A_USERID") String A_USERID,
                                          @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                          @RequestParam(value = "A_INDEX") Integer A_INDEX,
                                          HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.UPDTEITYPE(A_TYPECODE, A_TYPENAME, A_STATUS, A_TYPE_PREFIX, A_TYPE_UNIT, A_REC_STATUS, A_USERID, A_USERNAME, A_INDEX);
    }

    //查询入库
    @RequestMapping(value = "/GETINPUT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETINPUT(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                        @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                        @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                        @RequestParam(value = "A_STORE_DESC") String A_STORE_DESC,
                                        @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                        @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                                        @RequestParam(value = "A_ETALON") String A_ETALON,
                                        @RequestParam(value = "A_LOC_DESC") String A_LOC_DESC,
                                        @RequestParam(value = "A_USERID") String A_USERID,
                                        Integer start, Integer limit, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETINPUT(A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_STORE_DESC, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LOC_DESC, A_USERID);

        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //新增入库(批量)
    @RequestMapping(value = "/DRSAVEINPUT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DRSAVEINPUT(@RequestParam(value = "A_KCID") String A_KCID,
                                           @RequestParam(value = "A_MATERIALCODE", required = false) List<String> A_MATERIALCODE_LIST,
                                           @RequestParam(value = "A_MATERIALNAME", required = false) List<String> A_MATERIALNAME_LIST,
                                           @RequestParam(value = "A_ETALON", required = false) List<String> A_ETALON_LIST,
                                           @RequestParam(value = "A_UNIT", required = false) List<String> A_UNIT_LIST,
                                           @RequestParam(value = "A_PRICE", required = false) List<String> A_PRICE_LIST,
                                           @RequestParam(value = "A_AMOUNT", required = false) List<String> A_AMOUNT_LIST,
                                           @RequestParam(value = "A_STOREDESC") String A_STOREDESC,
                                           @RequestParam(value = "A_LOCDESC") String A_LOCDESC,
                                           @RequestParam(value = "A_ITYPE", required = false) List<String> A_ITYPEE_LIST,
                                           @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                           @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                           @RequestParam(value = "A_DEPARTNAME") String A_DEPARTNAME,
                                           @RequestParam(value = "A_USERID") String A_USERID,
                                           @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                           @RequestParam(value = "A_MPID", required = false) List<String> A_MPID_LIST,
                                           HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < A_MATERIALCODE_LIST.size(); i++) {
            HashMap data = mlService.SAVEINPUT(A_KCID, A_MATERIALCODE_LIST.get(i), A_MATERIALNAME_LIST.get(i), A_ETALON_LIST.get(i), A_UNIT_LIST.get(i), A_PRICE_LIST.get(i),
                    A_AMOUNT_LIST.get(i), A_STOREDESC, A_LOCDESC, A_ITYPEE_LIST.get(i), A_PLANTCODE, A_DEPARTCODE, A_DEPARTNAME,
                    A_USERID, A_USERNAME, A_MPID_LIST.get(i));

            result.put("RET_MSG", data.get("RET_MSG"));
            result.put("RET", data.get("RET"));
        }

        return result;
    }

    //新增入库
    @RequestMapping(value = "/SAVEINPUT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SAVEINPUT(@RequestParam(value = "A_KCID") String A_KCID,
                                         @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                         @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                                         @RequestParam(value = "A_ETALON") String A_ETALON,
                                         @RequestParam(value = "A_UNIT") String A_UNIT,
                                         @RequestParam(value = "A_PRICE") String A_PRICE,
                                         @RequestParam(value = "A_AMOUNT") String A_AMOUNT,
                                         @RequestParam(value = "A_STOREDESC") String A_STOREDESC,
                                         @RequestParam(value = "A_LOCDESC") String A_LOCDESC,
                                         @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                         @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                         @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                         @RequestParam(value = "A_DEPARTNAME") String A_DEPARTNAME,
                                         @RequestParam(value = "A_USERID") String A_USERID,
                                         @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                         @RequestParam(value = "A_MPID") String A_MPID,
                                         HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.SAVEINPUT(A_KCID, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_UNIT, A_PRICE,
                A_AMOUNT, A_STOREDESC, A_LOCDESC, A_ITYPE, A_PLANTCODE, A_DEPARTCODE, A_DEPARTNAME,
                A_USERID, A_USERNAME, A_MPID);
    }

    //删除储备物资
    @RequestMapping(value = "/DELETEINPUT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DELETEINPUT(@RequestParam(value = "A_KCID") String A_KCID,
                                           HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.DELETEINPUT(A_KCID);
    }

    //查询计划
    @RequestMapping(value = "/GETMP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETMP(@RequestParam(value = "A_YEAR") Integer A_YEAR,
                                     @RequestParam(value = "A_MONTH") Integer A_MONTH,
                                     @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                     @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                     @RequestParam(value = "A_CODE") String A_CODE,
                                     @RequestParam(value = "A_NAME") String A_NAME,
                                     HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.GETMP(A_YEAR, A_MONTH, A_PLANTCODE, A_DEPARTCODE, A_CODE, A_NAME);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);

        return result;
    }

    //关联查询
    @RequestMapping(value = "/GETINPUTLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETINPUTLIST(@RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
                                            @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
                                            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                            @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                            @RequestParam(value = "A_STORE_DESC") String A_STORE_DESC,
                                            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                            @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                                            @RequestParam(value = "A_ETALON") String A_ETALON,
                                            @RequestParam(value = "A_LOC_DESC") String A_LOC_DESC,
                                            @RequestParam(value = "A_USERID") String A_USERID,
                                            Integer limit, Integer start,
                                            HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();

        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        HashMap data = mlService.GETINPUTLIST(A_BEGINDATE, A_ENDDATE, A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_STORE_DESC,
                A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LOC_DESC, A_USERID);


        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //入库台账Excel
    @RequestMapping(value = "/GETINPUTLIST_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GETINPUTLIST_EXCEL(@RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
                                   @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
                                   @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                   @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                   @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                   @RequestParam(value = "A_STORE_DESC") String A_STORE_DESC,
                                   @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                   @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                                   @RequestParam(value = "A_ETALON") String A_ETALON,
                                   @RequestParam(value = "A_LOC_DESC") String A_LOC_DESC,
                                   @RequestParam(value = "A_USERID") String A_USERID,
                                   HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        A_DEPARTCODE = URLDecoder.decode(A_DEPARTCODE, "UTF-8");
        A_ITYPE = URLDecoder.decode(A_ITYPE, "UTF-8");

        HashMap data = mlService.GETINPUTLIST(A_BEGINDATE, A_ENDDATE, A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_STORE_DESC,
                A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LOC_DESC, A_USERID);

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
        cell.setCellValue("物资编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物资名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("规格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("入库数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("物资分类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("库房描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("ETALON") == null ? "" : map.get("ETALON").toString());

                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 6).setCellValue(map.get("AMOUNT") == null ? "" : map.get("AMOUNT").toString());

                row.createCell((short) 7).setCellValue(map.get("F_MONEY") == null ? "" : map.get("F_MONEY").toString());

                row.createCell((short) 8).setCellValue(map.get("I_TYPE") == null ? "" : map.get("I_TYPE").toString());

                row.createCell((short) 9).setCellValue(map.get("STORE_DESC") == null ? "" : map.get("STORE_DESC").toString());

                row.createCell((short) 10).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("储备物资查询.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //物资关联
    @RequestMapping(value = "/MPTOKC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> MPTOKC(@RequestParam(value = "A_MPID") String A_MPID,
                                      @RequestParam(value = "A_KCID") String A_KCID,
                                      @RequestParam(value = "A_REMARK") String A_REMARK,
                                      HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.MPTOKC(A_MPID, A_KCID, A_REMARK);
    }

    //确认入库
    @RequestMapping(value = "/CONFIRMINPUT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> CONFIRMINPUT(@RequestParam(value = "A_KCID", required = false) List<String> A_KCID_LIST,
                                            HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        for (int i = 0; i < A_KCID_LIST.size(); i++) {
            HashMap data = mlService.CONFIRMINPUT(A_KCID_LIST.get(i));
            result.put("RET", data.get("RET"));
        }
        return result;
    }

    //根据物资分类查询信息
    @RequestMapping(value = "/MATTYPE_UNITANDPREFIX", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> MATTYPE_UNITANDPREFIX(@RequestParam(value = "A_ITYPE") String A_ITYPE,
                                                     HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.MATTYPE_UNITANDPREFIX(A_ITYPE);
    }

    //查询库存列表
    @RequestMapping(value = "/GETKC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETKC(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_ITYPE") String A_ITYPE,
            @RequestParam(value = "A_STORE_DESC") String A_STORE_DESC,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
            @RequestParam(value = "A_ETALON") String A_ETALON,
            @RequestParam(value = "A_LOC_DESC") String A_LOC_DESC,
            @RequestParam(value = "A_USERID") String A_USERID,
            Integer start, Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETKC(A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_STORE_DESC, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LOC_DESC, A_USERID);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //导出储备物资Excel
    @RequestMapping(value = "/GETKC_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GETKC_EXCEL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                            @RequestParam(value = "A_ITYPE") String A_ITYPE,
                            @RequestParam(value = "A_STORE_DESC") String A_STORE_DESC,
                            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                            @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                            @RequestParam(value = "A_ETALON") String A_ETALON,
                            @RequestParam(value = "A_LOC_DESC") String A_LOC_DESC,
                            @RequestParam(value = "A_USERID") String A_USERID,
                            HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        A_DEPARTCODE = URLDecoder.decode(A_DEPARTCODE, "UTF-8");
        A_ITYPE = URLDecoder.decode(A_ITYPE, "UTF-8");

        HashMap data = mlService.GETKC(A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_STORE_DESC, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LOC_DESC, A_USERID);
        // System.out.println("---"+data);
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
        cell.setCellValue("物资编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物资名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("规格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("入库数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("剩余数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("剩余金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("物资分类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("库房描述");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("ETALON") == null ? "" : map.get("ETALON").toString());

                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 6).setCellValue(map.get("AMOUNT") == null ? "" : map.get("AMOUNT").toString());

                row.createCell((short) 7).setCellValue(map.get("F_MONEY") == null ? "" : map.get("F_MONEY").toString());

                row.createCell((short) 8).setCellValue(map.get("KY_AMOUNT") == null ? "" : map.get("KY_AMOUNT").toString());

                row.createCell((short) 9).setCellValue(map.get("F_KYMONEY") == null ? "" : map.get("F_KYMONEY").toString());

                row.createCell((short) 10).setCellValue(map.get("I_TYPE") == null ? "" : map.get("I_TYPE").toString());

                row.createCell((short) 11).setCellValue(map.get("STORE_DESC") == null ? "" : map.get("STORE_DESC").toString());


            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("储备物资查询.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查看消耗明细
    @RequestMapping(value = "/GETCONSUMEDETAIL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETCONSUMEDETAIL(@RequestParam(value = "A_KCID") String A_KCID,
                                                HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.GETCONSUMEDETAIL(A_KCID);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);

        return result;
    }

    //查询消耗物资
    @RequestMapping(value = "/DJ03_GETCONSUME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DJ03_GETCONSUME(
            @RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_ITYPE") String A_ITYPE,
            @RequestParam(value = "A_STOREDESC") String A_STOREDESC,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
            @RequestParam(value = "A_ETALON") String A_ETALON,
            @RequestParam(value = "A_LCODESC") String A_LCODESC,
            Integer start, Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.DJ03_GETCONSUME(A_BEGINDATE, A_ENDDATE, A_ORDERID, A_PLANTCODE, A_DEPARTCODE, A_ITYPE,
                A_STOREDESC, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LCODESC);
        List<Map<String, Object>> list = (List) data.get("list");
        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //导出消耗物资Excel
    @RequestMapping(value = "/DJ03_GETCONSUME_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJ03_GETCONSUME_EXCEL(@RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
                                      @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
                                      @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                      @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                      @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                      @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                      @RequestParam(value = "A_STOREDESC") String A_STOREDESC,
                                      @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                      @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                                      @RequestParam(value = "A_ETALON") String A_ETALON,
                                      @RequestParam(value = "A_LCODESC") String A_LCODESC,
                                      HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        A_DEPARTCODE = URLDecoder.decode(A_DEPARTCODE, "UTF-8");
        A_ITYPE = URLDecoder.decode(A_ITYPE, "UTF-8");

        HashMap data = mlService.DJ03_GETCONSUME(A_BEGINDATE, A_ENDDATE, A_ORDERID, A_PLANTCODE, A_DEPARTCODE, A_ITYPE,
                A_STOREDESC, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LCODESC);
        // System.out.println("---"+data);
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
        cell.setCellValue("检修单号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物资编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物资名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("规格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("消耗数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("物资分类");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("库房描述");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("ETALON") == null ? "" : map.get("ETALON").toString());

                row.createCell((short) 5).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 6).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 7).setCellValue(map.get("PLAN_AMOUNT") == null ? "" : map.get("PLAN_AMOUNT").toString());

                row.createCell((short) 8).setCellValue(map.get("F_MONEY") == null ? "" : map.get("F_MONEY").toString());

                row.createCell((short) 9).setCellValue(map.get("I_TYPE") == null ? "" : map.get("I_TYPE").toString());

                row.createCell((short) 10).setCellValue(map.get("STORE_DESC") == null ? "" : map.get("STORE_DESC").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("消耗物资统计.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查询检修单消耗物料
    @RequestMapping(value = "/GETORDERCONSUME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETORDERCONSUME(
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETORDERCONSUME(A_ORDERID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);

        return result;
    }

    //获取单据信息
    @RequestMapping(value = "/PRO_DJ601_ORDERMESSAGE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DJ601_ORDERMESSAGE(
            @RequestParam(value = "ORDERID_in") String ORDERID_in,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.PRO_DJ601_ORDERMESSAGE(ORDERID_in);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);

        return result;
    }

    //获取收发存
    @RequestMapping(value = "/GETSFC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETSFC(@RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
                                      @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
                                      @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                      @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                      @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                      @RequestParam(value = "A_CODE") String A_CODE,
                                      @RequestParam(value = "A_NAME") String A_NAME,
                                      HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = mlService.GETSFC(A_BEGINDATE, A_ENDDATE, A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_CODE, A_NAME);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);

        return result;
    }

    //收发存统计Excel
    @RequestMapping(value = "/GETSFC_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GETSFC_EXCEL(@RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
                             @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
                             @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                             @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                             @RequestParam(value = "A_ITYPE") String A_ITYPE,
                             @RequestParam(value = "A_CODE") String A_CODE,
                             @RequestParam(value = "A_NAME") String A_NAME,
                             HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        A_DEPARTCODE = URLDecoder.decode(A_DEPARTCODE, "UTF-8");
        A_ITYPE = URLDecoder.decode(A_ITYPE, "UTF-8");

        HashMap data = mlService.GETSFC(A_BEGINDATE, A_ENDDATE, A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_CODE, A_NAME);
        // System.out.println("---"+data);
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
        cell.setCellValue("物资编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("物资名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("规格");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("单价");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("初期数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("期初金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("收入数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("收入金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("支出数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("支出金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("期末数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("期末金额");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("ETALON") == null ? "" : map.get("ETALON").toString());

                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

                row.createCell((short) 6).setCellValue(map.get("QC_AMOUNT") == null ? "" : map.get("QC_AMOUNT").toString());

                row.createCell((short) 7).setCellValue(map.get("QC_MONEY") == null ? "" : map.get("QC_MONEY").toString());

                row.createCell((short) 8).setCellValue(map.get("IN_AMOUNT") == null ? "" : map.get("IN_AMOUNT").toString());

                row.createCell((short) 9).setCellValue(map.get("IN_MONEY") == null ? "" : map.get("IN_MONEY").toString());

                row.createCell((short) 10).setCellValue(map.get("OUT_AMOUNT") == null ? "" : map.get("OUT_AMOUNT").toString());

                row.createCell((short) 11).setCellValue(map.get("OUT_MONEY") == null ? "" : map.get("OUT_MONEY").toString());

                row.createCell((short) 12).setCellValue(map.get("QM_AMOUNT") == null ? "" : map.get("QM_AMOUNT").toString());

                row.createCell((short) 13).setCellValue(map.get("QM_MONEY") == null ? "" : map.get("QM_MONEY").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("收发存统计.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查看消耗待回收
    @RequestMapping(value = "/DJ06_GETCONSUME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DJ06_GETCONSUME(
            @RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_ITYPE") String A_ITYPE,
            @RequestParam(value = "A_STOREDESC") String A_STOREDESC,
            @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
            @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
            @RequestParam(value = "A_ETALON") String A_ETALON,
            @RequestParam(value = "A_LCODESC") String A_LCODESC,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.DJ06_GETCONSUME(A_BEGINDATE, A_ENDDATE, A_ORDERID, A_PLANTCODE, A_DEPARTCODE, A_ITYPE,
                A_STOREDESC, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LCODESC);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);

        return result;
    }

    //修改回收数量
    @RequestMapping(value = "/SAVE_RECAMOUNT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SAVE_RECAMOUNT(@RequestParam(value = "A_ID") String A_ID,
                                              @RequestParam(value = "A_REC_AMOUNT") String A_REC_AMOUNT,
                                              @RequestParam(value = "A_USERID") String A_USERID,
                                              @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                              HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        return mlService.SAVE_RECAMOUNT(A_ID, A_REC_AMOUNT, A_USERID, A_USERNAME);
    }

    //确认回收
    @RequestMapping(value = "/CONFIRM_REC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> CONFIRM_REC(@RequestParam(value = "A_ID", required = false) List<String> A_ID_LIST,
                                           @RequestParam(value = "A_USERID") String A_USERID,
                                           HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        for (int i = 0; i < A_ID_LIST.size(); i++) {
            HashMap data = mlService.CONFIRM_REC(A_ID_LIST.get(i), A_USERID);
            result.put("RET", data.get("RET"));
        }
        return result;
    }

    //获取消耗待回收工单
    @RequestMapping(value = "/GETCONSUMEBYORDER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETCONSUMEBYORDER(
            @RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.GETCONSUMEBYORDER(A_BEGINDATE, A_ENDDATE, A_ORDERID, A_PLANTCODE, A_DEPARTCODE);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);

        return result;
    }

    //根据单号查询消耗待回收
    @RequestMapping(value = "/GETORDERMATCONSUME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETORDERMATCONSUME(@RequestParam(value = "A_ORDERID") String A_ORDERID,
                                                  HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.GETORDERMATCONSUME(A_ORDERID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);

        return result;
    }

    //修改库房描述
    @RequestMapping(value = "/SETSTOREDESC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SETSTOREDESC(@RequestParam(value = "A_ID", required = false) List<String> A_ID_LIST,
                                            @RequestParam(value = "A_NEW_STOREDESC") String A_NEW_STOREDESC,
                                            HttpServletRequest request, HttpServletResponse response)
            throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        for (int i = 0; i < A_ID_LIST.size(); i++) {
            HashMap data = mlService.SETSTOREDESC(A_ID_LIST.get(i), A_NEW_STOREDESC);
            result.put("RET", data.get("RET"));
        }
        return result;
    }

    //获取消耗待回收工单
    @RequestMapping(value = "/GETCONSUMESELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GETCONSUMESELECT(@RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
                                                @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
                                                @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                                @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                                @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                                @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                                @RequestParam(value = "A_STOREDESC") String A_STOREDESC,
                                                @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                                @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                                                @RequestParam(value = "A_ETALON") String A_ETALON,
                                                @RequestParam(value = "A_LCODESC") String A_LCODESC,
                                                HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = mlService.GETCONSUMESELECT(A_BEGINDATE, A_ENDDATE, A_ORDERID, A_PLANTCODE, A_DEPARTCODE,
                A_ITYPE, A_STOREDESC, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LCODESC);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);

        return result;
    }

    //物资回收查询Excel
    @RequestMapping(value = "/GETCONSUMESELECT_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GETCONSUMESELECT_EXCEL(@RequestParam(value = "A_BEGINDATE") java.sql.Date A_BEGINDATE,
                                       @RequestParam(value = "A_ENDDATE") java.sql.Date A_ENDDATE,
                                       @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                       @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                       @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                       @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                       @RequestParam(value = "A_STOREDESC") String A_STOREDESC,
                                       @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                       @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                                       @RequestParam(value = "A_ETALON") String A_ETALON,
                                       @RequestParam(value = "A_LCODESC") String A_LCODESC,
                                       HttpServletResponse response)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        A_DEPARTCODE = URLDecoder.decode(A_DEPARTCODE, "UTF-8");
        A_ITYPE = URLDecoder.decode(A_ITYPE, "UTF-8");

        HashMap data = mlService.GETCONSUMESELECT(A_BEGINDATE, A_ENDDATE, A_ORDERID, A_PLANTCODE, A_DEPARTCODE,
                A_ITYPE, A_STOREDESC, A_MATERIALCODE, A_MATERIALNAME, A_ETALON, A_LCODESC);
        // System.out.println("---"+data);
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
        cell.setCellValue("检修单号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("电机容量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("物资名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("消耗数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("回收数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("检修班组");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("负责人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("库房描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("物资分类");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");

            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("DJ_VOL") == null ? "" : map.get("DJ_VOL").toString());

                row.createCell((short) 3).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 5).setCellValue(map.get("PLAN_AMOUNT") == null ? "" : map.get("PLAN_AMOUNT").toString());

                row.createCell((short) 6).setCellValue(map.get("REC_AMOUNT") == null ? "" : map.get("REC_AMOUNT").toString());

                row.createCell((short) 7).setCellValue(map.get("MENDDEPT_NAME") == null ? "" : map.get("MENDDEPT_NAME").toString());

                row.createCell((short) 8).setCellValue(map.get("MEND_USERNAME") == null ? "" : map.get("MEND_USERNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("STORE_DESC") == null ? "" : map.get("STORE_DESC").toString());

                row.createCell((short) 10).setCellValue(map.get("I_TYPE") == null ? "" : map.get("I_TYPE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("物资回收查询.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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
