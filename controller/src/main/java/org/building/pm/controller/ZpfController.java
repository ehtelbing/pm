package org.building.pm.controller;

/**
 * Created by lxm on 2017/12/11.
 */

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.ZpfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/pm/zpf")
public class ZpfController {
    @Autowired
    private ZpfService zpfService;

    @RequestMapping(value = "/PRO_MM_PLANT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_MM_PLANT(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.PRO_MM_PLANT();
        List<Map<String, Object>> zpflist = (List) data.get("list");
        result.put("list", zpflist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_MM_DEPART", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_MM_DEPART(
            @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.PRO_MM_DEPART(A_PLANTCODE);
        List<Map<String, Object>> zpflist = (List) data.get("list");
        result.put("list", zpflist);
        result.put("success", true);
        return result;

    }

    @RequestMapping(value = "/pro_sy103_loc_able", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_sy103_loc_able(
            @RequestParam(value = "plantcode_in") String plantcode_in,
            @RequestParam(value = "departcode_in") String departcode_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.pro_sy103_loc_able(plantcode_in, departcode_in);
        List<Map<String, Object>> zpflist = (List) data.get("list");
        result.put("list", zpflist);
        result.put("success", true);
        return result;


    }

    @RequestMapping(value = "/pro_sy104_equlist", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy104_equlist(
            @RequestParam(value = "plantcode_in") String plantcode_in,
            @RequestParam(value = "departcode_in") String departcode_in,
            @RequestParam(value = "loccode_in") String loccode_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_sy104_equlist(plantcode_in, departcode_in, loccode_in);
    }

    @RequestMapping(value = "/pro_sy104_addequ", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy104_addequ(
            @RequestParam(value = "equcode_in") String equcode_in,
            @RequestParam(value = "equname_in") String equname_in,
            @RequestParam(value = "plantcode_in") String plantcode_in,
            @RequestParam(value = "plantname_in") String plantname_in,
            @RequestParam(value = "departcode_in") String departcode_in,
            @RequestParam(value = "departname_in") String departname_in,
            @RequestParam(value = "loccode_in") String loccode_in,
            @RequestParam(value = "locname_in") String locname_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_sy104_addequ(equcode_in, equname_in, plantcode_in, plantname_in, departcode_in,
                departname_in, loccode_in, locname_in);
    }

    @RequestMapping(value = "/pro_sy104_updateequ", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy104_updateequ(
            @RequestParam(value = "equcode_in") String equcode_in,
            @RequestParam(value = "equname_in") String equname_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_sy104_updateequ(equcode_in, equname_in);
    }

    @RequestMapping(value = "/pro_sy104_deleteequ", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy104_deleteequ(
            @RequestParam(value = "equcode_in") String equcode_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_sy104_deleteequ(equcode_in);
    }

    @RequestMapping(value = "/pro_sy104_startequ", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy104_startequ(
            @RequestParam(value = "equcode_in") String equcode_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_sy104_startequ(equcode_in);
    }

    @RequestMapping(value = "/pro_sy104_stopequ", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy104_stopequ(
            @RequestParam(value = "equcode_in") String equcode_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_sy104_stopequ(equcode_in);
    }

    @RequestMapping(value = "/pro_sy105_recordstatuslist", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_sy105_recordstatuslist(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_sy105_recordstatuslist();
    }

    @RequestMapping(value = "/pg_sy106_syuserlist", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pg_sy106_syuserlist(
            @RequestParam(value = "a_plantcode") String a_plantcode,
            @RequestParam(value = "a_departcode") String a_departcode,
            @RequestParam(value = "a_loc_code") String a_loc_code,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pg_sy106_syuserlist(a_plantcode, a_departcode, a_loc_code);
    }

    @RequestMapping(value = "/pg_sy106_addsyuser", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pg_sy106_addsyuser(
            @RequestParam(value = "a_usercode") String a_usercode,
            @RequestParam(value = "a_username") String a_username,
            @RequestParam(value = "a_plantcode") String a_plantcode,
            @RequestParam(value = "a_deptcode") String a_deptcode,
            @RequestParam(value = "a_loc_code") String a_loc_code,
            @RequestParam(value = "a_sts") String a_sts,
            @RequestParam(value = "a_plantname") String a_plantname,
            @RequestParam(value = "a_deptname") String a_deptname,
            @RequestParam(value = "a_loc_name") String a_loc_name,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pg_sy106_addsyuser(a_usercode, a_username, a_plantcode, a_deptcode, a_loc_code,
                a_sts, a_plantname, a_deptname, a_loc_name);
    }

    @RequestMapping(value = "/pg_sy106_updatesyuser", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pg_sy106_updatesyuser(
            @RequestParam(value = "a_usercode") String a_usercode,
            @RequestParam(value = "a_username") String a_username,
            @RequestParam(value = "a_plantcode") String a_plantcode,
            @RequestParam(value = "a_deptcode") String a_deptcode,
            @RequestParam(value = "a_loc_code") String a_loc_code,
            @RequestParam(value = "a_sts") String a_sts,
            @RequestParam(value = "a_plantname") String a_plantname,
            @RequestParam(value = "a_deptname") String a_deptname,
            @RequestParam(value = "a_loc_name") String a_loc_name,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pg_sy106_updatesyuser(a_usercode, a_username, a_plantcode, a_deptcode, a_loc_code,
                a_sts, a_plantname, a_deptname, a_loc_name);
    }

    @RequestMapping(value = "/pg_sy106_deletesyuser", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pg_sy106_deletesyuser(
            @RequestParam(value = "a_usercode") String a_usercode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pg_sy106_deletesyuser(a_usercode);
    }

    @RequestMapping(value = "/pg_sy106_startsyuser", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pg_sy106_startsyuser(
            @RequestParam(value = "a_usercode") String a_usercode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pg_sy106_startsyuser(a_usercode);
    }

    @RequestMapping(value = "/pg_sy106_stopsyuser", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pg_sy106_stopsyuser(
            @RequestParam(value = "a_usercode") String a_usercode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pg_sy106_stopsyuser(a_usercode);
    }

    @RequestMapping(value = "/pro_dj106_djseries_able", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_dj106_djseries_able(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_dj106_djseries_able();
    }

    @RequestMapping(value = "/pro_dj501_menddept_dept", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_dj501_menddept_dept(
            @RequestParam(value = "jxplantcode_in") String jxplantcode_in,
            @RequestParam(value = "usercode_in") String usercode_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_dj501_menddept_dept(jxplantcode_in, usercode_in);
    }

    @RequestMapping(value = "/pro_dj601_menddept_group", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_dj601_menddept_group(
            @RequestParam(value = "deptcode_in") String deptcode_in,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_dj601_menddept_group(deptcode_in);
    }

    @RequestMapping(value = "/PG_DJ604_GETDJMENDTABLE", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PG_DJ604_GETDJMENDTABLE(
            @RequestParam(value = "A_DATETYPE") String A_DATETYPE,
            @RequestParam(value = "A_BEGINDATE") Date A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") Date A_ENDDATE,
            @RequestParam(value = "A_DJ_SERIES_CLASS") String A_DJ_SERIES_CLASS,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_SENDPLANT") String A_SENDPLANT,
            @RequestParam(value = "A_PLANT") String A_PLANT,
            @RequestParam(value = "A_DEPT") String A_DEPT,
            @RequestParam(value = "A_GROUP") String A_GROUP,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return zpfService.PG_DJ604_GETDJMENDTABLE(A_DATETYPE, A_BEGINDATE, A_ENDDATE, A_DJ_SERIES_CLASS, A_ORDERID,
                A_SENDPLANT, A_PLANT, A_DEPT, A_GROUP);
    }

    //电机维修台账导出表
    @RequestMapping(value = "/DJWXTZ_EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void DJWXZT_EXCEL(
            @RequestParam(value = "A_DATETYPE") String A_DATETYPE,
            @RequestParam(value = "A_BEGINDATE") Date A_BEGINDATE,
            @RequestParam(value = "A_ENDDATE") Date A_ENDDATE,
            @RequestParam(value = "A_DJ_SERIES_CLASS") String A_DJ_SERIES_CLASS,
            @RequestParam(value = "A_ORDERID") String A_ORDERID,
            @RequestParam(value = "A_SENDPLANT") String A_SENDPLANT,
            @RequestParam(value = "A_PLANT") String A_PLANT,
            @RequestParam(value = "A_DEPT") String A_DEPT,
            @RequestParam(value = "A_GROUP") String A_GROUP,
            HttpServletResponse response) throws //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        //将传进来字符串转化成sqldate
       /* SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date s1 = sdf.parse(A_BEGINDATE);
        java.util.Date s2 = sdf.parse(A_ENDDATE);
        java.sql.Date SQL_BEGINDATE = new java.sql.Date(s1.getTime());
        java.sql.Date SQL_ENDDATE = new java.sql.Date(s2.getTime());*/

        List list = new ArrayList();

        //V_V_DEFECTLIST = new String(V_V_DEFECTLIST.getBytes("iso-8859-1"), "utf-8");

        Map<String, Object> data = zpfService.PG_DJ604_GETDJMENDTABLE(A_DATETYPE, A_BEGINDATE, A_ENDDATE, A_DJ_SERIES_CLASS, A_ORDERID,
                A_SENDPLANT, A_PLANT, A_DEPT, A_GROUP);

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
        cell.setCellValue("作业编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("容量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("电压");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("安装部位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("维修类别");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("修制内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("入厂时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("合格时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 10);
        cell.setCellValue("出场时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 11);
        cell.setCellValue("检修工期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 12);
        cell.setCellValue("在厂时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 13);
        cell.setCellValue("检修班组");
        cell.setCellStyle(style);

        cell = row.createCell((short) 14);
        cell.setCellValue("负责人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 15);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());

                row.createCell((short) 2).setCellValue(map.get("APPLY_PLANTNAME") == null ? "" : map.get("APPLY_PLANTNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("DJ_VOL") == null ? "" : map.get("DJ_VOL").toString());

                row.createCell((short) 4).setCellValue(map.get("DJ_V") == null ? "" : map.get("DJ_V").toString());

                row.createCell((short) 5).setCellValue(map.get("DJ_EQUPOSITION") == null ? "" : map.get("DJ_EQUPOSITION").toString());

                row.createCell((short) 6).setCellValue(map.get("MEND_TYPE") == null ? "" : map.get("MEND_TYPE").toString());

                row.createCell((short) 7).setCellValue(map.get("MEND_CONTEXT") == null ? "" : map.get("MEND_CONTEXT").toString());

                row.createCell((short) 8).setCellValue(map.get("PLAN_BEGINDATE") == null ? "" : map.get("PLAN_BEGINDATE").toString());

                row.createCell((short) 9).setCellValue(map.get("EXA_DATE") == null ? "" : map.get("EXA_DATE").toString());

                row.createCell((short) 10).setCellValue(map.get("OUT_DATE") == null ? "" : map.get("OUT_DATE").toString());

                row.createCell((short) 11).setCellValue(map.get("EXA_TIME") == null ? "" : map.get("EXA_TIME").toString());

                row.createCell((short) 12).setCellValue(map.get("OUT_TIME") == null ? "" : map.get("OUT_TIME").toString());

                row.createCell((short) 13).setCellValue(map.get("MENDDEPT_NAME") == null ? "" : map.get("MENDDEPT_NAME").toString());

                row.createCell((short) 14).setCellValue(map.get("MEND_USERNAME") == null ? "" : map.get("MEND_USERNAME").toString());

                row.createCell((short) 15).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                String fileName = new String("电机维修表.xls".getBytes("UTF-8"), "ISO-8859-1");// 设置下载时客户端Excel的名称
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

    //查询润滑数据
    @RequestMapping(value = "/PRO_QUERYLUBRECORD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_QUERYLUBRECORD(
            @RequestParam(value = "X_TIMELOWERLIMIT") Date X_TIMELOWERLIMIT,
            @RequestParam(value = "X_TIMEUPPERLIMIT") Date X_TIMEUPPERLIMIT,
            @RequestParam(value = "X_DEPTCODE") String X_DEPTCODE,
            @RequestParam(value = "X_EQUTYPECODE") String X_EQUTYPECODE,
            @RequestParam(value = "X_EQUCODE") String X_EQUCODE,
            @RequestParam(value = "X_LUBRICATIONCODE") String X_LUBRICATIONCODE,
            /*@RequestParam(value = "start") Integer start,
            @RequestParam(value = "limit") Integer limit,*/
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.PRO_QUERYLUBRECORD(X_TIMELOWERLIMIT,X_TIMEUPPERLIMIT,X_DEPTCODE,X_EQUTYPECODE,X_EQUCODE,X_LUBRICATIONCODE);
        //List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> list = (List) data.get("list");
        /*int total = list.size();
        if (limit != null) {
            int endPage = (start + limit) >= total ? total : (start + limit);
            pageList = list.subList(start, endPage);
        } else {
            pageList = list;
        }*/
        //result.put("total", total);
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/pro_addlubrecord", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_addlubrecord(
            @RequestParam(value = "x_deptcode") String x_deptcode,
            @RequestParam(value = "x_equcode") String x_equcode,
            @RequestParam(value = "x_setname") String x_setname,
            @RequestParam(value = "x_lubaddress") String x_lubaddress,
            @RequestParam(value = "x_lubmode") String x_lubmode,
            @RequestParam(value = "x_lubtrademark") String x_lubtrademark,
            @RequestParam(value = "x_lubcount") int x_lubcount,
            @RequestParam(value = "x_oilamount") int x_oilamount,
            @RequestParam(value = "x_addorchange") String x_addorchange,
            @RequestParam(value = "x_operatedate" ) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") java.util.Date x_operatedate,
            @RequestParam(value = "x_operateperson") String x_operateperson,
            @RequestParam(value = "x_operatereason") String x_operatereason,
            @RequestParam(value = "x_unit") int x_unit,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_addlubrecord(x_deptcode, x_equcode, x_setname, x_lubaddress, x_lubmode, x_lubtrademark,
                x_lubcount, x_oilamount, x_addorchange, x_operatedate, x_operateperson, x_operatereason, x_unit);
    }

    @RequestMapping(value = "/droplist_lubmode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> droplist_lubmode(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.droplist_lubmode();
        List<Map<String, Object>> zpflist = (List) data.get("list");
        result.put("list", zpflist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/droplist_lubaddtype", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> droplist_lubaddtype(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.droplist_lubaddtype();
        List<Map<String, Object>> zpflist = (List) data.get("list");
        result.put("list", zpflist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/pro_alterlubrecord", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_alterlubrecord(
            @RequestParam(value = "x_setname") String x_setname,
            @RequestParam(value = "x_lubaddress") String x_lubaddress,
            @RequestParam(value = "x_lubmode") String x_lubmode,
            @RequestParam(value = "x_lubtrademark") String x_lubtrademark,
            @RequestParam(value = "x_lubcount") int x_lubcount,
            @RequestParam(value = "x_oilamount") int x_oilamount,
            @RequestParam(value = "x_addorchange") String x_addorchange,
            @RequestParam(value = "x_operatedate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") java.util.Date x_operatedate,

            @RequestParam(value = "x_operateperson") String x_operateperson,
            @RequestParam(value = "x_operatereason" ) String x_operatereason,
            @RequestParam(value = "x_unit") int x_unit,
            @RequestParam(value = "x_lubricationcode") String x_lubricationcode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_alterlubrecord(x_setname, x_lubaddress, x_lubmode, x_lubtrademark, x_lubcount, x_oilamount,
                x_addorchange, x_operatedate, x_operateperson, x_operatereason, x_unit, x_lubricationcode);
    }

    @RequestMapping(value = "/pro_dellubrecord", method = RequestMethod.POST)
    @ResponseBody
    public HashMap pro_dellubrecord(
            @RequestParam(value = "x_lubricationcode") String x_lubricationcode,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        return zpfService.pro_dellubrecord(x_lubricationcode);
    }

    //将旧件写入工单表
    @RequestMapping(value = "/PRO_PM_WORKORDER_OLD_NC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_OLD_NC(
            @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
            @RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
            @RequestParam(value = "V_V_MATERIALCODE") String V_V_MATERIALCODE,
            @RequestParam(value = "V_V_MATERIALNAME") String V_V_MATERIALNAME,
            @RequestParam(value = "V_V_AMOUNT") String V_V_AMOUNT,
            @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.PRO_PM_WORKORDER_OLD_NC(V_V_PLANTCODE,V_V_DEPARTCODE,V_V_MATERIALCODE,V_V_MATERIALNAME,V_V_AMOUNT,V_V_SOURCECODE);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //生成工单（将工单网页内容更新到工单表）
    @RequestMapping(value = "/PM_WORKORDER_OLD_UPD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_WORKORDER_OLD_UPD(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
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

        HashMap data = zpfService.PM_WORKORDER_OLD_UPD(V_V_PERCODE, V_V_ORDERGUID, V_V_SHORT_TXT,
                V_D_START_DATE, V_D_FINISH_DATE, V_V_WBS, V_V_WBS_TXT, V_V_DEPTCODEREPARIR, V_V_TOOL, V_V_TECHNOLOGY, V_V_SAFE);

        String ret = (String) data.get("RET");

        result.put("RET", ret);
        result.put("success", true);
        return result;
    }


    //修旧历史查询
    @RequestMapping(value = "/PRO_PM_WORKORDER_OLD_HI_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_OLD_HI_SEL(
            @RequestParam(value = "V_BEGINTIME") String V_BEGINTIME,
            @RequestParam(value = "V_ENDTIME") String V_ENDTIME,
            @RequestParam(value = "V_MAT_NO") String V_MAT_NO,
            @RequestParam(value = "V_MAT_DESC") String V_MAT_DESC,
            @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.PRO_PM_WORKORDER_OLD_HI_SEL(V_BEGINTIME, V_ENDTIME, V_MAT_NO, V_MAT_DESC, V_V_SOURCECODE);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    //周计划工单查询
    @RequestMapping(value = "/PRO_PM_PLAN_WEEK_WORKORDER_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PLAN_WEEK_WORKORDER_GET(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = zpfService.PRO_PM_PLAN_WEEK_WORKORDER_GET(V_V_GUID);
        List<Map<String, Object>> list = (List) data.get("list");
        result.put("list", list);
        result.put("success", true);
        return result;
    }
}

