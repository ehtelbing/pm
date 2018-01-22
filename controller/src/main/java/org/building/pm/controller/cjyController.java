package org.building.pm.controller;

import org.apache.poi.hssf.usermodel.*;
import org.building.pm.service.cjyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.sql.Date;

/**
 * Created by admin on 2017/10/31.
 */
@Controller
@RequestMapping("/app/pm/cjy")
public class cjyController {
    @Autowired
    private cjyService cjyService;

    @RequestMapping(value = "/PRO_RUN_BJ_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_ALL(@RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                              @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                              @RequestParam(value = "A_EQUID") String A_EQUID,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_ALL(A_PLANTCODE, A_DEPARTCODE, A_EQUID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_ADD(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                              @RequestParam(value = "A_BJ_DESC") String A_BJ_DESC,
                                              @RequestParam(value = "A_BJ_TYPE") String A_BJ_TYPE,
                                              @RequestParam(value = "A_BJ_UNIT") String A_BJ_UNIT,
                                              @RequestParam(value = "A_BJ_REMARK") String A_BJ_REMARK,

                                              @RequestParam(value = "A_PLANTCODE") String A_PLANTCODE,
                                              @RequestParam(value = "A_DEPARTCODE") String A_DEPARTCODE,
                                              @RequestParam(value = "A_EQUID") String A_EQUID,
                                              @RequestParam(value = "A_PRE_FLAG") String A_PRE_FLAG,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_ADD(A_BJ_ID, A_BJ_DESC, A_BJ_TYPE, A_BJ_UNIT, A_BJ_REMARK,
                A_PLANTCODE, A_DEPARTCODE, A_EQUID, A_PRE_FLAG);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_UPDATE(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                 @RequestParam(value = "A_BJ_DESC") String A_BJ_DESC,
                                                 @RequestParam(value = "A_BJ_TYPE") String A_BJ_TYPE,
                                                 @RequestParam(value = "A_BJ_UNIT") String A_BJ_UNIT,
                                                 @RequestParam(value = "A_BJ_REMARK") String A_BJ_REMARK,

                                                 @RequestParam(value = "A_PRE_FLAG") String A_PRE_FLAG,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_UPDATE(A_BJ_ID, A_BJ_DESC, A_BJ_TYPE, A_BJ_UNIT, A_BJ_REMARK,
                A_PRE_FLAG);
        return result;
    }


    @RequestMapping(value = "/PRO_RUN_BJ_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_DELETE(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_DELETE(A_BJ_ID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_CYCLE_ABLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_ABLE(HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_CYCLE_ABLE();
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_CYCLE_BASIC_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_CYCLE_BASIC_ALL(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_CYCLE_BASIC_ALL(A_BJ_ID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_GETDESC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_GETDESC(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_GETDESC(A_BJ_ID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_CYCLE_BASIC_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_CYCLE_BASIC_ADD(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                          @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                                          @RequestParam(value = "A_CYCLE_VALUE") String A_CYCLE_VALUE,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_CYCLE_BASIC_ADD(A_BJ_ID, A_CYCLE_ID, A_CYCLE_VALUE);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_CYCLE_BASIC_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_CYCLE_BASIC_DEL(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                          @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_CYCLE_BASIC_DEL(A_BJ_ID, A_CYCLE_ID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_MAT_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_MAT_ALL(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_MAT_ALL(A_BJ_ID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_MAT_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_MAT_ADD(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                  @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                                  @RequestParam(value = "A_MATERIALNAME") String A_MATERIALNAME,
                                                  @RequestParam(value = "A_MATERIALETALON") String A_MATERIALETALON,
                                                  @RequestParam(value = "A_UNIT") String A_UNIT,
                                                  @RequestParam(value = "A_PRICE") String A_PRICE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_MAT_ADD(A_BJ_ID, A_MATERIALCODE, A_MATERIALNAME, A_MATERIALETALON, A_UNIT, A_PRICE);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_BJ_MAT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_BJ_MAT_DEL(@RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                  @RequestParam(value = "A_MATERIALCODE") String A_MATERIALCODE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_BJ_MAT_DEL(A_BJ_ID, A_MATERIALCODE);
        return result;
    }

    @RequestMapping(value = "/pg_run7134_getbjlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pg_run7134_getbjlist(@RequestParam(value = "a_mat_no") String a_mat_no,
                                                    @RequestParam(value = "a_mat_desc") String a_mat_desc,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.pg_run7134_getbjlist(a_mat_no, a_mat_desc);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_SITE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_ADD(@RequestParam(value = "A_SITE_DESC") String A_SITE_DESC,
                                                @RequestParam(value = "A_EQUID") String A_EQUID,
                                                @RequestParam(value = "A_REMARK") String A_REMARK,
                                                @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                                @RequestParam(value = "A_MEND_DEPART") String A_MEND_DEPART,
                                                @RequestParam(value = "A_MEND_USERNAME") String A_MEND_USERNAME,
                                                @RequestParam(value = "A_MEND_USERNAMEID") String A_MEND_USERNAMEID,
                                                @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                @RequestParam(value = "A_BJ_AMOUNT") String A_BJ_AMOUNT,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_SITE_ADD(A_SITE_DESC, A_EQUID, A_REMARK, A_USERNAME, A_MEND_DEPART,
                A_MEND_USERNAME, A_MEND_USERNAMEID, A_BJ_ID, A_BJ_AMOUNT);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_SITE_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_UPDATE(@RequestParam(value = "A_SITE_ID") String A_SITE_ID,
                                                   @RequestParam(value = "A_SITE_DESC") String A_SITE_DESC,
                                                   @RequestParam(value = "A_REMARK") String A_REMARK,
                                                   @RequestParam(value = "A_USERNAME") String A_USERNAME,
                                                   @RequestParam(value = "A_MEND_DEPART") String A_MEND_DEPART,
                                                   @RequestParam(value = "A_MEND_USERNAME") String A_MEND_USERNAME,
                                                   @RequestParam(value = "A_MEND_USERNAMEID") String A_MEND_USERNAMEID,
                                                   @RequestParam(value = "A_BJ_ID") String A_BJ_ID,
                                                   @RequestParam(value = "A_BJ_AMOUNT") String A_BJ_AMOUNT,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_SITE_UPDATE(A_SITE_ID, A_SITE_DESC, A_REMARK, A_USERNAME, A_MEND_DEPART,
                A_MEND_USERNAME, A_MEND_USERNAMEID, A_BJ_ID, A_BJ_AMOUNT);
        return result;
    }


    @RequestMapping(value = "/PRO_RUN_SITE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_ALL(@RequestParam(value = "A_EQU_ID") String A_EQU_ID,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_SITE_ALL(A_EQU_ID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_SITE_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_DELETE(@RequestParam(value = "A_SITE_ID") String A_SITE_ID,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_SITE_DELETE(A_SITE_ID);
        return result;
    }

    /*No7104EXCEL*/
    @RequestMapping(value = "/No7104EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void No7104EXCEL(
            @RequestParam(value = "A_EQU_ID") String A_EQU_ID,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = cjyService.PRO_RUN_SITE_ALL(A_EQU_ID);

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
        cell.setCellValue("备件安装位置");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("录入人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("检修单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("负责人");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("备件编号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("备件描述");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("单次更换数量");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("预装件");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("备注");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("SITE_DESC") == null ? "" : map.get("SITE_DESC").toString());

                row.createCell((short) 2).setCellValue(map.get("UPDATEPERSON") == null ? "" : map.get("UPDATEPERSON").toString());

                row.createCell((short) 3).setCellValue(map.get("MEND_DEPART") == null ? "" : map.get("MEND_DEPART").toString());

                row.createCell((short) 4).setCellValue(map.get("MEND_PERSON") == null ? "" : map.get("MEND_PERSON").toString());

                row.createCell((short) 5).setCellValue(map.get("BJ_ID") == null ? "" : map.get("BJ_ID").toString());

                row.createCell((short) 6).setCellValue(map.get("BJ_DESC") == null ? "" : map.get("BJ_DESC").toString());

                row.createCell((short) 7).setCellValue(map.get("BJ_AMOUNT") == null ? "" : map.get("BJ_AMOUNT").toString());

                row.createCell((short) 8).setCellValue(map.get("PRE_FLAG_DESC") == null ? "" : map.get("PRE_FLAG_DESC").toString());

                row.createCell((short) 9).setCellValue(map.get("REMARK") == null ? "" : map.get("REMARK").toString());


            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("设备备件位置管理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/PRO_RUN_EQU_VGURL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_EQU_VGURL(@RequestParam(value = "A_EQUID") String A_EQUID,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_EQU_VGURL(A_EQUID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_CYCLE_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_ALL(HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_CYCLE_ALL();
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_CYCLE_ADD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_ADD(@RequestParam(value = "A_CYCLE_DESC") String A_CYCLE_DESC,
                                                 @RequestParam(value = "A_CYCLE_UNIT") String A_CYCLE_UNIT,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_CYCLE_ADD(A_CYCLE_DESC, A_CYCLE_UNIT);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_CYCLE_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_UPDATE(@RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                                    @RequestParam(value = "A_CYCLE_DESC") String A_CYCLE_DESC,
                                                    @RequestParam(value = "A_CYCLE_UNIT") String A_CYCLE_UNIT,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_CYCLE_UPDATE(A_CYCLE_ID, A_CYCLE_DESC, A_CYCLE_UNIT);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_CYCLE_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_CYCLE_DELETE(@RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_CYCLE_DELETE(A_CYCLE_ID);
        return result;
    }


    @RequestMapping(value = "/pro_run7121_selectequlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7121_selectequlist(@RequestParam(value = "v_departcode") String v_departcode,
                                                         @RequestParam(value = "v_plantcode") String v_plantcode,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7121_selectequlist(v_departcode, v_plantcode);
        return result;
    }

    @RequestMapping(value = "/pro_run7121_getequlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7121_getequlist(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7121_getequlist(V_EQU_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7121_addequ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7121_addequ(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                  @RequestParam(value = "V_EQU_DESC") String V_EQU_DESC,
                                                  @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                  @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                  @RequestParam(value = "V_USERID") String V_USERID,

                                                  @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                  @RequestParam(value = "V_STATUS") String V_STATUS,
                                                  @RequestParam(value = "V_PP_CODE") String V_PP_CODE,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7121_addequ(V_EQU_ID, V_EQU_DESC, V_DEPARTCODE, V_PLANTCODE, V_USERID,
                V_USERNAME, V_STATUS, V_PP_CODE);
        return result;
    }

    @RequestMapping(value = "/pro_run7121_updateequ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7121_updateequ(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                     @RequestParam(value = "V_EQU_DESC") String V_EQU_DESC,
                                                     @RequestParam(value = "V_USERID") String V_USERID,
                                                     @RequestParam(value = "V_USERNAME") String V_USERNAME,
                                                     @RequestParam(value = "V_STATUS") String V_STATUS,
                                                     @RequestParam(value = "V_PP_CODE") String V_PP_CODE,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7121_updateequ(V_EQU_ID, V_EQU_DESC, V_USERID,
                V_USERNAME, V_STATUS, V_PP_CODE);
        return result;
    }

    @RequestMapping(value = "/pro_run7121_stop", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7121_stop(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7121_stop(V_EQU_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7121_startequ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7121_startequ(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7121_startequ(V_EQU_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7122_selectvglist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7122_selectvglist(@RequestParam(value = "V_VG_DESC") String V_VG_DESC,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7122_selectvglist(V_VG_DESC);
        return result;
    }

    @RequestMapping(value = "/pro_run7122_addvgurl", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7122_addvgurl(@RequestParam(value = "V_VG_DESC") String V_VG_DESC,
                                                    @RequestParam(value = "V_URL") String V_URL,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7122_addvgurl(V_VG_DESC, V_URL);
        return result;
    }

    @RequestMapping(value = "/pro_run7122_deletevgurl", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7122_deletevgurl(@RequestParam(value = "V_ID") String V_ID,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7122_deletevgurl(V_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7123_selectstlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7123_selectstlist(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7123_selectstlist(V_SITE_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7123_addst", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7123_addst(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                 @RequestParam(value = "V_TAG_DESC") String V_TAG_DESC,
                                                 @RequestParam(value = "V_TAG_UNIT") String V_TAG_UNIT,
                                                 @RequestParam(value = "V_STATUS") String V_STATUS,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7123_addst(V_SITE_ID, V_TAG_DESC, V_TAG_UNIT, V_STATUS);
        return result;
    }

    @RequestMapping(value = "/pro_run7123_updatest", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7123_updatest(@RequestParam(value = "V_TAG_ID") String V_TAG_ID,
                                                    @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                    @RequestParam(value = "V_TAG_DESC") String V_TAG_DESC,
                                                    @RequestParam(value = "V_TAG_UNIT") String V_TAG_UNIT,
                                                    @RequestParam(value = "V_STATUS") String V_STATUS,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7123_updatest(V_TAG_ID, V_SITE_ID, V_TAG_DESC, V_TAG_UNIT, V_STATUS);
        return result;
    }

    @RequestMapping(value = "/pro_run7123_stopst", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7123_stopst(@RequestParam(value = "V_TAG_ID") String V_TAG_ID,
                                                  HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7123_stopst(V_TAG_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7123_startst", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7123_startst(@RequestParam(value = "V_TAG_ID") String V_TAG_ID,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7123_startst(V_TAG_ID);
        return result;
    }


    @RequestMapping(value = "/pro_run7124_supplylist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7124_supplylist(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                      @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
                                                      @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7124_supplylist(V_SUPPLY_CODE, V_SUPPLY_NAME, V_SUPPLY_STATUS);
        return result;
    }

    @RequestMapping(value = "/pro_run7124_addsupply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7124_addsupply(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                     @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
                                                     @RequestParam(value = "V_SUPPLY_DESC") String V_SUPPLY_DESC,
                                                     @RequestParam(value = "V_SUPPLY_RENAGE") String V_SUPPLY_RENAGE,
                                                     @RequestParam(value = "V_SUPPLY_MANAGER") String V_SUPPLY_MANAGER,

                                                     @RequestParam(value = "V_LINK_PERSON") String V_LINK_PERSON,
                                                     @RequestParam(value = "V_LINK_TYPE") String V_LINK_TYPE,
                                                     @RequestParam(value = "V_LINK_PHONECODE") String V_LINK_PHONECODE,
                                                     @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7124_addsupply(V_SUPPLY_CODE, V_SUPPLY_NAME, V_SUPPLY_DESC, V_SUPPLY_RENAGE, V_SUPPLY_MANAGER,
                V_LINK_PERSON, V_LINK_TYPE, V_LINK_PHONECODE, V_SUPPLY_STATUS);
        return result;
    }

    @RequestMapping(value = "/pro_run7124_updatesupply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7124_updatesupply(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                        @RequestParam(value = "V_SUPPLY_NAME") String V_SUPPLY_NAME,
                                                        @RequestParam(value = "V_SUPPLY_DESC") String V_SUPPLY_DESC,
                                                        @RequestParam(value = "V_SUPPLY_RENAGE") String V_SUPPLY_RENAGE,
                                                        @RequestParam(value = "V_SUPPLY_MANAGER") String V_SUPPLY_MANAGER,

                                                        @RequestParam(value = "V_LINK_PERSON") String V_LINK_PERSON,
                                                        @RequestParam(value = "V_LINK_TYPE") String V_LINK_TYPE,
                                                        @RequestParam(value = "V_LINK_PHONECODE") String V_LINK_PHONECODE,
                                                        @RequestParam(value = "V_SUPPLY_STATUS") String V_SUPPLY_STATUS,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7124_updatesupply(V_SUPPLY_CODE, V_SUPPLY_NAME, V_SUPPLY_DESC, V_SUPPLY_RENAGE, V_SUPPLY_MANAGER,
                V_LINK_PERSON, V_LINK_TYPE, V_LINK_PHONECODE, V_SUPPLY_STATUS);
        return result;
    }

    @RequestMapping(value = "/pro_run7124_supplymatlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7124_supplymatlist(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7124_supplymatlist(V_SUPPLY_CODE);
        return result;
    }

    @RequestMapping(value = "/pro_run7124_addsupplymat", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7124_addsupplymat(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                        @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7124_addsupplymat(V_SUPPLY_CODE, V_MATERIALCODE);
        return result;
    }

    @RequestMapping(value = "/pro_run7124_delsupplymat", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7124_delsupplymat(@RequestParam(value = "V_SUPPLY_CODE") String V_SUPPLY_CODE,
                                                        @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7124_delsupplymat(V_SUPPLY_CODE, V_MATERIALCODE);
        return result;
    }

    @RequestMapping(value = "/pro_run7125_equvglist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7125_equvglist(@RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                     @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7125_equvglist(V_PLANTCODE, V_DEPARTCODE);
        return result;
    }

    @RequestMapping(value = "/pro_run7125_addequvg", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7125_addequvg(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                    @RequestParam(value = "V_VG_ID") String V_VG_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7125_addequvg(V_EQU_ID, V_VG_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7125_delequvg", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7125_delequvg(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                    @RequestParam(value = "V_VG_ID") String V_VG_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7125_delequvg(V_EQU_ID, V_VG_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7126_sitevglist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7126_sitevglist(@RequestParam(value = "V_EQU_ID") String V_EQU_ID,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7126_sitevglist(V_EQU_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7126_addsitevg", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7126_addsitevg(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                     @RequestParam(value = "V_VG_ID") String V_VG_ID,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7126_addsitevg(V_SITE_ID, V_VG_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7126_delsitevg", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7126_delsitevg(@RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                     @RequestParam(value = "V_VG_ID") String V_VG_ID,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7126_delsitevg(V_SITE_ID, V_VG_ID);
        return result;
    }

    @RequestMapping(value = "/pg_run7134_GETBJLIST", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pg_run7134_GETBJLIST(@RequestParam(value = "a_mat_no") String a_mat_no,
                                                    @RequestParam(value = "a_mat_desc") String a_mat_desc,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.pg_run7134_GETBJLIST(a_mat_no, a_mat_desc);
        return result;
    }

    @RequestMapping(value = "/pg_run7134_getsitelist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pg_run7134_getsitelist(@RequestParam(value = "a_mat_no") String a_mat_no,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.pg_run7134_getsitelist(a_mat_no);
        return result;
    }

    @RequestMapping(value = "/pg_run7134_getmatlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pg_run7134_getmatlist(@RequestParam(value = "a_mat_no") String a_mat_no,
                                                     @RequestParam(value = "a_mat_desc") String a_mat_desc,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.pg_run7134_getmatlist(a_mat_no, a_mat_desc);
        return result;
    }

    @RequestMapping(value = "/pg_run7134_addbj", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pg_run7134_addbj(@RequestParam(value = "a_mat_no") String a_mat_no,
                                                @RequestParam(value = "a_mat_desc") String a_mat_desc,
                                                @RequestParam(value = "a_etalon") String a_etalon,
                                                @RequestParam(value = "a_unit") String a_unit,
                                                @RequestParam(value = "a_price") String a_price,
                                                HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {
        Map result = cjyService.pg_run7134_addbj(a_mat_no, a_mat_desc, a_etalon, a_unit, a_price);
        return result;
    }

    @RequestMapping(value = "/pg_run7134_deletebj", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pg_run7134_deletebj(@RequestParam(value = "a_mat_no") String a_mat_no,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.pg_run7134_deletebj(a_mat_no);
        return result;
    }

    /*No7134EXCEL*/
    @RequestMapping(value = "/No7134EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void No7134EXCEL(
            @RequestParam(value = "a_mat_no") String a_mat_no,
            @RequestParam(value = "a_mat_desc") String a_mat_desc,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = cjyService.pg_run7134_getbjlist(a_mat_no, a_mat_desc);

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
        cell.setCellValue("备件编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("备件名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("计量单位");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("计划价");
        cell.setCellStyle(style);

        if (data.size() > 0) {
            list = (List) data.get("list");


            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);

                row.createCell((short) 1).setCellValue(map.get("MATERIALCODE") == null ? "" : map.get("MATERIALCODE").toString());

                row.createCell((short) 2).setCellValue(map.get("MATERIALNAME") == null ? "" : map.get("MATERIALNAME").toString());

                row.createCell((short) 3).setCellValue(map.get("UNIT") == null ? "" : map.get("UNIT").toString());

                row.createCell((short) 4).setCellValue(map.get("F_PRICE") == null ? "" : map.get("F_PRICE").toString());

            }
            try {
                response.setContentType("application/vnd.ms-excel;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("重点备件字典设置.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/PRO_RUN_YEILD_SELECT_MANAGE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_YEILD_SELECT_MANAGE(@RequestParam(value = "A_EQUID") String A_EQUID,
                                                           @RequestParam(value = "A_WORKDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_WORKDATE,
                                                           @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_YEILD_SELECT_MANAGE(A_EQUID, A_WORKDATE, A_CYCLE_ID);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_YEILD_INPUT", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_YEILD_INPUT(@RequestParam(value = "A_EQU_ID") String A_EQU_ID,
                                                   @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                                   @RequestParam(value = "A_WORKDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date A_WORKDATE,
                                                   @RequestParam(value = "A_INSERTVALUE") String A_INSERTVALUE,
                                                   @RequestParam(value = "A_INSRTPERSON") String A_INSRTPERSON,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_YEILD_INPUT(A_EQU_ID, A_CYCLE_ID, A_WORKDATE, A_INSERTVALUE, A_INSRTPERSON);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_TEILD_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_TEILD_DELETE(@RequestParam(value = "A_ID") String A_ID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_TEILD_DELETE(A_ID);
        return result;
    }

    @RequestMapping(value = "/pro_run7111_taglist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7111_taglist(@RequestParam(value = "pid") String pid,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7111_taglist(pid);
        return result;
    }

    @RequestMapping(value = "/pro_run7111_equlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7111_equlist(@RequestParam(value = "v_v_plantcode") String v_v_plantcode,
                                                   @RequestParam(value = "v_v_deptcode") String v_v_deptcode,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7111_equlist(v_v_plantcode, v_v_deptcode);
        return result;
    }

    @RequestMapping(value = "/pro_run7111_usebjlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7111_usebjlist(@RequestParam(value = "v_v_equcode") String v_v_equcode,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7111_usebjlist(v_v_equcode);
        return result;
    }

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public Map uploadFile(
            @RequestParam(value = "bjcode") String bjcode,
            @RequestParam(value = "checktime") @DateTimeFormat(pattern = "yyyy-MM-dd") Date checktime,
            @RequestParam(value = "checkcount") String checkcount,
            @RequestParam(value = "upload") MultipartFile upload,
            @RequestParam(value = "usercode") String usercode,
            @RequestParam(value = "uesrname") String uesrname,
            @RequestParam(value = "tagid") String tagid,
            @RequestParam(value = "siteid") String siteid,
            @RequestParam(value = "tagvalue") String tagvalue,
            HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        String filename = upload.getOriginalFilename();

        String path = request.getSession().getServletContext().getRealPath("upload");

        File targetFile = new File(path, filename);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        //保存
        try {
            upload.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("fileUrl", request.getContextPath() + "/upload/" + filename);
        FileInputStream filedata = null;
        filedata = new FileInputStream(path + "/" + filename);

        Map test = new HashMap();

        List<Map> result = null;
        result = cjyService.pro_run7111_addlog(bjcode, checktime, checkcount, filedata, filename,
                usercode, uesrname, tagid, siteid, tagvalue);
        test.put("list", result);
        test.put("success", true);
        return test;
    }

    @RequestMapping(value = "/PM_ACTIVITI_PROCESS_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_ACTIVITI_PROCESS_SET(@RequestParam(value = "bjcode") String bjcode,
                                                       @RequestParam(value = "checktime") @DateTimeFormat(pattern = "yyyy-MM-dd") Date checktime,
                                                       @RequestParam(value = "checkcount") String checkcount,
                                                       @RequestParam(value = "upload") MultipartFile upload,
                                                       @RequestParam(value = "usercode") String usercode,
                                                       @RequestParam(value = "uesrname") String uesrname,
                                                       @RequestParam(value = "tagid") String tagid,
                                                       @RequestParam(value = "siteid") String siteid,
                                                       @RequestParam(value = "tagvalue") String tagvalue,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        List<Map> result = null;
        Map test = new HashMap();
        String filename = upload.getOriginalFilename();

        result = cjyService.pro_run7111_addlog(bjcode, checktime, checkcount, upload.getInputStream(), filename,
                usercode, uesrname, tagid, siteid, tagvalue);

        test.put("list", result);
        test.put("success", true);
        return test;
    }

    @RequestMapping(value = "/PRO_RUN_SITE_BJ_ALL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_RUN_SITE_BJ_ALL(@RequestParam(value = "IN_EQUID") String IN_EQUID,
                                                   @RequestParam(value = "IN_PLANT") String IN_PLANT,
                                                   @RequestParam(value = "IN_DEPART") String IN_DEPART,
                                                   @RequestParam(value = "IN_STATUS") String IN_STATUS,
                                                   @RequestParam(value = "IN_BJCODE") String IN_BJCODE,
                                                   @RequestParam(value = "IN_BJDESC") String IN_BJDESC,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_SITE_BJ_ALL(IN_EQUID, IN_PLANT, IN_DEPART, IN_STATUS, IN_BJCODE, IN_BJDESC);
        return result;
    }

    @RequestMapping(value = "/pro_run7110_sitesupplylist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7110_sitesupplylist(@RequestParam(value = "a_id") String a_id,
                                                          @RequestParam(value = "a_materialcode") String a_materialcode,
                                                          @RequestParam(value = "a_orderid") String a_orderid,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7110_sitesupplylist(a_id, a_materialcode, a_orderid);
        return result;
    }

    @RequestMapping(value = "/pro_run7113_ordermatlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7113_ordermatlist(@RequestParam(value = "v_dept_code") String v_dept_code,
                                                        @RequestParam(value = "v_equip_code") String v_equip_code,
                                                        @RequestParam(value = "v_materialcode") String v_materialcode,
                                                        @RequestParam(value = "v_materialname") String v_materialname,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7113_ordermatlist(v_dept_code, v_equip_code, v_materialcode, v_materialname);
        return result;
    }

    @RequestMapping(value = "/pro_run7113_ordermatlistq", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7113_ordermatlistq(@RequestParam(value = "V_DEPT_CODE") String V_DEPT_CODE,
                                                         @RequestParam(value = "V_EQUIP_CODE") String V_EQUIP_CODE,
                                                         @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,
                                                         @RequestParam(value = "V_MATERIALNAME") String V_MATERIALNAME,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7113_ordermatlistq(V_DEPT_CODE, V_EQUIP_CODE, V_MATERIALCODE, V_MATERIALNAME);
        return result;
    }

    @RequestMapping(value = "/pro_run7114_equlist", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7114_equlist(@RequestParam(value = "V_V_DEPARTCODE") String V_V_DEPARTCODE,
                                                   @RequestParam(value = "V_V_PLANTCODE") String V_V_PLANTCODE,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7114_equlist(V_V_DEPARTCODE, V_V_PLANTCODE);
        return result;
    }

    @RequestMapping(value = "/pg_run7113_getordermatbarcode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pg_run7113_getordermatbarcode(@RequestParam(value = "a_orderid") String a_orderid,
                                                             @RequestParam(value = "a_materialcode") String a_materialcode,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = cjyService.pg_run7113_getordermatbarcode(a_orderid, a_materialcode);
        return result;
    }

    @RequestMapping(value = "/pro_run7113_changeordermat", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7113_changeordermat(@RequestParam(value = "A_ID") String A_ID,
                                                          @RequestParam(value = "SITE_ID") String SITE_ID,
                                                          @RequestParam(value = "a_change_amount") String a_change_amount,
                                                          @RequestParam(value = "V_EQUIP_NO") String V_EQUIP_NO,
                                                          @RequestParam(value = "USERID") String USERID,

                                                          @RequestParam(value = "USERNAME") String USERNAME,
                                                          @RequestParam(value = "PLANTCODE") String PLANTCODE,
                                                          @RequestParam(value = "WORKAREA") String WORKAREA,
                                                          @RequestParam(value = "CHANGEDATE") @DateTimeFormat(pattern = "yyyy-MM-dd") Date CHANGEDATE,
                                                          @RequestParam(value = "V_MATERIALCODE") String V_MATERIALCODE,

                                                          @RequestParam(value = "a_supplycode") String a_supplycode,
                                                          @RequestParam(value = "a_supplyname") String a_supplyname,
                                                          @RequestParam(value = "a_uniquecode") String a_uniquecode,
                                                          @RequestParam(value = "a_replacedate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date a_replacedate,
                                                          @RequestParam(value = "a_faultreason") String a_faultreason,

                                                          @RequestParam(value = "A_REASON_REMARK") String A_REASON_REMARK,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7113_changeordermat(A_ID, SITE_ID, a_change_amount, V_EQUIP_NO, USERID,
                USERNAME, PLANTCODE, WORKAREA, CHANGEDATE, V_MATERIALCODE,
                a_supplycode, a_supplyname, a_uniquecode, a_replacedate, a_faultreason,
                A_REASON_REMARK);
        return result;
    }

    @RequestMapping(value = "/pro_run7113_changecancel", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_run7113_changecancel(@RequestParam(value = "V_I_ID") String V_I_ID,
                                                        @RequestParam(value = "V_SITE_ID") String V_SITE_ID,
                                                        @RequestParam(value = "V_EQUIP_NO") String V_EQUIP_NO,
                                                        @RequestParam(value = "V_USERID") String V_USERID,
                                                        @RequestParam(value = "V_USERNAME") String V_USERNAME,

                                                        @RequestParam(value = "V_PLANTCODE") String V_PLANTCODE,
                                                        @RequestParam(value = "V_DEPARTCODE") String V_DEPARTCODE,
                                                        @RequestParam(value = "V_CHANGETIME") @DateTimeFormat(pattern = "yyyy-MM-dd") Date V_CHANGETIME,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.pro_run7113_changecancel(V_I_ID, V_SITE_ID, V_EQUIP_NO, V_USERID, V_USERNAME,
                V_PLANTCODE, V_DEPARTCODE, V_CHANGETIME);
        return result;
    }

    /*No7113EXCEL*/
    @RequestMapping(value = "/No7113EXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void No7113EXCEL(
            @RequestParam(value = "v_dept_code") String v_dept_code,
            @RequestParam(value = "v_equip_code") String v_equip_code,
            @RequestParam(value = "v_materialcode") String v_materialcode,
            @RequestParam(value = "v_materialname") String v_materialname,
            HttpServletResponse response)
            throws
            //com.fasterxml.jackson.core.JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

        //V_V_SG_NAME = new String(V_V_SG_NAME.getBytes("iso-8859-1"), "utf-8");
        Map<String, Object> data = cjyService.pro_run7113_ordermatlist(v_dept_code, v_equip_code, v_materialcode, v_materialname);

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

                row.createCell((short) 0).setCellValue(i + 1);

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
                response.setHeader("Content-Disposition", "attachment; filename="
                        + URLEncoder.encode("工单备件更换管理.xls", "UTF-8"));
                OutputStream out = response.getOutputStream();

                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_ET_SET_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_ET_SET_NEW(@RequestParam(value = "V_I_ID") Double V_I_ID,
                                           @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                           @RequestParam(value = "V_V_DESCRIPTION") String V_V_DESCRIPTION,
                                           @RequestParam(value = "V_I_WORK_ACTIVITY") Double V_I_WORK_ACTIVITY,
                                           @RequestParam(value = "V_I_DURATION_NORMAL") Double V_I_DURATION_NORMAL,
                                           @RequestParam(value = "V_V_WORK_CENTER") String V_V_WORK_CENTER,
                                           @RequestParam(value = "V_I_ACTUAL_TIME") Double V_I_ACTUAL_TIME,
                                           @RequestParam(value = "V_I_NUMBER_OF_PEOPLE") Double V_I_NUMBER_OF_PEOPLE,
                                           @RequestParam(value = "V_V_ID") String V_V_ID,
                                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_JXBZ") String V_V_JXBZ,
                                           @RequestParam(value = "V_V_JXBZ_VALUE_DOWN") String V_V_JXBZ_VALUE_DOWN,
                                           @RequestParam(value = "V_V_JXBZ_VALUE_UP") String V_V_JXBZ_VALUE_UP,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map test = new HashMap();

        List<Map> result = null;
        result = cjyService.PRO_PM_WORKORDER_ET_SET_NEW(V_I_ID, V_V_ORDERGUID, V_V_DESCRIPTION,
                V_I_WORK_ACTIVITY, V_I_DURATION_NORMAL, V_V_WORK_CENTER,
                V_I_ACTUAL_TIME, V_I_NUMBER_OF_PEOPLE, V_V_ID, V_V_GUID, V_V_JXBZ, V_V_JXBZ_VALUE_DOWN, V_V_JXBZ_VALUE_UP);
        test.put("list", result);
        return test;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_ET_ID_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_ET_ID_DEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_WORKORDER_ET_ID_DEL(V_V_ORDERGUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_SPARE_ID_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_SPARE_ID_DEL(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_WORKORDER_SPARE_ID_DEL(V_V_ORDERGUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_ET_ID_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_ET_ID_VIEW(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_WORKORDER_ET_ID_VIEW(V_V_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_YS_WXC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_YS_WXC(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                       @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                       @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                                       @RequestParam(value = "V_V_POSTMANSIGN") String V_V_POSTMANSIGN,
                                                       @RequestParam(value = "V_V_CHECKMANCONTENT") String V_V_CHECKMANCONTENT,
                                                       @RequestParam(value = "V_V_CHECKMANSIGN") String V_V_CHECKMANSIGN,
                                                       @RequestParam(value = "V_V_WORKSHOPCONTENT") String V_V_WORKSHOPCONTENT,
                                                       @RequestParam(value = "V_V_WORKSHOPSIGN") String V_V_WORKSHOPSIGN,
                                                       @RequestParam(value = "V_V_DEPTSIGN") String V_V_DEPTSIGN,
                                                       @RequestParam(value = "V_V_EQUIP_NO") String V_V_EQUIP_NO,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        HashMap result = cjyService.PRO_PM_WORKORDER_YS_WXC(V_V_PERCODE, V_V_PERNAME, V_V_ORDERGUID, V_V_POSTMANSIGN, V_V_CHECKMANCONTENT, V_V_CHECKMANSIGN, V_V_WORKSHOPCONTENT, V_V_WORKSHOPSIGN, V_V_DEPTSIGN, V_V_EQUIP_NO);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_VIEW_NOPAGE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_VIEW_NOPAGE(@RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                            @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = cjyService.PRO_PM_07_DEFECT_VIEW_NOPAGE(V_V_STATECODE, X_PERSONCODE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_PLAN_LOCKING_DATE_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_PLAN_LOCKING_DATE_VIEW(@RequestParam(value = "V_I_YEAR") String V_I_YEAR,
                                                             @RequestParam(value = "V_I_MONTH") String V_I_MONTH,
                                                             @RequestParam(value = "V_I_WEEKNUM") String V_I_WEEKNUM,
                                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                             @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
                                                             @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = cjyService.PRO_PM_PLAN_LOCKING_DATE_VIEW(V_I_YEAR, V_I_MONTH, V_I_WEEKNUM, V_V_DEPTCODE,
                V_V_DEPTNEXTCODE, V_V_CONTENT);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SEL(@RequestParam(value = "V_V_WEEK_GUID") String V_V_WEEK_GUID,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SEL(V_V_WEEK_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SET(@RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
                                                        @RequestParam(value = "V_V_WEEK_GUID") String V_V_WEEK_GUID,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SET(V_V_DEFECT_GUID, V_V_WEEK_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_SET_GUID", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_SET_GUID(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_WEEK_SET_GUID(V_V_GUID, V_V_ORGCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_DEFECT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_DEFECT_DEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_WEEK_DEFECT_DEL();
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_DEL(@RequestParam(value = "V_V_WEEK_GUID") String V_V_WEEK_GUID,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_DEL(V_V_WEEK_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_LOG_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_DEFECT_LOG_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                     @RequestParam(value = "V_V_LOGREMARK") String V_V_LOGREMARK,
                                                     @RequestParam(value = "V_V_FINISHCODE") String V_V_FINISHCODE,
                                                     @RequestParam(value = "V_V_KEY") String V_V_KEY,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_DEFECT_LOG_SET(V_V_GUID, V_V_LOGREMARK, V_V_FINISHCODE, V_V_KEY);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_STATE_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_DEFECT_STATE_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                     @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_DEFECT_STATE_SET(V_V_GUID, V_V_STATECODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_SET_STATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_SET_STATE(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                       @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_WEEK_SET_STATE(V_V_GUID, V_V_STATECODE);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SET_W", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SET_W(@RequestParam(value = "V_V_WORKORDER_GUID") String V_V_WORKORDER_GUID,
                                                             @RequestParam(value = "V_V_WEEK_GUID") String V_V_WEEK_GUID,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SET_W(V_V_WORKORDER_GUID, V_V_WEEK_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SET_F", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SET_F(@RequestParam(value = "V_V_WORKORDER_GUID") String V_V_WORKORDER_GUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SET_F(V_V_WORKORDER_GUID);
        return result;
    }


    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SELBYWORK", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SELBYWORK(@RequestParam(value = "V_V_WORKORDER_GUID") String V_V_WORKORDER_GUID,
                                                          @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SELBYWORK(V_V_WORKORDER_GUID, V_V_FLAG);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SET_WD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SET_WD(@RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
                                                          @RequestParam(value = "V_V_WORKORDER_GUID") String V_V_WORKORDER_GUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SET_WD(V_V_DEFECT_GUID, V_V_WORKORDER_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_DELBYWORK", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_DELBYWORK(@RequestParam(value = "V_V_WORKORDER_GUID") String V_V_WORKORDER_GUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_DELBYWORK(V_V_WORKORDER_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_DEFECT_NC", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DEFECT_NC(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                          @RequestParam(value = "V_DEFECT_GUID") String V_DEFECT_GUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_WORKORDER_DEFECT_NC(V_V_ORGCODE, V_V_PERNAME, V_DEFECT_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_DEFECT_PRO", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_WORKORDER_DEFECT_PRO(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                          @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                                          @RequestParam(value = "V_DEFECT_GUID") String V_DEFECT_GUID,
                                                           @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_WORKORDER_DEFECT_PRO(V_V_ORGCODE, V_V_PERNAME, V_DEFECT_GUID,V_V_PROJECT_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_PORJECT_WORKORDER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_PORJECT_WORKORDER(@RequestParam(value = "V_V_PROJECT_CODE") String V_V_PROJECT_CODE,
                                                           @RequestParam(value = "V_V_WEEK_GUID") String V_V_WEEK_GUID,
                                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_03_PLAN_PORJECT_WORKORDER(V_V_PROJECT_CODE, V_V_WEEK_GUID, V_V_ORGCODE, V_V_PERCODE);
        return result;
    }
}



