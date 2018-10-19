package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class ExcelData {
    //错误信息接收器
    private String errorMsg;

    @SuppressWarnings("rawtypes")
    public boolean validateExcel(String filePath) {
        if (filePath == null || !(isExcel2003(filePath) || isExcel2007(filePath))) {
            errorMsg = "文件名不是excel格式";
            return false;
        }
        return true;
    }
    public Workbook createExcel(InputStream is, boolean isExcel2003) {
        Workbook wb = null;
        try{


            if (isExcel2003) {// 当excel是2003时,创建excel2003
                wb = new HSSFWorkbook(is);
            } else {// 当excel是2007时,创建excel2007
                wb = new XSSFWorkbook(is);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return wb;
    }
    // @描述：是否是2003的excel，返回true是2003
    public static boolean isExcel2003(String filePath)  {
        return filePath.matches("^.+\\.(?i)(xls)$");
    }

    //@描述：是否是2007的excel，返回true是2007
    public static boolean isExcel2007(String filePath)  {
        return filePath.matches("^.+\\.(?i)(xlsx)$");
    }

    public List GetData(MultipartFile mFile, Integer headLine) {
        String fileName = mFile.getOriginalFilename();//获取文件名
        List list = null;
        try {
            if (!validateExcel(fileName)) {// 验证文件名是否合格
                return null;
            }
            boolean isExcel2003 = true;// 根据文件名判断文件是2003版本还是2007版本
            if (isExcel2007(fileName)) {
                isExcel2003 = false;
            }
            list = getExceltoDate(mFile.getInputStream(), headLine, isExcel2003);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
    /**
     * 读取Excel 返回值为 List<Map> key 值 为 k0到kn 以能取到的列为准
     *
     * @param steam    excel 文件流
     * @param headLine 从第几行读数据，从第0行开始
     * @return
     */


    public List<Map> getExceltoDate(InputStream steam, Integer headLine,boolean isExcel2003) {
        List<Map> result = new ArrayList<Map>();
        Workbook wb=createExcel(steam, isExcel2003);

        try {

            // 把一张xls的数据表读到wb里



            // 读取第一页,一般一个excel文件会有三个工作表，这里获取第一个工作表来进行操作


            // 循环遍历表sheet.getLastRowNum()是获取一个表最后一条记录的记录号，

            // 如果总共有3条记录，那获取到的最后记录号就为2，因为是从0开始的
            Sheet sheet = wb.getSheetAt(0);
            // 得到Excel的行数

            for (int j = headLine; j < sheet.getLastRowNum() + 1; j++) {

                // 创建一个行对象
                Row row = sheet.getRow(j);

                // 把一行里的每一个字段遍历出来

                Map rowData = new HashMap();

                for (int i = 0; i < row.getLastCellNum(); i++) {

                    // 创建一个行里的一个字段的对象，也就是获取到的一个单元格中的值

                    Cell cell = row.getCell(i);

                    Object value = null;
                    if (cell != null) {

                        switch (cell.getCellType()) {
                            case Cell.CELL_TYPE_BLANK:
                                value = "";
                                break;
                            case Cell.CELL_TYPE_BOOLEAN:
                                value = cell.getBooleanCellValue();
                                break;
                            case Cell.CELL_TYPE_ERROR:
                                value = cell.getErrorCellValue();
                                break;
                            case Cell.CELL_TYPE_FORMULA:

                                try {
                                    value = String.valueOf(cell
                                            .getNumericCellValue());
                                } catch (IllegalStateException e) {
                                    value = String.valueOf(cell
                                            .getRichStringCellValue());
                                }
                                break;
                            case Cell.CELL_TYPE_NUMERIC:
                                if (org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(cell)) {
                                    Date theDate = cell.getDateCellValue();
                                    SimpleDateFormat dff = new SimpleDateFormat("yyyy/MM/dd");
                                    value = dff.format(theDate);
                                }else{
                                    DecimalFormat df = new DecimalFormat("0");
                                    value = df.format(cell.getNumericCellValue());
                                }


                                break;

                            case Cell.CELL_TYPE_STRING:
                                value = cell.getStringCellValue();
                                break;
                            default:
                                break;
                        }

                    } else {
                        value = "";
                    }

                    rowData.put("k" + i, value);
                }

                result.add(rowData);

            }
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    @SuppressWarnings("rawtypes")
    public static List<Map> GetDataUp(InputStream steam, Integer headLine) {
        List<Map> result = new ArrayList<Map>();

        try {

            // 把一张xlsx的数据表读到wb里
            XSSFWorkbook wb = new XSSFWorkbook(steam);

            XSSFSheet sheet = wb.getSheetAt(0);

            // 循环遍历表sheet.getLastRowNum()是获取一个表最后一条记录的记录号，

            // 如果总共有3条记录，那获取到的最后记录号就为2，因为是从0开始的

            for (int j = headLine; j < sheet.getLastRowNum() + 1; j++) {

                // 创建一个行对象

                XSSFRow row = sheet.getRow(j);

                // 把一行里的每一个字段遍历出来

                Map rowData = new HashMap();

                for (int i = 0; i < row.getLastCellNum(); i++) {

                    // 创建一个行里的一个字段的对象，也就是获取到的一个单元格中的值

                    XSSFCell cell = row.getCell(i);
                    Object value = null;
                    if (cell != null) {
                        switch (cell.getCellType()) {
                            case Cell.CELL_TYPE_BLANK:
                                value = "";
                                break;
                            case Cell.CELL_TYPE_BOOLEAN:
                                value = cell.getBooleanCellValue();
                                break;
                            case Cell.CELL_TYPE_ERROR:
                                value = cell.getErrorCellString();
                                break;
                            case Cell.CELL_TYPE_FORMULA:
                                value = cell.getRawValue();
                                break;
                            case Cell.CELL_TYPE_NUMERIC:
                                value = cell.getNumericCellValue();
                                break;
                            case Cell.CELL_TYPE_STRING:
                                value = cell.getStringCellValue();
                                break;
                            default:
                                break;
                        }
                    } else {
                        value = "";
                    }

                    rowData.put("k" + i, value);
                }

                result.add(rowData);
            }
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}
