package org.building.pm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.LLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

/**
 * Created by LL on 2017/12/8.
 */
@Controller
@RequestMapping("/app/pm/LL")
public class LLController {
    @Autowired
    private LLService llService;

    @RequestMapping(value = "/PRO_DJ801_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ801_SELECT(@RequestParam(value = "V_MODELNAME") String V_MODELNAME,
                                HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ801_SELECT(V_MODELNAME);
    }

    @RequestMapping(value = "/PRO_DJ801_SELECTET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ801_SELECTET(@RequestParam(value = "V_MODELCODE") String V_MODELCODE,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ801_SELECTET(V_MODELCODE);
    }

    @RequestMapping(value = "/PRO_DJ801_SELECTMET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ801_SELECTMET(@RequestParam(value = "V_MODELCODE") String V_MODELCODE,
                                   HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ801_SELECTMET(V_MODELCODE);
    }

    @RequestMapping(value = {"/No15010801Excel"}, method = RequestMethod.GET, produces = {"application/html;charset=UTF-8"})
    @ResponseBody
    public void No15010801Excel(@RequestParam(value = "V_MODELNAME") String V_MODELNAME,
                                @RequestParam(value = "VTITLE") String VTITLE,
                                HttpServletResponse response
    ) throws JsonProcessingException, NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        HashMap data = llService.PRO_DJ801_SELECT(V_MODELNAME);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 5; i++) {
            sheet.setColumnWidth(i, 6000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("模型名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("创建人ID");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("创建人名称");
        cell.setCellStyle(style);


        cell = row.createCell((short) 4);
        cell.setCellValue("创建时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow(i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("MODEL_NAME") == null ? "" : map.get("MODEL_NAME").toString());
                row.createCell((short) 2).setCellValue(map.get("INSERT_USERID") == null ? "" : map.get("INSERT_USERID").toString());
                row.createCell((short) 3).setCellValue(map.get("INSERT_USERNAME") == null ? "" : map.get("INSERT_USERNAME").toString());
                row.createCell((short) 4).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());
                row.createCell((short) 5).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());
            }

        }
        try {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            String title = dateFormater.format(date).toString();
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            VTITLE = new String(VTITLE.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + new StringBuilder().append(title).append(VTITLE + ".xls").toString());
            OutputStream out = response.getOutputStream();
            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/PRO_DJ802_SELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_SELECT(@RequestParam(value = "V_MODELNAME") String V_MODELNAME,
                                HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_SELECT(V_MODELNAME);
    }

    @RequestMapping(value = "/PRO_DJ802_INSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_INSERT(@RequestParam(value = "V_MODELCODE") String V_MODELCODE,
                                @RequestParam(value = "V_MODELNAME") String V_MODELNAME,
                                @RequestParam(value = "V_USERID") String V_USERID,
                                @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                @RequestParam(value = "V_INSERTDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date V_INSERTDATE,
                                @RequestParam(value = "V_USERFLAG") String V_USERFLAG,
                                @RequestParam(value = "V_REMARK") String V_REMARK,
                                HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_INSERT(V_MODELCODE, V_MODELNAME, V_USERID, V_USERNAME, V_INSERTDATE, V_USERFLAG, V_REMARK);
    }

    @RequestMapping(value = "/PRO_DJ802_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_DELETE(@RequestParam(value = "V_MODELCODE") String V_MODELCODE,
                                HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_DELETE(V_MODELCODE);
    }


    @RequestMapping(value = "/PRO_DJ802_GXSELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_GXSELECT(@RequestParam(value = "V_MODELCODE") String V_MODELCODE,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_GXSELECT(V_MODELCODE);
    }

    @RequestMapping(value = "/PRO_DJ802_GXDELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_GXDELETE(@RequestParam(value = "V_MODELETID") String V_MODELETID,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_GXDELETE(V_MODELETID);
    }

    @RequestMapping(value = "/PRO_DJ802_GXDROPLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_GXDROPLIST(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_GXDROPLIST();
    }

    @RequestMapping(value = "/PRO_DJ802_GXINSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_GXINSERT(@RequestParam(value = "V_ETNO") String V_ETNO,
                                  @RequestParam(value = "V_MODELCODE") String V_MODELCODE,
                                  @RequestParam(value = "V_ETCONTEXT") String V_ETCONTEXT,
                                  @RequestParam(value = "V_PLANWORKTIME") Double V_PLANWORKTIME,
                                  @RequestParam(value = "V_PLANPERSON") Integer V_PLANPERSON,
                                  @RequestParam(value = "V_PERETID") String V_PERETID,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_GXINSERT(V_ETNO, V_MODELCODE, V_ETCONTEXT, V_PLANWORKTIME, V_PLANPERSON, V_PERETID);
    }

    @RequestMapping(value = "/PRO_DJ802_WHSELECT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_WHSELECT(@RequestParam(value = "V_MODELCODE") String V_MODELCODE,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_WHSELECT(V_MODELCODE);
    }

    @RequestMapping(value = "/PRO_DJ802_WHDELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_WHDELETE(@RequestParam(value = "V_MODELMATID") String V_MODELMATID,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_WHDELETE(V_MODELMATID);
    }

    @RequestMapping(value = "/PRO_DJ802_WHINSERT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ802_WHINSERT(@RequestParam(value = "V_MODELCODE") String V_MODELCODE,
                                  @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                  @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                                  @RequestParam(value = "V_ETALON") String V_ETALON,
                                  @RequestParam(value = "V_MATCL") String V_MATCL,
                                  @RequestParam(value = "V_UNIT") String V_UNIT,
                                  @RequestParam(value = "V_F_PRICE") Double V_F_PRICE,
                                  @RequestParam(value = "V_PLAN_AMOUNT") Double V_PLAN_AMOUNT,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ802_WHINSERT(V_MODELCODE, V_MATERIALCODE, V_MATERIALNAME, V_ETALON, V_MATCL, V_UNIT, V_F_PRICE, V_PLAN_AMOUNT);
    }

    @RequestMapping(value = "/PRO_DJ901_ORDERSTATU_END", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ901_ORDERSTATU_END(@RequestParam(value = "USERCODE_IN") String USERCODE_IN,
                                        HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ901_ORDERSTATU_END(USERCODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ602_MENDDEPT_POWER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ602_MENDDEPT_POWER(@RequestParam(value = "USERCODE_IN") String USERCODE_IN,
                                        @RequestParam(value = "ORDER_STATUS_IN") String ORDER_STATUS_IN,
                                        HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ602_MENDDEPT_POWER(USERCODE_IN, ORDER_STATUS_IN);
    }

    @RequestMapping(value = "PRO_DJ901_SELECTORDERLIST", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> PRO_DJ901_SELECTORDERLIST(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                                         @RequestParam(value = "STARTDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date STARTDATE_IN,
                                                         @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ENDDATE_IN,
                                                         @RequestParam(value = "ORDER_STATUS_IN") String ORDER_STATUS_IN,
                                                         @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
                                                         @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                                         @RequestParam(value = "DJ_NAME") String DJ_NAME,
                                                         @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                                         HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = llService.PRO_DJ901_SELECTORDERLIST(ORDERID_IN, STARTDATE_IN, ENDDATE_IN, ORDER_STATUS_IN, MENDDEPT_CODE_IN, DJ_UQ_CODE_IN, DJ_NAME);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/PRO_DJ901_INPUTCOST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ901_INPUTCOST(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                   @RequestParam(value = "COST_ITEM_IN") String COST_ITEM_IN,
                                   @RequestParam(value = "COST_MONEY_IN") String COST_MONEY_IN,
                                   @RequestParam(value = "INSERT_USERID_IN") String INSERT_USERID_IN,
                                   @RequestParam(value = "INSERT_USERNAME_IN") String INSERT_USERNAME_IN,
                                   HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ901_INPUTCOST(ORDERID_IN, COST_ITEM_IN, COST_MONEY_IN, INSERT_USERID_IN, INSERT_USERNAME_IN);
    }

    @RequestMapping(value = "/PRO_DJ901_DELETECOST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ901_DELETECOST(@RequestParam(value = "ID_IN") String ID_IN,
                                    HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ901_DELETECOST(ID_IN);
    }

    @RequestMapping(value = "/PRO_DJ901_COSTLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ901_COSTLIST(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ901_COSTLIST(ORDERID_IN);
    }

    @RequestMapping(value = {"/No15010901Excel"}, method = RequestMethod.GET, produces = {"application/html;charset=UTF-8"})
    @ResponseBody
    public void No15010901Excel(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                @RequestParam(value = "STARTDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date STARTDATE_IN,
                                @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ENDDATE_IN,
                                @RequestParam(value = "ORDER_STATUS_IN") String ORDER_STATUS_IN,
                                @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
                                @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                @RequestParam(value = "DJ_NAME") String DJ_NAME,
                                @RequestParam(value = "VTITLE") String VTITLE,
                                HttpServletResponse response
    ) throws JsonProcessingException, NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        MENDDEPT_CODE_IN = URLDecoder.decode(MENDDEPT_CODE_IN, "UTF-8");
        HashMap data = llService.PRO_DJ901_SELECTORDERLIST(ORDERID_IN, STARTDATE_IN, ENDDATE_IN, ORDER_STATUS_IN, MENDDEPT_CODE_IN, DJ_UQ_CODE_IN, DJ_NAME);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 7; i++) {
            sheet.setColumnWidth(i, 6000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("工单号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("检修单位名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("维修内容");
        cell.setCellStyle(style);


        cell = row.createCell((short) 4);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("录入时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("电机编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("电机名称");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow(i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());
                row.createCell((short) 2).setCellValue(map.get("MENDDEPT_NAME") == null ? "" : map.get("MENDDEPT_NAME").toString());
                row.createCell((short) 3).setCellValue(map.get("MEND_CONTEXT") == null ? "" : map.get("MEND_CONTEXT").toString());
                row.createCell((short) 4).setCellValue(map.get("INSERT_USERNAME") == null ? "" : map.get("INSERT_USERNAME").toString());
                row.createCell((short) 5).setCellValue(map.get("INSERTDATE") == null ? "" : map.get("INSERTDATE").toString());
                row.createCell((short) 6).setCellValue(map.get("DJ_UQ_CODE") == null ? "" : map.get("DJ_UQ_CODE").toString());
                row.createCell((short) 7).setCellValue(map.get("DJ_NAME") == null ? "" : map.get("DJ_NAME").toString());
            }

        }
        try {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            String title = dateFormater.format(date).toString();
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            VTITLE = new String(VTITLE.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + new StringBuilder().append(title).append(VTITLE + ".xls").toString());
            OutputStream out = response.getOutputStream();
            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/PRO_DJ603_MENDDEPT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ603_MENDDEPT(@RequestParam(value = "USERCODE_IN") String USERCODE_IN,
                                  @RequestParam(value = "PLANTCODE_IN") String PLANTCODE_IN,
                                  HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ603_MENDDEPT(USERCODE_IN, PLANTCODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ902_APPLYPLANTCOST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ902_APPLYPLANTCOST(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                        @RequestParam(value = "STARTDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date STARTDATE_IN,
                                        @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ENDDATE_IN,
                                        @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
                                        @RequestParam(value = "APPLY_PLANT_IN") String APPLY_PLANT_IN,
                                        @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                        @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
                                        HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ902_APPLYPLANTCOST(ORDERID_IN, STARTDATE_IN, ENDDATE_IN, MENDDEPT_CODE_IN, APPLY_PLANT_IN, DJ_UQ_CODE_IN, DJ_NAME_IN);
    }

    @RequestMapping(value = "/PRO_DJ902_MENDDEPTCOST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ902_MENDDEPTCOST(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                      @RequestParam(value = "STARTDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date STARTDATE_IN,
                                      @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ENDDATE_IN,
                                      @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
                                      @RequestParam(value = "APPLY_PLANT_IN") String APPLY_PLANT_IN,
                                      @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                      @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
                                      HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ902_MENDDEPTCOST(ORDERID_IN, STARTDATE_IN, ENDDATE_IN, MENDDEPT_CODE_IN, APPLY_PLANT_IN, DJ_UQ_CODE_IN, DJ_NAME_IN);
    }

    @RequestMapping(value = "/PRO_DJ902_ORDERCOST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ902_ORDERCOST(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                   @RequestParam(value = "STARTDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date STARTDATE_IN,
                                   @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ENDDATE_IN,
                                   @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
                                   @RequestParam(value = "APPLY_PLANT_IN") String APPLY_PLANT_IN,
                                   @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                   @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
                                   HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ902_ORDERCOST(ORDERID_IN, STARTDATE_IN, ENDDATE_IN, MENDDEPT_CODE_IN, APPLY_PLANT_IN, DJ_UQ_CODE_IN, DJ_NAME_IN);
    }

    @RequestMapping(value = {"/No15010902applyplantcostExcel"}, method = RequestMethod.GET, produces = {"application/html;charset=UTF-8"})
    @ResponseBody
    public void No15010902applyplantcostExcel(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                              @RequestParam(value = "STARTDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date STARTDATE_IN,
                                              @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ENDDATE_IN,
                                              @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
                                              @RequestParam(value = "APPLY_PLANT_IN") String APPLY_PLANT_IN,
                                              @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                              @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
                                              @RequestParam(value = "VTITLE") String VTITLE,
                                              HttpServletResponse response
    ) throws JsonProcessingException, NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        APPLY_PLANT_IN = URLDecoder.decode(APPLY_PLANT_IN, "UTF-8");
        HashMap data = llService.PRO_DJ902_APPLYPLANTCOST(ORDERID_IN, STARTDATE_IN, ENDDATE_IN, MENDDEPT_CODE_IN, APPLY_PLANT_IN, DJ_UQ_CODE_IN, DJ_NAME_IN);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 3; i++) {
            sheet.setColumnWidth(i, 6000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("申请厂矿编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("申请厂矿名");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("维修费用");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow(i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("APPLY_PLANT") == null ? "" : map.get("APPLY_PLANT").toString());
                row.createCell((short) 2).setCellValue(map.get("APPLY_PLANTNAME") == null ? "" : map.get("APPLY_PLANTNAME").toString());
                row.createCell((short) 3).setCellValue(Double.parseDouble(map.get("COST_MONEY") == null ? "0" : map.get("COST_MONEY").toString()));
            }

        }
        try {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            String title = dateFormater.format(date).toString();
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            VTITLE = new String(VTITLE.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + new StringBuilder().append(title).append(VTITLE + ".xls").toString());
            OutputStream out = response.getOutputStream();
            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = {"/No15010902menddeptcostExcel"}, method = RequestMethod.GET, produces = {"application/html;charset=UTF-8"})
    @ResponseBody
    public void No15010902menddeptcostExcel(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                            @RequestParam(value = "STARTDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date STARTDATE_IN,
                                            @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ENDDATE_IN,
                                            @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
                                            @RequestParam(value = "APPLY_PLANT_IN") String APPLY_PLANT_IN,
                                            @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                            @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
                                            @RequestParam(value = "VTITLE") String VTITLE,
                                            HttpServletResponse response
    ) throws JsonProcessingException, NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        APPLY_PLANT_IN = URLDecoder.decode(APPLY_PLANT_IN, "UTF-8");
        HashMap data = llService.PRO_DJ902_MENDDEPTCOST(ORDERID_IN, STARTDATE_IN, ENDDATE_IN, MENDDEPT_CODE_IN, APPLY_PLANT_IN, DJ_UQ_CODE_IN, DJ_NAME_IN);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 3; i++) {
            sheet.setColumnWidth(i, 6000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("检修单位编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("检修单位名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("维修费用");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow(i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("CODE") == null ? "" : map.get("CODE").toString());
                row.createCell((short) 2).setCellValue(map.get("NAME") == null ? "" : map.get("NAME").toString());
                row.createCell((short) 3).setCellValue(Double.parseDouble(map.get("COST_MONEY") == null ? "0" : map.get("COST_MONEY").toString()));
            }

        }
        try {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            String title = dateFormater.format(date).toString();
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            VTITLE = new String(VTITLE.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + new StringBuilder().append(title).append(VTITLE + ".xls").toString());
            OutputStream out = response.getOutputStream();
            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = {"/No15010902ordercostExcel"}, method = RequestMethod.GET, produces = {"application/html;charset=UTF-8"})
    @ResponseBody
    public void No15010902ordercostExcel(@RequestParam(value = "ORDERID_IN") String ORDERID_IN,
                                         @RequestParam(value = "STARTDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date STARTDATE_IN,
                                         @RequestParam(value = "ENDDATE_IN") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ENDDATE_IN,
                                         @RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN,
                                         @RequestParam(value = "APPLY_PLANT_IN") String APPLY_PLANT_IN,
                                         @RequestParam(value = "DJ_UQ_CODE_IN") String DJ_UQ_CODE_IN,
                                         @RequestParam(value = "DJ_NAME_IN") String DJ_NAME_IN,
                                         @RequestParam(value = "VTITLE") String VTITLE,
                                         HttpServletResponse response
    ) throws JsonProcessingException, NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        APPLY_PLANT_IN = URLDecoder.decode(APPLY_PLANT_IN, "UTF-8");
        HashMap data = llService.PRO_DJ902_ORDERCOST(ORDERID_IN, STARTDATE_IN, ENDDATE_IN, MENDDEPT_CODE_IN, APPLY_PLANT_IN, DJ_UQ_CODE_IN, DJ_NAME_IN);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 5; i++) {
            sheet.setColumnWidth(i, 6000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("工单号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("电机编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("电机名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("维修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("费用合计");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow(i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("ORDERID") == null ? "" : map.get("ORDERID").toString());
                row.createCell((short) 2).setCellValue(map.get("DJ_UQ_CODE") == null ? "" : map.get("DJ_UQ_CODE").toString());
                row.createCell((short) 3).setCellValue(map.get("DJ_NAME") == null ? "" : map.get("DJ_NAME").toString());
                row.createCell((short) 4).setCellValue(map.get("MEND_CONTEXT") == null ? "" : map.get("MEND_CONTEXT").toString());
                row.createCell((short) 5).setCellValue(Double.parseDouble(map.get("COST_MONEY") == null ? "0" : map.get("COST_MONEY").toString()));
            }

        }
        try {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            String title = dateFormater.format(date).toString();
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            VTITLE = new String(VTITLE.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + new StringBuilder().append(title).append(VTITLE + ".xls").toString());
            OutputStream out = response.getOutputStream();
            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @RequestMapping(value = "/PRO_MM_ITYPE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_MM_ITYPE(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_MM_ITYPE();
    }

    @RequestMapping(value = "/GETAPPLYMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map GETAPPLYMAT(@RequestParam(value = "A_BEGINDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_BEGINDATE,
                           @RequestParam(value = "A_ENDDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_ENDDATE,
                           @RequestParam(value = "A_ITYPE") String A_ITYPE,
                           @RequestParam(value = "A_NAME") String A_NAME,
                           HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.GETAPPLYMAT(A_BEGINDATE, A_ENDDATE, A_ITYPE, A_NAME);
    }


    @RequestMapping(value = "/SAVEAPPLYMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map SAVEAPPLYMAT(@RequestParam(value = "A_CODE") String A_CODE,
                            @RequestParam(value = "A_NAME") String A_NAME,
                            @RequestParam(value = "A_ETALON") String A_ETALON,
                            @RequestParam(value = "A_UNIT") String A_UNIT,
                            @RequestParam(value = "A_ITYPE") String A_ITYPE,
                            @RequestParam(value = "A_AMOUNT") Double A_AMOUNT,
                            @RequestParam(value = "A_APPLYDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_APPLYDATE,
                            @RequestParam(value = "A_REMARK") String A_REMARK,
                            @RequestParam(value = "A_GROUPNAME") String A_GROUPNAME,
                            @RequestParam(value = "A_LYPERSONID") String A_LYPERSONID,
                            @RequestParam(value = "A_LYPERSON") String A_LYPERSON,
                            @RequestParam(value = "A_USERID") String A_USERID,
                            @RequestParam(value = "A_USERNAME") String A_USERNAME,
                            @RequestParam(value = "A_KCID") String A_KCID,
                            HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.SAVEAPPLYMAT(A_CODE, A_NAME, A_ETALON, A_UNIT, A_ITYPE, A_AMOUNT, A_APPLYDATE, A_REMARK, A_GROUPNAME, A_LYPERSONID, A_LYPERSON, A_USERID, A_USERNAME, A_KCID);
    }

    @RequestMapping(value = "/DELETEAPPLYMAT", method = RequestMethod.POST)
    @ResponseBody
    public Map DELETEAPPLYMAT(String A_APPLYID, String A_USERID, String A_USERNAME, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.DELETEAPPLYMAT(A_APPLYID, A_USERID, A_USERNAME);
    }

    @RequestMapping(value = {"/No15011008Excel"}, method = RequestMethod.GET, produces = {"application/html;charset=UTF-8"})
    @ResponseBody
    public void No15011008Excel(@RequestParam(value = "A_BEGINDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_BEGINDATE,
                                @RequestParam(value = "A_ENDDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_ENDDATE,
                                @RequestParam(value = "A_ITYPE") String A_ITYPE,
                                @RequestParam(value = "A_NAME") String A_NAME,
                                @RequestParam(value = "VTITLE") String VTITLE,
                                HttpServletResponse response
    ) throws JsonProcessingException, NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();
        A_ITYPE = URLDecoder.decode(A_ITYPE, "UTF-8");
        HashMap data = llService.GETAPPLYMAT(A_BEGINDATE, A_ENDDATE, A_ITYPE, A_NAME);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 7; i++) {
            sheet.setColumnWidth(i, 6000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("日期");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("材料/备件名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("规格");
        cell.setCellStyle(style);


        cell = row.createCell((short) 4);
        cell.setCellValue("单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("班组");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("备注");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow(i + 1);
                Map map = (Map) list.get(i);
                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("APPLY_DATE") == null ? "" : map.get("APPLY_DATE").toString());
                row.createCell((short) 2).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());
                row.createCell((short) 3).setCellValue(map.get("ETALON") == null ? "" : map.get("ETALON").toString());
                row.createCell((short) 4).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());
                row.createCell((short) 5).setCellValue(Double.parseDouble(map.get("AMOUNT") == null ? "0" : map.get("AMOUNT").toString()));
                row.createCell((short) 6).setCellValue(map.get("GROUPNAME") == null ? "" : map.get("GROUPNAME").toString());
                row.createCell((short) 7).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());
            }

        }
        try {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            String title = dateFormater.format(date).toString();
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            VTITLE = new String(VTITLE.getBytes("UTF-8"), "ISO-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=" + new StringBuilder().append(title).append(VTITLE + ".xls").toString());
            OutputStream out = response.getOutputStream();
            wb.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/GETMATKC", method = RequestMethod.POST)
    @ResponseBody
    public Map GETMATKC(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                        @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                        @RequestParam(value = "A_ITYPE") String A_ITYPE,
                        @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                        @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                        @RequestParam(value = "A_ETALON") String A_ETALON,
                        HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.GETMATKC(A_PLANTCODE, A_DEPARTCODE, A_ITYPE, A_MATERIALCODE, A_MATERIALNAME, A_ETALON);
    }

    @RequestMapping(value = "/PRO_DJ601_MENDDEPT_GROUP", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ601_MENDDEPT_GROUP(@RequestParam(value = "DEPTCODE_IN") String DEPTCODE_IN,
                                        HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ601_MENDDEPT_GROUP(DEPTCODE_IN);
    }

    @RequestMapping(value = "/PRO_DJ601_PERSON", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_DJ601_PERSON(@RequestParam(value = "MENDDEPT_CODE_IN") String MENDDEPT_CODE_IN, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.PRO_DJ601_PERSON(MENDDEPT_CODE_IN);
    }

    @RequestMapping(value = "GETORDERSY", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> GETORDERSY(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                          @RequestParam(value = "A_MENDDEPT") String A_MENDDEPT,
                                          @RequestParam(value = "A_ORDERID") String A_ORDERID,
                                          @RequestParam(value = "A_BEGINDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_BEGINDATE,
                                          @RequestParam(value = "A_ENDDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_ENDDATE,
                                          @RequestParam(value = "start") Integer start, @RequestParam(value = "limit") Integer limit,
                                          HttpServletRequest request, HttpServletResponse response) throws SQLException {

        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> pageList = new ArrayList<Map<String, Object>>();

        HashMap data = llService.GETORDERSY(A_PLANTCODE, A_MENDDEPT, A_ORDERID, A_BEGINDATE, A_ENDDATE);

        List<Map<String, Object>> list = (List) data.get("list");

        int total = list.size();
        if (limit != null) {
            if (limit != 25) {
                int endPage = start + limit;
                if (total < endPage) {
                    pageList = list.subList(start, total);
                } else {
                    pageList = list.subList(start, endPage);
                }
            } else {
                pageList = list;
            }
        } else {
            pageList = list;
        }

        result.put("list", pageList);
        result.put("total", total);
        result.put("success", true);

        return result;
    }

    @RequestMapping(value = "/ORDERSYDETAIL", method = RequestMethod.POST)
    @ResponseBody
    public Map ORDERSYDETAIL(@RequestParam(value = "A_ORDERID") String A_ORDERID,
                             HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.ORDERSYDETAIL(A_ORDERID);
    }

    @RequestMapping(value = "/FILELIST", method = RequestMethod.POST)
    @ResponseBody
    public Map FILELIST(@RequestParam(value = "A_ORDERID") String A_ORDERID,
                        HttpServletRequest request, HttpServletResponse response) throws Exception {
        return llService.FILELIST(A_ORDERID);
    }

    @RequestMapping(value = "/FILEDOWNLOAD", method = RequestMethod.GET)
    @ResponseBody
    public Map FILEDOWNLOAD(@RequestParam(value = "A_FILEID") String A_FILEID,
                            @RequestParam(value = "V_V_FILENAME") String V_V_FILENAME,
                            HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {

        List<Map> result = null;
        result = llService.FILEDOWNLOAD(A_FILEID);
        Blob fileblob = (Blob) result.get(0).get("V_FILEBLOB");
        InputStream is = fileblob.getBinaryStream();

        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");
        try {
            V_V_FILENAME = URLDecoder.decode(V_V_FILENAME, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String fileExtend = (String) result.get(0).get("RET_FILE_EXTEND");
        V_V_FILENAME = V_V_FILENAME + '.' + fileExtend;
        String fileName = new String(V_V_FILENAME.getBytes("UTF-8"), "ISO-8859-1");
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        OutputStream fos = response.getOutputStream();
        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        is.close();
        fos.close();
        Map test = new HashMap();
        test.put("success", true);
        return test;
    }
}
