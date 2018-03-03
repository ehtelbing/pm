package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.building.pm.webpublic.DXClass;
import org.building.pm.webpublic.FalutClass;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ReadExcel {
    //总行数
    private int totalRows = 0;
    //总条数
    private int totalCells = 0;
    //错误信息接收器
    private String errorMsg;
    //构造方法
    public ReadExcel(){}
    //获取总行数
    public int getTotalRows()  { return totalRows;}
    //获取总列数
    public int getTotalCells() {  return totalCells;}
    //获取错误信息
    public String getErrorInfo() { return errorMsg; }

    public List getExcelInfo(MultipartFile mFile) {
        String fileName = mFile.getOriginalFilename();//获取文件名
        List userList = null;
        try {
            if (!validateExcel(fileName)) {// 验证文件名是否合格
                return null;
            }
            boolean isExcel2003 = true;// 根据文件名判断文件是2003版本还是2007版本
            if (isExcel2007(fileName)) {
                isExcel2003 = false;
            }
             userList = createExcel(mFile.getInputStream(), isExcel2003);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userList;
    }

    public List createExcel(InputStream is, boolean isExcel2003) {
        List userList = null;
        try{
            Workbook wb = null;

            if (isExcel2003) {// 当excel是2003时,创建excel2003
                wb = new HSSFWorkbook(is);
            } else {// 当excel是2007时,创建excel2007
                wb = new XSSFWorkbook(is);
            }
          userList = readExcelValue(wb);// 读取Excel里面客户的信息
        } catch (IOException e) {
            e.printStackTrace();
        }
        return userList;
    }


    public boolean validateExcel(String filePath) {
        if (filePath == null || !(isExcel2003(filePath) || isExcel2007(filePath))) {
            errorMsg = "文件名不是excel格式";
            return false;
        }
        return true;
    }

    // @描述：是否是2003的excel，返回true是2003   
    public static boolean isExcel2003(String filePath)  {
        return filePath.matches("^.+\\.(?i)(xls)$");
    }

    //@描述：是否是2007的excel，返回true是2007   
    public static boolean isExcel2007(String filePath)  {
        return filePath.matches("^.+\\.(?i)(xlsx)$");
    }

    private List readExcelValue(Workbook wb) {
        // 得到第一个shell
        Sheet sheet = wb.getSheetAt(0);
        // 得到Excel的行数
        this.totalRows = sheet.getPhysicalNumberOfRows();
        // 得到Excel的列数(前提是有行数)
        if (totalRows > 1 && sheet.getRow(0) != null) {
            this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();
        }
        List userList = new ArrayList();
        // 循环Excel行数
        for (int r = 1; r < totalRows; r++) {
            Row row = sheet.getRow(r);
            if (row == null){
                continue;
            }
            // 循环Excel的列
            DXClass user = new DXClass();
            for (int c = 0; c < this.totalCells; c++) {
                Cell cell = row.getCell(c);
                if (null != cell) {
                    if (c == 0) {
                        //如果是纯数字,比如你写的是25,cell.getNumericCellValue()获得是25.0,通过截取字符串去掉.0获得25
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String I_ID = String.valueOf(cell.getNumericCellValue());
                            user.setI_ID(I_ID.substring(0, I_ID.length()-2>0?I_ID.length()-2:1));
                        }else{
                            user.setI_ID(cell.getStringCellValue());
                        }
                    } else if (c == 1) {
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            Double v_BUDGET_MONEY = cell.getNumericCellValue();
                            user.setV_BUDGET_MONEY(v_BUDGET_MONEY);
                        }else{
                            user.setV_BUDGET_MONEY(cell.getNumericCellValue());
                        }
                    } else if (c == 2){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_BZ = String.valueOf(cell.getNumericCellValue());
                            user.setV_BZ(v_BZ.substring(0, v_BZ.length()-2>0?v_BZ.length()-2:1));
                        }else{
                            user.setV_BZ(cell.getStringCellValue());
                        }
                    }else if (c == 3){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_CONTENT = String.valueOf(cell.getNumericCellValue());
                            user.setV_CONTENT(v_CONTENT.substring(0, v_CONTENT.length()-2>0?v_CONTENT.length()-2:1));
                        }else{
                            user.setV_CONTENT(cell.getStringCellValue());
                        }
                    }else if (c == 4){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            SimpleDateFormat sd = new SimpleDateFormat("yyyy/MM/dd");
                            Date date = new Date();
                            String DATE_B = sd.format(date);
                            user.setV_DATE_B(DATE_B);
                        }else{
                            user.setV_DATE_B(cell.getStringCellValue());
                        }
                    }else if (c == 5){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            SimpleDateFormat sd = new SimpleDateFormat("yyyy/MM/dd");
                            Date date = new Date();
                            String DATE_E = sd.format(date);
                            user.setV_DATE_E(DATE_E);
                            //String DATE_E = String.valueOf(cell.getNumericCellValue());
                            //user.setV_DATE_E(DATE_E.substring(0, DATE_E.length()-2>0?DATE_E.length()-2:1));
                        }else{
                            user.setV_DATE_E(cell.getStringCellValue());
                        }
                    }else if (c == 6){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String DEPTCODE = String.valueOf(cell.getNumericCellValue());
                            user.setV_DEPTCODE(DEPTCODE.substring(0, DEPTCODE.length()-2>0?DEPTCODE.length()-2:1));
                        }else{
                            user.setV_DEPTCODE(cell.getStringCellValue());
                        }
                    }else if (c == 7){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String FALG = String.valueOf(cell.getNumericCellValue());
                            user.setV_FALG(FALG.substring(0, FALG.length()-2>0?FALG.length()-2:1));
                        }else{
                            user.setV_FALG(cell.getStringCellValue());
                        }
                    }else if (c == 8){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String FLOW_STATE = String.valueOf(cell.getNumericCellValue());
                            user.setV_FLOW_STATE(FLOW_STATE.substring(0, FLOW_STATE.length()-2>0?FLOW_STATE.length()-2:1));
                        }else{
                            user.setV_FLOW_STATE(cell.getStringCellValue());
                        }
                    }else if (c == 9){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_FZR = String.valueOf(cell.getNumericCellValue());
                            user.setV_FZR(v_FZR.substring(0, v_FZR.length()-2>0?v_FZR.length()-2:1));
                        }else{
                            user.setV_FZR(cell.getStringCellValue());
                        }
                    }else if (c == 10){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_GUID = String.valueOf(cell.getNumericCellValue());
                            user.setV_GUID(v_GUID.substring(0, v_GUID.length()-2>0?v_GUID.length()-2:1));
                        }else{
                            user.setV_GUID(cell.getStringCellValue());
                        }
                    }else if (c == 11){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_INPER = String.valueOf(cell.getNumericCellValue());
                            user.setV_INPER(v_INPER.substring(0, v_INPER.length()-2>0?v_INPER.length()-2:1));
                        }else{
                            user.setV_INPER(cell.getStringCellValue());
                        }
                    }else if (c == 12){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            //String v_INTIEM = String.valueOf(cell.getNumericCellValue());

                            SimpleDateFormat sd = new SimpleDateFormat("yyyy/MM/dd");
                            Date date = new Date();
                            String v_INTIEM = sd.format(date);
                            user.setV_INTIEM(v_INTIEM);
//                            SimpleDateFormat v_INTIEM = new SimpleDateFormat("yyyy-MM-dd");
//                            v_INTIEM.format(collValue);

                        }else{
                            user.setV_INTIEM(cell.getStringCellValue());
                        }
                    }else if (c == 13){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_MAJOR_CODE = String.valueOf(cell.getNumericCellValue());
                            user.setV_MAJOR_CODE(v_MAJOR_CODE.substring(0, v_MAJOR_CODE.length()-2>0?v_MAJOR_CODE.length()-2:1));
                        }else{
                            user.setV_MAJOR_CODE(cell.getStringCellValue());
                        }
                    }else if (c == 14){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_MONTH = String.valueOf(cell.getNumericCellValue());
                            user.setV_MONTH(v_MONTH.substring(0, v_MONTH.length()-2>0?v_MONTH.length()-2:1));
                        }else{
                            user.setV_MONTH(cell.getStringCellValue());
                        }
                    }else if (c == 15){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_ORGCODE = String.valueOf(cell.getNumericCellValue());
                            user.setV_ORGCODE(v_ORGCODE.substring(0, v_ORGCODE.length()-2>0?v_ORGCODE.length()-2:1));
                        }else{
                            user.setV_ORGCODE(cell.getStringCellValue());
                        }
                    }else if (c == 16){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_PROJECT_CODE = String.valueOf(cell.getNumericCellValue());
                            user.setV_PROJECT_CODE(v_PROJECT_CODE.substring(0, v_PROJECT_CODE.length()-2>0?v_PROJECT_CODE.length()-2:1));
                        }else{
                            user.setV_PROJECT_CODE(cell.getStringCellValue());
                        }
                    }else if (c == 17){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_PROJECT_NAME = String.valueOf(cell.getNumericCellValue());
                            user.setV_PROJECT_NAME(v_PROJECT_NAME.substring(0, v_PROJECT_NAME.length()-2>0?v_PROJECT_NAME.length()-2:1));
                        }else{
                            user.setV_PROJECT_NAME(cell.getStringCellValue());
                        }
                    }else if (c == 18){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_REPAIR_DEPT = String.valueOf(cell.getNumericCellValue());
                            user.setV_REPAIR_DEPT(v_REPAIR_DEPT.substring(0, v_REPAIR_DEPT.length()-2>0?v_REPAIR_DEPT.length()-2:1));
                        }else{
                            user.setV_REPAIR_DEPT(cell.getStringCellValue());
                        }
                    }else if (c == 19){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_TYPE_CODE = String.valueOf(cell.getNumericCellValue());
                            user.setV_TYPE_CODE(v_TYPE_CODE.substring(0, v_TYPE_CODE.length()-2>0?v_TYPE_CODE.length()-2:1));
                        }else{
                            user.setV_TYPE_CODE(cell.getStringCellValue());
                        }
                    }else if (c == 20){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_WBS_CODE = String.valueOf(cell.getNumericCellValue());
                            user.setV_WBS_CODE(v_WBS_CODE.substring(0, v_WBS_CODE.length()-2>0?v_WBS_CODE.length()-2:1));
                        }else{
                            user.setV_WBS_CODE(cell.getStringCellValue());
                        }
                    }else if (c == 21){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_WBS_NAME = String.valueOf(cell.getNumericCellValue());
                            user.setV_WBS_NAME(v_WBS_NAME.substring(0, v_WBS_NAME.length()-2>0?v_WBS_NAME.length()-2:1));
                        }else{
                            user.setV_WBS_NAME(cell.getStringCellValue());
                        }
                    }else if (c == 22){
                        if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            String v_YEAR = String.valueOf(cell.getNumericCellValue());
                            user.setV_YEAR(v_YEAR.substring(0, v_YEAR.length()-2>0?v_YEAR.length()-2:1));
                        }else{
                            user.setV_YEAR(cell.getStringCellValue());
                        }
                    }
                }
            }
            // 添加到list
            userList.add(user);
        }
        return userList;
    }
}  

