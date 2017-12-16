package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2017/1/22.
 *
 * �豸�¹�controller
 *
 */
@Controller
@RequestMapping("/app/pm/excel")
public class ExcelController {

    @Autowired
    private SgService sgService;

    @Autowired
    private QxService qxService;

    @Autowired
    private WorkOrderService workOrderService;

    @Autowired
    private PM_03Service pm_03Service;

    @Autowired
    private PM_12Service pm_12Service;

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
        Map<String, Object> data = sgService.SG_INF_DATA_ITEM_SEL(V_V_SG_NAME, V_V_SG_STIME, V_V_SG_ETIME, V_V_SG_DEPT,V_V_SG_TYPE,V_V_SG_YY);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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

        Map<String, Object> data = qxService.PRO_PM_07_DEFECT_VIEW_PER(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE,
                V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE,V_V_SOURCECODE, V_V_DEFECTLIST, X_PERSONCODE,V_V_PAGE,V_V_PAGESIZE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
        Map<String, Object> data = workOrderService.PRO_PM_WORKORDER_SELECT_ADMIN(V_D_ENTER_DATE_B.equals("0")?"%":V_D_ENTER_DATE_B, V_D_DEFECTDATE_E.equals("0")?"%":V_D_DEFECTDATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR,
                V_V_STATECODE,V_EQUTYPE_CODE.equals("0")?"%":V_EQUTYPE_CODE,V_EQU_CODE.equals("0")?"%":V_EQU_CODE,V_DJ_PERCODE,V_V_SHORT_TXT,
                V_V_BJ_TXT,V_V_ORDER_TYP,V_V_PAGE,V_V_PAGESIZE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
        Map<String, Object> data = workOrderService.pro_run7113_ordermatlist(V_DEPT_CODE, V_EQUIP_CODE, V_MATERIALCODE,V_MATERIALNAME);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_MONTH_VIEW(V_V_INPER, V_V_YEAR, V_V_MONTH, V_V_ORGCODE,V_V_DEPTCODE,V_V_REPAIRMAJOR_CODE,V_V_PLANTYPE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_WEEK_VIEW(V_V_YEAR, V_V_MONTH,V_V_WEEK, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_ZY, V_V_EQUTYPE, V_V_EQUCODE, V_V_CONTENT, V_V_STATE, V_V_PAGE, V_V_PAGESIZE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("流程步骤");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i+1);

                row.createCell((short) 1).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());

                row.createCell((short) 2).setCellValue(map.get("V_DEPTNAME") == null ? "" : map.get("V_DEPTNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("V_ORGNAME") == null ? "" : map.get("V_ORGNAME").toString());

                row.createCell((short) 4).setCellValue(map.get("V_REPAIRMAJOR_CODE") == null ? "" : map.get("V_REPAIRMAJOR_CODE").toString());

                row.createCell((short) 5).setCellValue(map.get("V_EQUNAME") == null ? "" : map.get("V_EQUNAME").toString());

                row.createCell((short) 6).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());

                row.createCell((short) 7).setCellValue(map.get("V_EQUTYPENAME") == null ? "" : map.get("V_EQUTYPENAME").toString());

                row.createCell((short) 8).setCellValue(map.get("V_STARTTIME") == null ? "" : map.get("V_STARTTIME").toString());

                row.createCell((short) 9).setCellValue(map.get("V_ENDTIME") == null ? "" : map.get("V_ENDTIME").toString());

                row.createCell((short) 10).setCellValue(map.get("V_HOUR") == null ? "" : map.get("V_HOUR").toString());

                row.createCell((short) 11).setCellValue(map.get("V_INPERNAME") == null ? "" : map.get("V_INPERNAME").toString());

                row.createCell((short) 12).setCellValue(map.get("V_INDATE") == null ? "" : map.get("V_INDATE").toString());

                row.createCell((short) 13).setCellValue(map.get("V_FLOWNAME") == null ? "" : map.get("V_FLOWNAME").toString());
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
    public void YSCBSP_EXCEL(@RequestParam(value = "V_V_INPER") String V_V_INPER,
                             @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                             @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                             @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                             @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                             HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        V_V_REPAIRMAJOR_CODE = new String(V_V_REPAIRMAJOR_CODE.getBytes("iso-8859-1"), "utf-8");

        List list = new ArrayList();

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_YEAR_VIEW(V_V_INPER, V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_PLANTYPE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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

        Map<String, Object> data = pm_03Service.PRO_PM_03_PLAN_QUARTER_VIEW1(V_V_YEAR, V_V_QUARTER, V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRMAJOR_CODE, V_V_FLOWCODE,V_V_CONTENT);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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

        Map<String, Object> data = pm_12Service.PRO_RUN7132_ORDERMATLIST(V_D_FACT_START_DATE, V_D_FACT_FINISH_DATE, V_V_PLANT, V_V_DEPTCODE, V_V_EQUIP_NO, V_V_ORDERGUID, V_V_MATERIALCODE,V_V_MATERIALNAME);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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
    public void HXBJCL_EXCEL( @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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
    public void SBZYLTZ_EXCEL( @RequestParam(value = "A_EQUID") String A_EQUID,
                               @RequestParam(value = "A_BEGINDATE") String A_BEGINDATE,
                               @RequestParam(value = "A_ENDDATE") String A_ENDDATE,
                               @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                               HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN_YEILD_SELECT(A_EQUID, A_BEGINDATE, A_ENDDATE, A_CYCLE_ID);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
    public void SBYXTZ_EXCEL( @RequestParam(value = "A_EQUID") String A_EQUID,
                              @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                              HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data = pm_12Service.PRO_RUN_EQU_BJ_ALERT_ALL(A_EQUID, A_CYCLE_ID);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
    public void SBBJLSGHTZ_EXCEL( @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
    public void BJXXCX_EXCEL(  @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                               @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                               @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                               @RequestParam(value = "V_V_BEGIN_DATE") String V_V_BEGIN_DATE,
                               @RequestParam(value = "V_V_END_DATE") String V_V_END_DATE,
                               HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data =pm_12Service.PRO_RUN7116_SELECT(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID, V_V_BEGIN_DATE, V_V_END_DATE);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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
    public void BJYXTJ_EXCEL(  @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                               @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                               @RequestParam(value = "V_V_BJ_ID") String V_V_BJ_ID,
                               HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        Map<String, Object> data =pm_12Service.PRO_RUN7117_BJWORKLIST(V_V_DEPARTCODE, V_V_PLANTCODE, V_V_BJ_ID);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
    public void BJWZTZ_EXCEL(  @RequestParam(value = "IN_EQUID") String IN_EQUID,
                               @RequestParam(value = "IN_PLANT") String IN_PLANT,
                               @RequestParam(value = "IN_DEPART") String IN_DEPART,
                               @RequestParam(value = "IN_STATUS") String IN_STATUS,
                               @RequestParam(value = "IN_BJCODE") String IN_BJCODE,
                               @RequestParam(value = "IN_BJDESC") String IN_BJDESC,
                               HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        IN_STATUS = new String(IN_STATUS.getBytes("iso-8859-1"), "utf-8");
        List list = new ArrayList();
        Map<String, Object> data =pm_12Service.PRO_RUN_SITE_BJ_ALL(IN_EQUID, IN_PLANT, IN_DEPART, IN_STATUS, IN_BJCODE, IN_BJDESC);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
    public void BJSMTJ_EXCEL(   @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                @RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                                @RequestParam(value = "D_BEGIN_DATE") String D_BEGIN_DATE,
                                @RequestParam(value = "D_END_DATE") String D_END_DATE,
                                @RequestParam(value = "V_CYCLE_ID") String V_CYCLE_ID,
                                HttpServletResponse response) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        Map<String, Object> data =pm_12Service.PRO_RUN7130_SELECTBJTIME(V_PLANTCODE, V_DEPARTCODE, V_SUPPLY_CODE, V_MATERIALNAME, D_BEGIN_DATE, D_END_DATE, V_CYCLE_ID);

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
        for(int i=0;i<=1;i++){
            sheet.setColumnWidth(i,3000);
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

                row.createCell((short) 0).setCellValue(i+1);

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
}
