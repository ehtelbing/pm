package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.building.pm.service.Dx_fileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.nio.charset.Charset;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/app/pm/turntime/")
public class TurnTimeController {

    @Autowired
    private Dx_fileService dx_fileService;
    //设备部周计划导入excel
    @RequestMapping(value = "sbbImporteWeekExcel", method = RequestMethod.POST)
    @ResponseBody

    public Map sbbImporteWeekExcel(
            @RequestParam(value = "V_LOCKPER") String V_LOCKPER,
            @RequestParam(value = "V_LOCKPERNAME") String V_LOCKPERNAME,
            @RequestParam(value = "upload") MultipartFile upload,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
//        String errMsg="";
        Map errMsg=new HashMap();
        List list = new ArrayList();
        int snum=0;
        int fnum=0;
        int rownum=0;
        HttpHeaders headers = new HttpHeaders();
        String[] tableHeader = new String[] { "序号","计划状态", "设备名称", "专业",
                "检修内容", "计划停机日期", "计划竣工日期", "计划工期（小时）", "厂矿", "车间名称","录入人",
                "录入时间", "SBBGUID"};

        MediaType mt = new MediaType("text", "html", Charset.forName("UTF-8"));
        headers.setContentType(mt);
        String json = "";
        try{
            Workbook hssfBook = null;
            InputStream is =upload.getInputStream();//获取excel数据
            if (upload.getOriginalFilename().contains(".xlsx")) {
                hssfBook = new XSSFWorkbook(is); // excel2007
            } else {
                hssfBook = new HSSFWorkbook(is); // excel2003
            }
            Sheet sheet=hssfBook.getSheetAt(0);//或 表头数据
            int rowNum=sheet.getLastRowNum();
            if(rowNum==0){
//                errMsg=new String("您上传的excel没有数据！");
                errMsg.put("RET","您上传的excel没有数据！");
                errMsg.put("success",false);
                return errMsg;
            }
            Row row=sheet.getRow(0);
            int colNum=0;
            colNum=row.getLastCellNum();
            //验证表头格式
            for(int i=0;i<tableHeader.length;i++){
                row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                if(!tableHeader[i].trim().equals(row.getCell(i).getStringCellValue().trim())){
//                    errMsg = row.getCell(i).getStringCellValue().trim()+"--"+tableHeader[i].trim()+"--"+"模板列头不正确！,请重新导出后修改";
                    errMsg.put("RET","模板列头不正确！,请重新导出后修改");
                    errMsg.put("success",false);
                    return errMsg;
                }
                else{
                    rownum=rowNum;
                }
            }
            if(rownum!=0) {
                for (int j = 1; j <= rownum;j++) {
                    String V_V_STARTTIME="";
                    String V_V_ENDTIME ="";
                    String V_V_SBBGUID = sheet.getRow(j).getCell(12).getStringCellValue().trim();
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
                    //star
                    if (sheet.getRow(j).getCell(5).getCellType() == Cell.CELL_TYPE_STRING) {
                        int m=0;
                        m=sheet.getRow(j).getCell(5).getStringCellValue().indexOf("-");
                        if(m!=0){
                            V_V_STARTTIME =  sheet.getRow(j).getCell(5).getStringCellValue().replace("-","/");
                        }
                    }
                    else{
                        Date date1 = sheet.getRow(j).getCell(5).getDateCellValue();
                        V_V_STARTTIME = dateFormat.format(date1);
                    }
                    //end
                    if (sheet.getRow(j).getCell(6).getCellType() == Cell.CELL_TYPE_STRING) {
                        int n=0;
                        n=sheet.getRow(j).getCell(6).getStringCellValue().indexOf("-");
                        if(n!=0){
                            V_V_ENDTIME = sheet.getRow(j).getCell(6).getStringCellValue().replace("-","/");
                        }
                    }
                    else{
                        Date date2 = sheet.getRow(j).getCell(6).getDateCellValue();
                        V_V_ENDTIME = dateFormat.format(date2);
                    }
                    //hour
                    String V_V_HOUR="";
                    if(sheet.getRow(j).getCell(7)!=null){
                        sheet.getRow(j).getCell(7).setCellType(Cell.CELL_TYPE_STRING);
                        V_V_HOUR = sheet.getRow(j).getCell(7).getStringCellValue().trim();
                    }
                    Map resutlt = dx_fileService.PRO_PM_03_PLAN_WEEK_IMPORT(V_V_SBBGUID, V_V_STARTTIME, V_V_ENDTIME, V_V_HOUR, V_LOCKPER, V_LOCKPERNAME);
                    if (resutlt.size() > 0) {
                        if (resutlt.get("RET").equals("SUCCESS")) {
                            snum++;
                        }
                    } else {
                        fnum++;
                    }
                }
                if (rownum == snum) {
//                    errMsg = new String("success");
                    errMsg.put("RET","导入成功");
                    errMsg.put("success",true);
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return errMsg;

    }
}
