package org.building.pm.controller;

import com.itextpdf.text.*;
import jxl.read.biff.MergedCellsRecord;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.building.pm.service.*;

import org.dom4j.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
import java.sql.SQLException;

import java.util.ArrayList;
import java.sql.Date;

import java.util.List;
import java.util.Map;


/**
 * Created by zjh on 2017/1/22.
 * <p>
 * �豸�¹�controller
 */
@Controller
@RequestMapping("/app/pm/excel")
public class ExcelController {

    @Autowired
    private SgService sgService;

    @Autowired
    private QxService qxService;

    @Autowired
    private CglService cglService;

    @Autowired
    private WorkOrderService workOrderService;

    @Autowired
    private PM_03Service pm_03Service;

    @Autowired
    private PM_12Service pm_12Service;

    @Autowired
    private PM_22Service pm_22Service;

    @Autowired
    private ZpfService zpfService;

    @Autowired
    private LxmService lxmService;

    @Autowired
    private Dx_fileService dx_fileService;

    @Autowired
    private CjyService cjyService;

    @Autowired
    private ZdhService zdhService;

    @Autowired
    private PM_06Service pm_06Service;

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public List upload(@RequestParam(value = "file", required = false) MultipartFile file,

                       HttpServletRequest request, HttpServletResponse response) {
        String result = "";
        //创建处理EXCEL的类
        ReadExcel readExcel = new ReadExcel();
        List useList = readExcel.getExcelInfo(file);

        //pm_03Service.pm_04_project_data_item_set(useList);

        if (useList != null && !useList.isEmpty()) {
            result = "上传成功";
        } else {
            result = "上传失败";
        }
        return useList;
    }


    /*事故EXCEL*/
    @RequestMapping(value = "/SG_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void SG_EXCEL(
            @RequestParam(value = "V_V_SG_NAME") String V_V_SG_NAME,
            @RequestParam(value = "V_V_SG_STIME") String V_V_SG_STIME,
            @RequestParam(value = "V_V_SG_ETIME") String V_V_SG_ETIME,
            @RequestParam(value = "V_V_SG_DEPT") String V_V_SG_DEPT,
            @RequestParam(value = "V_V_SG_TYPE") String V_V_SG_TYPE,
            @RequestParam(value = "V_V_SG_YY") String V_V_SG_YY,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = sgService.SG_INF_DATA_ITEM_SEL(V_V_SG_NAME, V_V_SG_STIME, V_V_SG_ETIME, V_V_SG_DEPT, V_V_SG_TYPE, V_V_SG_YY);

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
        cell.setCellValue("事故发生时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("事故发生单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("事故发生地点");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("事故类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("事故原因");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("事故设备");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("事故名称");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_SG_TIEM") == null ? "" : map.get("V_SG_TIEM").toString());

                row.createCell((short) 2).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_SG_DD") == null ? "" : map.get("V_SG_DD").toString());

                row.createCell((short) 4).setCellValue(map.get("V_TYPE_NAME") == null ? "" : map.get("V_TYPE_NAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_YY_NAME") == null ? "" : map.get("V_YY_NAME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_SG_EQU") == null ? "" : map.get("V_SG_EQU").toString());

                row.createCell((short) 7).setCellValue(map.get("V_SG_NAME") == null ? "" : map.get("V_SG_NAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("事故Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/FXJH_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void FXJH_EXCEL(@RequestParam(value = "V_V_IP") String V_V_IP,
                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                           @RequestParam(value = "V_D_INDATE_B") String V_D_INDATE_B,
                           @RequestParam(value = "V_D_INDATE_E") String V_D_INDATE_E,
                           @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                           @RequestParam(value = "V_V_DEFECT") String V_V_DEFECT,
                           @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                           HttpServletResponse response)
            throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        V_V_DEFECT = new String(V_V_DEFECT.getBytes("iso-8859-1"), "utf-8");

        Map<String, Object> data = pm_22Service.PRO_PM_EQUREPAIRPLAN_VIEW(V_V_IP, V_V_PERCODE, V_V_ORGCODE, V_V_DEPTCODE,
                V_D_INDATE_B, V_D_INDATE_E, V_V_SPECIALTY, V_V_DEFECT, V_V_FLAG);

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
        cell.setCellValue("放行工程编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("放行建设单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("放行计划金额");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("申请日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("项目编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("项目名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("缺陷内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("计划施工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("工程总概算（万元）");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("工程总预算（万元）");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("检修单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("是否特殊抢修");
        cell.setCellStyle(style);

        cell = row.createCell((short) 14);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 15);
        cell.setCellValue("申请厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 16);
        cell.setCellValue("申请作业区");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_PROJECTCODE_GS") == null ? "" : map.get("V_PROJECTCODE_GS").toString());

                row.createCell((short) 2).setCellValue(map.get("V_REPAIRDEPT_GS") == null ? "" : map.get("V_REPAIRDEPT_GS").toString());
                row.createCell((short) 3).setCellValue(map.get("F_MONEY_GS") == null ? "" : map.get("F_MONEY_GS").toString());
                row.createCell((short) 4).setCellValue(map.get("D_DATE") == null ? "" : map.get("D_DATE").toString());
                row.createCell((short) 5).setCellValue(map.get("V_PROJECTCODE") == null ? "" : map.get("V_PROJECTCODE").toString());
                row.createCell((short) 6).setCellValue(map.get("V_PROJECTNAME") == null ? "" : map.get("V_PROJECTNAME").toString());
                row.createCell((short) 7).setCellValue(map.get("V_DEFECT") == null ? "" : map.get("V_DEFECT").toString());
                row.createCell((short) 8).setCellValue(map.get("V_PLANDATE") == null ? "" : map.get("V_PLANDATE").toString());
                row.createCell((short) 9).setCellValue(map.get("V_SPECIALTY") == null ? "" : map.get("V_SPECIALTY").toString());
                row.createCell((short) 10).setCellValue(map.get("F_MONEYUP") == null ? "" : map.get("F_MONEYUP").toString());
                row.createCell((short) 11).setCellValue(map.get("F_MONEYBUDGET") == null ? "" : map.get("F_MONEYBUDGET").toString());
                row.createCell((short) 12).setCellValue(map.get("V_REPAIRDEPT") == null ? "" : map.get("V_REPAIRDEPT").toString());
                row.createCell((short) 13).setCellValue(map.get("I_RUSHTO") == null ? "" : map.get("I_RUSHTO").toString());
                row.createCell((short) 14).setCellValue(map.get("V_INMAN") == null ? "" : map.get("V_INMAN").toString());
                row.createCell((short) 15).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                row.createCell((short) 16).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());


            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("放行计划Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*事故EXCEL*/
    @RequestMapping(value = "/QX_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void QX_EXCEL(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                         @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                         @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                         @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                         @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                         @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                         @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                         @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                         @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                         @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                         HttpServletResponse response)
            throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        V_V_DEFECTLIST = new String(V_V_DEFECTLIST.getBytes("iso-8859-1"), "utf-8");

        Map<String, Object> data = qxService.PRO_PM_07_DEFECT_VIEW_PERALL(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE,
                V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE, V_V_SOURCECODE, V_V_DEFECTLIST, X_PERSONCODE, V_V_PAGE, V_V_PAGESIZE);

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
        cell.setCellValue("缺陷日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("缺陷明细");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("设备");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("设备位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("负责人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("处理意见");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("缺陷状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("缺陷来源");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_ORDERID") == null ? "" : map.get("V_ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("D_DEFECTDATE") == null ? "" : map.get("D_DEFECTDATE").toString());

                row.createCell((short) 3).setCellValue(map.get("V_DEFECTLIST") == null ? "" : map.get("V_DEFECTLIST").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_EQUSITE") == null ? "" : map.get("V_EQUSITE").toString());

                row.createCell((short) 6).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_PERNAME") == null ? "" : map.get("V_PERNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_IDEA") == null ? "" : map.get("V_IDEA").toString());

                row.createCell((short) 9).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_SOURCENAME") == null ? "" : map.get("V_SOURCENAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("缺陷Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    /*年EXCEL*/
    @RequestMapping(value = "/N_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void N_EXCEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
            @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        V_V_REPAIRMAJOR_CODE = new String(V_V_REPAIRMAJOR_CODE.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = sgService.PRO_PM_03_PLAN_YEAR_VIEW1(V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_FLOWCODE);

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
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("设备编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("主要检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("计划工期（小时）");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_EQUCODE") == null ? "" : map.get("V_EQUCODE").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 6).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("年Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*工单查询EXCEL*/
    @RequestMapping(value = "/GDCX_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GDCX_EXCEL(
            @RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
            @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
            @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
            @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
            @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
            @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
//        V_V_REPAIRMAJOR_CODE = new String(V_V_REPAIRMAJOR_CODE.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = workOrderService.PRO_PM_WORKORDER_SELECT_ADMIN(V_D_ENTER_DATE_B.equals("0") ? "%" : V_D_ENTER_DATE_B, V_D_DEFECTDATE_E.equals("0") ? "%" : V_D_DEFECTDATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR,
                V_V_STATECODE, V_EQUTYPE_CODE.equals("0") ? "%" : V_EQUTYPE_CODE, V_EQU_CODE.equals("0") ? "%" : V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT,
                V_V_BJ_TXT, V_V_ORDER_TYP, V_V_PAGE, V_V_PAGESIZE);

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
        cell.setCellValue("工单描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("设备位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备件消耗");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("委托单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("委托人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("委托时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("检修单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("工单类型描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("工单状态");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_ORDERID") == null ? "" : map.get("V_ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("V_SHORT_TXT") == null ? "" : map.get("V_SHORT_TXT").toString());

                row.createCell((short) 3).setCellValue(map.get("V_EQUIP_NAME") == null ? "" : map.get("V_EQUIP_NAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUSITENAME") == null ? "" : map.get("V_EQUSITENAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_SPARE") == null ? "" : map.get("V_SPARE").toString());

                row.createCell((short) 6).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("D_ENTER_DATE") == null ? "" : map.get("D_ENTER_DATE").toString());

                row.createCell((short) 9).setCellValue(map.get("V_DEPTNAMEREPARIR") == null ? "" : map.get("V_DEPTNAMEREPARIR").toString());

                row.createCell((short) 10).setCellValue(map.get("V_ORDER_TYP_TXT") == null ? "" : map.get("V_ORDER_TYP_TXT").toString());

                row.createCell((short) 11).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("工单查询excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //----UPDATE-WORKORDER-2018-EXPORE-EXCEL
    /*工单查询EXCEL*/
    @RequestMapping(value = "/GDCX_EXCEL2", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GDCX_EXCEL2(
            @RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
            @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
            @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
            @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
            @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
            @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = workOrderService.PRO_PM_WORKORDER_SEL_ADMINALL(V_D_ENTER_DATE_B.equals("0") ? "%" : V_D_ENTER_DATE_B, V_D_DEFECTDATE_E.equals("0") ? "%" : V_D_DEFECTDATE_E, V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE, V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE, V_V_DEPTCODEREPARIR.equals("0") ? "%" : V_V_DEPTCODEREPARIR,
                V_V_STATECODE.equals("0") ? "%" : V_V_STATECODE, V_EQUTYPE_CODE.equals("0") ? "%" : V_EQUTYPE_CODE, V_EQU_CODE.equals("0") ? "%" : V_EQU_CODE, V_DJ_PERCODE.equals("0") ? "%" : V_DJ_PERCODE, V_V_SHORT_TXT,
                V_V_BJ_TXT, V_V_ORDER_TYP);

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
        cell.setCellValue("工单描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("设备位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备件消耗");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("委托单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("委托人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("委托时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("检修单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("工单类型描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("工单状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("计划工时");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("实际工时");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_ORDERID") == null ? "" : map.get("V_ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("V_SHORT_TXT") == null ? "" : map.get("V_SHORT_TXT").toString());

                row.createCell((short) 3).setCellValue(map.get("V_EQUIP_NAME") == null ? "" : map.get("V_EQUIP_NAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUSITENAME") == null ? "" : map.get("V_EQUSITENAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_SPARE") == null ? "" : map.get("V_SPARE").toString());

                row.createCell((short) 6).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("D_ENTER_DATE") == null ? "" : map.get("D_ENTER_DATE").toString());

                row.createCell((short) 9).setCellValue(map.get("V_DEPTNAMEREPARIR") == null ? "" : map.get("V_DEPTNAMEREPARIR").toString());

                row.createCell((short) 10).setCellValue(map.get("V_ORDER_TYP_TXT") == null ? "" : map.get("V_ORDER_TYP_TXT").toString());

                row.createCell((short) 11).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 12).setCellValue(map.get("PLANTIME") == null ? "" : map.get("PLANTIME").toString());

                row.createCell((short) 13).setCellValue(map.get("FACTTIME") == null ? "" : map.get("FACTTIME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("工单查询excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //---END UPA
    /*工单备件更换管理EXCEL*/
    @RequestMapping(value = "/GDBJGHGL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GDBJGHGL_EXCEL(
            @RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
            @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
            @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
            @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = workOrderService.pro_run7113_ordermatlist(V_DEPT_CODE, V_EQUIP_CODE, V_MATERIALCODE, V_MATERIALNAME);

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
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("工单备件更换管理excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*季度计划生产部审批导出EXCEL*/
    @RequestMapping(value = "/QSCBSP_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void QSCBSP_EXCEL(@RequestParam(value = "V_V_INPER") String V_V_INPER,
                             @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                             @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                             @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        V_V_REPAIRMAJOR_CODE = new String(V_V_REPAIRMAJOR_CODE.getBytes("iso-8859-1"), "utf-8");

        List list = new ArrayList();

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_QUARTER_VIEW(V_V_INPER, V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_PLANTYPE);

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
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划工时(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATUSNAME") == null ? "" : map.get("V_STATUSNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 4).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 5).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 8).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("季度检修计划excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*月计划生产部审批导出EXCEL*/
    @RequestMapping(value = "/MSCBSP_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void MSCBSP_EXCEL(@RequestParam(value = "V_V_INPER") String V_V_INPER,
                             @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                             @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                             @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        V_V_REPAIRMAJOR_CODE = new String(V_V_REPAIRMAJOR_CODE.getBytes("iso-8859-1"), "utf-8");

        List list = new ArrayList();


        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_MONTH_VIEW(V_V_INPER, V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_PLANTYPE);

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
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划工时(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATUSNAME") == null ? "" : map.get("V_STATUSNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 4).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 5).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 8).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("月检修计划excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*周检修计划生产部审批导出EXCEL*/
    @RequestMapping(value = "/ZSCBSP_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void ZSCBSP_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                             @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                             @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_ZY") String V_V_ZY,
                             @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                             @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                             @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                             @RequestParam(value = "V_V_STATE") String V_V_STATE,
                             HttpServletResponse response) throws SQLException {

        List list = new ArrayList();

        String V_V_DEPTCODE2 = V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE;
        String V_V_ORGCODE2 = V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE;
        String V_V_ZY2 = V_V_ZY.equals("0") ? "%" : V_V_ZY;
        String V_V_EQUTYPE2 = V_V_EQUTYPE.equals("0") ? "%" : V_V_EQUTYPE;
        String V_V_EQUCODE2 = V_V_EQUCODE.equals("0") ? "%" : V_V_EQUCODE;
        String V_V_STATE2 = V_V_STATE.equals("0") ? "%" : V_V_STATE;

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_WEEK_EXCEL(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE2, V_V_DEPTCODE2,
                V_V_ZY2, V_V_EQUTYPE2, V_V_EQUCODE2, V_V_CONTENT, V_V_STATE2);

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
        cell.setCellValue("计划状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("检修模型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("计划工期（小时）");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("主要缺陷");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("预计寿命");
        cell.setCellStyle(style);

        cell = row.createCell((short) 14);
        cell.setCellValue("维修人数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 15);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 16);
        cell.setCellValue("流程步骤");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 5).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 7).setCellValue(map.get("V_EQUTYPENAME") == null ? "" : map.get("V_EQUTYPENAME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INPERNAME") == null ? "" : map.get("V_INPERNAME").toString());

                row.createCell((short) 12).setCellValue(map.get("V_MAIN_DEFECT") == null ? "" : map.get("V_MAIN_DEFECT").toString());

                row.createCell((short) 13).setCellValue(map.get("V_EXPECT_AGE") == null ? "" : map.get("V_EXPECT_AGE").toString());

                row.createCell((short) 14).setCellValue(map.get("V_REPAIR_PER") == null ? "" : map.get("V_REPAIR_PER").toString());

                row.createCell((short) 15).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());

                row.createCell((short) 16).setCellValue(map.get("V_FLOWNAME") == null ? "" : map.get("V_FLOWNAME").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("周检修计划excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*年计划生产部审批导出EXCEL*/
    @RequestMapping(value = "/YSCBSP_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void YSCBSP_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_ZY") String V_V_ZY,
                             @RequestParam(value = "V_V_WXLX") String V_V_WXLX,
                             @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_YEAR_VIEW(V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE, V_V_ZY, V_V_WXLX, V_V_CONTENT, V_V_PAGE, V_V_PAGESIZE);

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
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划工时(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATUSNAME") == null ? "" : map.get("V_STATUSNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 4).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 5).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 8).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("年检修计划excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*季度检修计划查询导出EXCEL*/
    @RequestMapping(value = "/JDJXJH_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void JDJXJH_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                             @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                             @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
                             @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        V_V_REPAIRMAJOR_CODE = new String(V_V_REPAIRMAJOR_CODE.getBytes("iso-8859-1"), "utf-8");

        List list = new ArrayList();

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_QUARTER_VIEW1(V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_FLOWCODE, V_V_CONTENT);

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
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划工时(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATUSNAME") == null ? "" : map.get("V_STATUSNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 4).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 5).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 8).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("年检修计划excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*季度检修计划查询导出EXCEL*/
    @RequestMapping(value = "/JDSDGL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void JDSDGL_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                             @RequestParam(value = "V_V_QUARTER") String V_V_QUARTER,
                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_03Service.PRO_PM_PLAN_LOCKING_Q_VIEW(V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_CONTENT);

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
        cell.setCellValue("超时步骤");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("上报时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("计划单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("计划工时(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("施工单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("检举负责人");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATE_LOCK") == null ? "" : map.get("V_STATE_LOCK").toString());

                row.createCell((short) 2).setCellValue(map.get("D_DATE_LOCK") == null ? "" : map.get("D_DATE_LOCK").toString());

                row.createCell((short) 3).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 6).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 9).setCellValue(map.get("V_REPAIRDEPT_NAME") == null ? "" : map.get("V_REPAIRDEPT_NAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_MANNAME") == null ? "" : map.get("V_MANNAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("季度检修计划锁定管理excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*备件跟踪使用明细表查询导出EXCEL*/
    @RequestMapping(value = "/BJGZSYMX_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void JDSDGL_EXCEL(@RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                             @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                             @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                             @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                             @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
                             @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN7132_ORDERMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE, V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE, V_V_MATERIALNAME);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
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
        cell.setCellValue("实际领用数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("已更换数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("未更换数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("工单结束日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("工单描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("所属设备");
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

                row.createCell((short) 4).setCellValue(map.get("ORDERAMOUNT") == null ? "" : map.get("ORDERAMOUNT").toString());

                row.createCell((short) 5).setCellValue(map.get("ORDERACTU") == null ? "" : map.get("ORDERACTU").toString());

                row.createCell((short) 6).setCellValue(map.get("I_ACTUALAMOUNT") == null ? "" : map.get("I_ACTUALAMOUNT").toString());

                row.createCell((short) 7).setCellValue(map.get("D_FACT_FINISH_DATE") == null ? "" : map.get("D_FACT_FINISH_DATE").toString());

                row.createCell((short) 8).setCellValue(map.get("V_SHORT_TXT") == null ? "" : map.get("V_SHORT_TXT").toString());

                row.createCell((short) 9).setCellValue(map.get("V_EQUIP_NAME") == null ? "" : map.get("V_EQUIP_NAME").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("备件跟踪使用明细表.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*备件跟踪部门情况统计查询导出EXCEL*/
    @RequestMapping(value = "/BJGZBMTJ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void BJGZBMTJ_EXCEL(@RequestParam(value = "V_D_FACT_START_DATE") String V_D_FACT_START_DATE,
                               @RequestParam(value = "V_D_FACT_FINISH_DATE") String V_D_FACT_FINISH_DATE,
                               @RequestParam(value = "V_V_PLANT") String V_V_PLANT,
                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                               @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                               @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                               @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
                               @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
                               HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_NO7132_DEPARTMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE, V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE, V_V_MATERIALNAME);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("部门名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("实际使用备件数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("已更换备件数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("未更换数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("备件更换执行率");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 1).setCellValue(map.get("ORDERAMOUNT") == null ? "" : map.get("ORDERAMOUNT").toString());

                row.createCell((short) 2).setCellValue(map.get("ORDERACTU") == null ? "" : map.get("ORDERACTU").toString());

                row.createCell((short) 3).setCellValue(map.get("I_ACTUALAMOUNT") == null ? "" : map.get("I_ACTUALAMOUNT").toString());

                row.createCell((short) 4).setCellValue(map.get("EXECUTERATE") == null ? "" : map.get("EXECUTERATE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("备件跟踪部门情况统计.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*报警信息处理查询导出EXCEL*/
    @RequestMapping(value = "/BJXXCL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void BJXXCL_EXCEL(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                             @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                             @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                             @RequestParam(value = "V_V_USERID") String V_V_USERID,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN7115_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID, V_V_USERID);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
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
        cell.setCellValue("备件安装位置");
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
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("报警信息处理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*在库备件监控查询导出EXCEL*/
    @RequestMapping(value = "/ZKBJJK_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void ZKBJJK_EXCEL(@RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                             @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                             @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN7127_SELECTKC(V_PLANTCODE, V_DEPARTCODE, V_EQU_ID);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
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
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("在库备件监控.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*在库备件监控查询导出EXCEL*/
    @RequestMapping(value = "/HXBJCL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void HXBJCL_EXCEL(@RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
                             @RequestParam(value = "D_END_DATE") String D_END_DATE,
                             @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                             @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                             @RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                             @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                             @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                             @RequestParam(value = "V_STATUS") String V_STATUS,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN7128_JUNKMATLIST(D_BEGIN_DATE, D_END_DATE, V_PLANTCODE, V_DEPARTCODE, V_EQU_ID, V_MATERIALCODE, V_MATERIALNAME, V_STATUS);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
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
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("换下备件处理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*设备作业量台账查询导出EXCEL*/
    @RequestMapping(value = "/SBZYLTZ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void SBZYLTZ_EXCEL(@RequestParam(value = "A_EQUID") String A_EQUID,
                              @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                              @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                              @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                              HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN_YEILD_SELECT(A_EQUID, A_BEGINDATE, A_ENDDATE, A_CYCLE_ID);

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
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("设备作业量台账.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*设备运行台账查询导出EXCEL*/
    @RequestMapping(value = "/SBYXTZ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void SBYXTZ_EXCEL(@RequestParam(value = "A_EQUID") String A_EQUID,
                             @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN_EQU_BJ_ALERT_ALL(A_EQUID, A_CYCLE_ID);

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
        cell.setCellValue("备件安装位置");
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
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("设备运行台账.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*设备运行台账查询导出EXCEL*/
    @RequestMapping(value = "/SBBJLSGHTZ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void SBBJLSGHTZ_EXCEL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                 @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                 @RequestParam(value = "A_EQUID") String A_EQUID,
                                 @RequestParam(value = "A_BJ_UNIQUE_CODE") String A_BJ_UNIQUE_CODE,
                                 @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                                 @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                                 HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN_BJ_USE_ALL(A_PLANTCODE, A_DEPARTCODE, A_EQUID, A_BJ_UNIQUE_CODE, A_BEGINDATE, A_ENDDATE);

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
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("设备备件历史更换台账.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*报警信息查询导出EXCEL*/
    @RequestMapping(value = "/BJXXCX_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void BJXXCX_EXCEL(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                             @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                             @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                             @RequestParam(value = "V_V_BEGIN_DATE") String V_V_BEGIN_DATE,
                             @RequestParam(value = "V_V_END_DATE") String V_V_END_DATE,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN7116_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID, V_V_BEGIN_DATE, V_V_END_DATE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("备件安装位置");
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

        cell = row.createCell((short) 8);
        cell.setCellValue("处理人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("处理结果");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("处理时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(map.get("STATUS_VALUE") == null ? "" : map.get("STATUS_VALUE").toString());

                row.createCell((short) 1).setCellValue(map.get("EQU_DESC") == null ? "" : map.get("EQU_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 3).setCellValue(map.get("BJ_UNIQUECODE") == null ? "" : map.get("BJ_UNIQUECODE").toString());

                row.createCell((short) 4).setCellValue(map.get("BJ_DESC") == null ? "" : map.get("BJ_DESC").toString());

                row.createCell((short) 5).setCellValue(map.get("ALERT_CONTEXT") == null ? "" : map.get("ALERT_CONTEXT").toString());

                row.createCell((short) 6).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());

                row.createCell((short) 7).setCellValue(map.get("USERNAME") == null ? "" : map.get("USERNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("HANDLE_USERNAME") == null ? "" : map.get("HANDLE_USERNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("HANDLE_CONTEXT") == null ? "" : map.get("HANDLE_CONTEXT").toString());

                row.createCell((short) 10).setCellValue(map.get("HANDLE_DATE") == null ? "" : map.get("HANDLE_DATE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("报警信息查询.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*备件运行统计查询导出EXCEL*/
    @RequestMapping(value = "/BJYXTJ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void BJYXTJ_EXCEL(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                             @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                             @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN7117_BJWORKLIST(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID);

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
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("备件运行统计.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*备件位置台帐查询导出EXCEL*/
    @RequestMapping(value = "/BJWZTZ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void BJWZTZ_EXCEL(@RequestParam(value = "IN_EQUID") String IN_EQUID,
                             @RequestParam(value = "IN_PLANT") String IN_PLANT,
                             @RequestParam(value = "IN_DEPART") String IN_DEPART,
                             @RequestParam(value = "IN_STATUS") String IN_STATUS,
                             @RequestParam(value = "IN_BJCODE") String IN_BJCODE,
                             @RequestParam(value = "IN_BJDESC") String IN_BJDESC,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        IN_STATUS = new String(IN_STATUS.getBytes("iso-8859-1"), "utf-8");
        List list = new ArrayList();
        Map<String, Object> data = pm_12Service.PRO_RUN_SITE_BJ_ALL(IN_EQUID, IN_PLANT, IN_DEPART, IN_STATUS, IN_BJCODE, IN_BJDESC);

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
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("备件位置台帐.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*备件寿命统计查询导出EXCEL*/
    @RequestMapping(value = "/BJSMTJ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void BJSMTJ_EXCEL(@RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                             @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                             @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                             @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                             @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
                             @RequestParam(value = "D_END_DATE") String D_END_DATE,
                             @RequestParam(value = "V_CYCLE_ID") String V_CYCLE_ID,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        Map<String, Object> data = pm_12Service.PRO_RUN7130_SELECTBJTIME(V_PLANTCODE, V_DEPARTCODE, V_SUPPLY_CODE, V_MATERIALNAME, D_BEGIN_DATE, D_END_DATE, V_CYCLE_ID);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("安装工单");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("换下工单");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("安装日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("更换数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("换下日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("安装天数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("备件安装位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("设备");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("供应商");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("物资编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("物资描述");
        cell.setCellStyle(style);


        cell = row.createCell((short) 11);
        cell.setCellValue("累计作业量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("唯一码");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(map.get("ORDERID_S") == null ? "" : map.get("ORDERID_S").toString());

                row.createCell((short) 1).setCellValue(map.get("ORDERID_D") == null ? "" : map.get("ORDERID_D").toString());

                row.createCell((short) 2).setCellValue(map.get("CHANGEDATE_S") == null ? "" : map.get("CHANGEDATE_S").toString());

                row.createCell((short) 3).setCellValue(map.get("CHANGE_AMOUNT") == null ? "" : map.get("CHANGE_AMOUNT").toString());

                row.createCell((short) 4).setCellValue(map.get("CHANGEDATE_D") == null ? "" : map.get("CHANGEDATE_D").toString());

                row.createCell((short) 5).setCellValue(map.get("S_DAY") == null ? "" : map.get("S_DAY").toString());

                row.createCell((short) 6).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 7).setCellValue(map.get("EQU_DESC") == null ? "" : map.get("EQU_DESC").toString());

                row.createCell((short) 8).setCellValue(map.get("SUPPLY_NAME") == null ? "" : map.get("SUPPLY_NAME").toString());

                row.createCell((short) 9).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 10).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("WORK_TIEM") == null ? "" : map.get("WORK_TIEM").toString());

                row.createCell((short) 12).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

                row.createCell((short) 13).setCellValue(map.get("BJ_UNIQUE_CODE") == null ? "" : map.get("BJ_UNIQUE_CODE").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("备件寿命统计.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*月检修计划锁定管理导出EXCEL*/
    @RequestMapping(value = "/MSDGL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void MSDGL_EXCEL(@RequestParam(value = "V_I_YEAR") String V_I_YEAR,
                            @RequestParam(value = "V_I_MONTH") String V_I_MONTH,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_03Service.PRO_PM_PLAN_LOCKING_M_VIEW(V_I_YEAR, V_I_MONTH, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_CONTENT);

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
        cell.setCellValue("超时步骤");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("上报时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("计划单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划开工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划竣工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("计划工时(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("施工单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("检举负责人");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATE_LOCK") == null ? "" : map.get("V_STATE_LOCK").toString());

                row.createCell((short) 2).setCellValue(map.get("D_DATE_LOCK") == null ? "" : map.get("D_DATE_LOCK").toString());

                row.createCell((short) 3).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 6).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 9).setCellValue(map.get("V_REPAIRDEPT_NAME") == null ? "" : map.get("V_REPAIRDEPT_NAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_REPAIR_PERNAME") == null ? "" : map.get("V_REPAIR_PERNAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("月检修计划锁定管理excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*周检修计划锁定管理导出EXCEL*/
    @RequestMapping(value = "/WSDGL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void WSDGL_EXCEL(@RequestParam(value = "V_I_YEAR") String V_I_YEAR,
                            @RequestParam(value = "V_I_MONTH") String V_I_MONTH,
                            @RequestParam(value = "V_I_WEEKNUM") String V_I_WEEKNUM,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_03Service.PRO_PM_PLAN_LOCKING_W_VIEW(V_I_YEAR, V_I_MONTH, V_I_WEEKNUM, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_CONTENT);

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
        cell.setCellValue("超时步骤");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("上报时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("计划单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划开工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划竣工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("计划工时(小时)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("施工单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("检举负责人");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATE_LOCK") == null ? "" : map.get("V_STATE_LOCK").toString());

                row.createCell((short) 2).setCellValue(map.get("D_DATE_LOCK") == null ? "" : map.get("D_DATE_LOCK").toString());

                row.createCell((short) 3).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 6).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 9).setCellValue(map.get("V_REPAIRDEPT_NAME") == null ? "" : map.get("V_REPAIRDEPT_NAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_MANNAME") == null ? "" : map.get("V_MANNAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("周检修计划锁定管理excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*润滑查询导出EXCEL*/
    @RequestMapping(value = "/RHQuery_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void RHQuery_EXCEL(@RequestParam(value = "X_TIMELOWERLIMIT") Date X_TIMELOWERLIMIT,
                              @RequestParam(value = "X_TIMEUPPERLIMIT") Date X_TIMEUPPERLIMIT,
                              @RequestParam(value = "X_DEPTCODE") String X_DEPTCODE,
                              @RequestParam(value = "X_EQUTYPECODE") String X_EQUTYPECODE,
                              @RequestParam(value = "X_EQUCODE") String X_EQUCODE,
                              @RequestParam(value = "X_LUBRICATIONCODE") String X_LUBRICATIONCODE,
//update2018-10-11
                              @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                              @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                              HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        String X_DEPTCODE_s = X_DEPTCODE.equals("0") ? "%" : X_DEPTCODE;
        String X_EQUTYPECODE_s = X_EQUTYPECODE.equals("0") ? "%" : X_EQUTYPECODE;
        String X_EQUCODE_s = X_EQUCODE.equals("0") ? "%" : X_EQUCODE;


        Map<String, Object> data = zpfService.PRO_QUERYLUBRECORD(X_TIMELOWERLIMIT, X_TIMEUPPERLIMIT, X_DEPTCODE_s, X_EQUTYPECODE_s, X_EQUCODE_s, X_LUBRICATIONCODE, V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTTYPE);

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
        cell.setCellValue("部门名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("装置名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("给油脂场所");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("润滑方式");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("润滑牌号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("润滑点数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("加油量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("加油时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("加油人员");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("加油原因");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_SETNAME") == null ? "" : map.get("V_SETNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_LUBADDRESS") == null ? "" : map.get("V_LUBADDRESS").toString());

                row.createCell((short) 5).setCellValue(map.get("V_LUBMODE") == null ? "" : map.get("V_LUBMODE").toString());

                row.createCell((short) 6).setCellValue(map.get("V_LUBTRADEMARK") == null ? "" : map.get("V_LUBTRADEMARK").toString());

                row.createCell((short) 7).setCellValue(map.get("F_LUBCOUNT") == null ? "" : map.get("F_LUBCOUNT").toString());

                row.createCell((short) 8).setCellValue(map.get("F_OILAMOUNT") == null ? "" : map.get("F_OILAMOUNT").toString());

                row.createCell((short) 9).setCellValue(map.get("I_UNIT") == null ? "" : map.get("I_UNIT").toString());

                row.createCell((short) 10).setCellValue(map.get("D_OPERATEDATE") == null ? "" : map.get("D_OPERATEDATE").toString());

                row.createCell((short) 11).setCellValue(map.get("V_OPERATEPERSON") == null ? "" : map.get("V_OPERATEPERSON").toString());

                row.createCell((short) 12).setCellValue(map.get("V_OPERATEREASON") == null ? "" : map.get("V_OPERATEREASON").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("润滑查询excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    /*月计划查询导出EXCEL*/
    @RequestMapping(value = "/YJHCX_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void YJHCX_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                            @RequestParam(value = "V_V_ZY") String V_V_ZY,
                            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                            @RequestParam(value = "V_V_PEROCDE") String V_V_PEROCDE,
//                            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
//                            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        String V_V_ORGCODE2 = V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE;
        String V_V_STATECODE2 = V_V_STATECODE.equals("0") ? "%" : V_V_STATECODE;
        String V_V_DEPTCODE2 = V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE;
        String V_V_EQUTYPE2 = V_V_EQUTYPE.equals("0") ? "%" : V_V_EQUTYPE;
        String V_V_EQUCODE2 = V_V_EQUCODE.equals("0") ? "%" : V_V_EQUCODE;
        String V_V_ZY2 = V_V_ZY.equals("0") ? "%" : V_V_ZY;


        Map<String, Object> data = pm_03Service.PM_03_MONTH_PLAN_SELALL(V_V_YEAR, V_V_MONTH, V_V_ORGCODE2, V_V_DEPTCODE2, V_V_EQUTYPE2, V_V_EQUCODE2, V_V_ZY2, V_V_CONTENT, V_V_STATECODE2, V_V_PEROCDE);

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
        cell.setCellValue("计划状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("检修内容");
        cell.setCellStyle(style);


        cell = row.createCell((short) 7);
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("计划工期（小时）");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("主要缺陷");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("预计寿命");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("维修人数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 14);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 5).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 7).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 10).setCellValue(map.get("V_INPERNAME") == null ? "" : map.get("V_INPERNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_MAIN_DEFECT") == null ? "" : map.get("V_MAIN_DEFECT").toString());

                row.createCell((short) 12).setCellValue(map.get("V_EXPECT_AGE") == null ? "" : map.get("V_EXPECT_AGE").toString());

                row.createCell((short) 13).setCellValue(map.get("V_REPAIR_PER") == null ? "" : map.get("V_REPAIR_PER").toString());

                row.createCell((short) 14).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("月检修计划excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_PROJECT_VIEW2", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void YJHCX_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_ZY") String V_V_ZY,
                            @RequestParam(value = "V_V_WXLX") String V_V_WXLX,
                            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        String V_V_FLAG2 = V_V_FLAG.equals("0") ? "%" : V_V_FLAG;

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_PROJECT_VIEW2(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_ZY, V_V_WXLX, V_V_CONTENT, V_V_FLAG2);

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
        cell.setCellValue("年份");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("月份");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("工程状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("工程编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("工程名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("维修类型");
        cell.setCellStyle(style);


        cell = row.createCell((short) 7);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("维修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("维修费用");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("开工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("竣工时间");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_YEAR") == null ? "" : map.get("V_YEAR").toString());

                row.createCell((short) 2).setCellValue(map.get("V_MONTH") == null ? "" : map.get("V_MONTH").toString());

                row.createCell((short) 3).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_PORJECT_CODE") == null ? "" : map.get("V_PORJECT_CODE").toString());

                row.createCell((short) 5).setCellValue(map.get("V_PORJECT_NAME") == null ? "" : map.get("V_PORJECT_NAME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_WXTYPENAME") == null ? "" : map.get("V_WXTYPENAME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_SPECIALTYNAME") == null ? "" : map.get("V_SPECIALTYNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 9).setCellValue(map.get("V_MONEYBUDGET") == null ? "" : map.get("V_MONEYBUDGET").toString());

                row.createCell((short) 10).setCellValue(map.get("V_BDATE") == null ? "" : map.get("V_BDATE").toString());

                row.createCell((short) 11).setCellValue(map.get("V_EDATE") == null ? "" : map.get("V_EDATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("月检修计划excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*周计划管理-导出EXCEL*/
    @RequestMapping(value = "/ZJHGL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void ZJHGL_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                            @RequestParam(value = "V_V_ZY") String V_V_ZY,
                            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                            @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                            @RequestParam(value = "V_V_STATE") String V_V_STATE,
                            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        String V_V_ORGCODE2 = V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE;
        String V_V_DEPTCODE2 = V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE;
        String V_V_ZY2 = V_V_ZY.equals("0") ? "%" : V_V_ZY;
        String V_V_EQUTYPE2 = V_V_EQUTYPE.equals("0") ? "%" : V_V_EQUTYPE;
        String V_V_EQUCODE2 = V_V_EQUCODE.equals("0") ? "%" : V_V_EQUCODE;

        Map<String, Object> data = lxmService.PM_03_PLAN_WEEK_SELALL(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE2, V_V_DEPTCODE2,
                V_V_ZY2, V_V_EQUTYPE2, V_V_EQUCODE2, V_V_CONTENT, V_V_FLOWTYPE, V_V_STATE);


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
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划工期（小时）");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入时间");
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

                row.createCell((short) 5).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 8).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_INPERNAME") == null ? "" : map.get("V_INPERNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("周计划.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*周计划管理-导出EXCEL*/
    @RequestMapping(value = "/ZJHSBBGL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void ZJHSBBGL_EXCEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                               @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                               @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
                               @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                               @RequestParam(value = "V_V_ZY") String V_V_ZY,
                               @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                               @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                               @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                               @RequestParam(value = "V_V_STATE") String V_V_STATE,
                               HttpServletResponse response) throws SQLException {

        List list = new ArrayList();

        String V_V_ORGCODE2 = V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE;
        String V_V_DEPTCODE2 = V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE;
        String V_V_ZY2 = V_V_ZY.equals("0") ? "%" : V_V_ZY;
        String V_V_EQUTYPE2 = V_V_EQUTYPE.equals("0") ? "%" : V_V_EQUTYPE;
        String V_V_EQUCODE2 = V_V_EQUCODE.equals("0") ? "%" : V_V_EQUCODE;

        Map<String, Object> data = lxmService.PM_03_PLAN_WEEK_SEL2_ALL(V_V_YEAR, V_V_MONTH, V_V_WEEK, V_V_ORGCODE2, V_V_DEPTCODE2,
                V_V_ZY2, V_V_EQUTYPE2, V_V_EQUCODE2, V_V_CONTENT, V_V_FLOWTYPE, V_V_STATE);


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
        cell.setCellValue("计划停机日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划工期（小时）");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("车间名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("SBBGUID");
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

                row.createCell((short) 5).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 8).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_INPERNAME") == null ? "" : map.get("V_INPERNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());

                row.createCell((short) 12).setCellValue(map.get("V_SBB_GUID") == null ? "" : map.get("V_SBB_GUID").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("周计划.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    //设备部周计划导入excel
//    @RequestMapping(value = "/sbbImporteWeekExcel", method = RequestMethod.POST)
//    @ResponseBody
////    public  ResponseEntity<String> sbbImporteWeekExcel(
//    public String sbbImporteWeekExcel(
//            @RequestParam(value = "V_LOCKPER") String V_LOCKPER,
//            @RequestParam(value = "V_LOCKPERNAME") String V_LOCKPERNAME,
//            @RequestParam(value = "upload") MultipartFile upload,
//            HttpServletRequest request,
//            HttpServletResponse response) throws Exception {
//        String errMsg="";
//        List list = new ArrayList();
//        int snum=0;
//        int fnum=0;
//        HttpHeaders headers = new HttpHeaders();
//        String[] tableHeader = new String[] { "序号","计划状态", "设备名称", "专业",
//                "检修内容", "计划停机日期", "计划竣工日期", "计划工期（小时）", "厂矿", "车间名称","录入人",
//                "录入时间", "SBBGUID"};
//
//        MediaType mt = new MediaType("text", "html", Charset.forName("UTF-8"));
//        headers.setContentType(mt);
//        String json = "";
//        try{
//            Workbook hssfBook = null;
//            InputStream is =upload.getInputStream();//获取excel数据
//            if (upload.getOriginalFilename().contains(".xlsx")) {
//                hssfBook = new XSSFWorkbook(is); // excel2007
//            } else {
//                hssfBook = new HSSFWorkbook(is); // excel2003
//            }
//            Sheet sheet=hssfBook.getSheetAt(0);//或 表头数据
//            int rowNum=sheet.getLastRowNum();
//            if(rowNum==0){
//                errMsg="您上传的excel没有数据！";
//                return errMsg;
//            }
//            Row row=sheet.getRow(0);
//            int colNum=0;
//            colNum=row.getLastCellNum();
//            //验证表头格式
//            for(int i=0;i<tableHeader.length;i++){
//                row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
//                if(!tableHeader[i].trim().equals(row.getCell(i).getStringCellValue().trim())){
//                    errMsg = row.getCell(i).getStringCellValue().trim()+"--"+tableHeader[i].trim()+"--"+"模板列头不正确！,请重新导出后修改";
//                }
//                else{
//                    for(int j=0;j<=rowNum;j+=1){
//                        String V_V_SBBGUID=sheet.getRow(j+1).getCell(12).getStringCellValue().trim();
//                        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//                        String V_V_STARTTIME=sheet.getRow(j+1).getCell(5).getDateCellValue().toString();
//                        String V_V_ENDTIME=sheet.getRow(j+1).getCell(6).getDateCellValue().toString();
//                        sheet.getRow(j+1).getCell(7).setCellType(Cell.CELL_TYPE_STRING);
//                        String V_V_HOUR=sheet.getRow(j+1).getCell(7).getStringCellValue().trim();
//                        Map resutlt=dx_fileService.PRO_PM_03_PLAN_WEEK_IMPORT(V_V_SBBGUID, V_V_STARTTIME, V_V_ENDTIME,V_V_HOUR,V_LOCKPER,V_LOCKPERNAME);
//                        if (resutlt.size() > 0) {
//                            list = (List) resutlt.get("RET");
//                            Map map = (Map) list.get(0);
//                            if(map.get("RET").toString().equals("SUCCESS")){
//                                snum++;
//                            }
//                        }
//                        else{fnum++; }
//
//                    }
//                    if(rowNum==snum){
//                        errMsg = "导入成功！" ;
//                    }
//                }
//            }
//        }catch(Exception e){
//            errMsg = e.getMessage() ;
//            e.printStackTrace();
//        }
//        return errMsg;
//    }

//        Map result = pm_03Service.PM_03_PLAN_PROJECT_FILE_SET(V_V_GUID, filename, filetype, upload.getInputStream(), V_V_INPERCODE,
//                V_V_INPERNAME, V_V_TYPE);
//        result.put("success",true);
//        return result;

    @RequestMapping(value = "/FXGL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void FXGL_EXCEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                           @RequestParam(value = "V_V_ZY") String V_V_ZY,
                           @RequestParam(value = "V_SDATE") String V_SDATE,
                           @RequestParam(value = "V_EDATE") String V_EDATE,
                           @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                           @RequestParam(value = "V_V_DEFECT") String V_V_DEFECT,
                           @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                           HttpServletResponse response)
            throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        String zy = zy = V_V_ZY.equals("1") ? "%" : V_V_ZY;

        V_V_DEFECT = new String(V_V_DEFECT.getBytes("iso-8859-1"), "utf-8");

        Map<String, Object> data = dx_fileService.PM_03_PLAN_YEAR_FX_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_PERCODE, zy,
                V_SDATE, V_EDATE, V_V_SPECIALTY, V_V_DEFECT, V_V_FLAG);

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
        cell.setCellValue("是否关联放行计划");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("项目唯一值");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("项目编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("项目名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("缺陷内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("计划开工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划竣工日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("工程总预算(万元)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("检修单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("申请厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("申请作业区");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("FX_GUID").equals("") ? "否" : "是");// map.get("FX_GUID").toString());

                row.createCell((short) 2).setCellValue(map.get("V_GUID") == null ? "" : map.get("V_GUID").toString());
                row.createCell((short) 3).setCellValue(map.get("V_PORJECT_CODE") == null ? "" : map.get("V_PORJECT_CODE").toString());
                row.createCell((short) 4).setCellValue(map.get("V_PORJECT_NAME") == null ? "" : map.get("V_PORJECT_NAME").toString());
                row.createCell((short) 5).setCellValue(map.get("QXCONTEXT") == null ? "" : map.get("QXCONTEXT").toString());
                row.createCell((short) 6).setCellValue(map.get("V_BDATE") == null ? "" : map.get("V_BDATE").toString());
                row.createCell((short) 7).setCellValue(map.get("V_EDATE") == null ? "" : map.get("V_EDATE").toString());
                row.createCell((short) 8).setCellValue(map.get("V_SPECIALTYNAME") == null ? "" : map.get("V_SPECIALTYNAME").toString());
                row.createCell((short) 9).setCellValue(map.get("V_MONEYBUDGET") == null ? "" : map.get("V_MONEYBUDGET").toString());
                row.createCell((short) 10).setCellValue(map.get("V_REPAIR_DEPTNAME") == null ? "" : map.get("V_REPAIR_DEPTNAME").toString());
                row.createCell((short) 11).setCellValue(map.get("V_INMAN") == null ? "" : map.get("V_INMAN").toString());
                row.createCell((short) 12).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                row.createCell((short) 13).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("放行计划Excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    // 工单打印pdf
    @RequestMapping(value = "/WORKDY_ExpExcel", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void WORKDY_ExpExcel(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                HttpServletRequest request,
                                HttpServletResponse response)
            throws DocumentException, IOException, Exception, SQLException {
        String V_V_ORGCODE = "";
        String V_WORK_TYPE = "";
        String V_DEPT_CODE = "";

        /*工单基本信息-data*/
        List<Map<String, Object>> workresult = (List) cjyService.PRO_PM_WORKORDER_GET(V_V_ORDERGUID).get("list");
        if (workresult.size() > 0) {
            V_V_ORGCODE = workresult.get(0).get("V_ORGCODE").toString().equals("") ? "" : workresult.get(0).get("V_ORGCODE").toString(); //厂矿
            V_WORK_TYPE = workresult.get(0).get("V_ORDER_TYP_TXT").toString().equals("") ? "" : workresult.get(0).get("V_ORDER_TYP_TXT").toString(); //工单类型
            V_DEPT_CODE = workresult.get(0).get("V_DEPTCODE").toString().equals("") ? "" : workresult.get(0).get("V_DEPTCODE").toString(); //作业区
        }

        /*工序data*/
        List<Map<String, Object>> workgxresult = (List) zdhService.PRO_PM_WORKORDER_ET_OPERATIONS(V_V_ORDERGUID).get("list");

        /*物料data*/
        List<Map<String, Object>> mmresult = (List) zdhService.PRO_PM_WORKORDER_SPARE_VIEW(V_V_ORDERGUID).get("list");

        int rowWF = 10 + workgxresult.size();
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
//        标头字体
        HSSFFont fontHead = wb.createFont();
        fontHead.setColor(HSSFColor.BLACK.index);
        fontHead.setFontHeightInPoints((short) 12);
        fontHead.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//加粗
        //标题字体
        HSSFFont fontT = wb.createFont();
        fontT.setColor(HSSFColor.BLACK.index);
        fontT.setFontHeightInPoints((short) 10);
        fontT.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//加粗

        //正文一个字体
        HSSFFont font = wb.createFont();
        font.setColor(HSSFColor.BLACK.index);
        font.setFontHeightInPoints((short) 10);
//        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//加粗

        HSSFCellStyle styleHead = wb.createCellStyle();
        styleHead.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleHead.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
        styleHead.setBorderTop(HSSFCellStyle.BORDER_THIN);
        styleHead.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        styleHead.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        styleHead.setBorderRight(HSSFCellStyle.BORDER_THIN);
        styleHead.setTopBorderColor(HSSFColor.BLACK.index);
        styleHead.setLeftBorderColor(HSSFColor.BLACK.index);
        styleHead.setBottomBorderColor(HSSFColor.BLACK.index);
        styleHead.setRightBorderColor(HSSFColor.BLACK.index);
        styleHead.setFont(fontHead);

        HSSFCellStyle styleTitle = wb.createCellStyle();
        styleTitle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleTitle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
        styleTitle.setBorderTop(HSSFCellStyle.BORDER_THIN);
        styleTitle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        styleTitle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        styleTitle.setBorderRight(HSSFCellStyle.BORDER_THIN);
        styleTitle.setTopBorderColor(HSSFColor.BLACK.index);
        styleTitle.setLeftBorderColor(HSSFColor.BLACK.index);
        styleTitle.setBottomBorderColor(HSSFColor.BLACK.index);
        styleTitle.setRightBorderColor(HSSFColor.BLACK.index);
        styleTitle.setFont(fontT);

        HSSFCellStyle styleOne = wb.createCellStyle();
        styleOne.setWrapText(true);
        styleOne.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleOne.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
        styleOne.setBorderTop(HSSFCellStyle.BORDER_THIN);
        styleOne.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        styleOne.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        styleOne.setBorderRight(HSSFCellStyle.BORDER_THIN);
        styleOne.setTopBorderColor(HSSFColor.BLACK.index);
        styleOne.setLeftBorderColor(HSSFColor.BLACK.index);
        styleOne.setBottomBorderColor(HSSFColor.BLACK.index);
        styleOne.setRightBorderColor(HSSFColor.BLACK.index);
        styleOne.setFont(font);

        HSSFCellStyle styleTwo = wb.createCellStyle();
        styleTwo.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleTwo.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
        styleTwo.setFillForegroundColor(HSSFColor.CORNFLOWER_BLUE.index);  /* 背景色*/
        styleTwo.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        styleTwo.setFillBackgroundColor(HSSFColor.CORNFLOWER_BLUE.index);
        styleTwo.setBorderTop(HSSFCellStyle.BORDER_THIN);
        styleTwo.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        styleTwo.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        styleTwo.setBorderRight(HSSFCellStyle.BORDER_THIN);
        styleTwo.setTopBorderColor(HSSFColor.BLACK.index);
        styleTwo.setLeftBorderColor(HSSFColor.BLACK.index);
        styleTwo.setBottomBorderColor(HSSFColor.BLACK.index);
        styleTwo.setRightBorderColor(HSSFColor.BLACK.index);
        styleTwo.setFont(fontT);


        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 10)); //row 1
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 4));//row 2
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 5, 10)); //row 2
        sheet.addMergedRegion(new CellRangeAddress(2, 2, 3, 4)); //row 3
        sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, 10)); //row 3
        sheet.addMergedRegion(new CellRangeAddress(3, 3, 3, 4)); //row 4
        sheet.addMergedRegion(new CellRangeAddress(3, 3, 6, 10)); //row 4
        sheet.addMergedRegion(new CellRangeAddress(4, 4, 3, 4)); //row 5
        sheet.addMergedRegion(new CellRangeAddress(4, 4, 6, 7)); //row 5
        sheet.addMergedRegion(new CellRangeAddress(4, 4, 9, 10)); //row 5
        sheet.addMergedRegion(new CellRangeAddress(5, 5, 1, 4)); //row 6
        sheet.addMergedRegion(new CellRangeAddress(5, 5, 6, 7)); //row 6
        sheet.addMergedRegion(new CellRangeAddress(5, 5, 9, 10)); //row 6
        sheet.addMergedRegion(new CellRangeAddress(6, 6, 6, 7)); //row 7
        sheet.addMergedRegion(new CellRangeAddress(6, 6, 9, 10)); //row 7
        sheet.addMergedRegion(new CellRangeAddress(6, 6, 1, 4)); //row 7
        sheet.addMergedRegion(new CellRangeAddress(7, 7, 1, 10)); //row 8

        sheet.addMergedRegion(new CellRangeAddress(8, 8, 0, 10)); //row 9

        sheet.addMergedRegion(new CellRangeAddress(rowWF, rowWF, 0, 10));//row物料标题行


        //第一行
        HSSFRow rowOne = sheet.createRow((int) 0);
        sheet.setColumnWidth(0, 12 * 256);
        sheet.setColumnWidth(1, 12 * 256);
        sheet.setColumnWidth(2, 12 * 256);
        sheet.setColumnWidth(3, 10 * 256);
        sheet.setColumnWidth(4, 10 * 256);
        sheet.setColumnWidth(5, 15 * 256);
        sheet.setColumnWidth(6, 10 * 256);
        sheet.setColumnWidth(7, 10 * 256);
        sheet.setColumnWidth(8, 15 * 256);
        sheet.setColumnWidth(9, 10 * 256);
        sheet.setColumnWidth(10, 10 * 256);

        //第一列
        HSSFCell cella = rowOne.createCell((short) 0);
        cella.setCellValue("工单打印");
        cella.setCellStyle(styleHead);
        CellRangeAddress cra1 = new CellRangeAddress(0, 0, 0, 10);
        sheet.addMergedRegion(cra1);
        RegionUtil.setBorderBottom(1, cra1, sheet, wb);
//        RegionUtil.setBorderLeft(1, cra, sheet); // 左边框
        RegionUtil.setBorderRight(1, cra1, sheet, wb); // 有边框
        RegionUtil.setBorderTop(1, cra1, sheet, wb); // 上边框

        //第2行
        HSSFRow rowTwo = sheet.createRow((int) 1);
        //1列
        HSSFCell cellb = rowTwo.createCell((short) 0);
        cellb.setCellValue("1、基本信息栏");
        cellb.setCellStyle(styleTitle);

        //2列
        cellb = rowTwo.createCell((short) 5);
        cellb.setCellValue("2、任务信息栏");
        cellb.setCellStyle(styleTitle);

        CellRangeAddress cra2 = new CellRangeAddress(1, 1, 0, 4);
        sheet.addMergedRegion(cra2);
        RegionUtil.setBorderBottom(1, cra2, sheet, wb);
        RegionUtil.setBorderRight(1, cra2, sheet, wb);
        RegionUtil.setBorderTop(1, cra2, sheet, wb);
        CellRangeAddress cra3 = new CellRangeAddress(1, 1, 5, 10);
        sheet.addMergedRegion(cra3);
        RegionUtil.setBorderBottom(1, cra3, sheet, wb);
        RegionUtil.setBorderRight(1, cra3, sheet, wb);
        RegionUtil.setBorderTop(1, cra3, sheet, wb);

        //第3行
        HSSFRow rowThree = sheet.createRow(2);
        //1列
        HSSFCell cellc = rowThree.createCell((short) 0);
        cellc.setCellValue("厂矿单位：");
        cellc.setCellStyle(styleTwo);

        cellc = rowThree.createCell((short) 1);
        cellc.setCellValue(V_V_ORGCODE);
        cellc.setCellStyle(styleOne);

        cellc = rowThree.createCell((short) 2);
        cellc.setCellValue("工单类型：");
        cellc.setCellStyle(styleTwo);

        cellc = rowThree.createCell((short) 3);
        cellc.setCellValue(V_WORK_TYPE);
        cellc.setCellStyle(styleOne);
        cellc = rowThree.createCell((short) 4);
        cellc.setCellStyle(styleOne);
        cellc = rowThree.createCell((short) 5);
        cellc.setCellValue("WBS编码：");
        cellc.setCellStyle(styleTwo);

        cellc = rowThree.createCell((short) 6);
        cellc.setCellValue(workresult.get(0).get("V_WBS").toString().equals("") ? "" : workresult.get(0).get("V_WBS").toString());
        cellc.setCellStyle(styleOne);

        CellRangeAddress cra4 = new CellRangeAddress(2, 2, 3, 4);
        sheet.addMergedRegion(cra4);
        RegionUtil.setBorderBottom(1, cra4, sheet, wb);
        RegionUtil.setBorderRight(1, cra4, sheet, wb);
        RegionUtil.setBorderTop(1, cra4, sheet, wb);
        CellRangeAddress cra5 = new CellRangeAddress(2, 2, 6, 10);
        sheet.addMergedRegion(cra5);
        RegionUtil.setBorderBottom(1, cra5, sheet, wb);
        RegionUtil.setBorderRight(1, cra5, sheet, wb);
        RegionUtil.setBorderTop(1, cra5, sheet, wb);

        //4行
        HSSFRow rowFour = sheet.createRow((int) 3);
        HSSFCell celld = rowFour.createCell((short) 0);
        celld.setCellValue("作业区：");
        celld.setCellStyle(styleTwo);

        celld = rowFour.createCell((short) 1);
        celld.setCellValue(V_DEPT_CODE);
        celld.setCellStyle(styleOne);

        celld = rowFour.createCell((short) 2);
        celld.setCellValue("工单号：");
        celld.setCellStyle(styleTwo);

        celld = rowFour.createCell((short) 3);
        celld.setCellValue(workresult.get(0).get("V_ORDERID").toString().equals("") ? "" : workresult.get(0).get("V_ORDERID").toString());
        celld.setCellStyle(styleOne);

        celld = rowFour.createCell((short) 4);
        celld.setCellValue("");
        celld.setCellStyle(styleOne);

        celld = rowFour.createCell((short) 5);
        celld.setCellValue("项目名称：");
        celld.setCellStyle(styleTwo);

        celld = rowFour.createCell((short) 6);
        celld.setCellValue(workresult.get(0).get("V_WBS_TXT").toString().equals("") ? "" : workresult.get(0).get("V_WBS_TXT").toString());
        celld.setCellStyle(styleOne);

        CellRangeAddress cra6 = new CellRangeAddress(3, 3, 3, 4);
        sheet.addMergedRegion(cra6);
        RegionUtil.setBorderBottom(1, cra6, sheet, wb);
        RegionUtil.setBorderRight(1, cra6, sheet, wb);
        RegionUtil.setBorderTop(1, cra6, sheet, wb);
        CellRangeAddress cra7 = new CellRangeAddress(3, 3, 6, 10);
        sheet.addMergedRegion(cra7);
        RegionUtil.setBorderBottom(1, cra7, sheet, wb);
        RegionUtil.setBorderRight(1, cra7, sheet, wb);
        RegionUtil.setBorderTop(1, cra7, sheet, wb);

        //5行
        HSSFRow rowFive = sheet.createRow((int) 4);
        HSSFCell celle = rowFive.createCell((short) 0);
        celle.setCellValue("设备名称：");
        celle.setCellStyle(styleTwo);

        celle = rowFive.createCell((short) 1);
        celle.setCellValue(workresult.get(0).get("V_EQUIP_NAME").toString().equals("") ? "" : workresult.get(0).get("V_EQUIP_NAME").toString());
        celle.setCellStyle(styleOne);

        celle = rowFive.createCell((short) 2);
        celle.setCellValue("检修单位：");
        celle.setCellStyle(styleTwo);

        celle = rowFive.createCell((short) 3);
        celle.setCellValue(workresult.get(0).get("V_DEPTNAMEREPARIR").toString().equals("") ? "" : workresult.get(0).get("V_DEPTNAMEREPARIR").toString());
        celle.setCellStyle(styleOne);

        celle = rowFive.createCell((short) 5);
        celle.setCellValue("创建人：");
        celle.setCellStyle(styleTwo);

        celle = rowFive.createCell((short) 6);
        celle.setCellValue(workresult.get(0).get("V_ENTERED_BY").toString().equals("") ? "" : workresult.get(0).get("V_ENTERED_BY").toString());
        celle.setCellStyle(styleOne);

        celle = rowFive.createCell((short) 8);
        celle.setCellValue("创建时间：");
        celle.setCellStyle(styleTwo);

        celle = rowFive.createCell((short) 9);
        celle.setCellValue(workresult.get(0).get("D_ENTER_DATE").toString().equals("") ? "" : workresult.get(0).get("D_ENTER_DATE").toString());
        celle.setCellStyle(styleOne);

        CellRangeAddress cra8 = new CellRangeAddress(4, 4, 3, 4);
        sheet.addMergedRegion(cra8);
        RegionUtil.setBorderBottom(1, cra8, sheet, wb);
        RegionUtil.setBorderRight(1, cra8, sheet, wb);
        RegionUtil.setBorderTop(1, cra8, sheet, wb);
        CellRangeAddress cra9 = new CellRangeAddress(4, 4, 6, 7);
        sheet.addMergedRegion(cra9);
        RegionUtil.setBorderBottom(1, cra9, sheet, wb);
        RegionUtil.setBorderRight(1, cra9, sheet, wb);
        RegionUtil.setBorderTop(1, cra9, sheet, wb);
        CellRangeAddress cra10 = new CellRangeAddress(4, 4, 9, 10);
        sheet.addMergedRegion(cra10);
        RegionUtil.setBorderBottom(1, cra10, sheet, wb);
        RegionUtil.setBorderRight(1, cra10, sheet, wb);
        RegionUtil.setBorderTop(1, cra10, sheet, wb);

        //6行
        HSSFRow rowSix = sheet.createRow((int) 5);
        HSSFCell cellf = rowSix.createCell((short) 0);
        cellf.setCellValue("设备编码：");
        cellf.setCellStyle(styleTwo);

        cellf = rowSix.createCell((short) 1);
        cellf.setCellValue(workresult.get(0).get("V_EQUIP_NO").toString().equals("") ? "" : workresult.get(0).get("V_EQUIP_NO").toString());
        cellf.setCellStyle(styleOne);

        cellf = rowSix.createCell((short) 5);
        cellf.setCellValue("计划开始时间：");
        cellf.setCellStyle(styleTwo);

        cellf = rowSix.createCell((short) 6);
        cellf.setCellValue(workresult.get(0).get("D_ENTER_DATE").toString().equals("") ? "" : workresult.get(0).get("D_ENTER_DATE").toString());
        cellf.setCellStyle(styleOne);

        cellf = rowSix.createCell((short) 8);
        cellf.setCellValue("实际开始时间：");
        cellf.setCellStyle(styleTwo);

        cellf = rowSix.createCell((short) 9);
        cellf.setCellValue(workresult.get(0).get("D_FACT_START_DATE").toString().equals("") ? "" : workresult.get(0).get("D_FACT_START_DATE").toString());
        cellf.setCellStyle(styleOne);

        CellRangeAddress cra11 = new CellRangeAddress(5, 5, 1, 4);
        sheet.addMergedRegion(cra11);
        RegionUtil.setBorderBottom(1, cra11, sheet, wb);
        RegionUtil.setBorderRight(1, cra11, sheet, wb);
        RegionUtil.setBorderTop(1, cra11, sheet, wb);
        CellRangeAddress cra12 = new CellRangeAddress(5, 5, 6, 7);
        sheet.addMergedRegion(cra12);
        RegionUtil.setBorderBottom(1, cra12, sheet, wb);
        RegionUtil.setBorderRight(1, cra12, sheet, wb);
        RegionUtil.setBorderTop(1, cra12, sheet, wb);
        CellRangeAddress cra13 = new CellRangeAddress(5, 5, 9, 10);
        sheet.addMergedRegion(cra13);
        RegionUtil.setBorderBottom(1, cra13, sheet, wb);
        RegionUtil.setBorderRight(1, cra13, sheet, wb);
        RegionUtil.setBorderTop(1, cra13, sheet, wb);


        //7行
        HSSFRow rowSeven = sheet.createRow((int) 6);
        HSSFCell cellg = rowSeven.createCell((short) 0);
        cellg.setCellValue("功能位置：");
        cellg.setCellStyle(styleTwo);

        cellg = rowFive.createCell((short) 1);
        cellg.setCellValue(workresult.get(0).get("V_EQUSITENAME").toString().equals("") ? "" : workresult.get(0).get("V_EQUSITENAME").toString());
        cellg.setCellStyle(styleOne);

        cellg = rowFive.createCell((short) 5);
        cellg.setCellValue("计划完成时间：");
        cellg.setCellStyle(styleTwo);

        cellg = rowFive.createCell((short) 6);
        cellg.setCellValue(workresult.get(0).get("D_ENTER_DATE").toString().equals("") ? "" : workresult.get(0).get("D_ENTER_DATE").toString());
        cellg.setCellStyle(styleOne);

        cellg = rowFive.createCell((short) 8);
        cellg.setCellValue("实际完成时间：");
        cellg.setCellStyle(styleTwo);

        cellg = rowFive.createCell((short) 9);
        cellg.setCellValue(workresult.get(0).get("D_FACT_FINISH_DATE").toString().equals("") ? "" : workresult.get(0).get("D_FACT_FINISH_DATE").toString());
        cellg.setCellStyle(styleOne);

        CellRangeAddress cra14 = new CellRangeAddress(6, 6, 6, 7);
        sheet.addMergedRegion(cra14);
        RegionUtil.setBorderBottom(1, cra14, sheet, wb);
        RegionUtil.setBorderRight(1, cra14, sheet, wb);
        RegionUtil.setBorderTop(1, cra14, sheet, wb);
        CellRangeAddress cra15 = new CellRangeAddress(6, 6, 9, 10);
        sheet.addMergedRegion(cra15);
        RegionUtil.setBorderBottom(1, cra15, sheet, wb);
        RegionUtil.setBorderRight(1, cra15, sheet, wb);
        RegionUtil.setBorderTop(1, cra15, sheet, wb);
        CellRangeAddress cra16 = new CellRangeAddress(6, 6, 1, 4);
        sheet.addMergedRegion(cra16);
        RegionUtil.setBorderBottom(1, cra16, sheet, wb);
        RegionUtil.setBorderRight(1, cra16, sheet, wb);
        RegionUtil.setBorderTop(1, cra16, sheet, wb);

        //8行
        HSSFRow rowEight = sheet.createRow((int) 7);
        HSSFCell cellh = rowEight.createCell((short) 0);
        cellh.setCellValue("工单描述：");
        cellh.setCellStyle(styleTwo);

        cellh = rowFive.createCell((short) 1);
        cellh.setCellValue(workresult.get(0).get("V_SHORT_TXT").toString().equals("") ? "" : workresult.get(0).get("V_SHORT_TXT").toString());
        cellh.setCellStyle(styleOne);

        CellRangeAddress cra17 = new CellRangeAddress(7, 7, 1, 10);
        sheet.addMergedRegion(cra17);
        RegionUtil.setBorderBottom(1, cra17, sheet, wb);
        RegionUtil.setBorderRight(1, cra17, sheet, wb);
        RegionUtil.setBorderTop(1, cra17, sheet, wb);

        //9行
        HSSFRow rownight = sheet.createRow((int) 8);
        HSSFCell celli = rownight.createCell((short) 0);
        celli.setCellValue("3、任务细节：");
        celli.setCellStyle(styleTitle);
        CellRangeAddress cra18 = new CellRangeAddress(8, 8, 0, 10);
        sheet.addMergedRegion(cra18);
        RegionUtil.setBorderBottom(1, cra18, sheet, wb);
        RegionUtil.setBorderRight(1, cra18, sheet, wb);
        RegionUtil.setBorderTop(1, cra18, sheet, wb);

        //9行
        HSSFRow rowten = sheet.createRow((int) 9);
        HSSFCell cellj = rowten.createCell((short) 0);
        cellj.setCellValue("工作编号");
        cellj.setCellStyle(styleTwo);

        cellj = rowten.createCell((short) 1);
        cellj.setCellValue("工作中心");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 2);
        cellj.setCellValue("工序内容");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 3);
        cellj.setCellValue("定额时间");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 4);
        cellj.setCellValue("定额人数");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 5);
        cellj.setCellValue("实际时间");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 6);
        cellj.setCellValue("实际人数");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 7);
        cellj.setCellValue("机具");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 8);
        cellj.setCellValue("工具");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 9);
        cellj.setCellValue("技术要求");
        cellj.setCellStyle(styleTwo);
        cellj = rowten.createCell((short) 10);
        cellj.setCellValue("安全措施");
        cellj.setCellStyle(styleTwo);

        if (workgxresult.size() > 0) {
            int sizegx = workgxresult.size() + 10;
            for (int i = 10; i < sizegx; i++) {
                HSSFRow rowgx = sheet.createRow((int) i);
                int a = i - 10;
                rowgx.createCell((short) 0).setCellValue(workgxresult.get(a).get("V_ACTIVITY").toString().equals("") ? "" : workgxresult.get(a).get("V_ACTIVITY").toString());
                rowgx.createCell((short) 1).setCellValue(workgxresult.get(a).get("V_WORK_CENTER").toString().equals("") ? "" : workgxresult.get(a).get("V_WORK_CENTER").toString());// map.get("FX_GUID").toString());
                rowgx.createCell((short) 2).setCellValue(workgxresult.get(a).get("V_DESCRIPTION").toString().equals("") ? "" : workgxresult.get(a).get("V_DESCRIPTION").toString());
                rowgx.createCell((short) 3).setCellValue(workgxresult.get(a).get("I_WORK_ACTIVITY").toString().equals("") ? "" : workgxresult.get(a).get("I_WORK_ACTIVITY").toString());
                rowgx.createCell((short) 4).setCellValue(workgxresult.get(a).get("I_DURATION_NORMAL").toString().equals("") ? "" : workgxresult.get(a).get("I_DURATION_NORMAL").toString());
                rowgx.createCell((short) 5).setCellValue(workgxresult.get(a).get("I_ACTUAL_TIME").toString().equals("") ? "" : workgxresult.get(a).get("I_ACTUAL_TIME").toString());
                rowgx.createCell((short) 6).setCellValue(workgxresult.get(a).get("I_NUMBER_OF_PEOPLE").toString().equals("") ? "" : workgxresult.get(a).get("I_NUMBER_OF_PEOPLE").toString());
                rowgx.createCell((short) 7).setCellValue(workgxresult.get(a).get("V_JJ_NAME").toString().equals("") ? "" : workgxresult.get(a).get("V_JJ_NAME").toString());
                rowgx.createCell((short) 8).setCellValue(workgxresult.get(a).get("V_GJ_NAME").toString().equals("") ? "" : workgxresult.get(a).get("V_GJ_NAME").toString());
                rowgx.createCell((short) 9).setCellValue(workgxresult.get(a).get("V_JSQY_NAME").toString().equals("") ? "" : workgxresult.get(a).get("V_JSQY_NAME").toString());
                rowgx.createCell((short) 10).setCellValue(workgxresult.get(a).get("V_AQSC_NAME").toString().equals("") ? "" : workgxresult.get(a).get("V_AQSC_NAME").toString());
                for (int m = 0; m <= 10; m++) {
                    sheet.addMergedRegion(new CellRangeAddress(i, i, m, m));
                    RegionUtil.setBorderBottom(1, new CellRangeAddress(i, i, m, m), sheet, wb);
                    RegionUtil.setBorderRight(1, new CellRangeAddress(i, i, m, m), sheet, wb);
                    RegionUtil.setBorderTop(1, new CellRangeAddress(i, i, m, m), sheet, wb);
                }
            }
        }

        //物料标题
        HSSFRow rowMH = sheet.createRow((int) rowWF);
        HSSFCell cellk = rowMH.createCell((short) 0);
        cellk.setCellValue("4、物料信息：");
        cellk.setCellStyle(styleTitle);

        CellRangeAddress cra19 = new CellRangeAddress(rowWF, rowWF, 0, 10);
        sheet.addMergedRegion(cra19);
        RegionUtil.setBorderBottom(1, cra19, sheet, wb);
        RegionUtil.setBorderRight(1, cra19, sheet, wb);
        RegionUtil.setBorderTop(1, cra19, sheet, wb);

        HSSFRow rowMtit = sheet.createRow((int) rowWF + 1);
        sheet.addMergedRegion(new CellRangeAddress(rowWF + 1, rowWF + 1, 3, 4));//row物料标题行
        HSSFCell celll = rowMtit.createCell((short) 0);
        celll.setCellValue("序号");
        celll.setCellStyle(styleTwo);

        celll = rowMtit.createCell((short) 1);
        celll.setCellValue("工序");
        celll.setCellStyle(styleTwo);
        celll = rowMtit.createCell((short) 2);
        celll.setCellValue("物料编码");
        celll.setCellStyle(styleTwo);
        celll = rowMtit.createCell((short) 3);
        celll.setCellValue("物料描述");
        celll.setCellStyle(styleTwo);
        celll = rowMtit.createCell((short) 5);
        celll.setCellValue("单位");
        celll.setCellStyle(styleTwo);
        celll = rowMtit.createCell((short) 6);
        celll.setCellValue("计划数量");
        celll.setCellStyle(styleTwo);
        celll = rowMtit.createCell((short) 7);
        celll.setCellValue("总金额");
        celll.setCellStyle(styleTwo);
        celll = rowMtit.createCell((short) 8);
        celll.setCellValue("实际金额");
        celll.setCellStyle(styleTwo);
        celll = rowMtit.createCell((short) 9);
        celll.setCellValue("实际总金额");
        celll.setCellStyle(styleTwo);
        celll = rowMtit.createCell((short) 10);
        celll.setCellValue("备注");
        celll.setCellStyle(styleTwo);

        if (mmresult.size() > 0) {
            int sizemat = mmresult.size() + rowWF + 2;
            int insize = rowWF + 2;
            for (int j = insize; j < sizemat; j++) {
                sheet.addMergedRegion(new CellRangeAddress(j, j, 3, 4));//row物料标题行
                HSSFRow rowmat = sheet.createRow((int) j);

                int b = j - rowWF - 2;
                rowmat.createCell((short) 0).setCellValue(b + 1);
                rowmat.createCell((short) 1).setCellValue(mmresult.get(b).get("V_ACTIVITY").toString().equals("") ? "" : mmresult.get(b).get("V_ACTIVITY").toString());
                rowmat.createCell((short) 2).setCellValue(mmresult.get(b).get("V_MATERIALCODE").toString().equals("") ? "" : mmresult.get(b).get("V_MATERIALCODE").toString());
                rowmat.createCell((short) 3).setCellValue(mmresult.get(b).get("V_MATERIALNAME").toString().equals("") ? "" : mmresult.get(b).get("V_MATERIALNAME").toString());
                rowmat.createCell((short) 5).setCellValue(mmresult.get(b).get("V_UNIT").toString().equals("") ? "" : mmresult.get(b).get("V_UNIT").toString());
                rowmat.createCell((short) 6).setCellValue(mmresult.get(b).get("I_PLANAMOUNT").toString().equals("") ? "" : mmresult.get(b).get("I_PLANAMOUNT").toString());
                rowmat.createCell((short) 7).setCellValue(mmresult.get(b).get("F_PLANMONEY").toString().equals("") ? "" : mmresult.get(b).get("F_PLANMONEY").toString());
                rowmat.createCell((short) 8).setCellValue(mmresult.get(b).get("I_ACTUALAMOUNT").toString().equals("") ? "" : mmresult.get(b).get("I_ACTUALAMOUNT").toString());
                rowmat.createCell((short) 9).setCellValue(mmresult.get(b).get("F_ACTUALMONEY").toString().equals("") ? "" : mmresult.get(b).get("F_ACTUALMONEY").toString());
                rowmat.createCell((short) 10).setCellValue("");
                for (int n = 0; n <= 10; n++) {
                    sheet.addMergedRegion(new CellRangeAddress(j, j, n, n));
                    RegionUtil.setBorderBottom(1, new CellRangeAddress(j, j, n, n), sheet, wb);
                    RegionUtil.setBorderRight(1, new CellRangeAddress(j, j, n, n), sheet, wb);
                    RegionUtil.setBorderTop(1, new CellRangeAddress(j, j, n, n), sheet, wb);
                }
                sheet.addMergedRegion(new CellRangeAddress(j, j, 3, 4));
                RegionUtil.setBorderBottom(1, new CellRangeAddress(j, j, 3, 4), sheet, wb);
                RegionUtil.setBorderRight(1, new CellRangeAddress(j, j, 3, 4), sheet, wb);
                RegionUtil.setBorderTop(1, new CellRangeAddress(j, j, 3, 4), sheet, wb);
            }
        }
        try {
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachm" +
                    "ent; filename="
                    + URLEncoder.encode("工单打印Excel.xls", "UTF-8"));
            OutputStream out = response.getOutputStream();

            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    //工单备件消耗查找
    @RequestMapping(value = "/WORKBJ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void WORKBJ_EXCEL(
            @RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
            @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
            @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
            @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
            @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
            @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = workOrderService.PRO_PM_WORKORDER_SEL_NOBJ(V_D_ENTER_DATE_B.equals("0") ? "%" : V_D_ENTER_DATE_B, V_D_DEFECTDATE_E.equals("0") ? "%" : V_D_DEFECTDATE_E, V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE, V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE, V_V_DEPTCODEREPARIR.equals("0") ? "%" : V_V_DEPTCODEREPARIR,
                V_V_STATECODE.equals("0") ? "%" : V_V_STATECODE, V_EQUTYPE_CODE.equals("0") ? "%" : V_EQUTYPE_CODE, V_EQU_CODE.equals("0") ? "%" : V_EQU_CODE, V_DJ_PERCODE.equals("0") ? "%" : V_DJ_PERCODE, V_V_SHORT_TXT,
                V_V_BJ_TXT, V_V_ORDER_TYP);

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
        cell.setCellValue("工单描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("设备位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备件消耗");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("委托单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("委托人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("委托时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("检修单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("工单类型描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("工单状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("计划工时");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("实际工时");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_ORDERID") == null ? "" : map.get("V_ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("V_SHORT_TXT") == null ? "" : map.get("V_SHORT_TXT").toString());

                row.createCell((short) 3).setCellValue(map.get("V_EQUIP_NAME") == null ? "" : map.get("V_EQUIP_NAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_EQUSITENAME") == null ? "" : map.get("V_EQUSITENAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_SPARE") == null ? "" : map.get("V_SPARE").toString());

                row.createCell((short) 6).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 7).setCellValue(map.get("V_PERSONNAME") == null ? "" : map.get("V_PERSONNAME").toString());

                row.createCell((short) 8).setCellValue(map.get("D_ENTER_DATE") == null ? "" : map.get("D_ENTER_DATE").toString());

                row.createCell((short) 9).setCellValue(map.get("V_DEPTNAMEREPARIR") == null ? "" : map.get("V_DEPTNAMEREPARIR").toString());

                row.createCell((short) 10).setCellValue(map.get("V_ORDER_TYP_TXT") == null ? "" : map.get("V_ORDER_TYP_TXT").toString());

                row.createCell((short) 11).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 12).setCellValue(map.get("PLANTIME") == null ? "" : map.get("PLANTIME").toString());

                row.createCell((short) 13).setCellValue(map.get("FACTTIME") == null ? "" : map.get("FACTTIME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("工单查询excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //缺陷处理导出
    @RequestMapping(value = "/DEFCL_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DEFCL_EXCEL(
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
            @RequestParam(value = "PUT_PERNAME") String PUT_PERNAME,
            @RequestParam(value = "V_SIGN") String V_SIGN,
//            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
//            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
//        V_V_REPAIRMAJOR_CODE = new String(V_V_REPAIRMAJOR_CODE.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = dx_fileService.PRO_PM_07_DEFECT_EXPEXCEL(V_V_STATECODE.equals("0") ? "%" : V_V_STATECODE, X_PERSONCODE, PUT_PERNAME.equals("0") ? "%" : PUT_PERNAME, V_SIGN);

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
        cell.setCellValue("WBS编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("维修工程项目名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("缺陷状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("缺陷日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("缺陷等级");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("缺陷明细");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("处理意见");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("作业区");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("缺陷类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("负责人");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("WBSCODE") == null ? "" : map.get("WBSCODE").toString());

                row.createCell((short) 2).setCellValue(map.get("WBSNAME") == null ? "" : map.get("WBSNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 5).setCellValue(map.get("D_DEFECTDATE") == null ? "" : map.get("D_DEFECTDATE").toString());

                row.createCell((short) 6).setCellValue(map.get("V_SOURCE_GRADE") == null ? "" : map.get("V_SOURCE_GRADE").toString());

                row.createCell((short) 7).setCellValue(map.get("V_DEFECTLIST") == null ? "" : map.get("V_DEFECTLIST").toString());

                row.createCell((short) 8).setCellValue(map.get("V_IDEA") == null ? "" : map.get("V_IDEA").toString());

                row.createCell((short) 9).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_SOURCENAME") == null ? "" : map.get("V_SOURCENAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_PERNAME") == null ? "" : map.get("V_PERNAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("缺陷处理查询excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*
     * 年计划导出
     * */
    @RequestMapping(value = "/YearPlan_Excel", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void YearPlan_Excel(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_CX") String V_V_CX,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = pm_06Service.PRO_YEAR_PLAN_SEL(V_V_YEAR, V_V_ORGCODE.equals("all") ? "%" : V_V_ORGCODE,
                V_V_DEPTCODE.equals("all") ? "%" : V_V_DEPTCODE, V_V_CX.equals("all") ? "%" : V_V_CX,
                V_V_ZY.equals("all") ? "%" : V_V_ZY, V_V_STATECODE.equals("all") ? "%" : V_V_STATECODE, "0", "ALL");

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
        cell.setCellValue("厂矿");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("作业区");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("产线名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("设备名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("主要检修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("计划停机时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("计划竣工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("计划工期（小时）");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("计划状态");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_CXNAME") == null ? "" : map.get("V_CXNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_ZYMC") == null ? "" : map.get("V_ZYMC").toString());

                row.createCell((short) 5).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_COUNT") == null ? "" : map.get("V_COUNT").toString());

                row.createCell((short) 7).setCellValue(map.get("V_JHTJSJ") == null ? "" : map.get("V_JHTJSJ").toString());

                row.createCell((short) 8).setCellValue(map.get("V_JHJGSJ") == null ? "" : map.get("V_JHJGSJ").toString());

                row.createCell((short) 9).setCellValue(map.get("V_JHGQ") == null ? "" : map.get("V_JHGQ").toString());

                row.createCell((short) 10).setCellValue(map.get("V_INPERNAME") == null ? "" : map.get("V_INPERNAME").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());

                row.createCell((short) 12).setCellValue(map.get("V_BASENAME") == null ? "" : map.get("V_BASENAME").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("年计划l.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/QXTJ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void QXTJ_EXCEL(
            @RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
            @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
            @RequestParam(value = "V_V_DEPTCODE2") String V_V_DEPTCODE2,
            @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,

            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = qxService.PRO_PM_07_DEFECT_TJ_VIEW(V_D_DEFECTDATE_B.equals("0") ? "%" :V_D_DEFECTDATE_B,
                V_D_DEFECTDATE_E.equals("0") ? "%" : V_D_DEFECTDATE_E, V_V_DEPTCODE2.equals("0") ? "%" : V_V_DEPTCODE2,
                V_V_DEPTCODENEXT.equals("0") ? "%" : V_V_DEPTCODENEXT, V_V_EQUTYPECODE.equals("0") ? "%" : V_V_EQUTYPECODE,
                V_V_EQUCODE.equals("0") ? "%" : V_V_EQUCODE, V_V_SOURCECODE.equals("0") ? "%": V_V_SOURCECODE);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("月份");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("缺陷数量");
        cell.setCellStyle(style);


        cell = row.createCell((short) 2);
        cell.setCellValue("手工消缺数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("下达工单数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("已处理数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("未处理数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("处理率");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("消缺率");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(map.get("月份") == null ? "" : map.get("月份").toString());
                row.createCell((short) 1).setCellValue(map.get("缺陷数量") == null ? "" : map.get("缺陷数量").toString());
                row.createCell((short) 2).setCellValue(map.get("手工消缺数量") == null ? "" : map.get("手工消缺数量").toString());
                row.createCell((short) 3).setCellValue(map.get("下达工单数量") == null ? "" : map.get("下达工单数量").toString());
                row.createCell((short) 4).setCellValue(map.get("已处理数量") == null ? "" : map.get("已处理数量").toString());
                row.createCell((short) 5).setCellValue(map.get("未处理数量") == null ? "" : map.get("未处理数量").toString());
                row.createCell((short) 6).setCellValue(map.get("处理率") == null ? "" : map.get("处理率").toString());
                row.createCell((short) 7).setCellValue(map.get("消缺率") == null ? "" : map.get("消缺率").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("缺陷查询excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/QXTJ_EXCEL_SBB", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void QXTJ_EXCEL_SBB(
            @RequestParam(value = "V_NF") String V_NF,
            @RequestParam(value = "V_YF") String V_YF,
            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = dx_fileService.PRO_PM_07_DEF_SBBTJ_VIEW(V_NF.equals("0") ? "%" : V_NF,
                V_YF.equals("0") ? "%" : V_YF);
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
        cell.setCellValue("厂矿编码");
        cell.setCellStyle(style);


        cell = row.createCell((short) 2);
        cell.setCellValue("厂矿名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("缺陷数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("下工单数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("处理率(%)");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("消缺率（%)");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_ORGCODE") == null ? "" : map.get("V_ORGCODE").toString());
                row.createCell((short) 2).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());
                row.createCell((short) 3).setCellValue(map.get("V_V_SUMNUM") == null ? "" : map.get("V_V_SUMNUM").toString());
                row.createCell((short) 4).setCellValue(map.get("V_V_XDGX_NUM") == null ? "" : map.get("V_V_XDGX_NUM").toString());
                row.createCell((short) 5).setCellValue(map.get("V_V_CLL_NUM") == null ? "" : map.get("V_V_CLL_NUM").toString());
                row.createCell((short) 6).setCellValue(map.get("V_V_XQL_NUM") == null ? "" : map.get("V_V_XQL_NUM").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("缺陷查询(设备部)statis" +
                        "excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/GDZXQK_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GDZXQK_EXCEL(
            @RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
            @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,

            HttpServletResponse response) throws  SQLException {

        List list = new ArrayList();
        Map<String, Object> data = dx_fileService.PRO_PM_DEPT_SORT(V_D_ENTER_DATE_B.equals("0") ? "%" : V_D_ENTER_DATE_B,
                V_D_ENTER_DATE_E.equals("0") ? "%" : V_D_ENTER_DATE_E, V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE);

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
        cell.setCellValue("作业区");
        cell.setCellStyle(style);


        cell = row.createCell((short) 2);
        cell.setCellValue("验收工单数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("未验收数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("工单总数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("工单执行率(%)");
        cell.setCellStyle(style);
        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                row.createCell((short) 2).setCellValue(map.get("WR_OK") == null ? "" : map.get("WR_OK").toString());
                row.createCell((short) 3).setCellValue(map.get("WR_TOTAL") == null ? "" : map.get("WR_TOTAL").toString());
                row.createCell((short) 4).setCellValue(map.get("WR_TOTAL") == null ? "" : map.get("WR_TOTAL").toString());
                row.createCell((short) 5).setCellValue(map.get("RATE") == null ? "" : map.get("RATE").toString());

            }

            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("工单执行情况statis" + "excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/QXTJ_EXCEL_WCL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void QXTJ_EXCEL_WCL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,

            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = cglService.PRO_PM_07_DEFECT_TJ_VIEW_WCL(V_V_YEAR.equals("0") ? "%" :V_V_YEAR,
                V_V_MONTH.equals("0") ? "%" : V_V_MONTH, V_V_WEEK.equals("0") ? "%" : V_V_WEEK,
                V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE, V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE);
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
        cell.setCellValue("单位");
        cell.setCellStyle(style);


        cell = row.createCell((short) 2);
        cell.setCellValue("总数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("完成数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("完成率（%)");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                row.createCell((short) 2).setCellValue(map.get("V_V_SUMNUM") == null ? "" : map.get("V_V_SUMNUM").toString());
                row.createCell((short) 3).setCellValue(map.get("V_V_YXQNUM") == null ? "" : map.get("V_V_YXQNUM").toString());
                row.createCell((short) 4).setCellValue(map.get("V_V_WCNUM") == null ? "" : map.get("V_V_WCNUM").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("缺陷成功率查询excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/GDCX_EXCEL_WCL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void GDCX_EXCEL_WCL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,

            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = cglService.PRO_PM_DEPT_SORT_WCL(V_V_YEAR.equals("0") ? "%" :V_V_YEAR,
                V_V_MONTH.equals("0") ? "%" : V_V_MONTH, V_V_WEEK.equals("0") ? "%" : V_V_WEEK,
                V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE, V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE);
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
        cell.setCellValue("单位");
        cell.setCellStyle(style);


        cell = row.createCell((short) 2);
        cell.setCellValue("总数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("完成数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("完成率（%)");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                row.createCell((short) 2).setCellValue(map.get("V_V_SUMNUM") == null ? "" : map.get("V_V_SUMNUM").toString());
                row.createCell((short) 3).setCellValue(map.get("V_V_WCLNUM") == null ? "" : map.get("V_V_WCLNUM").toString());
                row.createCell((short) 4).setCellValue(map.get("V_V_WCNUM") == null ? "" : map.get("V_V_WCNUM").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("工单成功率查询excel.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/ZJH_EXCEL_WCL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void ZJH_EXCEL_WCL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,

            HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();
        Map<String, Object> data = cglService.PM_03_PLAN_CKSTAT_SEL_WCL(V_V_YEAR.equals("0") ? "%" :V_V_YEAR,
                V_V_MONTH.equals("0") ? "%" : V_V_MONTH, V_V_WEEK.equals("0") ? "%" : V_V_WEEK,
                V_V_ORGCODE.equals("0") ? "%" : V_V_ORGCODE, V_V_DEPTCODE.equals("0") ? "%" : V_V_DEPTCODE);
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
        cell.setCellValue("单位");
        cell.setCellStyle(style);


        cell = row.createCell((short) 2);
        cell.setCellValue("总数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("完成数");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("完成率（%)");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());
                row.createCell((short) 2).setCellValue(map.get("V_V_SUMNUM") == null ? "" : map.get("V_V_SUMNUM").toString());
                row.createCell((short) 3).setCellValue(map.get("V_V_YXQNUM") == null ? "" : map.get("V_V_YXQNUM").toString());
                row.createCell((short) 4).setCellValue(map.get("V_V_WCLNUM") == null ? "" : map.get("V_V_WCLNUM").toString());
            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("周计划成功率查询excel.xls", "UTF-8"));
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
