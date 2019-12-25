package org.building.pm.controller;

import com.ctc.wstx.util.StringUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.Region;
import org.building.pm.service.HpService;
import org.building.pm.service.SpecEquipService;
import org.building.pm.base.BaseUtils;
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
import java.io.*;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;

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

    //附件类型查询
    @RequestMapping(value = "/selectAttachDic", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectAttachDic(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = specEquipService.selectAttachDic();
        List<Map<String, Object>> attachDicList = (List<Map<String, Object>>) result.get("list");
        for (Map<String, Object> attachDic : attachDicList) {
            attachDic.put("leaf", true);//设置为树的叶子，最底层
        }

        return result;
    }

    //附件查询
    @RequestMapping(value = "/selectEquFilesAttach", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectEquFilesAttach(@RequestParam(value = "V_V_ECODE") String V_V_ECODE,
                                               @RequestParam(value = "V_V_ATTACH_TYPE") String V_V_ATTACH_TYPE,
                                               Integer page,
                                               Integer limit,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {

        Map<String, Object> result = specEquipService.selectEquFilesAttach(V_V_ECODE, V_V_ATTACH_TYPE, page.toString(), limit.toString());
        result.put("success", true);

        return result;
    }

    //附件名称查询
    @RequestMapping(value = "/selectAttachNode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectAttachNode(@RequestParam(value = "V_V_CODE") String V_V_CODE,
                                                @RequestParam(value = "V_V_ATTACH_TYPE") String V_V_ATTACH_TYPE,
                                                Integer page,
                                                Integer limit,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = specEquipService.selectAttachNode(V_V_CODE, V_V_ATTACH_TYPE, page.toString(), limit.toString());
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
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i < 9; i++) {
            if (i == 0) {
                sheet.setColumnWidth(i, 2000);
            } else if (i == 8) {
                sheet.setColumnWidth(i, 2000);
            } else if (i == 7) {
                sheet.setColumnWidth(i, 4000);
            } else if (i == 7) {
                sheet.setColumnWidth(i, 4000);
            } else if (i == 4) {
                sheet.setColumnWidth(i, 5000);
            } else {
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
            V_V_STATUS = URLDecoder.decode(V_V_STATUS, "UTF-8");
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

    //档案查询
    @RequestMapping(value = "/selectArchives", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectArchives( @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_OPTYPE") String V_V_OPTYPE,
                                               Integer page,
                                               Integer limit,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map result = specEquipService.selectArchives(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_OPTYPE, page.toString(), limit.toString());
        return result;
    }

    //导出检定计划查询申请
    @RequestMapping(value = "/excelArchives", method = RequestMethod.GET)
    @ResponseBody
    public void excelArchives( String V_V_PERSONCODE,
                               String V_V_DEPTCODE,
                               String V_V_DEPTCODENEXT,
                               String V_V_EQUTYPECODE,
                               String V_V_EQUTYPENAME,
                               String V_V_EQUCODE,
                               String V_V_OPTYPE,
                               String page,
                               String limit,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        V_V_DEPTCODENEXT = URLDecoder.decode(V_V_DEPTCODENEXT, "UTF-8");
        V_V_EQUTYPECODE = URLDecoder.decode(V_V_EQUTYPECODE, "UTF-8");
        V_V_EQUCODE = URLDecoder.decode(V_V_EQUCODE, "UTF-8");

        Map<String, Object> result = specEquipService.selectArchives(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_OPTYPE, page, limit);

        List<String> columnList = (List<String>)result.get("columnList");

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        if(columnList.size() > 0){
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

            for (int i = 0; i < columnList.size(); i++) {
                sheet.setColumnWidth(i, 8000);
                HSSFCell cell = row.createCell((short) i);
                cell.setCellValue(columnList.get(i));
                cell.setCellStyle(style);
            }
            List<Map<String, Object>> archivesList = new ArrayList<Map<String, Object>>();
            archivesList = (List<Map<String, Object>>) result.get("list");

            if(archivesList != null && archivesList.size() > 0){
                for (int i = 0; i < archivesList.size(); i++) {
                    row = sheet.createRow(i + 1);
                    row.setHeightInPoints(20);
                    HSSFCell cellContent = row.createCell(i);
                    cellContent.setCellValue(archivesList.get(i).get(columnList.get(i)) == null ? "" : archivesList.get(i).get(columnList.get(i)).toString());
                }
            }
        }


        try {
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            String fileName = new String("设备档案.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            OutputStream out = response.getOutputStream();

            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //设备移动申请查询
    @RequestMapping(value = "/selectEquipMoveApply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectEquipMoveApply(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                       @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                       @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                                       @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                       @RequestParam(value = "V_V_BDATE") String V_V_BDATE,
                                                       @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
                                                       @RequestParam(value = "V_V_STATUS" ) String V_V_STATUS,
                                                       Integer page,
                                                       Integer limit,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = specEquipService.selectEquipMoveApply(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, V_V_STATUS, page.toString(), limit.toString());
        return result;
    }
      //设备移动新增
    @RequestMapping(value = "/insertEquipMove", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> insertEquipMove(@RequestParam(value = "I_I_ID") String I_I_ID,
                                               @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                               @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                               @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
                                               @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                               @RequestParam(value = "V_V_EQUTYPENAME") String V_V_EQUTYPENAME,
                                               @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                               @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
                                               @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                               @RequestParam(value = "V_V_NEWORGNAME") String V_V_NEWORGNAME,
                                               @RequestParam(value = "V_V_NEWORGCODE") String V_V_NEWORGCODE,
                                               @RequestParam(value = "V_V_NEWDEPTNAME") String V_V_NEWDEPTNAME,
                                               @RequestParam(value = "V_V_NEWDEPTCODE") String V_V_NEWDEPTCODE,
                                               @RequestParam(value = "V_V_NEWADD") String V_V_NEWADD,
                                               @RequestParam(value = "V_V_NEWSITE") String V_V_NEWSITE,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = specEquipService.insertEquipMove(I_I_ID,V_V_PERSONCODE, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_EQUNAME, V_V_EQUCODE, V_V_NEWORGNAME, V_V_NEWORGCODE, V_V_NEWDEPTNAME, V_V_NEWDEPTCODE, V_V_NEWADD,V_V_NEWSITE);
        result.put("success", true);
        result.put("data", data);
        result.put("V_INFO", data.get("V_INFO"));
        result.put("EquipMove",specEquipService.loadEquipMove(I_I_ID).get("list"));
        return result;
    }

    @RequestMapping(value = "/loadEquipMove", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loadEquipMove(
            @RequestParam(value = "I_I_ID") String I_I_ID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        HashMap data = specEquipService.loadEquipMove(I_I_ID);
        List<Map<String, Object>> list = (List) data.get("list");

        result.put("list", list);
        result.put("success", true);

        return data;
    }

    @RequestMapping(value = "/deleteEquipMove", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteEquipMove(@RequestParam(value = "I_I_ID", required = false) String I_I_ID,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = specEquipService.deleteEquipMove(I_I_ID);

        result.put("data", data);
        result.put("EquipMove", specEquipService.loadEquipMove(I_I_ID));

        return result;
    }

    @RequestMapping(value = "/excelEquipMove", method = RequestMethod.GET)
    @ResponseBody
    public void excelEquipMove(@RequestParam(value = "I_I_ID_LIST", required = false) List<String> I_I_ID_LIST,
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
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i < 11; i++) {
            if(i== 0){
                sheet.setColumnWidth(i, 2000);
            }else if(i ==10 ){
                sheet.setColumnWidth(i, 3000);
            }else{
                sheet.setColumnWidth(i, 6500);
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
        cell2.setCellValue("设备类型");
        cell2.setCellStyle(style);

        HSSFCell cell3 = row.createCell((short) 2);
        cell3.setCellValue("设备名称");
        cell3.setCellStyle(style);

        HSSFCell cell4 = row.createCell((short) 3);
        cell4.setCellValue("原矿场");
        cell4.setCellStyle(style);

        HSSFCell cell5 = row.createCell((short) 4);
        cell5.setCellValue("原作业区");
        cell5.setCellStyle(style);

        HSSFCell cell6 = row.createCell((short) 5);
        cell6.setCellValue("原使用地点");
        cell6.setCellStyle(style);

        HSSFCell cell7 = row.createCell((short) 6);
        cell7.setCellValue("接收矿场");
        cell7.setCellStyle(style);

        HSSFCell cell8 = row.createCell((short) 7);
        cell8.setCellValue("接收作业区");
        cell8.setCellStyle(style);

        HSSFCell cell9 = row.createCell((short) 8);
        cell9.setCellValue("新使用地点");
        cell9.setCellStyle(style);

        HSSFCell cell10 = row.createCell((short) 9);
        cell10.setCellValue("新安装位置");
        cell10.setCellStyle(style);

        HSSFCell cell11 = row.createCell((short) 10);
        cell11.setCellValue("状态");
        cell11.setCellStyle(style);

        List<Map<String, Object>> equipMoveList = new ArrayList<Map<String, Object>>();

        //如果是选择了很多列
        if (I_I_ID_LIST.size() > 0) {
            for (int i = 0; i < I_I_ID_LIST.size(); i++) {
                Map<String, Object> EquipMove = specEquipService.loadEquipMove(I_I_ID_LIST.get(i));
                equipMoveList.add(((List<Map<String, Object>>) EquipMove.get("list")).get(0));
            }
        } else {
            V_V_STATUS = URLDecoder.decode(V_V_STATUS, "UTF-8");
            //V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, V_V_STATUS, page.toString(), limit.toString()
            Map<String, Object> data = specEquipService.selectEquipMoveApply(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, V_V_STATUS, page.toString(), limit.toString());
            System.out.println(data.get("list"));
            equipMoveList = (List<Map<String, Object>>) data.get("list");
        }
            System.out.println(equipMoveList);
        for (int j = 0; j < equipMoveList.size(); j++) {
            row = sheet.createRow(j + 1);
            row.setHeightInPoints(25);
            HSSFCell cellContent = row.createCell(0);
            cellContent.setCellValue(j + 1);// 序号

            cellContent = row.createCell(1);
            cellContent.setCellValue(equipMoveList.get(j).get("V_EQUTYPENAME") == null ? "" : equipMoveList.get(j).get("V_EQUTYPENAME").toString());// 设备类型名称

            cellContent = row.createCell(2);
            cellContent.setCellValue(equipMoveList.get(j).get("V_EQUNAME") == null ? "" : equipMoveList.get(j).get("V_EQUNAME").toString());// 设备名称

            cellContent = row.createCell(3);
            cellContent.setCellValue(equipMoveList.get(j).get("V_ORGNAME") == null ? "" : equipMoveList.get(j).get("V_ORGNAME").toString());// 原矿场

            cellContent = row.createCell(4);
            cellContent.setCellValue(equipMoveList.get(j).get("V_DEPTNAME") == null ? "" :equipMoveList.get(j).get("V_DEPTNAME").toString());// 原作业区

            cellContent = row.createCell(5);
            cellContent.setCellValue(equipMoveList.get(j).get("V_SITE") == null ? "" : equipMoveList.get(j).get("V_SITE").toString());// 原使用地点

            cellContent = row.createCell(6);
            cellContent.setCellValue(equipMoveList.get(j).get("V_NEWORGNAME") == null ? "" : equipMoveList.get(j).get("V_NEWORGNAME").toString());// 接收矿场

            cellContent = row.createCell(7);
            cellContent.setCellValue(equipMoveList.get(j).get("V_NEWDEPTNAME") == null ? "" : equipMoveList.get(j).get("V_NEWDEPTNAME").toString());// 接收作业区

            cellContent = row.createCell(8);
            cellContent.setCellValue(equipMoveList.get(j).get("V_NEWADD") == null ? "" : equipMoveList.get(j).get("V_NEWADD").toString());// 新使用地点

            cellContent = row.createCell(9);
            cellContent.setCellValue(equipMoveList.get(j).get("V_NEWSITE") == null ? "" : equipMoveList.get(j).get("V_NEWSITE").toString());// 新安装地址

            cellContent = row.createCell(10);
            cellContent.setCellValue(equipMoveList.get(j).get("V_STATUS") == null ? "" : equipMoveList.get(j).get("V_STATUS").toString());// 新安装地址
        }

        try {
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            String fileName = new String("设备移装申请.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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
                                               @RequestParam(value = "B_B_CHECKREPORT") MultipartFile B_B_CHECKREPORT,
                                               @RequestParam(value = "I_I_PLANID") String I_I_PLANID,
                                               @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws Exception {

        String B_B_CHECKREPORT_NAME_ = BaseUtils.getFileName(B_B_CHECKREPORT.getOriginalFilename());
        InputStream B_B_CHECKREPORT_InputStream = B_B_CHECKREPORT.getInputStream();// 获取上传二进制流

        Map result = specEquipService.setCheckResultFiles(I_I_ID, V_V_ORGNAME, V_V_ORGCODE, V_V_DEPTNAME, V_V_DEPTCODE, V_V_EQUTYPENAME, V_V_EQUTYPECODE, V_V_EQUNAME, V_V_EQUCODE, V_V_CHECKTIME, V_V_CHECKPART, V_V_CHECKDEPT, B_B_CHECKREPORT_NAME_, B_B_CHECKREPORT_InputStream, I_I_PLANID, V_V_PERSONCODE);
        B_B_CHECKREPORT_InputStream.close();

        result.put("success", true);
        return result;
    }


    //导出附件
    @RequestMapping(value = "/loadEnclosure", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> loadEnclosure(
            @RequestParam(value = "V_ID") String V_ID,
            @RequestParam(value = "V_FILENAME") String V_FILENAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        Map data= specEquipService.loadEnclosure(V_ID);
        Map result = new HashMap();

        String agent = (String) request.getHeader("USER-AGENT");
        if (agent != null && agent.toLowerCase().indexOf("firefox") > 0) {// 兼容火狐中文文件名下载
            V_FILENAME = "=?UTF-8?B?" + (new String(Base64.encodeBase64(V_FILENAME.getBytes("UTF-8")))) + "?=";
        } else {
            V_FILENAME = java.net.URLEncoder.encode(V_FILENAME, "UTF-8");
        }
        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=" + V_FILENAME);// 下载模式

        InputStream fileStream = ((Blob) data.get("B_CONTENT")).getBinaryStream();
        BufferedInputStream reader = new BufferedInputStream(fileStream);
        BufferedOutputStream writer = new BufferedOutputStream(response.getOutputStream());

        byte[] bytes = new byte[1024 * 1024];
        int length = reader.read(bytes);
        while ((length > 0)) {
            writer.write(bytes, 0, length);
            length = reader.read(bytes);
        }
        reader.close();
        writer.close();

        result.put("success",true);
        return result;

    }

    //报废设备查询
    @RequestMapping(value = "/selectScrapGet", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectScrapGet(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
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
        Map result = specEquipService.selectScrapGet(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, V_V_STATUS, page.toString(), limit.toString());
        return result;
    }

    //导出检定实绩录入
    @RequestMapping(value = "/excelCheckResult", method = RequestMethod.GET)
    @ResponseBody
    public void excelCheckResult(@RequestParam(value = "I_I_ID_LIST", required = false) List<String> I_I_ID_LIST,
                                 @RequestParam(value = "V_DEPTNAME_LIST", required = false) List<String> V_DEPTNAME_LIST,
                                 @RequestParam(value = "V_EQUTYPENAME_LIST", required = false) List<String> V_EQUTYPENAME_LIST,
                                 @RequestParam(value = "V_EQUNAME_LIST", required = false) List<String> V_EQUNAME_LIST,
                                 @RequestParam(value = "V_CHECKTIME_LIST", required = false) List<String> V_CHECKTIME_LIST,
                                 @RequestParam(value = "V_CHECKPART_LIST", required = false) List<String> V_CHECKPART_LIST,
                                 @RequestParam(value = "V_CHECKDEPT_LIST", required = false) List<String> V_CHECKDEPT_LIST,
                                 @RequestParam(value = "V_FCHECKTIME_LIST", required = false) List<String> V_FCHECKTIME_LIST,
                                 @RequestParam(value = "V_COST_LIST", required = false) List<String> V_COST_LIST,
                               String V_V_PERSONCODE,
                               String V_V_DEPTCODE,
                               String V_V_DEPTCODENEXT,
                               String V_V_EQUTYPECODE,
                               String V_V_EQUTYPENAME,
                               String V_V_EQUCODE,
                               String V_V_BDATE,
                               String V_V_EDATE,
                               Integer page,
                               Integer limit,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i < 9; i++) {
            if(i== 0){
                sheet.setColumnWidth(i, 2000);
            }else if(i ==8 ){
                sheet.setColumnWidth(i, 6000);
            }else if(i ==7 ){
                sheet.setColumnWidth(i, 4000);
            }else if(i ==10 ){
                sheet.setColumnWidth(i, 6000);
            }else if(i ==4 ){
                sheet.setColumnWidth(i, 5000);
            }else if(i ==9 ){
                sheet.setColumnWidth(i, 4000);
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
        cell5.setCellValue("申请检定时间");
        cell5.setCellStyle(style);

        HSSFCell cell6 = row.createCell((short) 5);
        cell6.setCellValue("申请检定部位");
        cell6.setCellStyle(style);

        HSSFCell cell7 = row.createCell((short) 6);
        cell7.setCellValue("申请检定单位");
        cell7.setCellStyle(style);

        HSSFCell cell8 = row.createCell((short) 7);
        cell8.setCellValue("实际检定时间");
        cell8.setCellStyle(style);

        HSSFCell cell9 = row.createCell((short) 8);
        cell9.setCellValue("预计下次检定时间");
        cell9.setCellStyle(style);

        HSSFCell cell10 = row.createCell((short) 9);
        cell10.setCellValue("检定费用(元)");
        cell10.setCellStyle(style);

        List<Map<String, Object>> checkResultList = new ArrayList<Map<String, Object>>();

        //如果是选择了很多列
        if (I_I_ID_LIST.size() > 0) {

            for (int i = 0; i < I_I_ID_LIST.size(); i++) {
                Map<String, Object> v_deptName = new HashMap<String, Object>();

                v_deptName.put("V_DEPTNAME", (String)V_DEPTNAME_LIST.get(i));
                v_deptName.put("V_EQUTYPENAME", (String)V_EQUTYPENAME_LIST.get(i));
                v_deptName.put("V_EQUNAME", (String)V_EQUNAME_LIST.get(i));
                v_deptName.put("V_CHECKTIME", (String)V_CHECKTIME_LIST.get(i));
                v_deptName.put("V_CHECKPART", (String)V_CHECKPART_LIST.get(i));
                v_deptName.put("V_CHECKDEPT", (String)V_CHECKDEPT_LIST.get(i));
                v_deptName.put("V_FCHECKTIME", (String)V_FCHECKTIME_LIST.get(i));
                v_deptName.put("V_COST", (String)V_COST_LIST.get(i));

                checkResultList.add(v_deptName);
            }
        } else {
            Map<String, Object> data = specEquipService.selectCheckResult(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUTYPENAME, V_V_EQUCODE, V_V_BDATE, V_V_EDATE, page.toString(), limit.toString());

            checkResultList = (List<Map<String, Object>>) data.get("list");
        }

        for (int j = 0; j < checkResultList.size(); j++) {
            row = sheet.createRow(j + 1);
            row.setHeightInPoints(25);
            HSSFCell cellContent = row.createCell(0);
            cellContent.setCellValue(j + 1);// 序号

            cellContent = row.createCell(1);
            cellContent.setCellValue(checkResultList.get(j).get("V_DEPTNAME") == null ? "" : checkResultList.get(j).get("V_DEPTNAME").toString());// 作业区名称

            cellContent = row.createCell(2);
            cellContent.setCellValue(checkResultList.get(j).get("V_EQUTYPENAME") == null ? "" : checkResultList.get(j).get("V_EQUTYPENAME").toString());// 设备类型名称

            cellContent = row.createCell(3);
            cellContent.setCellValue(checkResultList.get(j).get("V_EQUNAME") == null ? "" : checkResultList.get(j).get("V_EQUNAME").toString());// 设备名称

            cellContent = row.createCell(4);
            cellContent.setCellValue(checkResultList.get(j).get("V_CHECKTIME") == null ? "" : checkResultList.get(j).get("V_CHECKTIME").toString());// 申请检定时间

            cellContent = row.createCell(5);
            cellContent.setCellValue(checkResultList.get(j).get("V_CHECKPART") == null ? "" : checkResultList.get(j).get("V_CHECKPART").toString());// 申请检定部位

            cellContent = row.createCell(6);
            cellContent.setCellValue(checkResultList.get(j).get("V_CHECKDEPT") == null ? "" : checkResultList.get(j).get("V_CHECKDEPT").toString());// 申请检定单位

            cellContent = row.createCell(7);
            cellContent.setCellValue(checkResultList.get(j).get("V_FCHECKTIME") == null ? "" : checkResultList.get(j).get("V_FCHECKTIME").toString());// 实际检定时间

            cellContent = row.createCell(8);
            cellContent.setCellValue("");// 预计下次检定时间

            cellContent = row.createCell(9);
            cellContent.setCellValue(checkResultList.get(j).get("V_COST") == null ? "" : checkResultList.get(j).get("V_COST").toString());// 检定费用
        }

        try {
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            String fileName = new String("检定实绩录入.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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
