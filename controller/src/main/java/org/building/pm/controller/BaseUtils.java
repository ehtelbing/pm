package org.building.pm.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class BaseUtils {
    /**
     * 将String字符串转换为Date格式日期,用于数据库保存
     *
     * @param strDate    表示日期的字符串
     * @param dateFormat 传入字符串的日期表示格式（如："yyyy-MM-dd HH:mm:ss"）
     * @return java.sql.Timestamp类型日期对象（如果转换失败则返回null）
     */
    public static Date strToUtilDate(String strDate, String dateFormat) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
        Date date = null;
        try {
            date = simpleDateFormat.parse(strDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 获取本地消息
     *
     * @param code
     * @param args
     * @param request
     * @return
     */
    public static String getLocaleMessage(String code, Object[] args, HttpServletRequest request) {
        return new RequestContext(request).getMessage(code, args);
    }

    public static String getErrorMessage(Exception e, HttpServletRequest request) {
        if (e instanceof DuplicateKeyException) {
            return getLocaleMessage("errors.duplicateKey", null, request);
        }
        if (e instanceof DataIntegrityViolationException) {
            return getLocaleMessage("errors.dataIntegrityViolation", null, request);
        }
        return e.getMessage();
    }
}