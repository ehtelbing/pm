package org.building.pm.controller;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class BaseUtils {
    /**
     * 将String字符串转换为Date格式日期,用于数据库保存
     * 
     * @param strDate
     *        表示日期的字符串
     * @param dateFormat
     *        传入字符串的日期表示格式（如："yyyy-MM-dd HH:mm:ss"）
     * @return java.sql.Timestamp类型日期对象（如果转换失败则返回null）
     */
    public static Date strToUtilDate(String strDate, String dateFormat) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
        Date date = null;
        try {
            date = simpleDateFormat.parse(strDate);
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}