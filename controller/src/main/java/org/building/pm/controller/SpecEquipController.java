package org.building.pm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.Region;
import org.building.pm.service.HpService;
import org.building.pm.service.SpecEquipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjh on 2019-12-17.
 * <p>
 * 特种设备controller
 */
@Controller
@RequestMapping("/app/pm/specEquip")
public class SpecEquipController {

    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private SpecEquipService specEquipService;

    //计划申请查询
    @RequestMapping(value = "/selectPlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectPlanApply(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_BDATE") String V_V_BDATE,
                                               @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
                                               @RequestParam(value = "V_V_STATUS") String V_V_STATUS,
                                               Integer page,
                                               Integer limit,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map result = specEquipService.selectPlanApply(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, V_V_STATUS, page.toString(), limit.toString());
        return result;
    }

    //计划申请新增
    @RequestMapping(value = "/insertPlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> insertPlanApply(@RequestParam(value = "I_I_ID") String I_I_ID,
                                               @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                               @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                               @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_CHECKTIME") String V_V_CHECKTIME,
                                               @RequestParam(value = "V_V_CHECKPART") String V_V_CHECKPART,
                                               @RequestParam(value = "V_V_CHECKDEPT") String V_V_CHECKDEPT,
                                               @RequestParam(value = "V_V_COST") String V_V_COST,
                                               @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = specEquipService.insertPlanApply(I_I_ID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_EQUNAME, V_V_EQUCODE, V_V_CHECKTIME, V_V_CHECKPART, V_V_CHECKDEPT, V_V_COST, V_V_PERSONCODE);

        result.put("data", data);
        result.put("success", true);
        result.put("planApply", specEquipService.loadPlanApply(I_I_ID));
        return result;
    }

    //根据计划申请的主键查询
    @RequestMapping(value = "/loadPlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadPlanApply(
            @RequestParam(value = "I_I_ID") String I_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = specEquipService.loadPlanApply(I_I_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return data;
    }

    //计划申请删除
    @RequestMapping(value = "/deletePlanApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deletePlanApply(@RequestParam(value = "I_I_ID", required = false) String I_I_ID,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = specEquipService.deletePlanApply(I_I_ID);

        result.put("data", data);
        result.put("success", true);
        result.put("planApply", specEquipService.loadPlanApply(I_I_ID));

        return result;
    }

    //导出检定计划查询申请
    @RequestMapping(value = "/excelPlanApply", method = RequestMethod.GET)
    @ResponseBody
    public void excelPlanApply(@RequestParam(value = "I_I_ID_LIST", required = false) List<String> I_I_ID_LIST,
                               String V_V_PERSONCODE,
                               String V_V_DEPTCODE,
                               String V_V_DEPTCODENEXT,
                               String V_V_EQUTYPECODE,
                               String V_V_EQUTYPENAME,
                               String V_V_EQUCODE,
                               String V_V_BDATE,
                               String V_V_EDATE,
                               String V_V_STATUS,
                               Integer page,
                               Integer limit,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        V_V_STATUS = URLDecoder.decode(V_V_STATUS, "UTF-8");

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i < 9; i++) {
            if(i== 0){
                sheet.setColumnWidth(i, 2000);
            }else if(i ==8 ){
                sheet.setColumnWidth(i, 2000);
            }else if(i ==7 ){
                sheet.setColumnWidth(i, 4000);
            }else if(i ==7 ){
                sheet.setColumnWidth(i, 4000);
            }else if(i ==4 ){
                sheet.setColumnWidth(i, 5000);
            }else{
                sheet.setColumnWidth(i, 8000);
            }
        }

        HSSFRow row = sheet.createRow((int) 0);
        row.setHeightInPoints(30);
        //标题栏样式
        HSSFCellStyle style = wb.createCellStyle();
        HSSFFont font = wb.createFont();
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
        style.setFillForegroundColor(HSSFColor.GREY_50_PERCENT.index);
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        font.setFontHeightInPoints((short) 12);// 设置字体大小
        font.setColor(HSSFColor.WHITE.index);
        style.setFont(font);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        HSSFCell cell1 = row.createCell((short) 0);
        cell1.setCellValue("序号");
        cell1.setCellStyle(style);

        HSSFCell cell2 = row.createCell((short) 1);
        cell2.setCellValue("作业区");
        cell2.setCellStyle(style);

        HSSFCell cell3 = row.createCell((short) 2);
        cell3.setCellValue("设备类型");
        cell3.setCellStyle(style);

        HSSFCell cell4 = row.createCell((short) 3);
        cell4.setCellValue("设备名称");
        cell4.setCellStyle(style);

        HSSFCell cell5 = row.createCell((short) 4);
        cell5.setCellValue("检定时间");
        cell5.setCellStyle(style);

        HSSFCell cell6 = row.createCell((short) 5);
        cell6.setCellValue("检定部位");
        cell6.setCellStyle(style);

        HSSFCell cell7 = row.createCell((short) 6);
        cell7.setCellValue("检定单位");
        cell7.setCellStyle(style);

        HSSFCell cell8 = row.createCell((short) 7);
        cell8.setCellValue("检测费用");
        cell8.setCellStyle(style);

        HSSFCell cell9 = row.createCell((short) 8);
        cell9.setCellValue("状态");
        cell9.setCellStyle(style);

        List<Map<String, Object>> planApplyList = new ArrayList<Map<String, Object>>();

        //如果是选择了很多列
        if (I_I_ID_LIST.size() > 0) {
            for (int i = 0; i < I_I_ID_LIST.size(); i++) {
                Map<String, Object> planApply = specEquipService.loadPlanApply(I_I_ID_LIST.get(i));
                planApplyList.add(((List<Map<String, Object>>) planApply.get("list")).get(0));
            }
        } else {
            Map<String, Object> data = specEquipService.selectPlanApply(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, V_V_STATUS, page.toString(), limit.toString());

            planApplyList = (List<Map<String, Object>>) data.get("list");
        }

        for (int j = 0; j < planApplyList.size(); j++) {
            row = sheet.createRow(j + 1);
            row.setHeightInPoints(25);
            HSSFCell cellContent = row.createCell(0);
            cellContent.setCellValue(j + 1);// 序号

            cellContent = row.createCell(1);
            cellContent.setCellValue(planApplyList.get(j).get("V_DEPTNAME") == null ? "" : planApplyList.get(j).get("V_DEPTNAME").toString());// 作业区名称

            cellContent = row.createCell(2);
            cellContent.setCellValue(planApplyList.get(j).get("V_EQUTYPENAME") == null ? "" : planApplyList.get(j).get("V_EQUTYPENAME").toString());// 设备类型名称

            cellContent = row.createCell(3);
            cellContent.setCellValue(planApplyList.get(j).get("V_EQUNAME") == null ? "" : planApplyList.get(j).get("V_EQUNAME").toString());// 设备名称

            cellContent = row.createCell(4);
            cellContent.setCellValue(planApplyList.get(j).get("V_CHECKTIME") == null ? "" : planApplyList.get(j).get("V_CHECKTIME").toString());// 检定时间

            cellContent = row.createCell(5);
            cellContent.setCellValue(planApplyList.get(j).get("V_CHECKPART") == null ? "" : planApplyList.get(j).get("V_CHECKPART").toString());// 检定部位

            cellContent = row.createCell(6);
            cellContent.setCellValue(planApplyList.get(j).get("V_CHECKDEPT") == null ? "" : planApplyList.get(j).get("V_CHECKDEPT").toString());// 检定单位

            cellContent = row.createCell(7);
            cellContent.setCellValue(planApplyList.get(j).get("V_COST") == null ? "" : planApplyList.get(j).get("V_COST").toString());// 检测费用

            cellContent = row.createCell(8);
            cellContent.setCellValue(planApplyList.get(j).get("V_STATUS") == null ? "" : planApplyList.get(j).get("V_STATUS").toString());// 状态
        }

        try {
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            String fileName = new String("检定计划申请.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            OutputStream out = response.getOutputStream();

            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //检定实绩查询
    @RequestMapping(value = "/selectCheckResult", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectCheckResult(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_BDATE") String V_V_BDATE,
                                               @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
                                               Integer page,
                                               Integer limit,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map result = specEquipService.selectCheckResult(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, page.toString(), limit.toString());
        return result;
    }

    //检定实绩(实际检定时间、检测费用)录入
    @RequestMapping(value = "/setCheckResult", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> setCheckResult(@RequestParam(value = "I_I_ID") String I_I_ID,
                                               @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                               @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                               @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_CHECKTIME") String V_V_CHECKTIME,
                                               @RequestParam(value = "V_V_CHECKPART") String V_V_CHECKPART,
                                               @RequestParam(value = "V_V_CHECKDEPT") String V_V_CHECKDEPT,
                                               @RequestParam(value = "V_V_COST") String V_V_COST,
                                               @RequestParam(value = "I_I_PLANID") String I_I_PLANID,
                                               @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = specEquipService.setCheckResult(I_I_ID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_EQUNAME, V_V_EQUCODE, V_V_CHECKTIME, V_V_CHECKPART, V_V_CHECKDEPT, V_V_COST, I_I_PLANID, V_V_PERSONCODE);

        result.put("data", data);
        result.put("success", true);
        return result;
    }

    //检定实绩(附件)录入
    @RequestMapping(value = "/setCheckResultFiles", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> setCheckResultFiles(@RequestParam(value = "I_I_ID") String I_I_ID,
                                               @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                               @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                               @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_CHECKTIME") String V_V_CHECKTIME,
                                               @RequestParam(value = "V_V_CHECKPART") String V_V_CHECKPART,
                                               @RequestParam(value = "V_V_CHECKDEPT") String V_V_CHECKDEPT,
                                               @RequestParam(value = "B_B_CHECKREPORT") InputStream B_B_CHECKREPORT,
                                               @RequestParam(value = "I_I_PLANID") String I_I_PLANID,
                                               @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = specEquipService.setCheckResultFiles(I_I_ID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_EQUNAME, V_V_EQUCODE, V_V_CHECKTIME, V_V_CHECKPART, V_V_CHECKDEPT, B_B_CHECKREPORT, I_I_PLANID, V_V_PERSONCODE);
        B_B_CHECKREPORT.close();

        result.put("data", data);
        result.put("success", true);
        return result;
    }

}
