package org.building.pm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import eu.bitwalker.useragentutils.Browser;
import eu.bitwalker.useragentutils.OperatingSystem;
import eu.bitwalker.useragentutils.UserAgent;
import org.activiti.engine.TaskService;
import org.activiti.engine.task.Task;
import org.apache.poi.hssf.usermodel.*;
import org.building.pm.activitiController.ActivitiController;
import org.building.pm.service.*;
import org.building.pm.webcontroller.AMToMessController;
import org.building.pm.webcontroller.MMController;
import org.building.pm.webpublic.GetShtgtime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.sql.Date;


/**
 * Created by admin on 2017/10/31.
 */
@Controller
@RequestMapping("/app/pm/cjy")
public class CjyController {
    @Autowired
    private CjyService cjyService;

    @Autowired
    private ActivitiController activitiController;

    @Autowired
    private WorkOrderService workOrderService;

    @Autowired
    private ZdhService zdhService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private AMToMessController amToMessController;

    @Autowired
    private MMController mmController;

    @Autowired
    private BasicService basicService;

    @Autowired
    private GetShtgtime getShtgtime;

    @Autowired
    private Dx_fileService dx_fileService;

    @Autowired
    private PM_03Service pm_03Service;

    @Autowired
    private PM_06Service pm_06Service;

    @Value("#{configProperties['infopub.url']}")
    private String infopuburl;

    @Value("#{configProperties['infopub.username']}")
    private String infopubusername;

    @Value("#{configProperties['infopub.password']}")
    private String infopubpassword;

    @Value("#{configProperties['pmlogin']}")
    private String pmlogin;

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
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {

        List list = new ArrayList();

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
                                           @RequestParam(value = "V_V_DESCRIPTION", required = false) String V_V_DESCRIPTION,
                                           @RequestParam(value = "V_I_WORK_ACTIVITY", required = false) String V_I_WORK_ACTIVITY,
                                           @RequestParam(value = "V_I_DURATION_NORMAL", required = false) String V_I_DURATION_NORMAL,
                                           @RequestParam(value = "V_V_WORK_CENTER", required = false) String V_V_WORK_CENTER,
                                           @RequestParam(value = "V_I_ACTUAL_TIME", required = false) String V_I_ACTUAL_TIME,
                                           @RequestParam(value = "V_I_NUMBER_OF_PEOPLE", required = false) String V_I_NUMBER_OF_PEOPLE,
                                           @RequestParam(value = "V_V_ID", required = false) String V_V_ID,
                                           @RequestParam(value = "V_V_GUID", required = false) String V_V_GUID,
                                           @RequestParam(value = "V_V_JXBZ", required = false) String V_V_JXBZ,
                                           @RequestParam(value = "V_V_JXBZ_VALUE_DOWN", required = false) String V_V_JXBZ_VALUE_DOWN,
                                           @RequestParam(value = "V_V_JXBZ_VALUE_UP", required = false) String V_V_JXBZ_VALUE_UP,
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
        Map result = cjyService.PRO_PM_WORKORDER_DEFECT_PRO(V_V_ORGCODE, V_V_PERNAME, V_DEFECT_GUID, V_V_PROJECT_GUID);
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

    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_NSET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_WEEK_NSET(
            @RequestParam(value = "V_V_INPER") String V_V_INPER,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
            @RequestParam(value = "V_V_WEEK") String V_V_WEEK,

            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,

            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
            @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
            @RequestParam(value = "V_V_OTHERPLAN_GUID") String V_V_OTHERPLAN_GUID,
            @RequestParam(value = "V_V_OTHERPLAN_TYPE") String V_V_OTHERPLAN_TYPE,

            @RequestParam(value = "V_V_JHMX_GUID") String V_V_JHMX_GUID,
            @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
            @RequestParam(value = "V_V_BZ") String V_V_BZ,
            @RequestParam(value = "V_V_DEFECTGUID") String V_V_DEFECTGUID,
            @RequestParam(value = "V_V_MAIN_DEFECT") String V_V_MAIN_DEFECT,
            @RequestParam(value = "V_V_EXPECT_AGE") String V_V_EXPECT_AGE,
            @RequestParam(value = "V_V_REPAIR_PER") String V_V_REPAIR_PER,

            @RequestParam(value = "V_V_PDC") String V_V_PDC,
//            @RequestParam(value = "V_V_SGDATE") String V_V_SGDATE,
            @RequestParam(value = "V_V_GYYQ") String V_V_GYYQ,
            @RequestParam(value = "V_V_CHANGPDC") String V_V_CHANGPDC,
//            @RequestParam(value = "V_V_JXRESON") String V_V_JXRESON,
            @RequestParam(value = "V_V_JXHOUR") String V_V_JXHOUR,
            @RequestParam(value = "V_V_JJHOUR") String V_V_JJHOUR,
//            @RequestParam(value = "V_V_JHHOUR") String V_V_JHHOUR,
            @RequestParam(value = "V_V_TELNAME") String V_V_TELNAME,
            @RequestParam(value = "V_V_TELNUMB") String V_V_TELNUMB,
            @RequestParam(value = "V_V_PDGG") String V_V_PDGG,
//----------
            @RequestParam(value = "V_V_THICKNESS") String V_V_THICKNESS,
            @RequestParam(value = "V_V_REASON") String V_V_REASON,
            @RequestParam(value = "V_V_EVERTIME") String V_V_EVERTIME,
//-------------21081113
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            @RequestParam(value = "V_V_RDEPATCODE") String V_V_RDEPATCODE,
            @RequestParam(value = "V_V_RDEPATNAME") String V_V_RDEPATNAME,
            @RequestParam(value = "V_V_SGWAY") String V_V_SGWAY,
            @RequestParam(value = "V_V_SGWAYNAME") String V_V_SGWAYNAME,
            @RequestParam(value = "V_V_OPERANAME") String V_V_OPERANAME,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_WEEK_NSET(
                V_V_INPER,
                V_V_GUID,
                V_V_YEAR,
                V_V_MONTH,
                V_V_WEEK,

                V_V_ORGCODE,
                V_V_DEPTCODE,
                V_V_EQUTYPECODE,
                V_V_EQUCODE,
                V_V_REPAIRMAJOR_CODE,

                V_V_CONTENT,
                V_V_STARTTIME,
                V_V_ENDTIME,
                V_V_OTHERPLAN_GUID,
                V_V_OTHERPLAN_TYPE,

                V_V_JHMX_GUID,
                V_V_HOUR,
                V_V_BZ,
                V_V_DEFECTGUID,
                V_V_MAIN_DEFECT,
                V_V_EXPECT_AGE,
                V_V_REPAIR_PER
                //--update 20180910
//        );
                , V_V_PDC,
//                V_V_SGDATE,
                V_V_GYYQ,
                V_V_CHANGPDC,
//                V_V_JXRESON,
                V_V_JXHOUR,
                V_V_JJHOUR,
//                V_V_JHHOUR,
                V_V_TELNAME,
                V_V_TELNUMB,
                V_V_PDGG, V_V_THICKNESS, V_V_REASON, V_V_EVERTIME,
                V_V_FLAG,
                V_V_RDEPATCODE,
                V_V_RDEPATNAME,
                V_V_SGWAY,
                V_V_SGWAYNAME, V_V_OPERANAME);
//end up

        return result;
    }

    @RequestMapping(value = "/PRO_SAP_EQU_VIEW_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_SAP_EQU_VIEW(
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTNEXTCODE") String V_V_DEPTNEXTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_EQUNAME") String V_V_EQUNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PRO_SAP_EQU_VIEW_SEL(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTNEXTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_EQUNAME);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> login(@RequestParam(value = "UserName") String UserName,
                                     @RequestParam(value = "UserPassword") String UserPassword,
                                     @RequestParam(value = "UserIp") String UserIp,
                                     @RequestParam(value = "SS") String SS,   //分辨率
                                     @RequestParam(value = "V_COMPUTER_TYPE") String V_COMPUTER_TYPE, // 登入类型
                                     HttpServletRequest request)
            throws SQLException {

        UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
        Browser browser = userAgent.getBrowser();//浏览器
        OperatingSystem os = userAgent.getOperatingSystem(); //操作系统
        String LOCALHOST = request.getRemoteHost();//客户端主机名，若失败返回客户端ip

        String BROWN = browser.toString();
        String OSNAME = os.toString();
        // String SS="";
        Map<String, Object> result = cjyService.login(UserName, UserPassword, UserIp, OSNAME, BROWN, LOCALHOST, SS, V_COMPUTER_TYPE);
        return result;
    }

    @RequestMapping(value = "/PM_06_DJ_CRITERION_GENERATE_N", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_06_DJ_CRITERION_GENERATE_N(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                             @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                             @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                                             @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                             @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                             //@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                             @RequestParam(value = "V_V_STIME") String V_V_STIME,
                                             @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
                                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PM_06_DJ_CRITERION_GENERATE_N(V_V_ORGCODE, V_V_DEPTCODE, V_V_CK_EQUTYPECODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_STIME, V_V_ETIME, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PM_06_DJ_DATA_SEL_BYSTATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_SEL_BYSTATE(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_STIME") String V_V_STIME,
            @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PM_06_DJ_DATA_SEL_BYSTATE(V_V_GUID, V_V_STIME, V_V_ETIME);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_06_DJ_DATA_SEL_BYSTATE_NUM", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_SEL_BYSTATE_NUM(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_STIME") String V_V_STIME,
            @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PM_06_DJ_DATA_SEL_BYSTATE_NUM(V_V_GUID, V_V_STIME, V_V_ETIME);

        return data;
    }

    @RequestMapping(value = "/PM_06_DJ_CRITERION_BYDEPT", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_06_DJ_CRITERION_BYDEPT(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                         @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                                         @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                         @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                         @RequestParam(value = "V_V_STIME") String V_V_STIME,
                                         @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
                                         @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                         @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PM_06_DJ_CRITERION_BYDEPT(V_V_ORGCODE, V_V_CK_EQUTYPECODE, V_V_EQUTYPE, V_V_EQUCODE, V_V_STIME, V_V_ETIME, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_VIEW_BYROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_VIEW_BYROLE(@RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                            @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                            HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = cjyService.PRO_PM_07_DEFECT_VIEW_BYROLE(V_V_STATECODE, X_PERSONCODE, V_V_PAGE,
                V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_VIEW_BYROLE2", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_VIEW_BYROLE2(@RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                             @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                             @RequestParam(value = "PUT_PERNAME") String PUT_PERNAME,
                                                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                             @RequestParam(value = "V_SIGN") String V_SIGN,
                                                             HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = cjyService.PRO_PM_07_DEFECT_VIEW_BYROLE2(V_V_STATECODE, X_PERSONCODE, PUT_PERNAME, V_V_PAGE, V_V_PAGESIZE, V_SIGN);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_YEAR_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_YEAR_VIEW(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_WXLX") String V_V_WXLX,
            @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE) throws Exception {

        HashMap data = cjyService.PRO_PM_03_PLAN_YEAR_VIEW(V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE, V_V_ZY, V_V_WXLX, V_V_CONTENT, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    //---upate--2018-09-15  PRO_PM_03_PLAN_YEAR_VIEWALL
    @RequestMapping(value = "/YEAREXCEL", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void PRO_PM_03_PLAN_YEAR_VIEWALL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE", required = false) String V_V_DEPTCODE,
            @RequestParam(value = "V_V_ZY") String V_V_ZY,
            @RequestParam(value = "V_V_WXLX") String V_V_WXLX,
            @RequestParam(value = "V_V_CONTENT", required = false) String V_V_CONTENT,
            HttpServletResponse resp) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        List list = new ArrayList();

        String V_V_DEPTCODE_s = V_V_DEPTCODE.equals("") ? "%" : V_V_DEPTCODE;
//        String V_V_CONTENT_s=V_V_CONTENT.equals("")?"":V_V_CONTENT;

        HashMap data = cjyService.PRO_PM_03_PLAN_YEAR_VIEWALL(V_V_YEAR, V_V_ORGCODE, V_V_DEPTCODE_s, V_V_ZY, V_V_WXLX, V_V_CONTENT);
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        for (int i = 0; i <= 1; i++) {
            sheet.setColumnWidth(i, 3000);
        }
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_LEFT);

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("序号");
        cell.setCellStyle(style);

        cell = row.createCell((short) 1);
        cell.setCellValue("工程状态");
        cell.setCellStyle(style);

        cell = row.createCell((short) 2);
        cell.setCellValue("工程编码");
        cell.setCellStyle(style);

        cell = row.createCell((short) 3);
        cell.setCellValue("工程名称");
        cell.setCellStyle(style);

        cell = row.createCell((short) 4);
        cell.setCellValue("维修类型");
        cell.setCellStyle(style);

        cell = row.createCell((short) 5);
        cell.setCellValue("专业");
        cell.setCellStyle(style);

        cell = row.createCell((short) 6);
        cell.setCellValue("维修内容");
        cell.setCellStyle(style);

        cell = row.createCell((short) 7);
        cell.setCellValue("维修费用");
        cell.setCellStyle(style);

        cell = row.createCell((short) 8);
        cell.setCellValue("开工时间");
        cell.setCellStyle(style);

        cell = row.createCell((short) 9);
        cell.setCellValue("竣工时间");
        cell.setCellStyle(style);


        if (data.size() > 0) {
            list = (List) data.get("list");
            for (int i = 0; i < list.size(); i++) {
                row = sheet.createRow((int) i + 1);
                Map map = (Map) list.get(i);

                row.createCell((short) 0).setCellValue(i + 1);
                row.createCell((short) 1).setCellValue(map.get("V_STATENAME") == null ? "" : map.get("V_STATENAME").toString());
                row.createCell((short) 2).setCellValue(map.get("V_PORJECT_CODE") == null ? "" : map.get("V_PORJECT_CODE").toString());
                row.createCell((short) 3).setCellValue(map.get("V_PORJECT_NAME") == null ? "" : map.get("V_PORJECT_NAME").toString());
                row.createCell((short) 4).setCellValue(map.get("V_WXTYPENAME") == null ? "" : map.get("V_WXTYPENAME").toString());

                row.createCell((short) 5).setCellValue(map.get("V_SPECIALTYNAME") == null ? "" : map.get("V_SPECIALTYNAME").toString());
                row.createCell((short) 6).setCellValue(map.get("V_CONTENT") == null ? "" : map.get("V_CONTENT").toString());
                row.createCell((short) 7).setCellValue(map.get("V_MONEYBUDGET") == null ? "" : map.get("V_MONEYBUDGET").toString());
                row.createCell((short) 8).setCellValue(map.get("V_BDATE") == null ? "" : map.get("V_BDATE").toString());
                row.createCell((short) 9).setCellValue(map.get("V_EDATE") == null ? "" : map.get("V_EDATE").toString());

            }
            try {
                resp.setContentType("application/vnd.ms-excel;charset=UTF-8");
                resp.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("大修计划导出Excel.xls", "UTF-8"));
                OutputStream out = resp.getOutputStream();
                wb.write(out);
                out.flush();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


    }

    //---end up

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SELBYPRO", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SELBYPRO(@RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                             @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
                                                             @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                             @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SELBYPRO(V_V_PROJECT_GUID, V_V_FLAG, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SET_PD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SET_PD(@RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
                                                           @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SET_PD(V_V_DEFECT_GUID, V_V_PROJECT_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_DELBYPRO", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_DELBYPRO(@RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                             HttpServletRequest request,
                                                             HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_DELBYPRO(V_V_PROJECT_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_PROJECT_DX_MX_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_PROJECT_DX_MX_SEL(@RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                    @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                    @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_PROJECT_DX_MX_SEL(V_V_PROJECT_GUID, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_PROJECT_DX_MX_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_PROJECT_DX_MX_SET(@RequestParam(value = "V_V_MX_GUID") String V_V_MX_GUID,
                                                    @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_PROJECT_DX_MX_SET(V_V_MX_GUID, V_V_PROJECT_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_PROJECT_DX_MX_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_PROJECT_DX_MX_DEL(@RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_PROJECT_DX_MX_DEL(V_V_PROJECT_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_SET_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_SET_NEW(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_DEPTNAME") String V_V_DEPTNAME,
            @RequestParam(value = "V_V_PROJECTNAME") String V_V_PROJECTNAME,
            @RequestParam(value = "V_V_PLANDATE") String V_V_PLANDATE,
            @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
            @RequestParam(value = "V_V_SPECIALTYNAME") String V_V_SPECIALTYNAME,
            @RequestParam(value = "V_V_SPECIALTYMANCODE") String V_V_SPECIALTYMANCODE,
            @RequestParam(value = "V_V_SPECIALTYMAN") String V_V_SPECIALTYMAN,
            @RequestParam(value = "V_F_MONEYUP") Double V_F_MONEYUP,
            @RequestParam(value = "V_F_MONEYBUDGET") Double V_F_MONEYBUDGET,
            @RequestParam(value = "V_V_REPAIRDEPTTYPE") String V_V_REPAIRDEPTTYPE,
            @RequestParam(value = "V_V_REPAIRDEPTCODE") String V_V_REPAIRDEPTCODE,
            @RequestParam(value = "V_V_REPAIRDEPT") String V_V_REPAIRDEPT,
            @RequestParam(value = "V_V_DEFECT") String V_V_DEFECT,
            @RequestParam(value = "V_V_MEASURE") String V_V_MEASURE,
            @RequestParam(value = "V_I_RUSHTO") String V_I_RUSHTO,
            @RequestParam(value = "V_V_PROJECTCODE_GS") String V_V_PROJECTCODE_GS,
            @RequestParam(value = "V_V_REPAIRDEPT_GS") String V_V_REPAIRDEPT_GS,
            @RequestParam(value = "V_F_MONEY_GS") String V_F_MONEY_GS,
            @RequestParam(value = "V_D_INDATE_GS") String V_D_INDATE_GS,
            @RequestParam(value = "V_I_YEAR_PLAN") String V_I_YEAR_PLAN,
            @RequestParam(value = "V_I_MONTH_PLAN") String V_I_MONTH_PLAN,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_SPR") String V_V_SPR,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        V_V_IP = request.getRemoteAddr();

        Map<String, Object> result = new HashMap<String, Object>();


        HashMap data = cjyService.PRO_PM_EQUREPAIRPLAN_SET_NEW(V_V_IP, V_V_PERCODE, V_V_PERNAME, V_V_GUID, V_V_DEPTCODE, V_V_DEPTNAME, V_V_PROJECTNAME, V_V_PLANDATE, V_V_SPECIALTY, V_V_SPECIALTYNAME, V_V_SPECIALTYMANCODE
                , V_V_SPECIALTYMAN, V_F_MONEYUP, V_F_MONEYBUDGET, V_V_REPAIRDEPTTYPE, V_V_REPAIRDEPTCODE, V_V_REPAIRDEPT, V_V_DEFECT, V_V_MEASURE, V_I_RUSHTO, V_V_PROJECTCODE_GS, V_V_REPAIRDEPT_GS,
                V_F_MONEY_GS, V_D_INDATE_GS, V_I_YEAR_PLAN, V_I_MONTH_PLAN, V_V_EQUTYPE, V_V_EQUCODE, V_V_SPR);
        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_DELBYPD", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_DELBYPD(@RequestParam(value = "V_V_DEFECT_GUID") String V_V_DEFECT_GUID,
                                                            @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_DELBYPD(V_V_DEFECT_GUID, V_V_PROJECT_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_PROJECT_DX_MX_DEL_BYPM", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_PROJECT_DX_MX_DEL_BYPM(@RequestParam(value = "V_V_MX_GUID") String V_V_MX_GUID,
                                                         @RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_PROJECT_DX_MX_DEL_BYPM(V_V_MX_GUID, V_V_PROJECT_GUID);
        return result;
    }

    @RequestMapping(value = "/PM_PROJECT_DX_MX_RG_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_PROJECT_DX_MX_RG_SEL(@RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                       @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                       @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_PROJECT_DX_MX_RG_SEL(V_V_PROJECT_GUID, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_PROJECT_DX_MX_JJ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_PROJECT_DX_MX_JJ_SEL(@RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                       @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                       @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_PROJECT_DX_MX_JJ_SEL(V_V_PROJECT_GUID, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_PROJECT_DX_MX_BJ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_PROJECT_DX_MX_BJ_SEL(@RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                       @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                       @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_PROJECT_DX_MX_BJ_SEL(V_V_PROJECT_GUID, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_PROJECT_DX_MX_GJ_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_PROJECT_DX_MX_GJ_SEL(@RequestParam(value = "V_V_PROJECT_GUID") String V_V_PROJECT_GUID,
                                                       @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                       @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_PROJECT_DX_MX_GJ_SEL(V_V_PROJECT_GUID, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_07_DEFECT_VIEW_BYEQU", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_07_DEFECT_VIEW_BYEQU(@RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                                           @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                                           @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                           @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                           @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                           HttpServletRequest request)
            throws SQLException {
        Map<String, Object> result = cjyService.PRO_PM_07_DEFECT_VIEW_BYEQU(V_V_STATECODE, X_PERSONCODE, V_V_EQUCODE, V_V_PAGE,
                V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_EQU_TYPE_TXVAL_SEL_P", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_TYPE_TXVAL_SEL_P(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_SAP_EQU_TYPE_TXVAL_SEL_P(V_V_EQUCODE, V_V_EQUTYPECODE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_EQU_BOM_VIEW_P", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_EQU_BOM_VIEW_P(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                      @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                      @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_SAP_EQU_BOM_VIEW_P(V_V_EQUCODE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_DEFECT_VIEW_P", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_DEFECT_VIEW_P(@RequestParam(value = "V_D_DEFECTDATE_B") String V_D_DEFECTDATE_B,
                                    @RequestParam(value = "V_D_DEFECTDATE_E") String V_D_DEFECTDATE_E,
                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                    @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                    @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                    @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                    @RequestParam(value = "V_V_SOURCECODE") String V_V_SOURCECODE,
                                    @RequestParam(value = "V_V_DEFECTLIST") String V_V_DEFECTLIST,
                                    @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                    @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_DEFECT_VIEW_P(V_D_DEFECTDATE_B, V_D_DEFECTDATE_E, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_STATECODE,
                V_V_SOURCECODE, V_V_DEFECTLIST, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_WORKORDER_SELECT_P", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_WORKORDER_SELECT_P(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                          @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                          @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                          @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                          @RequestParam(value = "V_EQUTYPE_CODE") String V_EQUTYPE_CODE,
                                          @RequestParam(value = "V_EQU_CODE") String V_EQU_CODE,
                                          @RequestParam(value = "V_DJ_PERCODE") String V_DJ_PERCODE,
                                          @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                          @RequestParam(value = "V_V_BJ_TXT") String V_V_BJ_TXT,
                                          @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
                                          @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                          @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_SAP_WORKORDER_SELECT_P(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR,
                V_V_STATECODE, V_EQUTYPE_CODE, V_EQU_CODE, V_DJ_PERCODE, V_V_SHORT_TXT, V_V_BJ_TXT, V_V_ORDER_TYP, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PRO_RUN_EQU_BJ_ALERT_ALL_P", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_RUN_EQU_BJ_ALERT_ALL_P(@RequestParam(value = "A_EQUID") String A_EQUID,
                                          @RequestParam(value = "A_CYCLE_ID") String A_CYCLE_ID,
                                          @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                          @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_RUN_EQU_BJ_ALERT_ALL_P(A_EQUID, A_CYCLE_ID, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_YG_VIEW_Z", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_YG_VIEW_Z(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PRO_PM_EQUREPAIRPLAN_YG_VIEW_Z(V_V_GUID_FXJH);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_WL_VIEW_Z", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_WL_VIEW_Z(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PRO_PM_EQUREPAIRPLAN_WL_VIEW_Z(V_V_GUID_FXJH);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_JJ_VIEW_Z", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_JJ_VIEW_Z(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PRO_PM_EQUREPAIRPLAN_JJ_VIEW_Z(V_V_GUID_FXJH);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TRE_GET_Z", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_EQUREPAIRPLAN_TRE_GET_Z(
            @RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
            @RequestParam(value = "V_BY1") String V_BY1,
            @RequestParam(value = "V_BY2") String V_BY2,
            @RequestParam(value = "V_BY3") String V_BY3,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PRO_PM_EQUREPAIRPLAN_TRE_GET_Z(V_V_GUID_FXJH, V_BY1, V_BY2, V_BY3);
        List<Map<String, Object>> lxmlist = (List) data.get("list");
        result.put("list", lxmlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PostTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PostTree()
            throws SQLException {
        List<Map> result = cjyService.PostTree();
        return result;
    }

    @RequestMapping(value = "/BASE_PERSON_SEL_BYDEPT", method = RequestMethod.POST)
    @ResponseBody
    public Map BASE_PERSON_SEL_BYDEPT(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.BASE_PERSON_SEL_BYDEPT(V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_PERSON_GET_BYDEPT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_PERSON_GET_BYDEPT(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                          HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_BASE_PERSON_GET_BYDEPT(V_V_PERSONCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_POST_GET_BYPER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_POST_GET_BYPER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_BASE_POST_GET_BYPER(V_V_PERSONCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_SPECIALTY_TREE_CHECK", method = RequestMethod.POST)
    @ResponseBody
    public List<HashMap> PRO_BASE_SPECIALTY_TREE_CHECK(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        List<HashMap> result = cjyService.PRO_BASE_SPECIALTY_TREE_CHECK(V_V_PERSONCODE, V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_CRAFTTOPER_GETBYPER", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_CRAFTTOPER_GETBYPER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_BASE_CRAFTTOPER_GETBYPER(V_V_PERSONCODE);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_CHOOSE_SEL_NEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_03_PLAN_CHOOSE_SEL_NEW(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                         @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_03_PLAN_CHOOSE_SEL_NEW(V_V_GUID, V_V_PLANTYPE);
        return result;
    }

    @RequestMapping(value = "selectPersonTreeFromDept")
    @ResponseBody
    public List<Map> selectPersonTreeFromDept(
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG,
            HttpServletRequest request, HttpServletResponse response, HttpSession session)
            throws JsonProcessingException,
            NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> menu = new ArrayList<Map>();
        if (V_V_FLAG.equals("true")) {
            menu = cjyService.OrgAndWorkspaceTree(V_V_DEPTCODE);
        } else {
            Map data = cjyService.BASE_PERSON_SEL_BYDEPT(V_V_DEPTCODE);
            Map<String, Object> subMatBudgetCat;
            List<Map<String, Object>> personTreeList = (List<Map<String, Object>>) data.get("list");

            for (int i = 0; i < personTreeList.size(); i++) {
                subMatBudgetCat = personTreeList.get(i);
                Map temp = new HashMap();
                temp.put("parentid", V_V_DEPTCODE);
                temp.put("sid", subMatBudgetCat.get("V_PERSONCODE"));
                temp.put("text", subMatBudgetCat.get("V_PERSONNAME"));
                temp.put("leaf", true);
                menu.add(temp);
                //children.add(subMatBudgetCat);
            }

            result.put("children", menu);
            result.put("success", true);
        }


        return menu;
    }

    @RequestMapping(value = "selRepairPer")
    @ResponseBody
    public List<Map> selRepairPer(
            @RequestParam(value = "V_V_SAP_WORK") String V_V_SAP_WORK,
            @RequestParam(value = "V_V_FLAG") String V_V_FLAG)
            throws SQLException {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map> menu = new ArrayList<Map>();
        if (V_V_FLAG.equals("true")) {
            menu = cjyService.SelDeptTreeToClass(V_V_SAP_WORK);
        } else {
            Map data = cjyService.SelPerByClass(V_V_SAP_WORK);
            Map<String, Object> subMatBudgetCat;
            List<Map<String, Object>> personTreeList = (List<Map<String, Object>>) data.get("list");

            for (int i = 0; i < personTreeList.size(); i++) {
                subMatBudgetCat = personTreeList.get(i);
                Map temp = new HashMap();
                temp.put("parentid", V_V_SAP_WORK);
                temp.put("sid", subMatBudgetCat.get("V_PERSONCODE"));
                temp.put("text", subMatBudgetCat.get("V_PERSONNAME"));
                temp.put("leaf", true);
                menu.add(temp);
                //children.add(subMatBudgetCat);
            }

            result.put("children", menu);
            result.put("success", true);
        }


        return menu;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_GET(
            @RequestParam(value = "V_V_WEEKPLAN_GUID") String V_V_WEEKPLAN_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PRO_PM_03_PLAN_WEEK_GET(V_V_WEEKPLAN_GUID);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_ACTIVITI_PROCESS_PER_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_ACTIVITI_PROCESS_PER_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                           @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
                                                           @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                                           @RequestParam(value = "V_V_FLOW_STEP") String V_V_FLOW_STEP,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                                                           @RequestParam(value = "V_V_WHERE") String V_V_WHERE,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRCODE, V_V_FLOWTYPE, V_V_FLOW_STEP, V_V_PERCODE, V_V_SPECIALTY, V_V_WHERE);

        List<Map<String, Object>> list = (List) data.get("list");

        String ret = (String) data.get("RET");
        result.put("RET", ret);
        result.put("list", list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_ACTIVITI_FLOW_AGREE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_WO_FLOW_AGREE(
            @RequestParam(value = "V_V_ORDERID") String V_V_ORDERID,
            @RequestParam(value = "V_V_PROCESS_NAMESPACE") String V_V_PROCESS_NAMESPACE,
            @RequestParam(value = "V_V_PROCESS_CODE") String V_V_PROCESS_CODE,
            @RequestParam(value = "V_V_STEPCODE") String V_V_STEPCODE,
            @RequestParam(value = "V_V_STEPNEXT_CODE") String V_V_STEPNEXT_CODE,

            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        HashMap result = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_V_ORDERID, V_V_PROCESS_NAMESPACE, V_V_PROCESS_CODE, V_V_STEPCODE, V_V_STEPNEXT_CODE);
        return result;
    }

    public static Map groupList(List<String> arrayList) {
        Map<String, Integer> map = new HashMap<String, Integer>();
        try {

            for (String str : arrayList) {
                Integer count = map.get(str);
                if (count == null) {
                    count = 0;
                }
                count++;
                map.put(str, count);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;

    }


    @RequestMapping(value = "/batchDisAgreeForWeek", method = RequestMethod.POST)
    @ResponseBody
    public Map batchDisAgreeForWeek(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                    @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                    @RequestParam(value = "ProcessInstanceId") String[] ProcessInstanceId,
                                    @RequestParam(value = "FlowType") String[] FlowType,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stateresult = new HashMap();
            Map stepresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            String taskid = "";
            String V_STEPCODE = "";
            String Assignee = "";
            String V_N_STEPCODE = "";
            String V_N_STEPNAME = "";
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                taskid = stepresult.get("taskId").toString();
                V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                if (V_STEPCODE.equals("fqrxg")) {//返回发起人，不能审批和驳回
                    fqrNum++;
                } else {
                    stateresult = activitiController.InstanceState(ProcessInstanceId[i]);
                    List<Map<String, Object>> Assigneelist = (List) stateresult.get("list");
                    if (V_STEPCODE.equals("sbbsp")) {
                        for (int j = 0; j < Assigneelist.size(); j++) {
                            if (Assigneelist.get(j).get("ActivityId").equals("ckjhysp")) {
                                Assignee = Assigneelist.get(j).get("Assignee").toString();
                                V_N_STEPCODE = Assigneelist.get(j).get("ActivityId").toString();
                                V_N_STEPNAME = Assigneelist.get(j).get("ActivityName").toString();
                            }
                        }

                    } else {
                        for (int j = 0; j < Assigneelist.size(); j++) {
                            if (Assigneelist.get(j).get("ActivityName").equals("Start")) {
                                Assignee = Assigneelist.get(j).get("Assignee").toString();
                                V_N_STEPCODE = "fqrxg";
                                V_N_STEPNAME = "发起人修改";
                            }
                        }
                    }

                    if (Assignee.equals("")) {
                        faiNum++;
                    } else {
                        String[] parName = new String[]{V_N_STEPCODE, "flow_yj"};
                        String[] parVal = new String[]{Assignee, "批量审批驳回"};

                        complresult = activitiController.TaskCompletePL(taskid, "不通过", parName, parVal, ProcessDefinitionKey[i], V_ORDERGUID[i], V_N_STEPCODE, V_N_STEPNAME, "不通过", Assignee, V_V_PERSONCODE);
                        if (complresult.get("ret").toString().equals("任务提交成功")) {
//                            if (FlowType[i].equals("WeekPlan")) {
                            if (V_STEPCODE.equals("sbbsp")) {
                                flowresult = cjyService.PRO_PM_03_PLAN_WEEK_SET_STATE(V_ORDERGUID[i], "98");
                            } else {
                                flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], FlowType[i], ProcessDefinitionKey[i], V_STEPCODE, V_N_STEPCODE);
                            }
                            if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                sucNum++;
                                nexperList.add(Assignee);
                            }
                        } else {
                            faiNum++;
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }

        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            //System.out.println(key+" "+value);
            //发送即时通
            String mes = amToMessController.MessageSend(dbnum, "周计划", per);
            if (mes.equals("fail")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "周计划", "-1");
            } else if (mes.equals("true")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "周计划", "0");
            }
        }

        result.put("mes", "周计划批量驳回成功" + sucNum + "条,失败" + faiNum + "条,无法批量驳回" + fqrNum + "条");
        return result;
    }

    //维修计划批量驳回
    @RequestMapping(value = "/batchDisAgreeForMaintain", method = RequestMethod.POST)
    @ResponseBody
    public Map batchDisAgreeForMaintain(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                        @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                        @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                        @RequestParam(value = "ProcessInstanceId") String[] ProcessInstanceId,
                                        @RequestParam(value = "FlowType") String[] FlowType,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map statresult = new HashMap();
            Map stepresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            String taskid = "";
            String V_STEPCODE = "";
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                taskid = stepresult.get("taskId").toString();
                V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                if (V_STEPCODE.equals("fqrxg")) {//返回发起人，不能审批和驳回
                    fqrNum++;
                } else {

                    statresult = activitiController.InstanceState(ProcessInstanceId[i]);
                    List<Map<String, Object>> Assigneelist = (List) statresult.get("list");
                    String Assignee = Assigneelist.get(0).get("Assignee").toString();
                    if (Assignee.equals("")) {
                        faiNum++;
                    } else {
                        String[] parName = new String[]{"fqrxg", "flow_yj"};
                        String[] parVal = new String[]{Assignee, "批量审批驳回"};

                        complresult = activitiController.TaskCompletePL(taskid, "不通过", parName, parVal, ProcessDefinitionKey[i], V_ORDERGUID[i], "fqrxg", "发起人修改", "不通过", Assignee, V_V_PERSONCODE);
                        if (complresult.get("ret").toString().equals("任务提交成功")) {
//                            if (FlowType[i].equals("WeekPlan")) {
                            flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], FlowType[i], ProcessDefinitionKey[i], V_STEPCODE, "fqrxg");
                            if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                sucNum++;
                                nexperList.add(Assignee);
                            }
                        } else {
                            faiNum++;
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }

        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            //System.out.println(key+" "+value);
            //发送即时通
            String mes = amToMessController.MessageSend(dbnum, "维修计划", per);
            if (mes.equals("fail")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "维修计划", "-1");
            } else if (mes.equals("true")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "维修计划", "0");
            }
        }

        result.put("mes", "维修计划批量驳回成功" + sucNum + "条,失败" + faiNum + "条,无法批量驳回" + fqrNum + "条");
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_MONTH_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_MONTH_GET(
            @RequestParam(value = "V_V_MONTHPLAN_GUID") String V_V_MONTHPLAN_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PRO_PM_03_PLAN_MONTH_GET(V_V_MONTHPLAN_GUID);

        List<Map<String, Object>> pm_03list = (List) data.get("list");

        result.put("list", pm_03list);
        result.put("success", true);
        return result;
    }


    @RequestMapping(value = "/batchDisAgreeForMonth", method = RequestMethod.POST)
    @ResponseBody
    public Map batchDisAgreeForMonth(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                     @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                     @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                     @RequestParam(value = "ProcessInstanceId") String[] ProcessInstanceId,
                                     @RequestParam(value = "FlowType") String[] FlowType,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stateresult = new HashMap();
            Map stepresult = new HashMap();
            HashMap perresult = new HashMap();
            Map spperresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            String taskid = "";
            String V_STEPCODE = "";
            String Assignee = "";
            String V_N_STEPCODE = "";
            String V_N_STEPNAME = "";
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                taskid = stepresult.get("taskId").toString();
                V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                if (V_STEPCODE.equals("fqrxg")) {//返回发起人，不能审批和驳回
                    fqrNum++;
                } else {

                    stateresult = activitiController.InstanceState(ProcessInstanceId[i]);
                    List<Map<String, Object>> Assigneelist = (List) stateresult.get("list");

                    if (V_STEPCODE.equals("sbbsp")) {
                        for (int j = 0; j < Assigneelist.size(); j++) {
                            if (Assigneelist.get(j).get("ActivityId").equals("ckjhysp")) {
                                Assignee = Assigneelist.get(j).get("Assignee").toString();
                                V_N_STEPCODE = Assigneelist.get(j).get("ActivityId").toString();
                                V_N_STEPNAME = Assigneelist.get(j).get("ActivityName").toString();
                            }
                        }

                    } else {
                        for (int j = 0; j < Assigneelist.size(); j++) {
                            if (Assigneelist.get(j).get("ActivityName").equals("Start")) {
                                Assignee = Assigneelist.get(j).get("Assignee").toString();
                                V_N_STEPCODE = "fqrxg";
                                V_N_STEPNAME = "发起人修改";
                            }
                        }
                    }

                    if (Assignee.equals("")) {
                        faiNum++;
                    } else {
                        String[] parName = new String[]{V_N_STEPCODE, "flow_yj"};
                        String[] parVal = new String[]{Assignee, "批量审批驳回"};

                        complresult = activitiController.TaskCompletePL(taskid, "不通过", parName, parVal, ProcessDefinitionKey[i], V_ORDERGUID[i], V_N_STEPCODE, V_N_STEPNAME, "不通过", Assignee, V_V_PERSONCODE);

                        if (complresult.get("ret").toString().equals("任务提交成功")) {
                            if (V_STEPCODE.equals("sbbsp")) {
                                flowresult = pm_03Service.PRO_PM_MONTH_STATE_SET(V_ORDERGUID[i], "98");
                            } else {
                                flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], FlowType[i], ProcessDefinitionKey[i], V_STEPCODE, "fqrxg");
                            }
                            if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                sucNum++;
                                nexperList.add(Assignee);
                            }

                        } else {
                            faiNum++;
                        }
                    }


                }

            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }
        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            //System.out.println(key+" "+value);
            //发送即时通
            String mes = amToMessController.MessageSend(dbnum, "月计划", per);
            if (mes.equals("fail")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "月计划", "-1");
            } else if (mes.equals("true")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "月计划", "0");
            }
        }

        result.put("mes", "月计划批量驳回成功" + sucNum + "条,失败" + faiNum + "条,无法批量驳回" + fqrNum + "条");
        return result;
    }


    @RequestMapping(value = "/batchDisAgreeForYear", method = RequestMethod.POST)
    @ResponseBody
    public Map batchDisAgreeForYear(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                    @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                    @RequestParam(value = "ProcessInstanceId") String[] ProcessInstanceId,
                                    @RequestParam(value = "FlowType") String[] FlowType,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stateresult = new HashMap();
            Map stepresult = new HashMap();
            HashMap perresult = new HashMap();
            Map spperresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            String taskid = "";
            String V_STEPCODE = "";
            String Assignee = "";
            String V_N_STEPCODE = "";
            String V_N_STEPNAME = "";
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                taskid = stepresult.get("taskId").toString();
                V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                if (V_STEPCODE.equals("fqrxg")) {//返回发起人，不能审批和驳回
                    fqrNum++;
                } else {

                    stateresult = activitiController.InstanceState(ProcessInstanceId[i]);
                    List<Map<String, Object>> Assigneelist = (List) stateresult.get("list");

                    if (V_STEPCODE.equals("sbbsp")) {
                        for (int j = 0; j < Assigneelist.size(); j++) {
                            if (Assigneelist.get(j).get("ActivityId").equals("ckjhysp")) {
                                Assignee = Assigneelist.get(j).get("Assignee").toString();
                                V_N_STEPCODE = Assigneelist.get(j).get("ActivityId").toString();
                                V_N_STEPNAME = Assigneelist.get(j).get("ActivityName").toString();
                            }
                        }

                    } else {
                        for (int j = 0; j < Assigneelist.size(); j++) {
                            if (Assigneelist.get(j).get("ActivityName").equals("Start")) {
                                Assignee = Assigneelist.get(j).get("Assignee").toString();
                                V_N_STEPCODE = "fqrxg";
                                V_N_STEPNAME = "发起人修改";
                            }
                        }
                    }

                    if (Assignee.equals("")) {
                        faiNum++;
                    } else {
                        String[] parName = new String[]{V_N_STEPCODE, "flow_yj"};
                        String[] parVal = new String[]{Assignee, "批量审批驳回"};

                        complresult = activitiController.TaskCompletePL(taskid, "不通过", parName, parVal, ProcessDefinitionKey[i], V_ORDERGUID[i], V_N_STEPCODE, V_N_STEPNAME, "不通过", Assignee, V_V_PERSONCODE);

                        if (complresult.get("ret").toString().equals("任务提交成功")) {
                            if (V_STEPCODE.equals("sbbsp")) {
                                flowresult = pm_06Service.PRO_PLAN_YEAR_STATE_SET(V_ORDERGUID[i], "98");
                            } else {
                                flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], FlowType[i], ProcessDefinitionKey[i], V_STEPCODE, "fqrxg");
                            }
                            if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                sucNum++;
                                nexperList.add(Assignee);
                            }

                        } else {
                            faiNum++;
                        }
                    }


                }

            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }
        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            //System.out.println(key+" "+value);
            //发送即时通
            String mes = amToMessController.MessageSend(dbnum, "年计划", per);
            if (mes.equals("fail")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "年计划", "-1");
            } else if (mes.equals("true")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "年计划", "0");
            }
        }

        result.put("mes", "年计划批量驳回成功" + sucNum + "条,失败" + faiNum + "条,无法批量驳回" + fqrNum + "条");
        return result;
    }


    @RequestMapping(value = "/PRO_PM_1917_JXGX_PER_DATA_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_1917_JXGX_PER_DATA_VIEW(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_1917_JXGX_PER_DATA_VIEW(V_V_JXGX_CODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_1917_JXGX_JJ_DATA_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_1917_JXGX_JJ_DATA_VIEW(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_1917_JXGX_JJ_DATA_VIEW(V_V_JXGX_CODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_1917_JXGX_GJ_DATA_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_1917_JXGX_GJ_DATA_VIEW(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_1917_JXGX_GJ_DATA_VIEW(V_V_JXGX_CODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_1917_JXGX_JSYQ_DATA_V", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_1917_JXGX_JSYQ_DATA_V(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_1917_JXGX_JSYQ_DATA_V(V_V_JXGX_CODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_1917_JXGX_AQCS_DATA_V", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_1917_JXGX_AQCS_DATA_V(@RequestParam(value = "V_V_JXGX_CODE") String V_V_JXGX_CODE,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_1917_JXGX_AQCS_DATA_V(V_V_JXGX_CODE);
        return result;
    }

    @RequestMapping(value = "/PM_091104Tree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PM_091104Tree(@RequestParam(value = "ORDER_ID") String ORDER_ID,
                                   @RequestParam(value = "WORK_ID") String WORK_ID,
                                   @RequestParam(value = "DEPARTCODE") String DEPARTCODE)
            throws SQLException {
        List<Map> result = cjyService.PM_091104Tree(ORDER_ID, WORK_ID, DEPARTCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_UPDATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_SAP_PM_EQU_P_UPDATE(@RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                       @RequestParam(value = "V_V_EQUSITE") String V_V_EQUSITE,
                                       @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                       @RequestParam(value = "V_V_CBZX") String V_V_CBZX,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_SAP_PM_EQU_P_UPDATE(V_V_EQUCODE, V_V_EQUSITE, V_V_EQUTYPECODE, V_V_CBZX);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_ET_OPERA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_ET_OPERA_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                             @RequestParam(value = "V_V_FACT_VALUE") String V_V_FACT_VALUE,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_WORKORDER_ET_OPERA_SET(V_V_GUID, V_V_FACT_VALUE);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXMX_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXMX_DATA_DEL(@RequestParam(value = "V_V_JXMX_CODE") String V_V_JXMX_CODE,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_1917_JXMX_DATA_DEL(V_V_JXMX_CODE);
        return result;
    }

    @RequestMapping(value = "/batchAgreeForWork", method = RequestMethod.POST)
    @ResponseBody
    public Map batchAgreeForWork(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                 @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                 @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                 @RequestParam(value = "ProcessInstanceId") String[] ProcessInstanceId,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stepresult = new HashMap();
            Map spperresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            Map stateresult = new HashMap();
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                String taskid = stepresult.get("taskId").toString();
                String V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                String V_STEPNAME = stepresult.get("taskName").toString();
                if (V_STEPNAME.indexOf("审批") == -1 && V_STEPNAME.indexOf("工单打印") == -1) {//没有审批字样
                    fqrNum++;
                } else {
                    List<Map<String, Object>> perresult = (List) cjyService.PRO_PM_WORKORDER_GET(V_ORDERGUID[i]).get("list");
                    String V_V_ORGCODE = perresult.get(0).get("V_ORGCODE").toString();
                    String V_V_DEPTCODE = perresult.get(0).get("V_DEPTCODE").toString();
                    String V_V_DEPTCODEREPARIR = perresult.get(0).get("V_DEPTCODEREPARIR").toString();

                    stateresult = activitiController.InstanceState(ProcessInstanceId[i]);
                    List<Map<String, Object>> Assigneelist = (List) stateresult.get("list");
                    String Assignee = Assigneelist.get(0).get("Assignee").toString();

                    spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR, "WORK", V_STEPCODE, V_V_PERSONCODE, "%", "通过");
                    List<Map<String, Object>> spperresultlist = (List) spperresult.get("list");

                    String V_NEXT_SETP = spperresultlist.get(0).get("V_V_NEXT_SETP").toString();
                    String processKey = spperresult.get("RET").toString();
                    String sppercode = spperresultlist.get(0).get("V_PERSONCODE").toString();
//                    //---update--2018-0906
                    if (spperresultlist.size() > 1) {
                        for (int j = 0; j < spperresultlist.size(); j++) {
                            if (spperresultlist.get(j).get("V_PERSONCODE").equals(Assignee)) {
                                sppercode = Assignee;
                                break;
                            }
                            if (spperresultlist.get(j).get("V_PERSONCODE").equals(V_V_PERSONCODE)) {
                                sppercode = V_V_PERSONCODE;
                                break;
                            }
                            if (!spperresultlist.get(j).get("V_PERSONCODE").equals(Assignee) && !spperresultlist.get(j).get("V_PERSONCODE").equals(V_V_PERSONCODE) && j == spperresultlist.size() - 1) {
                                break;
                            }
                        }
                        if (!sppercode.equals(Assignee) && !sppercode.equals(V_V_PERSONCODE) && !V_STEPNAME.equals("工单打印") && !V_STEPNAME.equals("工单打印接收")) {
                            if (i == V_ORDERGUID.length - 1) {
                                result.put("mes", "批量审批中，下一步审批人存在不固定多人无法批量审批");
                                return result;
                            } else {
                                continue;
                            }
                        }

                    }
                    if (V_STEPNAME.indexOf("审批") != -1) {
                        String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                        String[] parVal = new String[]{sppercode, "批量审批通过"};

                        complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, processKey, V_ORDERGUID[i], V_STEPCODE, V_STEPNAME, "请审批！", sppercode, V_V_PERSONCODE);
                    } else if (V_STEPNAME.equals("工单打印")) {
                        String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                        String[] parVal = new String[]{sppercode, "批量打印"};

                        complresult = activitiController.TaskCompletePL(taskid, "已打印", parName, parVal, processKey, V_ORDERGUID[i], V_STEPCODE, V_STEPNAME, "请接收！", sppercode, V_V_PERSONCODE);
                    } else if (V_STEPNAME.equals("工单打印接收")) {
                        String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                        String[] parVal = new String[]{sppercode, "批量打印接收"};

                        complresult = activitiController.TaskCompletePL(taskid, "已反馈", parName, parVal, processKey, V_ORDERGUID[i], V_STEPCODE, V_STEPNAME, "请验收！", sppercode, V_V_PERSONCODE);
                    }

                    if (complresult.get("ret").toString().equals("任务提交成功")) {

                        if (V_STEPNAME.indexOf("审批") != -1) {
                            flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "WORK", processKey, V_STEPCODE, V_NEXT_SETP);
                        } else if (V_STEPNAME.equals("工单打印")) {
                            flowresult = zdhService.PRO_WX_WORKORDER_GET(V_ORDERGUID[i]);
                            List orderList = (List) flowresult.get("list");
                            Map orderMap = (Map) orderList.get(0);
                            flowresult = workOrderService.PRO_PM_WORKORDER_DY(V_V_PERSONCODE, orderMap.get("V_PERSONNAME").toString(), V_ORDERGUID[i], orderMap.get("D_START_DATE").toString(), orderMap.get("D_FINISH_DATE").toString(), "", "", "", "", "", "");
                        } else if (V_STEPNAME.equals("工单打印接收")) {
                            flowresult = zdhService.PRO_WX_WORKORDER_GET(V_ORDERGUID[i]);
                            List orderList = (List) flowresult.get("list");
                            Map orderMap = (Map) orderList.get(0);
                            flowresult = workOrderService.PRO_PM_WORKORDER_FK(V_V_PERSONCODE, orderMap.get("V_PERSONNAME").toString(), V_ORDERGUID[i], orderMap.get("D_START_DATE").toString(), orderMap.get("D_FINISH_DATE").toString(), "", "", "", "", "", "");
                        }
                        /*
                         * 如果下一步是不是审批步骤，当前步骤是审批，向物资接口传递工单信息
                         * */
                        if (V_NEXT_SETP.indexOf("sp") == -1 && V_STEPCODE.indexOf("sp") != -1) {
                            mmController.SetMat(V_ORDERGUID[i], Assignee, request, response);
                        }
                        /*
                         * 传递完成
                         * */

                        if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("成功") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                            sucNum++;
                            nexperList.add(sppercode);
                        }
                    } else {
                        faiNum++;
                    }

                }
            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }
        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            //System.out.println(key+" "+value);
            //发送即时通
            String mes = amToMessController.MessageSend(dbnum, "工单", per);
            if (mes.equals("fail")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "工单", "-1");
            } else if (mes.equals("true")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "工单", "0");
            }
        }

        result.put("mes", "工单批量审批成功" + sucNum + "条,失败" + faiNum + "条,无法批量审批" + fqrNum + "条");
        return result;
    }

    @RequestMapping(value = "/batchDisAgreeForWork", method = RequestMethod.POST)
    @ResponseBody
    public Map batchDisAgreeForWork(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                    @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                    @RequestParam(value = "ProcessInstanceId") String[] ProcessInstanceId,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stepresult = new HashMap();
            Map spperresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            Map stateresult = new HashMap();
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                String taskid = stepresult.get("taskId").toString();
                String V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                String V_STEPNAME = stepresult.get("taskName").toString();
                if (V_STEPNAME.indexOf("审批") == -1) {//没有审批字样
                    fqrNum++;
                } else {
                    List<Map<String, Object>> perresult = (List) cjyService.PRO_PM_WORKORDER_GET(V_ORDERGUID[i]).get("list");
                    String V_V_ORGCODE = perresult.get(0).get("V_ORGCODE").toString();
                    String V_V_DEPTCODE = perresult.get(0).get("V_DEPTCODE").toString();
                    String V_V_DEPTCODEREPARIR = perresult.get(0).get("V_DEPTCODEREPARIR").toString();

                    stateresult = activitiController.InstanceState(ProcessInstanceId[i]);
                    List<Map<String, Object>> Assigneelist = (List) stateresult.get("list");
                    String Assignee = Assigneelist.get(0).get("Assignee").toString();

                    spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR, "WORK", V_STEPCODE, V_V_PERSONCODE, "%", "不通过");
                    List<Map<String, Object>> spperresultlist = (List) spperresult.get("list");
                    String V_NEXT_SETP = spperresultlist.get(0).get("V_V_NEXT_SETP").toString();
                    String V_NEXT_PERSONCODE = spperresultlist.get(0).get("V_PERSONCODE").toString();
                    if (spperresultlist.size() > 1) {
                        for (int j = 0; j < spperresultlist.size(); j++) {

                            if (spperresultlist.get(j).get("V_PERSONCODE").toString().equals(Assignee)) {
                                V_NEXT_SETP = spperresultlist.get(j).get("V_V_NEXT_SETP").toString();
                                //UPDATE 20180910
                                V_NEXT_PERSONCODE = spperresultlist.get(j).get("V_PERSONCODE").toString();
                                break;
                            }
                            if (spperresultlist.get(j).get("V_PERSONCODE").toString().equals(V_V_PERSONCODE)) {
                                V_NEXT_SETP = spperresultlist.get(j).get("V_V_NEXT_SETP").toString();
                                //UPDATE 20180910
                                V_NEXT_PERSONCODE = spperresultlist.get(j).get("V_PERSONCODE").toString();
                                break;
                            }
                        }
                    }
                    //--END UPDATE
                    String processKey = spperresult.get("RET").toString();


                    String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                    //--UPDATE

                    String[] parVal = new String[]{V_NEXT_PERSONCODE, "批量审批驳回"};
                    //-----OLD VALUE
                    //  String[] parVal = new String[]{Assignee, "批量审批驳回"};  ---OLD VALUE
                    // complresult = activitiController.TaskCompletePL(taskid, "不通过", parName, parVal, processKey, V_ORDERGUID[i], V_STEPCODE, V_STEPNAME, "请审批！", Assignee, V_V_PERSONCODE);
                    //--OLD VALUE END
                    complresult = activitiController.TaskCompletePL(taskid, "不通过", parName, parVal, processKey, V_ORDERGUID[i], V_STEPCODE, V_STEPNAME, "请审批！", V_NEXT_PERSONCODE, V_V_PERSONCODE);
                    //--END  UPDATE
                    if (complresult.get("ret").toString().equals("任务提交成功")) {
                        flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "WORK", processKey, V_STEPCODE, V_NEXT_SETP);
                        if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                            sucNum++;
                            nexperList.add(Assignee);
                        }
                    } else {
                        faiNum++;
                    }

                }
            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }
        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            //System.out.println(key+" "+value);
            //发送即时通
            String mes = amToMessController.MessageSend(dbnum, "工单", per);
            if (mes.equals("fail")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "工单", "-1");
            } else if (mes.equals("true")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "工单", "0");
            }
        }

        result.put("mes", "工单批量驳回成功" + sucNum + "条,失败" + faiNum + "条,无法批量驳回" + fqrNum + "条");
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_SELECT_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_SELECT_VIEW(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                            @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                            @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                            @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                            @RequestParam(value = "V_V_ORDER_TYP") String V_V_ORDER_TYP,
                                            @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_WORKORDER_SELECT_VIEW(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR,
                V_V_STATECODE, V_V_ORDER_TYP, V_V_SHORT_TXT);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_WORKORDER_TYP_COUNT", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_WORKORDER_TYP_COUNTS(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                           @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                           @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                           @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                           @RequestParam(value = "V_V_DEPTCODEREPARIR") String V_V_DEPTCODEREPARIR,
                                           @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                           @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_WORKORDER_TYP_COUNT(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGCODE, V_V_DEPTCODE, V_V_DEPTCODEREPARIR,
                V_V_STATECODE, V_V_SHORT_TXT);
        return result;
    }

   /* @RequestMapping(value = "/MessageSend", method = RequestMethod.POST)
    @ResponseBody
    public String MessageSend(@RequestParam(value = "dbnum") String dbnum,
                              @RequestParam(value = "flowType") String flowType,
                              @RequestParam(value = "nexPer") String nexPer) throws Exception {

        String jstcode = basicService.BASE_PRO_JST_CODESEL(nexPer);
        String result = "";
        if (jstcode.equals("")) {
            result = "noperson";
        } else {
            String messtxt = "PM系统待办提醒";
            String MSG = "<SendMessage><AM_Name>" + jstcode + "</AM_Name><PhoneNum></PhoneNum><UserId></UserId><MessageTxt>" + messtxt + "</MessageTxt><SystemName>PM系统</SystemName><Type>即时通</Type><Access></Access><Email></Email><IsBack></IsBack><IsEncrypt></IsEncrypt><ISPriority></ISPriority><Ohter1></Ohter1><Ohter2></Ohter2></SendMessage>";
            String loginurl = pmlogin+"?v_mancode="+nexPer+"&v_type=newangel";

            String strContent = "<HTML><BODY bgColor='#ffffff' style='font-family:Verdana,新宋体;font-size: 12px;'>";
            strContent += "<HR size='1' style='color: 52658C;'>";
            strContent += "待办任务提醒：<UL>";
            strContent += "<li>您有：" + dbnum + " 条" + flowType + "待办</li>";
            strContent += "</UL><a href='" + loginurl + "' target='_blank' >请点击这里进行办理</a></BODY></HTML>";


            try {
                result = amToMessController.AMToMess(MSG, strContent, infopuburl, infopubusername, infopubpassword);
            } catch (Exception e) {
                e.printStackTrace();
                result = "fail";
            }
        }
        return result;
    }*/

    @RequestMapping(value = "/PRO_AM_SEND_LOG_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_AM_SEND_LOG_SET(@RequestParam(value = "V_V_SERVERNAME") String V_V_SERVERNAME,
                                   @RequestParam(value = "V_V_SENDPASSWORD") String V_V_SENDPASSWORD,
                                   @RequestParam(value = "V_V_SEND_PERSON") String V_V_SEND_PERSON,
                                   @RequestParam(value = "V_V_RECEIVE_PERSON") String V_V_RECEIVE_PERSON,
                                   @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
                                   @RequestParam(value = "V_I_SEND") String V_I_SEND) throws Exception {
        Map result = cjyService.PRO_AM_SEND_LOG_SET(V_V_SERVERNAME, V_V_SENDPASSWORD, V_V_SEND_PERSON, V_V_RECEIVE_PERSON, V_V_TYPE,
                V_I_SEND);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_DX_VIEW(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                      @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                      @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                      @RequestParam(value = "V_V_ZY") String V_V_ZY,
                                      @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                      @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                      @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                      @RequestParam(value = "V_V_STATE") String V_V_STATE,
                                      @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                      @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_VIEW(V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_ZY,
                V_V_EQUTYPE, V_V_EQUCODE, V_V_CONTENT, V_V_STATE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_DX_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_DEL(V_V_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_DX_GET(@RequestParam(value = "V_V_DX_GUID") String V_V_DX_GUID,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_GET(V_V_DX_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_NSET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_DX_NSET(@RequestParam(value = "V_V_INPER") String V_V_INPER,
                                      @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                      @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                      @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                      @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                      @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                      @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                      @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                                      @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                      @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
                                      @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
                                      @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
                                      @RequestParam(value = "V_V_BZ") String V_V_BZ,
                                      @RequestParam(value = "V_V_DEFECTGUID") String V_V_DEFECTGUID,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_NSET(V_V_INPER, V_V_GUID, V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE,
                V_V_EQUCODE, V_V_REPAIRMAJOR_CODE, V_V_CONTENT, V_V_STARTTIME, V_V_ENDTIME, V_V_HOUR, V_V_BZ, V_V_DEFECTGUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_SEND", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_DX_SEND(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                      @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                      @RequestParam(value = "V_V_FLOWCODE") String V_V_FLOWCODE,
                                      @RequestParam(value = "V_V_PLANTYPE") String V_V_PLANTYPE,
                                      @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_SEND(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE, V_V_FLOWCODE, V_V_PLANTYPE, V_V_PERSONCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_DEFECT_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_DX_DEFECT_DEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_DEFECT_DEL();
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_SET_GUID", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_DX_SET_GUID(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                          @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                          HttpServletRequest request,
                                                          HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_SET_GUID(V_V_GUID, V_V_ORGCODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_DX_SET(@RequestParam(value = "V_V_INPER") String V_V_INPER,
                                     @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                     @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                     @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                     @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                     @RequestParam(value = "V_V_REPAIRMAJOR_CODE") String V_V_REPAIRMAJOR_CODE,
                                     @RequestParam(value = "V_V_CONTENT") String V_V_CONTENT,
                                     @RequestParam(value = "V_V_STARTTIME") String V_V_STARTTIME,
                                     @RequestParam(value = "V_V_ENDTIME") String V_V_ENDTIME,
                                     @RequestParam(value = "V_V_HOUR") String V_V_HOUR,
                                     @RequestParam(value = "V_V_BZ") String V_V_BZ,
                                     @RequestParam(value = "V_V_DEFECTGUID") String V_V_DEFECTGUID,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_SET(V_V_INPER, V_V_GUID, V_V_YEAR, V_V_MONTH, V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPECODE,
                V_V_EQUCODE, V_V_REPAIRMAJOR_CODE, V_V_CONTENT, V_V_STARTTIME, V_V_ENDTIME, V_V_HOUR, V_V_BZ, V_V_DEFECTGUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_DX_SET_STATE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_03_PLAN_DX_SET_STATE(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_DX_SET_STATE(V_V_GUID, V_V_STATECODE);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_04_PROJECT_DATA_STATIST", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_PM_04_PROJECT_DATA_STATIST(@RequestParam(value = "V_D_DATE_B") String V_D_DATE_B,
                                              @RequestParam(value = "V_D_DATE_E") String V_D_DATE_E,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_PM_04_PROJECT_DATA_STATIST(V_D_DATE_B, V_D_DATE_E);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_EQUREPAIRPLAN_TREE_BYTI", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_PM_EQUREPAIRPLAN_TREE_BYTI(@RequestParam(value = "V_V_GUID_FXJH") String V_V_GUID_FXJH,
                                                    @RequestParam(value = "V_D_DATE_B") String V_D_DATE_B,
                                                    @RequestParam(value = "V_D_DATE_E") String V_D_DATE_E,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        List<Map> result = cjyService.PRO_PM_EQUREPAIRPLAN_TREE_BYTI(V_V_GUID_FXJH, V_D_DATE_B, V_D_DATE_E);
        return result;
    }

    @RequestMapping(value = "PRO_JMDJ_VIEW_DATA_WORD_ITEM", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_JMDJ_VIEW_DATA_WORD_ITEM(@RequestParam(value = "V_D_ENTER_DATE_B") String V_D_ENTER_DATE_B,
                                                            @RequestParam(value = "V_D_ENTER_DATE_E") String V_D_ENTER_DATE_E,
                                                            @RequestParam(value = "V_V_ORGNAME") String V_V_ORGNAME,
                                                            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                                            HttpServletRequest request) throws SQLException {
        Map<String, Object> result = cjyService.PRO_JMDJ_VIEW_DATA_WORD_ITEM(V_D_ENTER_DATE_B, V_D_ENTER_DATE_E, V_V_ORGNAME, V_V_DEPTCODE, V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_CREATE_WORKORDERMON", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_CREATE_WORKORDERMON(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PM_03_PLAN_CREATE_WORKORDERMON(V_V_GUID);
        String rlist = (String) data.get("V_INFO");
        result.put("v_info", rlist);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_M_CREATE_WORKORDER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_M_CREATE_WORKORDER(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = cjyService.PM_03_PLAN_M_CREATE_WORKORDER(V_V_GUID, V_V_PERCODE);

        List<Map<String, Object>> rlist = (List) data.get("list");
        String v_info = (String) data.get("V_INFO");
        String V_V_ORDERGUID = data.get("V_V_ORDERGUID").toString();
        String V_V_SOURCECODE = data.get("V_V_SOURCECODE").toString();
        String V_V_EQUTYPE = data.get("V_V_EQUTYPE").toString();
        result.put("list", rlist);
        result.put("v_info", v_info);
        result.put("V_V_ORDERGUID", V_V_ORDERGUID);
        result.put("V_V_SOURCECODE", V_V_SOURCECODE);
        result.put("V_V_EQUTYPE", V_V_EQUTYPE);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_BASE_ZZMC_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_BASE_ZZMC_VIEW(@RequestParam(value = "V_ZZMC") String V_ZZMC,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_BASE_ZZMC_VIEW(V_ZZMC);
        return result;
    }

    //----update 2018-0831
    @RequestMapping(value = "/getNextPerson", method = RequestMethod.POST)
    @ResponseBody
    public Map getNextPerson(@RequestParam(value = "businessKey") String businessKey,
                             @RequestParam(value = "ActivitiId") String ActivitiId,
                             HttpServletRequest request,
                             HttpServletResponse response) throws Exception {


        List<Map> resList = new ArrayList<>();
        Map result = new HashMap();
        Map data = activitiController.GetActivitiStepFromBusinessId(businessKey);//GetInstanceFromBusinessId
        Map map = (Map) data.get("list");
        String percode;
        String post = "";
        List<Map<String, Object>> postlist;
        for (int i = 0; i < map.size(); i++) {
            if (map.get("ActivityId").toString() == ActivitiId) {
                percode = map.get("Assignee").toString();
                postlist = (List) cjyService.PRO_BASE_POST_GET_BYPER(percode).get("list");

                for (int j = 0; j < postlist.size(); j++) {
                    if (j == 0) {
                        post = postlist.get(j).get("V_POSTNAME").toString();
                    } else {
                        post += "," + postlist.get(j).get("V_POSTNAME").toString();
                    }
                }
            }
        }
        // String percode = map.get("Assignee").toString();
        // List<Map<String, Object>> postlist = (List) cjyService.PRO_BASE_POST_GET_BYPER(percode).get("list");
//        String post = "";
//        for (int j = 0; j < postlist.size(); j++) {
//            if (j == 0) {
//                post = postlist.get(j).get("V_POSTNAME").toString();
//            } else {
//                post += "," + postlist.get(j).get("V_POSTNAME").toString();
//            }
//
//        }

        map.put("post", post);
        resList.add(map);


        result.put("list", resList);
        return result;
    }

    //---end upate
    @RequestMapping(value = "/setNextPerson", method = RequestMethod.POST)
    @ResponseBody
    public Map setNextPerson(@RequestParam(value = "businessKey") String businessKey,
                             @RequestParam(value = "ActivitiId") String ActivitiId,
                             @RequestParam(value = "newperson") String[] newperson,
                             HttpServletRequest request,
                             HttpServletResponse response) throws Exception {


        List<Map> resList = new ArrayList<>();
        Map result = new HashMap();

        Map data = activitiController.GetActivitiStepFromBusinessId(businessKey);//GetInstanceFromBusinessId

        Map map = (Map) data.get("list");

        String oldpercode = map.get("Assignee").toString();

        List<Task> runTasks = taskService.createTaskQuery()
                .processInstanceId(data.get("InstanceId").toString())
                .taskDefinitionKey(ActivitiId).list();

        if (runTasks.size() == newperson.length) {
            int i = 0;
            for (Task runTask : runTasks) {
                runTask.setAssignee(newperson[i].toString());
                taskService.saveTask(runTask);
                i++;
            }
            result.put("msg", "Success");
        } else {
            result.put("msg", "用户数量与任务数量不一致");
        }
        return result;
    }


    @RequestMapping(value = "/PM_1917_JXGX_PER_DATA_SELBYG", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_PER_DATA_SELBYG(@RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_1917_JXGX_PER_DATA_SELBYG(V_V_ORDERGUID);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXGX_PER_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_PER_DATA_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                         @RequestParam(value = "V_V_PERCODE_DE") String V_V_PERCODE_DE,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_1917_JXGX_PER_DATA_DEL(V_V_GUID, V_V_PERCODE_DE);
        return result;
    }

    @RequestMapping(value = "/PM_1917_JXGX_PER_DATA_SET_G", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_1917_JXGX_PER_DATA_SET_G(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_PERCODE_DE") String V_V_PERCODE_DE,
                                           @RequestParam(value = "V_V_PERNAME_DE") String V_V_PERNAME_DE,
                                           @RequestParam(value = "V_V_TS") String V_V_TS,
                                           @RequestParam(value = "V_V_DE") String V_V_DE,
                                           @RequestParam(value = "V_V_PERTYPE_ED") String V_V_PERTYPE_ED,
                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                           @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                           HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_1917_JXGX_PER_DATA_SET_G(V_V_GUID, V_V_PERCODE_DE, V_V_PERNAME_DE, V_V_TS, V_V_DE, V_V_PERTYPE_ED, V_V_PERCODE, V_V_PERNAME);
        return result;
    }

    @RequestMapping(value = "/PM_ACTIVITI_STEP_LOG_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_ACTIVITI_STEP_LOG_SET(@RequestParam(value = "V_V_BUSINESS_GUID") String V_V_BUSINESS_GUID,
                                        @RequestParam(value = "V_V_PROCESS_GUID") String V_V_PROCESS_GUID,
                                        @RequestParam(value = "V_V_STEPCODE") String V_V_STEPCODE,
                                        @RequestParam(value = "V_V_STEPNAME") String V_V_STEPNAME,
                                        @RequestParam(value = "V_V_IDEA") String V_V_IDEA,
                                        @RequestParam(value = "V_V_NEXTPER") String V_V_NEXTPER,
                                        @RequestParam(value = "V_V_INPER") String V_V_INPER,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Map result = cjyService.PM_ACTIVITI_STEP_LOG_SET(V_V_BUSINESS_GUID, V_V_PROCESS_GUID, V_V_STEPCODE, V_V_STEPNAME, V_V_IDEA, V_V_NEXTPER, V_V_INPER);
        return result;
    }

    @RequestMapping(value = "/PRO_ACTIVITI_DELETE", method = RequestMethod.POST)
    @ResponseBody
    public Map PRO_ACTIVITI_DELETE(@RequestParam(value = "V_V_BusinessKey") String V_V_BusinessKey,
                                   @RequestParam(value = "V_V_FlowType") String V_V_FlowType,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Map result = cjyService.PRO_ACTIVITI_DELETE(V_V_BusinessKey, V_V_FlowType);
        return result;
    }

    @RequestMapping(value = "PRO_PM_03_PLAN_WEEK_GAUNTT_RUN", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_PM_03_PLAN_WEEK_GAUNTT_RUN(@RequestParam(value = "V_V_SDATE") String V_V_SDATE,
                                                    @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
                                                    @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                    @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                    HttpServletRequest request)
            throws SQLException {
        List<Map> result = cjyService.PRO_PM_03_PLAN_WEEK_GAUNTT_RUN(V_V_SDATE, V_V_EDATE, V_V_ORGCODE, V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "PRO_WEEKPLAN_WORKORDER_GAUNTT", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_WEEKPLAN_WORKORDER_GAUNTT(@RequestParam(value = "V_V_SDATE") String V_V_SDATE,
                                                   @RequestParam(value = "V_V_EDATE") String V_V_EDATE,
                                                   @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                   @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                   HttpServletRequest request)
            throws SQLException {
        List<Map> result = cjyService.PRO_WEEKPLAN_WORKORDER_GAUNTT(V_V_SDATE, V_V_EDATE, V_V_ORGCODE, V_V_DEPTCODE);
        return result;
    }

    @RequestMapping(value = "PRO_PM_WORKORDER_SELBYDEFECT", method = RequestMethod.POST)
    @ResponseBody
    public HashMap PRO_PM_WORKORDER_SELBYDEFECT(@RequestParam(value = "V_DEFECT_GUID") String V_DEFECT_GUID)
            throws SQLException {
        HashMap result = cjyService.PRO_PM_WORKORDER_SELBYDEFECT(V_DEFECT_GUID);
        return result;
    }

    //月计划批量通过
    @RequestMapping(value = "/batchAgreeForMonth", method = RequestMethod.POST)
    @ResponseBody
    public Map batchAgreeForMonth(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                  @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                  @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                  @RequestParam(value = "FlowType") String[] FlowType,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        String nextPerCode = "";
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stepresult = new HashMap();
            HashMap perresult = new HashMap();
            Map spperresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            Map nextperResult = new HashMap();
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                String taskid = stepresult.get("taskId").toString();
                String V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                if (V_STEPCODE.equals("fqrxg")) {//返回发起人，不能审批和驳回
                    fqrNum++;
                } else {
                    if (FlowType[i].equals("MonthPlan")) {
                        perresult = cjyService.PRO_PM_03_PLAN_MONTH_GET(V_ORDERGUID[i]);
                        List<Map<String, Object>> perlist = (List) perresult.get("list");
                        String V_V_ORGCODE = perlist.get(0).get("V_ORGCODE").toString();
                        String V_V_DEPTCODE = perlist.get(0).get("V_DEPTCODE").toString();
                        String V_V_SPECIALTY = perlist.get(0).get("V_REPAIRMAJOR_CODE").toString();

                        String V_STEPNAME = "";
                        String V_NEXT_SETP = "";
                        String sppercode = "";
                        String processKey = "";

                        if (V_STEPCODE.equals("ckjhysp")) {
                            spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, "", "MonthPlan", V_STEPCODE, V_V_PERSONCODE, V_V_SPECIALTY, "上报设备部");
                        } else {
                            spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, "", "MonthPlan", V_STEPCODE, V_V_PERSONCODE, V_V_SPECIALTY, "通过");
                        }

                        List<Map<String, Object>> spperlist = (List) spperresult.get("list");

                        V_STEPNAME = spperlist.get(0).get("V_V_FLOW_STEPNAME").toString();
                        V_NEXT_SETP = spperlist.get(0).get("V_V_NEXT_SETP").toString();
                        sppercode = spperlist.get(0).get("V_PERSONCODE").toString();

                        processKey = spperresult.get("RET").toString();
//                        }


                        if (V_NEXT_SETP.equals("lcjs")) {
                            String currdate = getShtgtime.Shtgtime();

                            String[] parName = new String[]{"lcjs", "flow_yj", "shtgtime"};
                            String[] parVal = new String[]{"lcjs", "批量审批通过", currdate};

                            complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "通过", V_V_PERSONCODE, "lcjs", "流程结束", "lcjs", ProcessDefinitionKey[i], V_ORDERGUID[i]);
                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "MonthPlan", processKey, V_STEPCODE, V_NEXT_SETP);
                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                }
                            } else {
                                faiNum++;
                            }
                        } else {
                            String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                            String[] parVal = new String[]{sppercode, "批量审批通过"};
                            if (V_STEPCODE.equals("ckjhysp")) {
                                complresult = activitiController.TaskCompletePL(taskid, "上报设备部", parName, parVal, "请审批！", V_V_PERSONCODE, sppercode, V_STEPNAME, V_STEPCODE, processKey, V_ORDERGUID[i]);
                            } else {
                                complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "请审批！", V_V_PERSONCODE, sppercode, V_STEPNAME, V_STEPCODE, processKey, V_ORDERGUID[i]);
                            }

                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                if (V_STEPCODE.equals("ckjhysp")) {
                                    flowresult = pm_03Service.PRO_PM_MONTH_STATE_SET(V_ORDERGUID[i], "70");
                                } else {
                                    flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "MonthPlan", processKey, V_STEPCODE, V_NEXT_SETP);
                                }

                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                    nexperList.add(sppercode);
                                }
                            } else {
                                faiNum++;
                            }
                        }
                    }

                }
            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }
        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        Map nextperDept = new HashMap();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            nextperDept = zdhService.PRO_BASE_PERSON_GET(per);
            List<Map<String, Object>> nextperDeptList = (List) nextperDept.get("list");
            //System.out.println(key+" "+value);
            //发送即时通
            if (nextperDeptList.get(0).get("V_ORGCODE").toString().equals("9900")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "月计划", "-1");
            } else {
                String mes = amToMessController.MessageSend(dbnum, "月计划", per);
                if (mes.equals("fail")) {
                    PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "月计划", "-1");
                } else if (mes.equals("true")) {
                    PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "月计划", "0");
                }
            }
        }

        result.put("mes", "月计划批量审批成功" + sucNum + "条,失败" + faiNum + "条,无法批量审批" + fqrNum + "条");
        return result;
    }

    //周计划批量通过
    @RequestMapping(value = "/batchAgreeForWeek", method = RequestMethod.POST)
    @ResponseBody

    public Map batchAgreeForWeek(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                 @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                 @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                 @RequestParam(value = "FlowType") String[] FlowType,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        String a = "";

        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stepresult = new HashMap();
            HashMap perresult = new HashMap();
            Map spperresult = new HashMap();
            Map spsbbresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();

            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                String taskid = stepresult.get("taskId").toString();
                String V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();

                if (V_STEPCODE.equals("fqrxg")) {//返回发起人，不能审批和驳回
                    fqrNum++;
                } else {
                    if (FlowType[i].equals("WeekPlan")) {
//
                        perresult = cjyService.PRO_PM_03_PLAN_WEEK_GET(V_ORDERGUID[i]);
                        List<Map<String, Object>> perlist = (List) perresult.get("list");
                        String V_V_ORGCODE = perlist.get(0).get("V_ORGCODE").toString();
                        String V_V_DEPTCODE = perlist.get(0).get("V_DEPTCODE").toString();
                        String V_V_SPECIALTY = perlist.get(0).get("V_REPAIRMAJOR_CODE").toString();


                        String V_STEPNAME = "";
                        String V_NEXT_SETP = "";
                        String sppercode = "";
                        String processKey = "";


                        if (V_STEPCODE.equals("ckjhysp")) {
                            spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, "", "WeekPlan", V_STEPCODE, V_V_PERSONCODE, V_V_SPECIALTY, "上报设备部");
                        } else {
                            spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, "", "WeekPlan", V_STEPCODE, V_V_PERSONCODE, V_V_SPECIALTY, "通过");
                        }

                        List<Map<String, Object>> spperlist = (List) spperresult.get("list");

                        V_STEPNAME = spperlist.get(0).get("V_V_FLOW_STEPNAME").toString();
                        V_NEXT_SETP = spperlist.get(0).get("V_V_NEXT_SETP").toString();
                        sppercode = spperlist.get(0).get("V_PERSONCODE").toString();

                        processKey = spperresult.get("RET").toString();
                        if (V_NEXT_SETP.equals("lcjs")) {//最后一步
                            String time = getShtgtime.Shtgtime();
                            String[] parName = new String[]{"lcjs", "flow_yj", "shtgtime"};
                            String[] parVal = new String[]{"lcjs", "批量审批通过", time};

                            complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "通过", "lcjs", V_V_PERSONCODE, "流程结束", "lcjs", ProcessDefinitionKey[i], V_ORDERGUID[i]);
                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "WeekPlan", processKey, V_STEPCODE, V_NEXT_SETP);
                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                }
                            } else {
                                faiNum++;
                            }
                        } else {
                            String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                            String[] parVal = new String[]{sppercode, "批量审批通过"};
                            if (V_STEPCODE.equals("ckjhysp")) {
                                complresult = activitiController.TaskCompletePL(taskid, "上报设备部", parName, parVal, "请审批！", V_V_PERSONCODE, sppercode, V_STEPNAME, V_STEPCODE, processKey, V_ORDERGUID[i]);
                            } else {
                                complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "请审批！", V_V_PERSONCODE, sppercode, V_STEPNAME, V_STEPCODE, processKey, V_ORDERGUID[i]);
                            }

                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                if (V_STEPCODE.equals("ckjhysp")) {
                                    flowresult = cjyService.PRO_PM_03_PLAN_WEEK_SET_STATE(V_ORDERGUID[i], "70");
                                } else {
                                    flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "WeekPlan", processKey, V_STEPCODE, V_NEXT_SETP);
                                }
                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                    nexperList.add(sppercode);
                                }
                            } else {
                                faiNum++;
                            }
                        }

                    }
                    // add
                    if (FlowType[i].equals("WeekPlan01")) {
                        perresult = dx_fileService.PRO_PM_03_PLAN_WEEK_GET2(V_ORDERGUID[i]);
                        List<Map<String, Object>> perlist = (List) perresult.get("list");
                        String V_V_ORGCODE = perlist.get(0).get("V_ORGCODE").toString();
                        String V_V_DEPTCODE = perlist.get(0).get("V_DEPTCODE").toString();
                        String V_V_SPECIALTY = perlist.get(0).get("V_REPAIRMAJOR_CODE").toString();
                        String V_V_STATE = perlist.get(0).get("V_STATE").toString();


                        String V_STEPNAME = "";
                        String V_NEXT_SETP = "";
                        String sppercode = "";
                        String processKey = "";

                        spsbbresult = dx_fileService.PM_ACTIVITI_PROCESS_PER_SELSBB(V_V_ORGCODE, V_V_DEPTCODE, "", "WeekPlan01", V_STEPCODE, V_V_PERSONCODE, V_V_SPECIALTY, "通过");
                        List<Map<String, Object>> spperlist2 = (List) spsbbresult.get("list");

                        V_STEPNAME = spperlist2.get(0).get("V_V_FLOW_STEPNAME").toString();
                        V_NEXT_SETP = spperlist2.get(0).get("V_V_NEXT_SETP").toString();
                        sppercode = spperlist2.get(0).get("V_PERSONCODE").toString();

                        processKey = spsbbresult.get("RET").toString();
//                        }


//                        if (V_STEPCODE.equals("sbbsp")) {//最后一步
                        if (V_NEXT_SETP.equals("sbblcjs")) {//最后一步
                            String time = getShtgtime.Shtgtime();
                            String[] parName = new String[]{"sbblcjs", "flow_yj", "shtgtime"};
                            String[] parVal = new String[]{"sbblcjs", "批量审批通过", time};

                            complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "通过", V_V_PERSONCODE, "sbblcjs", "流程结束", "sbblcjs", ProcessDefinitionKey[i], V_ORDERGUID[i]);
                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                if (V_V_STATE.equals("31")) {
                                    flowresult = dx_fileService.PRO_PLAN_WEEK_SET_STASBB(V_ORDERGUID[i], "31");
                                } else {
                                    flowresult = dx_fileService.PRO_PLAN_WEEK_SET_STASBB(V_ORDERGUID[i], "80");
                                }
//                                flowresult = dx_fileService.PRO_PM_03_PLAN_WEEK_SET_STATESBB(V_ORDERGUID[i], "80");
                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                }
                            } else {
                                faiNum++;
                            }
                        } else {
                            String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                            String[] parVal = new String[]{sppercode, "批量审批通过"};

                            complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "请审批！", V_V_PERSONCODE, sppercode, V_STEPNAME, V_STEPCODE, processKey, V_ORDERGUID[i]);
                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "WeekPlan01", processKey, V_STEPCODE, V_NEXT_SETP);
                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                    nexperList.add(sppercode);
                                    //result.put("nestper", sppercode);
                                }
                            } else {
                                faiNum++;
                            }
                        }

                    }
                }


            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }


        }

        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        Map nextperDept = new HashMap();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            nextperDept = zdhService.PRO_BASE_PERSON_GET(per);
            List<Map<String, Object>> nextperDeptList = (List) nextperDept.get("list");
            //System.out.println(key+" "+value);
            //发送即时通
            if (nextperDeptList.get(0).get("V_ORGCODE").toString().equals("9900")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "月计划", "-1");
            } else {
                String mes = amToMessController.MessageSend(dbnum, "周计划", per);
                if (mes.equals("fail")) {
                    PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "周计划", "-1");
                } else if (mes.equals("true")) {
                    PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "周计划", "0");
                }
            }
        }

        result.put("mes", "周计划批量审批成功" + sucNum + "条,失败" + faiNum + "条,无法批量审批" + fqrNum + "条");
        return result;
    }

    //年计划批量通过
    @RequestMapping(value = "/batchAgreeForYear", method = RequestMethod.POST)
    @ResponseBody
    public Map batchAgreeForYear(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                 @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                 @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                 @RequestParam(value = "FlowType") String[] FlowType,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        String nextPerCode = "";
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stepresult = new HashMap();
            HashMap perresult = new HashMap();
            Map spperresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            Map nextperResult = new HashMap();
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                String taskid = stepresult.get("taskId").toString();
                String V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                if (V_STEPCODE.equals("fqrxg")) {//返回发起人，不能审批和驳回
                    fqrNum++;
                } else {
                    if (FlowType[i].equals("YearPlan")) {
                        perresult = pm_06Service.PRO_PLAN_YEAR_SEL_BYGUID(V_ORDERGUID[i]);
                        List<Map<String, Object>> perlist = (List) perresult.get("list");
                        String V_V_ORGCODE = perlist.get(0).get("V_ORGCODE").toString();
                        String V_V_DEPTCODE = perlist.get(0).get("V_DEPTCODE").toString();
                        String V_V_SPECIALTY = "";

                        String V_STEPNAME = "";
                        String V_NEXT_SETP = "";
                        String sppercode = "";
                        String processKey = "";

                        if (V_STEPCODE.equals("ckjhysp")) {
                            spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, "", "YearPlan", V_STEPCODE, V_V_PERSONCODE, V_V_SPECIALTY, "上报设备部");
                        } else {
                            spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, "", "YearPlan", V_STEPCODE, V_V_PERSONCODE, V_V_SPECIALTY, "通过");
                        }

                        List<Map<String, Object>> spperlist = (List) spperresult.get("list");

                        V_STEPNAME = spperlist.get(0).get("V_V_FLOW_STEPNAME").toString();
                        V_NEXT_SETP = spperlist.get(0).get("V_V_NEXT_SETP").toString();
                        sppercode = spperlist.get(0).get("V_PERSONCODE").toString();

                        processKey = spperresult.get("RET").toString();

                        if (V_NEXT_SETP.equals("lcjs")) {//最后一步

                            String currdate = getShtgtime.Shtgtime();

                            String[] parName = new String[]{"lcjs", "flow_yj", "shtgtime"};
                            String[] parVal = new String[]{"lcjs", "批量审批通过", currdate};

                            complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "通过", V_V_PERSONCODE, "lcjs", "流程结束", "lcjs", ProcessDefinitionKey[i], V_ORDERGUID[i]);
                            if (complresult.get("ret").toString().equals("任务提交成功")) {

                                flowresult = dx_fileService.PM_PLAN_YEAR_STATE_UPDATE(V_ORDERGUID[i], "30");
                                if (flowresult.get("RET").toString().equals("SUCCESS")) {
                                    sucNum++;
                                }
                            } else {
                                faiNum++;
                            }
                        } else {
                            String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                            String[] parVal = new String[]{sppercode, "批量审批通过"};
                            if (V_STEPCODE.equals("ckjhysp")) {
                                complresult = activitiController.TaskCompletePL(taskid, "上报设备部", parName, parVal, "请审批！", V_V_PERSONCODE, sppercode, V_STEPNAME, V_STEPCODE, processKey, V_ORDERGUID[i]);
                            } else {
                                complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "请审批！", V_V_PERSONCODE, sppercode, V_STEPNAME, V_STEPCODE, processKey, V_ORDERGUID[i]);
                            }

                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                if (V_STEPCODE.equals("ckjhysp")) {
                                    flowresult = pm_06Service.PRO_PLAN_YEAR_STATE_SET(V_ORDERGUID[i], "70");
                                } else {
                                    flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "YearPlan", processKey, V_STEPCODE, V_NEXT_SETP);
                                }
                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                    nexperList.add(sppercode);
                                }
                            } else {
                                faiNum++;
                            }
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }
        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        Map nextperDept = new HashMap();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            nextperDept = zdhService.PRO_BASE_PERSON_GET(per);
            List<Map<String, Object>> nextperDeptList = (List) nextperDept.get("list");
            //System.out.println(key+" "+value);
            //发送即时通
            if (nextperDeptList.get(0).get("V_ORGCODE").toString().equals("9900")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "年计划", "-1");
            } else {
                String mes = amToMessController.MessageSend(dbnum, "年计划", per);
                if (mes.equals("fail")) {
                    PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "年计划", "-1");
                } else if (mes.equals("true")) {
                    PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "年计划", "0");
                }
            }
        }

        result.put("mes", "年计划批量审批成功" + sucNum + "条,失败" + faiNum + "条,无法批量审批" + fqrNum + "条");
        return result;
    }

    //维修计划批量通过
    @RequestMapping(value = "/batchAgreeForMaintain", method = RequestMethod.POST)
    @ResponseBody
    public Map batchAgreeForMaintain(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                     @RequestParam(value = "V_ORDERGUID") String[] V_ORDERGUID,
                                     @RequestParam(value = "ProcessDefinitionKey") String[] ProcessDefinitionKey,
                                     @RequestParam(value = "FlowType") String[] FlowType,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        Map result = new HashMap();
        int sucNum = 0;
        int fqrNum = 0;
        int faiNum = 0;
        String nextPerCode = "";
        List<String> nexperList = new ArrayList<String>();
        for (int i = 0; i < V_ORDERGUID.length; i++) {
            Map stepresult = new HashMap();
            HashMap perresult = new HashMap();
            Map spperresult = new HashMap();
            Map complresult = new HashMap();
            Map flowresult = new HashMap();
            Map nextperResult = new HashMap();
            try {
                stepresult = activitiController.GetTaskIdFromBusinessId(V_ORDERGUID[i], V_V_PERSONCODE);
                String taskid = stepresult.get("taskId").toString();
                String V_STEPCODE = stepresult.get("TaskDefinitionKey").toString();
                if (V_STEPCODE.equals("fqrxg")) {//返回发起人，不能审批和驳回
                    fqrNum++;
                } else {
                    if (FlowType[i].equals("MaintainPlan")) {
                        perresult = pm_03Service.PRO_PM_03_PLAN_PROJECT_SEL(V_ORDERGUID[i]);
                        List<Map<String, Object>> perlist = (List) perresult.get("list");
                        String V_V_ORGCODE = perlist.get(0).get("V_ORGCODE").toString();
                        String V_V_DEPTCODE = perlist.get(0).get("V_DEPTCODE").toString();
                        String V_V_SPECIALTY = perlist.get(0).get("REPARIDEPTCODE").toString();

                        String V_STEPNAME = "";
                        String V_NEXT_SETP = "";
                        String sppercode = "";
                        String processKey = "";
                        spperresult = cjyService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, "", "MaintainPlan", V_STEPCODE, V_V_PERSONCODE, V_V_SPECIALTY, "通过");
                        List<Map<String, Object>> spperlist = (List) spperresult.get("list");

                        V_STEPNAME = spperlist.get(0).get("V_V_FLOW_STEPNAME").toString();
                        V_NEXT_SETP = spperlist.get(0).get("V_V_NEXT_SETP").toString();
                        sppercode = spperlist.get(0).get("V_PERSONCODE").toString();

                        processKey = spperresult.get("RET").toString();

                        if (V_NEXT_SETP.equals("lcjs")) {//最后一步

                            String currdate = getShtgtime.Shtgtime();

                            String[] parName = new String[]{"lcjs", "flow_yj", "shtgtime"};
                            String[] parVal = new String[]{"lcjs", "批量审批通过", currdate};

                            complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, ProcessDefinitionKey[i], V_ORDERGUID[i], "lcjs", "流程结束", "通过", "lcjs", V_V_PERSONCODE);
                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "Maintain", processKey, V_STEPCODE, V_NEXT_SETP);
                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                }
                            } else {
                                faiNum++;
                            }
                        } else {
                            String[] parName = new String[]{V_NEXT_SETP, "flow_yj"};
                            String[] parVal = new String[]{sppercode, "批量审批通过"};

                            complresult = activitiController.TaskCompletePL(taskid, "通过", parName, parVal, "请审批！", V_V_PERSONCODE, sppercode, V_STEPNAME, V_STEPCODE, processKey, V_ORDERGUID[i]);
                            if (complresult.get("ret").toString().equals("任务提交成功")) {
                                flowresult = cjyService.PRO_ACTIVITI_FLOW_AGREE(V_ORDERGUID[i], "Maintain", processKey, V_STEPCODE, V_NEXT_SETP);
                                if (flowresult.get("V_INFO").toString().equals("success") || flowresult.get("V_INFO").toString().equals("SUCCESS")) {
                                    sucNum++;
                                    nexperList.add(sppercode);
                                    //result.put("nestper", sppercode);
                                }
                            } else {
                                faiNum++;
                            }
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                faiNum++;
            }
        }
        Map groupPer = groupList(nexperList);//
        Iterator<String> iter = groupPer.keySet().iterator();
        Map nextperDept = new HashMap();
        while (iter.hasNext()) {
            String per = iter.next();
            String dbnum = groupPer.get(per).toString();
            nextperDept = zdhService.PRO_BASE_PERSON_GET(per);
            List<Map<String, Object>> nextperDeptList = (List) nextperDept.get("list");
            //System.out.println(key+" "+value);
            //发送即时通
            if (nextperDeptList.get(0).get("V_ORGCODE").toString().equals("9900")) {
                PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "维修计划", "-1");
            } else {
                String mes = amToMessController.MessageSend(dbnum, "维修计划", per);
                if (mes.equals("fail")) {
                    PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "维修计划", "-1");
                } else if (mes.equals("true")) {
                    PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, per, "维修计划", "0");
                }
            }
        }

        result.put("mes", "维修计划批量审批成功" + sucNum + "条,失败" + faiNum + "条,无法批量审批" + fqrNum + "条");
        return result;
    }

    @RequestMapping(value = "/PRO_03_PLAN_WEEK_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_03_PLAN_WEEK_CREATE(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                       @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE) throws Exception {
        Map result = cjyService.PRO_03_PLAN_WEEK_CREATE(V_V_ORGCODE, V_V_PERCODE);
        return result;
    }

    @RequestMapping(value = "/PM_03_PLAN_MONTH_FINISH_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_03_PLAN_MONTH_FINISH_SEL(@RequestParam(value = "V_V_YEAR") String V_V_YEAR,
                                                           @RequestParam(value = "V_V_MONTH") String V_V_MONTH,
                                                           @RequestParam(value = "V_V_JXNR") String V_V_JXNR,
                                                           @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                                           @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME) throws Exception {
        Map result = cjyService.PM_03_PLAN_MONTH_FINISH_SEL(V_V_YEAR, V_V_MONTH, V_V_JXNR, V_V_PERCODE, V_V_PERNAME);
        return result;
    }

    @RequestMapping(value = "/PM_DEFECTTOWORKORDER_SM", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_DEFECTTOWORKORDER_SM(@RequestParam(value = "V_V_MONTHGUID") String V_V_MONTHGUID,
                                                       @RequestParam(value = "V_V_WEEK_GUID") String V_V_WEEK_GUID) throws Exception {
        Map result = cjyService.PM_DEFECTTOWORKORDER_SM(V_V_MONTHGUID, V_V_WEEK_GUID);
        return result;
    }

    @RequestMapping(value = "/PRO_PM_03_PLAN_WEEK_D_U", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_03_PLAN_WEEK_D_U(@RequestParam(value = "V_V_WEEKGUID") String V_V_WEEKGUID) throws Exception {
        Map result = cjyService.PRO_PM_03_PLAN_WEEK_D_U(V_V_WEEKGUID);
        return result;
    }

    @RequestMapping(value = "/PRO_DEFECT_IMPORT_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_DEFECT_IMPORT_DATA_SEL(@RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                                          @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE) throws Exception {
        Map result = cjyService.PRO_DEFECT_IMPORT_DATA_SEL(V_V_PAGE, V_V_PAGESIZE);
        return result;
    }

}



