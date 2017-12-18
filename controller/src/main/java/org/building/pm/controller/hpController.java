package org.building.pm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.Region;
import org.building.pm.service.hpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zjh on 2017/1/22.
 * <p>
 * �豸�¹�controller
 */
@Controller
@RequestMapping("/app/pm/hp")
public class hpController {

    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private hpService hpService;

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_SUMHOUR") String V_V_SUMHOUR,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_JHMX_GUID") String V_V_JHMX_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PRO_PM_03_PLAN_YEAR_SET(V_V_GUID, V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_REPAIRMAJOR_CODE,
                V_V_CONTENT, V_V_STARTTIME, V_V_ENDTIME, V_V_SUMHOUR
                , V_V_BZ, V_V_INPER, V_V_JHMX_GUID);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_VIEW(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,
            @RequestParam(value = "page") Integer page,
            @RequestParam(value = "limit") Integer limit,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        String V_V_PAGE = page.toString();
        String V_V_PAGESIZE = limit.toString();

        HashMap data = hpService.PRO_PM_03_PLAN_YEAR_VIEW(V_V_YEAR, V_V_PLANTYPE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY,
                V_V_CONTENT, V_V_STATECODE, V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_GET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PRO_PM_03_PLAN_YEAR_GET(V_V_GUID);
        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);

        return data;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_DEL(@RequestParam(value = "V_V_GUID_LIST", required = false) List<String> V_V_GUID_LIST,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < V_V_GUID_LIST.size(); i++) {
            HashMap data = hpService.PRO_PM_03_PLAN_YEAR_DEL(V_V_GUID_LIST.get(i));
            String pm_06 = (String) data.get("RET");

            result.put("RET", pm_06);
            result.put("success", true);
        }

        // HashMap data = hpService.PRO_PM_03_PLAN_YEAR_DEL(V_V_GUID);

       /* String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);*/
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_SEND(
            @RequestParam(value = "V_V_GUID_LIST", required = false) List<String> V_V_GUID_LIST,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < V_V_GUID_LIST.size(); i++) {
            HashMap data = hpService.PRO_PM_03_PLAN_YEAR_SEND(V_V_GUID_LIST.get(i), V_V_ORGCODE, V_V_DEPTCODE, V_V_FLOWCODE, V_V_PLANTYPE, V_V_PERSONCODE);
            String pm_06 = (String) data.get("RET");

            result.put("RET", pm_06);
            result.put("success", true);
        }

        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_AGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_AGREE(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = hpService.PM_03_PLAN_AGREE(V_V_GUID, V_V_PLANTYPE, V_V_IDEA, V_V_INPER);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_DISAGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_DISAGREE(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = hpService.PM_03_PLAN_DISAGREE(V_V_GUID, V_V_PLANTYPE, V_V_IDEA, V_V_INPER);
        return result;
    }

    //年计划Excel导出
    @RequestMapping(value = "/PM_03_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_03_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                            @RequestParam(value = "V_V_ZY") String V_V_ZY,
                            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,

                            HttpServletResponse response)
            throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        String V_V_PAGE = "1";
        String V_V_PAGESIZE = "50000";
        List list = new ArrayList();

        V_V_CONTENT = new String(V_V_CONTENT.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = hpService.PRO_PM_03_PLAN_YEAR_VIEW(V_V_YEAR, V_V_PLANTYPE, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY,
                V_V_CONTENT, V_V_STATECODE, V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 13; i++) {
            sheet.setColumnWidth(i, 5000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("计划状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("计划停工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划竣工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划工期(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("流程步骤");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 4).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 5).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString().substring(0, 19));

                row.createCell((short) 6).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString().substring(0, 19));

                row.createCell((short) 7).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 8).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("INPERNAME") == null ? "" : map.get("INPERNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString().substring(0, 19));

                row.createCell((short) 12).setCellValue(map.get("V_FLOWNAME") == null ? "" : map.get("V_FLOWNAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("年计划查询表.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //季度填报查询
    @RequestMapping(value = "/PM_03_QUARTER_PLAN_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_QUARTER_PLAN_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,
            @RequestParam(value = "page") Integer page,
            @RequestParam(value = "limit") Integer limit,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        String V_V_PAGE = page.toString();
        String V_V_PAGESIZE = limit.toString();

        HashMap data = hpService.PM_03_QUARTER_PLAN_SEL(V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY,
                V_V_CONTENT, V_V_STATECODE, V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    //周计划添加
    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_QUARTER_SET(
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_OTHERPLAN_GUID") String V_V_OTHERPLAN_GUID,
            @RequestParam(value = "V_V_OTHERPLAN_TYPE") String V_V_OTHERPLAN_TYPE,
            @RequestParam(value = "V_V_JHMX_GUID") String V_V_JHMX_GUID,
            @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PRO_PM_03_PLAN_QUARTER_SET(V_V_INPER, V_V_GUID, V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE,
                V_V_EQUCODE, V_V_REPAIRMAJOR_CODE, V_V_CONTENT, V_V_STARTTIME
                , V_V_ENDTIME, V_V_OTHERPLAN_GUID, V_V_OTHERPLAN_TYPE, V_V_JHMX_GUID, V_V_HOUR, V_V_BZ);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_QUARTER_GET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PRO_PM_03_PLAN_QUARTER_GET(V_V_GUID);
        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);

        return data;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_QUARTER_DEL(@RequestParam(value = "V_V_GUID_LIST", required = false) List<String> V_V_GUID_LIST,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        for (int i = 0; i < V_V_GUID_LIST.size(); i++) {
            HashMap data = hpService.PRO_PM_03_PLAN_QUARTER_DEL(V_V_GUID_LIST.get(i));
            String pm_06 = (String) data.get("RET");

            result.put("RET", pm_06);
            result.put("success", true);
        }

        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_QUARTER_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_QUARTER_SEND(
            @RequestParam(value = "V_V_GUID_LIST", required = false) List<String> V_V_GUID_LIST,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        for (int i = 0; i < V_V_GUID_LIST.size(); i++) {
            HashMap data = hpService.PRO_PM_03_PLAN_QUARTER_SEND(V_V_GUID_LIST.get(i), V_V_ORGCODE, V_V_DEPTCODE, V_V_FLOWCODE, V_V_PLANTYPE, V_V_PERSONCODE);
            String pm_06 = (String) data.get("RET");

            result.put("RET", pm_06);
            result.put("success", true);
        }
        return result;
    }

    //季度计划Excel导出
    @RequestMapping(value = "/PM_03_EXCEL_QUARTER", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_03_EXCEL_QUARTER(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,


            HttpServletResponse response)
            throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        String V_V_PAGE = "1";
        String V_V_PAGESIZE = "50000";
        List list = new ArrayList();

        V_V_CONTENT = new String(V_V_CONTENT.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = hpService.PM_03_QUARTER_PLAN_SEL(V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY,
                V_V_CONTENT, V_V_STATECODE, V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 13; i++) {
            sheet.setColumnWidth(i, 5000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("计划状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("计划停工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划竣工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划工期(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("流程步骤");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 4).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 5).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString().substring(0, 19));

                row.createCell((short) 6).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString().substring(0, 19));

                row.createCell((short) 7).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 8).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_INPERNAME") == null ? "" : map.get("V_INPERNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString().substring(0, 19));

                row.createCell((short) 12).setCellValue(map.get("V_FLOWNAME") == null ? "" : map.get("V_FLOWNAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("季度计划查询表.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //年计划Excel导出
    @RequestMapping(value = "/PM_06_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_06_EXCEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,

                            HttpServletResponse response)
            throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        String V_V_PAGE = "1";
        String V_V_PAGESIZE = "5000";
        List list = new ArrayList();

        // V_V_CONTENT = new String(V_V_CONTENT.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = hpService.PM_06_DJ_CRITERION_DATA_SEL(V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE, V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE,
                V_V_CK_EQUTYPECODE.equals("0") ? "%" : V_V_CK_EQUTYPECODE, V_V_EQUTYPE.equals("0") ? "%" : V_V_EQUTYPE, V_V_EQUCODE.equals("0") ? "%" : V_V_EQUCODE,
                V_V_PERSONCODE, V_V_PAGE, V_V_PAGESIZE);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 15; i++) {
            sheet.setColumnWidth(i, 5000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFRow row2 = sheet.createRow((int) 1);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        HSSFCell cell = row.createCell((short) 0);
        HSSFCell cell2 = row2.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell2.setCellValue("序号");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("点检项目");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 1);
        cell2.setCellValue("点检项目");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("点检内容");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 2);
        cell2.setCellValue("点检内容");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("点检标准");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 3);
        cell2.setCellValue("点检标准");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("点检周期");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 4);
        cell2.setCellValue("点检周期");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("周期类型");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 5);
        cell2.setCellValue("周期类型");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("设备状态");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 6);
        cell2.setCellValue("目视");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("设备状态");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 7);
        cell2.setCellValue("手摸");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("设备状态");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 8);
        cell2.setCellValue("听音");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("设备状态");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 9);
        cell2.setCellValue("打击");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("设备状态");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 10);
        cell2.setCellValue("嗅觉");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("设备状态");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 11);
        cell2.setCellValue("精密");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("设备状态");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 12);
        cell2.setCellValue("解体");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("重点");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 13);
        cell2.setCellValue("重点");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 14);
        cell.setCellValue("预警");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 14);
        cell2.setCellValue("预警");
        cell2.setCellStyle(style);

        cell = row.createCell((short) 15);
        cell.setCellValue("点检设备分类");
        cell.setCellStyle(style);

        cell2 = row2.createCell((short) 15);
        cell2.setCellValue("点检设备分类");
        cell2.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 2);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);


                row.createCell((short) 1).setCellValue(map.get("V_CRITERION_ITEM") == null ? "" : map.get("V_CRITERION_ITEM").toString());


                row.createCell((short) 2).setCellValue(map.get("V_CRITERION_CONTENT") == null ? "" : map.get("V_CRITERION_CONTENT").toString());


                row.createCell((short) 3).setCellValue(map.get("V_CRITERION_CR") == null ? "" : map.get("V_CRITERION_CR").toString());


                row.createCell((short) 4).setCellValue(map.get("V_CRITERION_CYCLE") == null ? "" : map.get("V_CRITERION_CYCLE").toString());


                row.createCell((short) 5).setCellValue(map.get("V_CRITERION_CYCLETYPE") == null ? "" : map.get("V_CRITERION_CYCLETYPE").toString());


                row.createCell((short) 6).setCellValue(map.get("V_CK_FUNCTION1") == null ? "" : (map.get("V_CK_FUNCTION1") == "1" ? "是" : "否"));


                row.createCell((short) 7).setCellValue(map.get("V_CK_FUNCTION2") == null ? "" : (map.get("V_CK_FUNCTION2") == "1" ? "是" : "否"));


                row.createCell((short) 8).setCellValue(map.get("V_CK_FUNCTION3") == null ? "" : (map.get("V_CK_FUNCTION3") == "1" ? "是" : "否"));


                row.createCell((short) 9).setCellValue(map.get("V_CK_FUNCTION4") == null ? "" : (map.get("V_CK_FUNCTION4") == "1" ? "是" : "否"));


                row.createCell((short) 10).setCellValue(map.get("V_CK_FUNCTION5") == null ? "" : (map.get("V_CK_FUNCTION5") == "1" ? "是" : "否"));


                row.createCell((short) 11).setCellValue(map.get("V_CK_FUNCTION6") == null ? "" : (map.get("V_CK_FUNCTION6") == "1" ? "是" : "否"));


                row.createCell((short) 12).setCellValue(map.get("V_CK_FUNCTION7") == null ? "" : (map.get("V_CK_FUNCTION7") == "1" ? "是" : "否"));


                row.createCell((short) 13).setCellValue(map.get("V_CK_FUNCTION7") == null ? "" : (map.get("V_CK_FUNCTION7") == "1" ? "是" : "否"));


                row.createCell((short) 14).setCellValue(map.get("V_CK_FUNCTION8") == null ? "" : (map.get("V_CK_FUNCTION8") == "1" ? "是" : "否"));


                row.createCell((short) 15).setCellValue(map.get("V_CK_EQUTYPECODE") == null ? "" : map.get("V_CK_EQUTYPECODE").toString());


            }
           /* WritableSheet test = null;
            test.mergeCells(0,0,1,0);*/

            Region region1 = new Region(0, (short) 0, 1, (short) 0);
            Region region2 = new Region(0, (short) 1, 1, (short) 1);
            Region region3 = new Region(0, (short) 2, 1, (short) 2);
            Region region4 = new Region(0, (short) 3, 1, (short) 3);
            Region region5 = new Region(0, (short) 4, 1, (short) 4);
            Region region7 = new Region(0, (short) 5, 1, (short) 5);
            Region region8 = new Region(0, (short) 13, 1, (short) 13);
            Region region9 = new Region(0, (short) 14, 1, (short) 14);
            Region region10 = new Region(0, (short) 15, 1, (short) 15);
            Region region6 = new Region(0, (short) 6, 0, (short) 12);
            sheet.addMergedRegion(region1);
            sheet.addMergedRegion(region2);
            sheet.addMergedRegion(region3);
            sheet.addMergedRegion(region4);
            sheet.addMergedRegion(region5);
            sheet.addMergedRegion(region6);
            sheet.addMergedRegion(region7);
            sheet.addMergedRegion(region8);
            sheet.addMergedRegion(region9);
            sheet.addMergedRegion(region10);


            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("异常表.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    /*@RequestMapping(value = "/PM_06_EXCEL_NEW_METHOD", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_06_EXCEL_NEW_METHOD(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                            HttpServletResponse response,
                                       HttpServletRequest request)
            throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        try {
            String V_V_PAGE = "1";
            String V_V_PAGESIZE = "15";
            InputStream inputStream = hpService.PM_06_EXCEL_NEW_METHOD(V_V_ORGCODE, V_V_DEPTCODE, V_V_CK_EQUTYPECODE, V_V_EQUTYPE, V_V_EQUCODE,
                    V_V_PERSONCODE, V_V_PAGE, V_V_PAGESIZE,request);

            response.reset();
            String fileName = new String(("异常表.xls").getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            ServletOutputStream out = response.getOutputStream();
            byte[] content = new byte[65535];
            int length = 0;
            if (inputStream != null) {
                while ((length = inputStream.read(content)) != -1) {
                    out.write(content, 0, length);
                }
            }
            out.flush();
            out.close();
        } catch (Exception e) {

        }


    }*/

    @RequestMapping(value = "/PRO_BASE_PERSONROLE_VIEW_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_PERSONROLE_VIEW_NEW(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PRO_BASE_PERSONROLE_VIEW_NEW(V_V_DEPTCODE);
        //System.out.println(data);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        if (pm_06list != null) {
            for (int i = 0; i < pm_06list.size(); i++) {
                pm_06list.get(i).put("leaf", true);
            }
        }

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_MODULE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_MODULE_SEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PRO_BASE_MODULE_SEL();
        List<Map<String, Object>> list = (List) data.get("list");
        if (list != null) {
            for (int i = 0; i < list.size(); i++) {
                list.get(i).put("leaf", true);
            }
        }

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_MODULE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_MODULE_SET(@RequestParam(value = "V_V_MODULEID") String V_V_MODULEID,
                                   @RequestParam(value = "V_V_MODULECODE") String V_V_MODULECODE,
                                   @RequestParam(value = "V_V_MODULENAME") String V_V_MODULENAME,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result = hpService.PRO_BASE_MODULE_SET(V_V_MODULEID, V_V_MODULECODE, V_V_MODULENAME);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_MODULE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_MODULE_DEL(@RequestParam(value = "V_V_MODULEID") String V_V_MODULEID,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result = hpService.PRO_BASE_MODULE_DEL(V_V_MODULEID);
        return result;
    }

    @RequestMapping(value = "/NewModuleMenuTree", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> NewModuleMenuTree(@RequestParam(value = "V_V_MODULECODE") String V_V_MODULECODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        List<HashMap> result = hpService.NewModuleMenuTree(V_V_MODULECODE);
        return result;
    }

    @RequestMapping(value = "/NewModuleRoleTree", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> NewModuleRoleTree(@RequestParam(value = "V_V_MODULECODE") String V_V_MODULECODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        List<HashMap> result = hpService.NewModuleRoleTree(V_V_MODULECODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_MODULETOMENU_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_ROLETOMENU_SET(@RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                       @RequestParam(value = "V_V_MODULECODE") String V_V_MODULECODE,
                                       @RequestParam(value = "V_V_MENUCODE") String V_V_MENUCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = hpService.PRO_BASE_MODULETOMENU_SET(V_V_FLAG, V_V_MODULECODE, V_V_MENUCODE);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_SELMAX", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TREE_GET(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_V_ROWNUMBER") String V_V_ROWNUMBER,
            @RequestParam(value = "STATE") String STATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PRO_PM_EQUREPAIRPLAN_SELMAX(V_V_GUID_FXJH, V_V_ROWNUMBER, STATE);
        /*List<Map<String, Object>> lxmlist = (List) data.get("list");
        result.put("list", lxmlist);*/
        String maxvalue = (String) data.get("maxvalue");

        Integer number = 0;
        int count = 0;


        if ("子项".equals(STATE) && maxvalue != null) {
            String weishu = maxvalue.substring(maxvalue.indexOf(".") + 1, maxvalue.length());
            number = Integer.parseInt(weishu);
            while (number > 0) {
                number = number / 10;
                count++;
            }
            System.out.println("输入的数是" + count + "位数");
        }

        if ("子项".equals(STATE) && maxvalue == null) {
            Double rownub = Double.valueOf(V_V_ROWNUMBER);
            System.out.println(rownub);
            String rownub2 = String.valueOf(rownub);
            //String rownub = String.valueOf(V_V_ROWNUMBER);
            String weishu = rownub2.substring(rownub2.indexOf(".") + 1, rownub2.length());
            System.out.println(weishu);
            number = Integer.parseInt(weishu);
            System.out.println(number);
            while (number > 0) {
                number = number / 10;
                count++;
            }
        }
        result.put("weishu", count);
        result.put("maxvalue", maxvalue);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TREE_SET(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,
            @RequestParam(value = "V_V_PROJECT_NAME") String V_V_PROJECT_NAME,
            @RequestParam(value = "V_V_PLAN_MONEY") String V_V_PLAN_MONEY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_DATE_DESIGN") String V_V_DATE_DESIGN,
            @RequestParam(value = "V_V_DATE_INVITE") String V_V_DATE_INVITE,
            @RequestParam(value = "V_V_DATE_B") String V_V_DATE_B,
            @RequestParam(value = "V_V_DATE_E") String V_V_DATE_E,
            @RequestParam(value = "V_V_BUDGET_MONEY") String V_V_BUDGET_MONEY,
            @RequestParam(value = "V_V_PROGRESS") String V_V_PROGRESS,
            @RequestParam(value = "V_V_BUILD_NAMAGER") String V_V_BUILD_NAMAGER,
            @RequestParam(value = "V_V_BULID_PERSON") String V_V_BULID_PERSON,
            @RequestParam(value = "V_V_DIRECT_PERSON") String V_V_DIRECT_PERSON,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_BUILD_DEPT") String V_V_BUILD_DEPT,
            @RequestParam(value = "V_V_GUID_P") String V_V_GUID_P,
            @RequestParam(value = "V_V_PROJECT_CODE_P") String V_V_PROJECT_CODE_P,
            @RequestParam(value = "V_V_PROJECT_NAME_P") String V_V_PROJECT_NAME_P,
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_V_PROJECT_CODE_FXJH") String V_V_PROJECT_CODE_FXJH,
            @RequestParam(value = "V_V_PROJECT_NAME_FXJH") String V_V_PROJECT_NAME_FXJH,
            @RequestParam(value = "V_V_SGYC") String V_V_SGYC,
            @RequestParam(value = "V_V_AQDC") String V_V_AQDC,
            @RequestParam(value = "V_V_ROWNUMBER") Double V_V_ROWNUMBER,
            @RequestParam(value = "V_V_P_ROWNUMBER") Double V_V_P_ROWNUMBER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PRO_PM_EQUREPAIRPLAN_TREE_SET(V_V_IP, V_V_PERCODE, V_V_PERNAME, V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_YEAR, V_V_MONTH, V_V_PROJECT_CODE,
                V_V_PROJECT_NAME, V_V_PLAN_MONEY, V_V_CONTENT, V_V_DATE_DESIGN, V_V_DATE_INVITE, V_V_DATE_B, V_V_DATE_E, V_V_BUDGET_MONEY, V_V_PROGRESS, V_V_BUILD_NAMAGER,
                V_V_BULID_PERSON, V_V_DIRECT_PERSON, V_V_EQUCODE, V_V_EQUNAME, V_V_SPECIALTY, V_V_BUILD_DEPT, V_V_GUID_P, V_V_PROJECT_CODE_P, V_V_PROJECT_NAME_P, V_V_GUID_FXJH, V_V_PROJECT_CODE_FXJH,
                V_V_PROJECT_NAME_FXJH, V_V_SGYC, V_V_AQDC, V_V_ROWNUMBER, V_V_P_ROWNUMBER);

        String rlist = (String) data.get("V_INFO");
        String guid = (String) data.get("guid");

        result.put("v_info", rlist);
        result.put("guid", guid);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_OVERHARLAPPLY_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_OVERHARLAPPLY_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            @RequestParam(value = "V_V_DEFECT") String V_V_DEFECT,
            @RequestParam(value = "V_V_PROJECTNAME") String V_V_PROJECTNAME,
            @RequestParam(value = "V_I_PAGE") Integer V_I_PAGE,
            @RequestParam(value = "V_I_PAGENUMBER") Integer V_I_PAGENUMBER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PRO_PM_OVERHARLAPPLY_SEL(V_V_YEAR, V_V_PERCODE, V_V_SPECIALTY, V_V_FLAG, V_V_DEFECT,
                V_V_PROJECTNAME, V_I_PAGE, V_I_PAGENUMBER);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return data;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_SOURCE_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_SOURCE_NEW(
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PRO_PM_07_DEFECT_SOURCE_NEW(V_V_STATECODE, X_PERSONCODE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_VIEW_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_VIEW_NEW(@RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                         @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                         @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                         @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                         HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PRO_PM_07_DEFECT_VIEW_NEW(V_V_STATECODE, X_PERSONCODE, V_V_PAGE,
                V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_09_REPAIROLD_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_09_REPAIROLD_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       @RequestParam(value = "V_V_MMNAME") String V_V_MMNAME,
                                                       @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                       @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                       HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PRO_PM_09_REPAIROLD_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_MMNAME, V_V_PAGE,
                V_V_PAGESIZE);
        return result;
    }


    @RequestMapping(value = "/PM_WORKORDER_OLD_EDIT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_WORKORDER_OLD_EDIT(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_WORKORDER_OLD_EDIT(V_V_GUID);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_WORKORDER_OLD_SAVE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_WORKORDER_OLD_SAVE(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                     @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                     @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                     @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                                     @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                                     @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                                     @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                                     @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                                     @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                                     @RequestParam(value = "V_V_TOOL") String V_V_TOOL,
                                                     @RequestParam(value = "V_V_TECHNOLOGY") String V_V_TECHNOLOGY,
                                                     @RequestParam(value = "V_V_SAFE") String V_V_SAFE,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_WORKORDER_OLD_SAVE(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_V_SHORT_TXT,
                V_D_START_DATE, V_D_FINISH_DATE, V_V_WBS, V_V_WBS_TXT, V_V_DEPTCODEREPARIR, V_V_TOOL, V_V_TECHNOLOGY, V_V_SAFE);

        String ret = (String) data.get("V_INFO");

        result.put("RET", ret);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "PM_13_EXAMINED_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_STATE") String V_V_STATE,
            @RequestParam(value = "V_V_DATE") String V_V_DATE,
            @RequestParam(value = "V_V_BEEXAMINED_TYPE") String V_V_BEEXAMINED_TYPE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_13_EXAMINED_SEL(V_V_ORGCODE, V_V_STATE, V_V_DATE, V_V_BEEXAMINED_TYPE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PM_13_EXAMINED_FK_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_FK_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_STATE") String V_V_STATE,
            @RequestParam(value = "V_V_DATE") String V_V_DATE,
            @RequestParam(value = "V_V_BEEXAMINED_TYPE") String V_V_BEEXAMINED_TYPE,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_13_EXAMINED_FK_SEL(V_V_ORGCODE, V_V_STATE, V_V_DATE, V_V_BEEXAMINED_TYPE,V_V_TYPE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PM_13_EXAMINED_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_GET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_13_EXAMINED_GET(V_V_GUID);
        return result;
    }

    //根据作业区查询班组
    @RequestMapping(value = "/PM_13_EXAMINED_CLASS", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_CLASS(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_13_EXAMINED_CLASS(V_V_DEPTCODE);
        System.out.println(data);

        List<Map<String, Object>> list = (List) data.get("list");

        if (list != null) {
            for (int i = 0; i < list.size(); i++) {
                list.get(i).put("leaf", true);
            }
        }

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //查询流程类型
    @RequestMapping(value = "/PM_FLOW_TYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_FLOW_TYPE_SEL(HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_FLOW_TYPE_SEL();

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //查询所有人员
    @RequestMapping(value = "/BASE_PERSON_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_PERSON_SEL(HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.BASE_PERSON_SEL();

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //查询办理流程url
    @RequestMapping(value = "/PM_EQU_REPAIR_FLOW_MENU_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_EQU_REPAIR_FLOW_MENU_SEL(
            @RequestParam(value = "V_V_PROCESS_KEY") String V_V_PROCESS_KEY,
            @RequestParam(value = "V_V_FLOW_STEP") String V_V_FLOW_STEP,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_EQU_REPAIR_FLOW_MENU_SEL(V_V_PROCESS_KEY, V_V_FLOW_STEP);

        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_13_EXAMINED_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_DATE") String V_V_DATE,
            @RequestParam(value = "V_V_BEEXAMINED_DEPT") String V_V_BEEXAMINED_DEPT,
            @RequestParam(value = "V_V_JCBW") String V_V_JCBW,
            @RequestParam(value = "V_V_CZWT") String V_V_CZWT,
            @RequestParam(value = "V_V_ZGCS") String V_V_ZGCS,
            @RequestParam(value = "V_V_KHYJ") String V_V_KHYJ,
            @RequestParam(value = "V_V_KHFS") String V_V_KHFS,
            @RequestParam(value = "V_V_KKJE") String V_V_KKJE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_V_BEEXAMINED_TYPE") String V_V_BEEXAMINED_TYPE,
            @RequestParam(value = "V_V_YQZGSJ") String V_V_YQZGSJ,
            @RequestParam(value = "V_V_TBSJ") String V_V_TBSJ,
            @RequestParam(value = "V_V_TB_PER") String V_V_TB_PER,
            @RequestParam(value = "V_V_STATE") String V_V_STATE,
            @RequestParam(value = "V_V_JX_PER") String V_V_JX_PER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_13_EXAMINED_SET(V_V_GUID, V_V_DATE, V_V_BEEXAMINED_DEPT,  V_V_JCBW, V_V_CZWT, V_V_ZGCS,
                V_V_KHYJ, V_V_KHFS, V_V_KKJE, V_V_DEPTCODE
                , V_V_TYPE, V_V_BEEXAMINED_TYPE, V_V_YQZGSJ, V_V_TBSJ, V_V_TB_PER, V_V_STATE, V_V_JX_PER);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_13_EXAMINED_FK_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_FK_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_FEEDBACK_GUID") String V_V_FEEDBACK_GUID,
            @RequestParam(value = "V_V_FEEDBACK_FLAG") String V_V_FEEDBACK_FLAG,
            @RequestParam(value = "V_V_FEEDBACK_PER") String V_V_FEEDBACK_PER,
            @RequestParam(value = "V_V_YS_PER") String V_V_YS_PER,
            @RequestParam(value = "V_V_FEEDBACK_DATA") String V_V_FEEDBACK_DATA,
            @RequestParam(value = "V_V_FK_PER") String V_V_FK_PER,
            @RequestParam(value = "V_V_FK_DATE") String V_V_FK_DATE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_13_EXAMINED_FK_SET(V_V_GUID, V_V_FEEDBACK_GUID, V_V_FEEDBACK_FLAG, V_V_FEEDBACK_PER, V_V_YS_PER, V_V_FEEDBACK_DATA, V_V_FK_PER, V_V_FK_DATE);
        String ret = (String) data.get("RET");

        result.put("RET", ret);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_13_EXAMINED_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PM_13_EXAMINED_DEL(V_V_GUID);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }


    @RequestMapping(value = "PM_23_WORKORDER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_23_WORKORDER_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
            @RequestParam(value = "V_V_BEGINTIME") String V_V_BEGINTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_23_WORKORDER_SEL(V_V_ORGCODE, V_V_EQUIP_NO, V_V_BEGINTIME, V_V_ENDTIME, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PM_23_SPAREPARTSORDER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_23_SPAREPARTSORDER_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
            @RequestParam(value = "V_V_BEGINTIME") String V_V_BEGINTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_23_SPAREPARTSORDER_SEL(V_V_ORGCODE, V_V_EQUIP_NO, V_V_BEGINTIME, V_V_ENDTIME, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PM_23_CHECKACCOUNT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_23_CHECKACCOUNT_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
            @RequestParam(value = "V_V_BEGINTIME") String V_V_BEGINTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_23_CHECKACCOUNT_SEL(V_V_ORGCODE, V_V_EQUIP_NO, V_V_BEGINTIME, V_V_ENDTIME, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PM_23_FAULTACCOUNT_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_23_FAULTACCOUNT_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
            @RequestParam(value = "V_V_BEGINTIME") String V_V_BEGINTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_23_FAULTACCOUNT_SEL(V_V_ORGCODE, V_V_EQUIP_NO, V_V_BEGINTIME, V_V_ENDTIME, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    //获取待处理润滑物资表数据
    @RequestMapping(value = "/GET_WAITOILCONSUMELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_WAITOILCONSUMELIST(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_BILLCODE") String A_BILLCODE,
            @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = hpService.GET_WAITOILCONSUMELIST(A_PLANTCODE, A_DEPARTCODE, A_EQUIP_ID, A_ORDERID, A_BILLCODE, A_MAT_DESC);
        List<Map<String, Object>> list = (List) data.get("RET");
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

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //获取待处理润滑物资表数据
    @RequestMapping(value = "/GET_OILCONSUMELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_OILCONSUMELIST(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
            @RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
            @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_BILLCODE") String A_BILLCODE,
            @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
            @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
            @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = hpService.GET_OILCONSUMELIST(A_PLANTCODE, A_DEPARTCODE, A_EQUTYPE, A_EQUIP_ID, A_ORDERID, A_BILLCODE, A_BEGINDATE, A_ENDDATE, A_MAT_NO, A_MAT_DESC);
        List<Map<String, Object>> list = (List) data.get("RET");
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

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //获取待处理润滑物资表数据
    @RequestMapping(value = "/GET_PARTCONSUMELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_PARTCONSUMELIST(
            @RequestParam(value = "A_CONSUME_ID") String A_CONSUME_ID,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = hpService.GET_PARTCONSUMELIST(A_CONSUME_ID);
        List<Map<String, Object>> list = (List) data.get("RET");
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

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    //获取待处理润滑物资表数据
    @RequestMapping(value = "/GET_DAYPARTCONSUMELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GET_DAYPARTCONSUMELIST(
            @RequestParam(value = "A_CONSUME_ID") String A_CONSUME_ID,
            Integer start,
            Integer limit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = hpService.GET_DAYPARTCONSUMELIST(A_CONSUME_ID);
        List<Map<String, Object>> list = (List) data.get("RET");
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

        result.put("RET", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }


    @RequestMapping(value = "/SAVEPARTCONSUME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SAVEPARTCONSUME(
            @RequestParam(value = "A_DETAIL_ID") String A_DETAIL_ID,
            @RequestParam(value = "A_CONSUME_ID") String A_CONSUME_ID,
            @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            @RequestParam(value = "A_USEAMOUNT") String A_USEAMOUNT,
            @RequestParam(value = "A_OIL_DATE") String A_OIL_DATE,
            @RequestParam(value = "A_APPROVE") String A_APPROVE,
            @RequestParam(value = "A_USERID") String A_USERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.SAVEPARTCONSUME(A_DETAIL_ID, A_CONSUME_ID, A_EQUIP_ID, A_PART_NO, A_USEAMOUNT, A_OIL_DATE, A_APPROVE, A_USERID);
        String RET = (String) data.get("RET");
        String RET_MSG = (String) data.get("RET_MSG");

        result.put("RET", RET);
        result.put("RET_MSG", RET_MSG);
        result.put("success", true);
        return result;
    }

    //日常加注保存
    @RequestMapping(value = "/DAYSAVEPARTCONSUME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> DAYSAVEPARTCONSUME(
            @RequestParam(value = "A_DETAIL_ID") String A_DETAIL_ID,
            @RequestParam(value = "A_CONSUME_ID") String A_CONSUME_ID,
            @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
            @RequestParam(value = "A_PART_NO") String A_PART_NO,
            @RequestParam(value = "A_USEAMOUNT") String A_USEAMOUNT,
            @RequestParam(value = "A_BEGIN_DATE") String A_BEGIN_DATE,
            @RequestParam(value = "A_END_DATE") String A_END_DATE,
            @RequestParam(value = "A_APPROVE") String A_APPROVE,
            @RequestParam(value = "A_USERID") String A_USERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.DAYSAVEPARTCONSUME(A_DETAIL_ID, A_CONSUME_ID, A_EQUIP_ID, A_PART_NO, A_USEAMOUNT, A_BEGIN_DATE, A_END_DATE, A_APPROVE, A_USERID);
        String RET = (String) data.get("RET");
        String RET_MSG = (String) data.get("RET_MSG");

        result.put("RET", RET);
        result.put("RET_MSG", RET_MSG);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/SUBMITPARTCONSUME", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> SUBMITPARTCONSUME(
            @RequestParam(value = "A_CONSUME_ID") String A_CONSUME_ID,
            @RequestParam(value = "A_OIL_REMARK") String A_OIL_REMARK,
            @RequestParam(value = "A_USERID") String A_USERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.SUBMITPARTCONSUME(A_CONSUME_ID, A_OIL_REMARK, A_USERID);
        String RET = (String) data.get("RET");
        String RET_MSG = (String) data.get("RET_MSG");

        result.put("RET", RET);
        result.put("RET_MSG", RET_MSG);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/INSERTPARTAVG", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> INSERTPARTAVG(
            @RequestParam(value = "A_CONSUME_ID") String A_CONSUME_ID,
            @RequestParam(value = "A_USERID") String A_USERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.INSERTPARTAVG(A_CONSUME_ID, A_USERID);
        String RET = (String) data.get("RET");
        String RET_MSG = (String) data.get("RET_MSG");

        result.put("RET", RET);
        result.put("RET_MSG", RET_MSG);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/INSERTPARTMAIN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> INSERTPARTMAIN(
            @RequestParam(value = "A_CONSUME_ID") String A_CONSUME_ID,
            @RequestParam(value = "A_USERID") String A_USERID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.INSERTPARTMAIN(A_CONSUME_ID, A_USERID);
        String RET = (String) data.get("RET");
        String RET_MSG = (String) data.get("RET_MSG");

        result.put("RET", RET);
        result.put("RET_MSG", RET_MSG);
        result.put("success", true);
        return result;
    }


    //润滑管理模块
    @RequestMapping(value = "/PM_100302_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PM_100302_EXCEL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                @RequestParam(value = "A_EQUTYPE") String A_EQUTYPE,
                                @RequestParam(value = "A_EQUIP_ID") String A_EQUIP_ID,
                                @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                @RequestParam(value = "A_BILLCODE") String A_BILLCODE,
                                @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                @RequestParam(value = "A_MAT_NO") String A_MAT_NO,
                                @RequestParam(value = "A_MAT_DESC") String A_MAT_DESC,

                                HttpServletResponse response)
            throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = hpService.GET_OILCONSUMELIST(A_PLANTCODE, A_DEPARTCODE, A_EQUTYPE, A_EQUIP_ID, A_ORDERID, A_BILLCODE, A_BEGINDATE, A_ENDDATE, A_MAT_NO, A_MAT_DESC);
        List<Map<String, Object>> list = (List) data.get("RET");

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 10; i++) {
            sheet.setColumnWidth(i, 5000);
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
        cell.setCellValue("出库单号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);


        cell = row.createCell((short) 4);
        cell.setCellValue("物料编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("物料描述");
        cell.setCellStyle(style);


        cell = row.createCell((short) 6);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("单价");
        cell.setCellStyle(style);


        cell = row.createCell((short) 8);
        cell.setCellValue("消耗数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("金额");
        cell.setCellStyle(style);


        cell = row.createCell((short) 10);
        cell.setCellValue("写实状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("RET");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);


                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());


                row.createCell((short) 2).setCellValue(map.get("BILLCODE") == null ? "" : map.get("BILLCODE").toString());


                row.createCell((short) 3).setCellValue(map.get("INST_EQUIP_NAME") == null ? "" : map.get("INST_EQUIP_NAME").toString());


                row.createCell((short) 4).setCellValue(map.get("OIL_MAT_NO") == null ? "" : map.get("OIL_MAT_NO").toString());


                row.createCell((short) 5).setCellValue(map.get("OIL_MAT_DESC") == null ? "" : map.get("OIL_MAT_DESC").toString());


                row.createCell((short) 6).setCellValue(map.get("OIL_UNIT") == null ? "" : map.get("OIL_UNIT").toString());


                row.createCell((short) 7).setCellValue(map.get("OIL_PRICE") == null ? "" : map.get("OIL_PRICE").toString());


                row.createCell((short) 8).setCellValue(map.get("OIL_AMOUNT") == null ? "" : map.get("OIL_AMOUNT").toString());


                row.createCell((short) 9).setCellValue(map.get("OIL_MONEY") == null ? "" : map.get("OIL_MONEY").toString());


                row.createCell((short) 10).setCellValue(map.get("OIL_STATUS") == null ? "" : map.get("OIL_STATUS").toString());

            }
           /* WritableSheet test = null;
            test.mergeCells(0,0,1,0);*/
/*
            Region region1 = new Region(0, (short) 0, 1, (short) 0);
            Region region2 = new Region(0, (short) 1, 1, (short) 1);
            Region region3 = new Region(0, (short) 2, 1, (short) 2);
            Region region4 = new Region(0, (short) 3, 1, (short) 3);
            Region region5 = new Region(0, (short) 4, 1, (short) 4);
            Region region7 = new Region(0, (short) 5, 1, (short) 5);
            Region region8 = new Region(0, (short) 13, 1, (short) 13);
            Region region9 = new Region(0, (short) 14, 1, (short) 14);
            Region region10 = new Region(0, (short) 15, 1, (short) 15);
            Region region6 = new Region(0, (short) 6, 0, (short) 12);
            sheet.addMergedRegion(region1);
            sheet.addMergedRegion(region2);
            sheet.addMergedRegion(region3);
            sheet.addMergedRegion(region4);
            sheet.addMergedRegion(region5);
            sheet.addMergedRegion(region6);
            sheet.addMergedRegion(region7);
            sheet.addMergedRegion(region8);
            sheet.addMergedRegion(region9);
            sheet.addMergedRegion(region10);*/


            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("润滑油脂消耗部位情况查询.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //activiti流程管理查询
    @RequestMapping(value = "PM_ACTIVITI_PROCESS_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_ACTIVITI_PROCESS_SEL(
            @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_ACTIVITI_PROCESS_SEL(V_V_FLOWTYPE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_ACTIVITI_PROCESS_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_ACTIVITI_PROCESS_SET(@RequestParam(value = "V_V_ACTIVITI_CODE") String V_V_ACTIVITI_CODE,
                                                       @RequestParam(value = "V_V_ACTIVITI_NAME") String V_V_ACTIVITI_NAME,
                                                       @RequestParam(value = "V_V_FLOW_TYPE") String V_V_FLOW_TYPE,
                                                       @RequestParam(value = "V_V_INPER_CODE") String V_V_INPER_CODE,
                                                       @RequestParam(value = "V_V_INPER_NAME") String V_V_INPER_NAME,
                                                       @RequestParam(value = "V_V_FILEBLOB") MultipartFile V_V_FILEBLOB,
                                                       @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = hpService.PM_ACTIVITI_PROCESS_SET(V_V_ACTIVITI_CODE, V_V_ACTIVITI_NAME, V_V_FLOW_TYPE, V_V_INPER_CODE, V_V_INPER_NAME, V_V_FILEBLOB.getInputStream(), V_V_GUID);

        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_ACTIVITI_PROCESS_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_ACTIVITI_PROCESS_UPDATE(@RequestParam(value = "V_V_ACTIVITI_CODE") String V_V_ACTIVITI_CODE,
                                                          @RequestParam(value = "V_V_ACTIVITI_NAME") String V_V_ACTIVITI_NAME,
                                                          @RequestParam(value = "V_V_FLOW_TYPE") String V_V_FLOW_TYPE,
                                                          @RequestParam(value = "V_V_INPER_CODE") String V_V_INPER_CODE,
                                                          @RequestParam(value = "V_V_INPER_NAME") String V_V_INPER_NAME,
                                                          @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_ACTIVITI_PROCESS_UPDATE(V_V_ACTIVITI_CODE, V_V_ACTIVITI_NAME, V_V_FLOW_TYPE, V_V_INPER_CODE, V_V_INPER_NAME, V_V_GUID);

        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }

    //获取图片过程
    @RequestMapping(value = "/PM_ACTIVITI_PROCESS_GET", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map PM_ACTIVITI_PROCESS_GET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                       HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PM_ACTIVITI_PROCESS_GET(V_V_GUID);

        Blob fileblob = (Blob) data.get("V_ACTIVITI_IMG");
        InputStream is = fileblob.getBinaryStream();

        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");

        List<Map<String, Object>> list = (List) data.get("RET");
        Map map = (Map) list.get(0);

        //V_V_FILENAME = URLEncoder.encode(V_V_FILENAME, "UTF-8");
        String V_ACTIVITI_NAME = map.get("V_ACTIVITI_NAME").toString();

        response.setHeader("Content-Disposition", "attachment; filename=" + V_ACTIVITI_NAME);
        OutputStream fos = response.getOutputStream();
        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        is.close();
        fos.close();
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_ACTIVITI_PROCESS_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_ACTIVITI_PROCESS_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PM_ACTIVITI_PROCESS_DEL(V_V_GUID);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    //工单创建审批人
    @RequestMapping(value = "/PM_ACTIVITI_PROCESS_PER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_ACTIVITI_PROCESS_PER_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
                                                           @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                                           @RequestParam(value = "V_V_FLOW_STEP") String V_V_FLOW_STEP,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                                                           @RequestParam(value = "V_V_WHERE") String V_V_WHERE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRCODE, V_V_FLOWTYPE, V_V_FLOW_STEP, V_V_PERCODE, V_V_SPECIALTY, V_V_WHERE);

        List<Map<String, Object>> list = (List) data.get("list");

        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //工单打印确认状态
    @RequestMapping(value = "/PRO_WX_ORDER_BOOKED", method = RequestMethod.POST)
    @ResponseBody
    public Map order_booked(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            @RequestParam(value = "V_V_YQTIME") String V_V_YQTIME,
            @RequestParam(value = "V_V_YQYY") String V_V_YQYY,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = hpService.PRO_WX_ORDER_BOOKED(V_V_ORDERGUID, V_V_YQTIME, V_V_YQYY);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_ACTIVITI_FLOW_AGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_AGREE(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
            @RequestParam(value = "V_V_PROCESS_NAMESPACE") String V_V_PROCESS_NAMESPACE,
            @RequestParam(value = "V_V_PROCESS_CODE") String V_V_PROCESS_CODE,
            @RequestParam(value = "V_V_STEPCODE") String V_V_STEPCODE,
            @RequestParam(value = "V_V_STEPNEXT_CODE") String V_V_STEPNEXT_CODE,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = hpService.PRO_ACTIVITI_FLOW_AGREE(V_V_ORDERID, V_V_PROCESS_NAMESPACE, V_V_PROCESS_CODE, V_V_STEPCODE, V_V_STEPNEXT_CODE);
        return result;
    }

    @RequestMapping(value = "/PM_WORKORDER_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_WORKORDER_DEL(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_WORKORDER_DEL(V_V_ORDERGUID);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    //PM_03010201,月计划报表，选择计划查询
    @RequestMapping(value = "/PM_03_MONTH_PLAN_BYPER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_MONTH_PLAN_BYPER_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = hpService.PM_03_MONTH_PLAN_BYPER_SEL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_ZY, V_V_CONTENT, V_V_STATECODE, V_V_PEROCDE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    //PM_03010201,月计划报表，删除
    @RequestMapping(value = "/PM_03_PLAN_MONTH_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_MONTH_DEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = hpService.PM_03_PLAN_MONTH_DEL(V_V_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_GX_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_GX_VIEW(
            @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
            @RequestParam(value = "V_V_ACTIVITY") String V_V_ACTIVITY,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        HashMap data = hpService.PRO_PM_WORKORDER_GX_VIEW(V_V_ORDERGUID, V_V_ACTIVITY);
        return data;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_GX_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_GX_DEL(
            @RequestParam(value = "I_I_ID") String I_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = hpService.PRO_PM_WORKORDER_GX_DEL(I_I_ID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_GX_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_GX_SET(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                       @RequestParam(value = "V_V_ACTIVITY") String V_V_ACTIVITY,
                                                       @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                       @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PRO_PM_WORKORDER_GX_SET(V_V_ORDERGUID, V_V_ACTIVITY, V_V_PERCODE, V_V_PERNAME);

        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PW_WORKORDER_GX_TS_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PW_WORKORDER_GX_TS_SET(@RequestParam(value = "I_I_ID") String I_I_ID,
                                                          @RequestParam(value = "V_V_TS") String V_V_TS,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PRO_PW_WORKORDER_GX_TS_SET(I_I_ID, V_V_TS);

        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_19_WORKDE_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_19_WORKDE_DEL(@RequestParam(value = "I_I_ID") String I_I_ID,
                                    @RequestParam(value = "V_V_CRAFTCODE") String V_V_CRAFTCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = hpService.PRO_PM_19_WORKDE_DEL(I_I_ID, V_V_CRAFTCODE);
        test.put("list", result);
        return test;
    }

    //PM1928 根据厂矿查询下属作业区的人员树结构
    @RequestMapping(value = "selectPersonFromDept")
    @ResponseBody
    public List<Map> selectPersonFromDept(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
            @RequestParam(value = "V_V_WORKCODE") String V_V_WORKCODE,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            HttpServletRequest request, HttpServletResponse response, HttpSession session)
            throws JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> menu = new ArrayList<Map>();
        if (V_V_FLAG.equals("true")) {
            HashMap data = hpService.PRO_BASE_DEPT_VIEW(V_V_DEPTCODE, V_V_DEPTTYPE);
            List<Map<String, Object>> deptList = (List<Map<String, Object>>) data.get("list");
            Map<String, Object> budgetClass;
            for (int i = 0; i < deptList.size(); i++) {
                budgetClass = deptList.get(i);
                Map temp = new HashMap();
                temp.put("parentid", "");
                temp.put("sid", budgetClass.get("V_DEPTCODE"));
                temp.put("text", budgetClass.get("V_DEPTNAME"));
                temp.put("expanded", false);
                //result.add(temp);
                menu.add(temp);
                //fillChildren(budgetClass);

            }

            result.put("success", true);
        } else {
            HashMap data = hpService.PRO_BASE_PERSON_VIEW(V_V_DEPTCODE);
            Map<String, Object> subMatBudgetCat;
            List<Map<String, Object>> personTreeList = (List<Map<String, Object>>) data.get("list");

            for (int i = 0; i < personTreeList.size(); i++) {
                subMatBudgetCat = personTreeList.get(i);
                Map temp = new HashMap();
                temp.put("parentid", '1');
                temp.put("sid", subMatBudgetCat.get("V_PERSONCODE"));
                temp.put("text", subMatBudgetCat.get("V_PERSONNAME"));
                temp.put("leaf", true);
                HashMap data1 = hpService.PRO_BASE_CRAFTTOPERSON_GET((String) subMatBudgetCat.get("V_PERSONCODE"), V_V_WORKCODE);
                if (data1.get("V_V_SNUM").equals("0")) {
                    temp.put("checked", false);
                } else {
                    temp.put("checked", true);
                }
                menu.add(temp);
                //children.add(subMatBudgetCat);
            }

            result.put("children", menu);
            result.put("success", true);
        }


        return menu;
    }

    //查询base_person_de 无条件查询
    @RequestMapping(value = "/PRO_BASE_PERSON_DE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_PERSON_DE_SEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        HashMap data = hpService.PRO_BASE_PERSON_DE_SEL();
        return data;
    }

    //人员工种管理存储人员和删除人员
    @RequestMapping(value = "/PRO_BASE_CRAFTTOPERSON_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_CRAFTTOPERSON_SET(@RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                                          @RequestParam(value = "V_V_WORKCODE") String V_V_WORKCODE,
                                                          @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PRO_BASE_CRAFTTOPERSON_SET(V_V_FLAG, V_V_WORKCODE, V_V_PERSONCODE);
        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("success", true);
        return result;
    }

    //点检计划查询(未生成)
    @RequestMapping(value = "/PM_06_DJ_CRITERION_NOGENERATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_06_DJ_CRITERION_NOGENERATE(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                             @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                                             @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                             @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_06_DJ_CRITERION_NOGENERATE(V_V_ORGCODE, V_V_DEPTCODE, V_V_CK_EQUTYPECODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    //点检计划查询(已生成)
    @RequestMapping(value = "/PM_06_DJ_CRITERION_GENERATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_06_DJ_CRITERION_GENERATE(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                                           @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                           @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                           @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_06_DJ_CRITERION_GENERATE(V_V_ORGCODE, V_V_DEPTCODE, V_V_CK_EQUTYPECODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }


    /*//查询有没有新的发起工单数据,有的话往AM_SEND里SET
    @PostConstruct
    public void setJstWherePlantime() {
        TimerTask task = new TimerTask() {
            public void run() {

                try {
                    HashMap data = hpService.PM_06_DJ_CRITERION_ZQSJ_SEL();

                    List<Map<String, Object>> dataList = (List<Map<String, Object>>) data.get("list");
                    SimpleDateFormat sdftime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Format f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

                    for (int i = 0; i < dataList.size(); i++) {
                        Double zhouqi = (Double) dataList.get(i).get("V_CRITERION_CYCLE");
                        String shengchengSJ = (String) dataList.get(i).get("V_PLAN_TIME");
                        String scTime = shengchengSJ.substring(0, 10) + " 00:00:00";
                        String intNumberzhouqi = String.valueOf(zhouqi);
                        String intNumber = intNumberzhouqi.substring(0, intNumberzhouqi.indexOf("."));
                        int index = intNumberzhouqi.lastIndexOf(".");
                        char[] ch = intNumberzhouqi.toCharArray();
                        String lastString = String.copyValueOf(ch, index + 1, ch.length - index - 1);
                        String lastString2 = "0." + lastString;
                        Double d = Double.valueOf(lastString2);
                        Calendar ca = Calendar.getInstance();
                        ca.setTime(sdftime.parse(scTime));
                        ca.add(Calendar.HOUR_OF_DAY, Integer.parseInt(intNumber));
                        ca.add(Calendar.MINUTE, (int) (d * 60));
                        System.out.println("第" + i + "个最终时间时间为" + sdftime.format(ca.getTime()));
                        System.out.println("第" + i + "个当前时间时间为" + sdftime.format(new Date()));
                        String date1 = sdftime.format(ca.getTime());
                        String date2 = sdftime.format(new Date());
                        if (date1.equals(date2)) {
                            HashMap dataSet = hpService.PM_06_DJ_CRITERION_JST_SET(pm_jst, "发送人即时通密码", "发送人即时通账号", (String) dataList.get(i).get("V_PLAN_PER"), "日常点检", (String) dataList.get(i).get("V_CRITERION_CONTENT"), 0, date2);
                        }

                    }

                } catch (SQLException e) {
                    e.printStackTrace();
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        };

        long dateSpan = 5 * 60 * 1000;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd 00:00:00");
        try {
            Date startTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(sdf.format(new Date()));
            new Timer().scheduleAtFixedRate(task, startTime, dateSpan);
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

    //检测最新的需要发送的即时通 发送信息
    @PostConstruct
    public void sendJstWithNew() {
        TimerTask task = new TimerTask() {
            public void run() {

                try {
                    HashMap data = hpService.PM_AM_SEND_SEL();

                    List<Map<String, Object>> dataList = (List<Map<String, Object>>) data.get("list");

                    if (dataList != null) {
                        for (int i = 0; i < dataList.size(); i++) {
                            Double I_I_FINISH = (Double) dataList.get(i).get("I_FINISH");
                            String state = String.valueOf(I_I_FINISH);
                            if (state.equals("0.0")) {
                                String V_V_SEND_PERSON = (String) dataList.get(i).get("V_SEND_PERSON");
                                String ret = hpService.AMToMessIFCheck("<SendMessage><AM_Name>" + V_V_SEND_PERSON + "</AM_Name><UserId></UserId><Type>即时通</Type><Access></Access><EMail></EMail><IsBack></IsBack><IsEncrypt></IsEncrypt><ISPriority></ISPriority><Ohter1></Ohter1><Ohter2></Ohter2><PhoneNum></PhoneNum><MessageTxt></MessageTxt><SystemName>AKSB</SystemName></SendMessage>", "http://localhost:8081/pm/app/pm/page/login/login.html");
                            }
                        }
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                } catch (ParseException e) {
                    e.printStackTrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };

        long dateSpan = 5 * 60 * 1000;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd 00:00:00");
        try {
            Date startTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(sdf.format(new Date()));
            new Timer().scheduleAtFixedRate(task, startTime, dateSpan);
        } catch (Exception e) {
            e.getStackTrace();
        }
    }*/

    @RequestMapping(value = "/PM_13_EXAMINED_COMPANY_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_COMPANY_SET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_DATE") String V_V_DATE,
            @RequestParam(value = "V_V_BEEXAMINED_ORG") String V_V_BEEXAMINED_ORG,
            @RequestParam(value = "V_V_BEEXAMINED_DEPT") String V_V_BEEXAMINED_DEPT,
            @RequestParam(value = "V_V_JCBW") String V_V_JCBW,
            @RequestParam(value = "V_V_CZWT") String V_V_CZWT,
            @RequestParam(value = "V_V_ZGCS") String V_V_ZGCS,
            @RequestParam(value = "V_V_KHYJ") String V_V_KHYJ,
            @RequestParam(value = "V_V_KHFS") String V_V_KHFS,
            @RequestParam(value = "V_V_KKJE") String V_V_KKJE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
            @RequestParam(value = "V_V_BEEXAMINED_TYPE") String V_V_BEEXAMINED_TYPE,
            @RequestParam(value = "V_V_YQZGSJ") String V_V_YQZGSJ,
            @RequestParam(value = "V_V_TBSJ") String V_V_TBSJ,
            @RequestParam(value = "V_V_TB_PER") String V_V_TB_PER,
            @RequestParam(value = "V_V_STATE") String V_V_STATE,
            @RequestParam(value = "V_V_JX_PER") String V_V_JX_PER,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_13_EXAMINED_COMPANY_SET(V_V_GUID, V_V_DATE,V_V_BEEXAMINED_ORG, V_V_BEEXAMINED_DEPT, V_V_JCBW, V_V_CZWT, V_V_ZGCS,
                V_V_KHYJ, V_V_KHFS, V_V_KKJE, V_V_DEPTCODE
                , V_V_TYPE, V_V_BEEXAMINED_TYPE, V_V_YQZGSJ, V_V_TBSJ, V_V_TB_PER, V_V_STATE, V_V_JX_PER);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    //PM_1305通告查询
    @RequestMapping(value = "PM_13_EXAMINED_TG_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_13_EXAMINED_TG_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DATE") String V_V_DATE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_13_EXAMINED_TG_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_DATE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    //PM_1305厂矿下岗位查询
    @RequestMapping(value = "PRO_BASE_POST_DJY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_POST_SEL(
            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PRO_BASE_POST_DJY();
        return result;
    }

    @RequestMapping(value = "BASE_PER_POST_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> BASE_PER_POST_SEL(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                 @RequestParam(value = "V_V_POSTNAME") String V_V_POSTNAME,
                                                 HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.BASE_PER_POST_SEL(V_V_DEPTCODE, V_V_POSTNAME);
        return result;
    }

    @RequestMapping(value = "PRO_PM_EQUREPAIRPLAN_NEXTPERN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_NEXTPERN( @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                             @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                                                             @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                             @RequestParam(value = "V_I_STATE") String V_I_STATE,
                                                             @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                                             @RequestParam(value = "V_V_FLOW_STEP") String V_V_FLOW_STEP,
                                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PRO_PM_EQUREPAIRPLAN_NEXTPERN(V_V_ORGCODE, V_V_DEPTCODE, V_V_SPECIALTY, V_V_GUID,
                V_I_STATE, V_V_FLOWTYPE, V_V_FLOW_STEP);
        return result;
    }

    @RequestMapping(value = "pro_sy201001_onedetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201001_onedetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                 HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201001_onedetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "/PM_06_DJ_CRITERION_SETN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_SETN(  @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                        @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                                                        @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                        @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                        @RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
                                                        @RequestParam(value = "V_V_CRITERION_ITEM") String V_V_CRITERION_ITEM,
                                                        @RequestParam(value = "V_V_CRITERION_CONTENT") String V_V_CRITERION_CONTENT,
                                                        @RequestParam(value = "V_V_CRITERION_CR") String V_V_CRITERION_CR,
                                                        @RequestParam(value = "V_V_CRITERION_CYCLE") String V_V_CRITERION_CYCLE,
                                                        @RequestParam(value = "V_V_CRITERION_CYCLETYPE") String V_V_CRITERION_CYCLETYPE,
                                                        @RequestParam(value = "V_V_EQU_STATE1") String V_V_EQU_STATE1,
                                                        @RequestParam(value = "V_V_EQU_STATE2") String V_V_EQU_STATE2,
                                                        @RequestParam(value = "V_V_CK_FUNCTION1") String V_V_CK_FUNCTION1,
                                                        @RequestParam(value = "V_V_CK_FUNCTION2") String V_V_CK_FUNCTION2,
                                                        @RequestParam(value = "V_V_CK_FUNCTION3") String V_V_CK_FUNCTION3,
                                                        @RequestParam(value = "V_V_CK_FUNCTION4") String V_V_CK_FUNCTION4,
                                                        @RequestParam(value = "V_V_CK_FUNCTION5") String V_V_CK_FUNCTION5,
                                                        @RequestParam(value = "V_V_CK_FUNCTION6") String V_V_CK_FUNCTION6,
                                                        @RequestParam(value = "V_V_CK_FUNCTION7") String V_V_CK_FUNCTION7,
                                                        @RequestParam(value = "V_V_CK_FUNCTION8") String V_V_CK_FUNCTION8,
                                                        @RequestParam(value = "V_I_ORDER") String V_I_ORDER,
                                                        @RequestParam(value = "V_V_PLAN_STATE") String V_V_PLAN_STATE,
                                                        @RequestParam(value = "V_I_FLAG") String V_I_FLAG,
                                                        @RequestParam(value = "V_V_CKTYPE") String V_V_CKTYPE,
                                                        @RequestParam(value = "V_I_WEIGHT") String V_I_WEIGHT,
                                                        @RequestParam(value = "V_I_YJ") String V_I_YJ,
                                                        @RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_06_DJ_CRITERION_SETN(V_V_ORGCODE, V_V_DEPTCODE, V_V_CK_EQUTYPECODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_CRITERION_CODE,
                V_V_CRITERION_ITEM, V_V_CRITERION_CONTENT, V_V_CRITERION_CR, V_V_CRITERION_CYCLE, V_V_CRITERION_CYCLETYPE, V_V_EQU_STATE1, V_V_EQU_STATE2, V_V_CK_FUNCTION1,
                V_V_CK_FUNCTION2, V_V_CK_FUNCTION3, V_V_CK_FUNCTION4, V_V_CK_FUNCTION5, V_V_CK_FUNCTION6, V_V_CK_FUNCTION7, V_V_CK_FUNCTION8, V_I_ORDER,V_V_PLAN_STATE, V_I_FLAG,
                V_V_CKTYPE, V_I_WEIGHT, V_I_YJ, V_V_INPER);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "pro_sy201001_twodetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201001_twodetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201001_twodetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "pro_sy201001_threedetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201001_threedetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201001_threedetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "pro_sy201001_fourdetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201001_fourdetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                        HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201001_fourdetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "pro_sy201001_fivedetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201001_fivedetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                       HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201001_fivedetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "pro_sy201001_sixdetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201001_sixdetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                       HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201001_sixdetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "pro_sy201001_sevendetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201001_sevendetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201001_sevendetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "pro_sy201002_onedetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201002_onedetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                        HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201002_onedetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "pro_sy201002_twodetail", method = RequestMethod.POST)
     @ResponseBody
     public Map<String, Object> pro_sy201002_twodetail(@RequestParam(value = "v_record_id") String v_record_id,
                                                       HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201002_twodetail(v_record_id);
        return result;
    }

    @RequestMapping(value = "pro_sy201002_threedetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201002_threedetail(@RequestParam(value = "v_record_id") String v_record_id,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201002_threedetail(v_record_id);
        return result;
    }

    @RequestMapping(value = "pro_sy201002_fourdetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201002_fourdetail(@RequestParam(value = "v_record_id") String v_record_id,
                                                        HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201002_fourdetail(v_record_id);
        return result;
    }

    @RequestMapping(value = "pro_sy201003_onedetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201003_onedetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                       HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201003_onedetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "pro_sy201003_twodetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy201003_twodetail(@RequestParam(value = "recordcode_in") String recordcode_in,
                                                      HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.pro_sy201003_twodetail(recordcode_in);
        return result;
    }

    @RequestMapping(value = "PM_06_DJ_DATA_TIMER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_TIMER_SEL(@RequestParam(value = "V_V_DJPER") String V_V_DJPER,
                                                 HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = hpService.PM_06_DJ_DATA_TIMER_SEL(V_V_DJPER);
        return result;
    }

    @RequestMapping(value = "/PM_06_DJ_CRITERION_DBDATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_DBDATA_SEL(
            @RequestParam(value = "V_V_TIMER_GUID") String V_V_TIMER_GUID,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_06_DJ_CRITERION_DBDATA_SEL(V_V_TIMER_GUID, V_V_PERSONCODE);
        return data;
    }

    @RequestMapping(value = "/PM_06_DJ_CRITERION_DATA_SETN", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_DATA_SETN(@RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
                                                           @RequestParam(value = "V_V_FZ_PER") String V_V_FZ_PER,
                                                           @RequestParam(value = "V_V_PLAN_STATE") String V_V_PLAN_STATE,
                                                           @RequestParam(value = "V_V_PLAN_TIME") String V_V_PLAN_TIME,
                                                           @RequestParam(value = "V_V_PLAN_PER") String V_V_PLAN_PER,
                                                           @RequestParam(value = "V_V_DJ_TYPE") String V_V_DJ_TYPE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_06_DJ_CRITERION_DATA_SETN(V_V_CRITERION_CODE, V_V_FZ_PER, V_V_PLAN_STATE, V_V_PLAN_TIME,
                V_V_PLAN_PER, V_V_DJ_TYPE);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_06_DJ_DATA_UPSET", method = RequestMethod.POST)
     @ResponseBody
     public Map<String, Object> PM_06_DJ_DATA_UPSET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                    @RequestParam(value = "V_V_DJ_STATE") String V_V_DJ_STATE,
                                                    @RequestParam(value = "V_V_DJ_DATE") String V_V_DJ_DATE,
                                                    @RequestParam(value = "V_V_DJ_PER") String V_V_DJ_PER,
                                                    @RequestParam(value = "V_V_DJ_NR") String V_V_DJ_NR,
                                                    @RequestParam(value = "V_V_DJ_TYPE") String V_V_DJ_TYPE,
                                                    @RequestParam(value = "V_V_TIMER_GUID") String V_V_TIMER_GUID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_06_DJ_DATA_UPSET(V_V_GUID, V_V_DJ_STATE, V_V_DJ_DATE, V_V_DJ_PER, V_V_DJ_NR, V_V_DJ_TYPE, V_V_TIMER_GUID);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXGX_JJ_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1917_JXGX_JJ_DATA_SET(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                                   @RequestParam(value = "V_V_JJ_CODE") String V_V_JJ_CODE,
                                                   @RequestParam(value = "V_V_TS") String V_V_TS,
                                                   @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_1917_JXGX_JJ_DATA_SET(V_V_JXGX_CODE, V_V_JJ_CODE, V_V_TS, V_V_EQUCODE);

        String pm_hp = (String) data.get("RET");

        result.put("RET", pm_hp);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXGX_JJ_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1917_JXGX_JJ_DATA_DEL(
            @RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
            @RequestParam(value = "V_V_JJ_CODE") String V_V_JJ_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = hpService.PM_1917_JXGX_JJ_DATA_DEL(V_V_JXGX_CODE,V_V_JJ_CODE);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXMX_JJ_TS_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_1917_JXMX_JJ_TS_SET(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                                        @RequestParam(value = "V_V_JJ_CODE") String V_V_JJ_CODE,
                                                        @RequestParam(value = "V_V_TS") String V_V_TS,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = hpService.PM_1917_JXMX_JJ_TS_SET(V_V_JXGX_CODE, V_V_JJ_CODE, V_V_TS);

        String pm_hp = (String) data.get("RET");

        result.put("RET", pm_hp);
        result.put("success", true);
        return result;
    }




}
